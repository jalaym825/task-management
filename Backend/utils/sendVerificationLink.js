const knex = require('../base/knex')
const bcrypt = require('bcrypt')
const TOKENS_TABLE = 'public.tokens'
const sendMail = require('./sendMail')
const crypto = require('crypto')
const { baseURL } = require('../config.json')

module.exports = async (user) => {
    const userid = user.userid;
    let [otpData] = await knex(TOKENS_TABLE).select('*').where({ userid });
    if (otpData && new Date(Date.now()) < new Date(otpData.expiresat)) {
        throw new Error(`Please wait for ${new Date(otpData.expiresat - Date.now()).toISOString().slice(14, 19)} minutes`);
    }
    const token = crypto.randomBytes(32).toString("hex");
    const url = baseURL + `/${userid}/verify/${token}`;
    sendMail(user.email, "Email verification", url).then(async () => {
        bcrypt.hash(token, 10)
            .then(async hash => {
                try {
                    if (!otpData) {
                        await knex(TOKENS_TABLE).insert({ userid, createdat: new Date(Date.now()), expiresat: new Date(Date.now() + 600000), token: hash }).where({ userid }).returning('*');
                    } else {
                        await knex(TOKENS_TABLE).update({ userid, createdat: new Date(Date.now()), expiresat: new Date(Date.now() + 600000), token: hash }).where({ userid }).returning('*');
                    }
                } catch (e) {
                    throw new Error(e);
                }
            })
            .catch(err => {
                throw new Error(err);
            })
    }).catch(err => {
        throw new Error(err);
    })
}