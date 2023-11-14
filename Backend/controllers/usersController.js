const knex = require('../base/knex')
const bcrypt = require('bcrypt')
const asyncHandler = require('express-async-handler');
const sendVerificationLink = require('../utils/sendVerificationLink');
const USERS_TABLE = 'public.users'
const TOKENS_TABLE = 'public.tokens'

/**
 * 
 * @description get all users
 * @route GET /api/users
 * @access private
 * @param {import('express').Request} _req 
 * @param {import('express').Response} res 
 * @returns 
 */
const getUsers = asyncHandler(async (_req, res) => {
    const users = await knex(USERS_TABLE).select('*');
    res.json({ users })
})

/**
 * 
 * @description get the user
 * @route GET /api/users/:id
 * @access private
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 * @returns 
 */
const getUser = asyncHandler(async (req, res) => {
    const userid = req.params.id;
    if (!userid || userid == "undefined" || userid == 'null') {
        res.json({ error: "provide a valid user id", user: null });
        return;
    }
    if ((/\S+@\S+\.\S+/).test(userid)) {
        const [user] = await knex(USERS_TABLE).select('*').where({ email: userid });
        if (!user) {
            res.json({ user: null });
            return;
        }
        res.json({ user });
    }
    else {
        const [user] = await knex(USERS_TABLE).select('*').where({ userid });
        if (!user) {
            res.json({ user: null });
            return;
        }
        res.json({ user })
    }
})


/**
 * 
 * @description create new user
 * @route POST /api/users
 * @access private
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 * @returns 
 */
const createUser = asyncHandler(async (req, res) => {
    const settings = req.body;
    const userid = settings.userid;
    if (!userid || userid == "undefined" || userid == 'null') {
        res.json({ error: "provide a valid user id", user: null });
        return;
    }

    bcrypt.hash(settings.password, 10)
        .then(async hash => {
            settings.password = hash;
            const [user] = await knex(USERS_TABLE).insert({ userid, ...settings }).returning('*');
            res.json({ user });
            sendVerificationLink(user);
        })
        .catch(err => {
            res.json({ message: err, user: null });
        })
})

/**
 * 
 * @description update new user
 * @route PUT /api/users/:id
 * @access private
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 * @returns 
 */
const updateUser = asyncHandler(async (req, res) => {
    const settings = req.body;
    const userid = req.params.id;
    if (!userid || userid == "undefined" || userid == 'null') {
        res.json({ error: "provide a valid user id", user: null });
        return;
    }
    const [user] = await knex(USERS_TABLE).update(settings).where({ userid }).returning('*');
    if (!user) return createUser(req, res);

    res.json({ user });
})

//@desc delete the user
//@route DELETE /api/users/:id
//@access public
const deleteUser = asyncHandler(async (req, res) => {
    const userid = req.params.id;
    if (!userid || userid == "undefined" || userid == 'null') {
        res.json({ error: "provide a valid user id", user: null });
        return;
    }
    const deleteResult = await knex(USERS_TABLE)
        .where({ userid })
        .del();

    if (deleteResult === 1) {
        // Successfully deleted the user
        res.json({ message: "Successfully deleted the user" })
    } else {
        // No user with the given ID found
        res.send({ error: "User not found", user: null });
    }

})

const loginUser = asyncHandler(async (req, res) => {
    const userid = req.params.id;
    if (!userid || userid == "undefined" || userid == 'null') {
        res.json({ error: "provide a valid user id", user: null });
        return;
    }
    if ((/\S+@\S+\.\S+/).test(userid)) {
        const [user] = await knex(USERS_TABLE).select('*').where({ email: userid });
        if (!user)
            res.json({ error: "No user exists with given userid, please signup instead." });
        else {
            bcrypt.compare(req.query.password, user.password).then(function (result) {
                if (result === true)
                    res.json({ user })
                else
                    res.json({ error: "You've enterd wrong password" })
            });
        }
        return;
    }
    const [user] = await knex(USERS_TABLE).select('*').where({ userid });
    if (!user)
        res.json({ error: "No user exists with given userid, please signup instead." });
    else {
        bcrypt.compare(req.query.password, user.password).then(function (result) {
            if (result === true)
                res.json({ user })
            else
                res.json({ error: "You've enterd wrong password" })
        });
    }
})

const verifyUser = asyncHandler(async (req, res) => {
    const userid = req.params.id;
    const token = req.body.token;
    const [isVerified] = await knex(USERS_TABLE).select('verified').where({ userid });
    if (isVerified === undefined) {
        res.json({ error: "Account doesn't exist, please sign up." })
        return;
    }
    if (isVerified.verified === true) {
        res.json({ error: "User is already verified", verified: true });
        return;
    }
    let [tokenData] = await knex(TOKENS_TABLE).select('*').where({ userid });
    if (tokenData === undefined) {
        res.json({ error: "Invalid link" });
        return;
    }
    if (tokenData && Date.now() > tokenData.expiresat) {
        res.json({ error: "Link has been expired, please request a new link." });
        return;
    }
    bcrypt.compare(token, tokenData.token).then(async function (result) {
        if (result === true) {
            await knex(TOKENS_TABLE).where({ userid }).del();
            const [user] = await knex(USERS_TABLE).update({ verified: true }).where({ userid }).returning('*');
            res.json({ user, verified: true });
        }
        else {
            res.json({ error: "Link is invalid.", verified: false })
        }
    })
})

const requestVerificationLink = asyncHandler(async (req, res) => {
    const [user] = await knex(USERS_TABLE).select('*').where({ userid: req.params.id });
    if (!user) {
        res.json({ error: "No account found, please sign up." });
        return;
    }
    if(user.verified === true)
    {
        res.json({ error: "User is already verified.", verified: true });
        return;
    }
    sendVerificationLink(user) 
        .then(() => {
            res.json({ message: "OTP sent successfully." })
        })
        .catch(e => {
            res.json({ error: e.message });
        })
})

module.exports = { getUsers, createUser, getUser, updateUser, deleteUser, loginUser, verifyUser, requestVerificationLink }