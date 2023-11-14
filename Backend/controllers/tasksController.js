const knex = require('../base/knex')

const USERS_TABLE = 'public.users'
const TASKS_TABLE = 'public.tasks'
const asyncHandler = require('express-async-handler');

/**
 * 
 * @description get all tasks of a user
 * @route GET /api/tasks/users/:userid
 * @access private
 * @param {import('express').Request} _req 
 * @param {import('express').Response} res 
 * @returns 
 */
const getTasks = asyncHandler(async (req, res) => {
    const tasks = await knex(TASKS_TABLE).select('*').where({ userid: req.params.userid });
    res.json({ tasks });
})

/**
 * 
 * @description get the task
 * @route GET /api/tasks/:taskid
 * @access private
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 * @returns 
 */
const getTask = asyncHandler(async (req, res) => {
    const taskid = req.params.taskid;
    if (!taskid || taskid == "undefined" || taskid == 'null') {
        res.json({ error: "provide a valid task id", user: null });
        return;
    }
    const [task] = await knex(TASKS_TABLE).select('*').where({ taskid });
    if (!task) {
        res.json({ task: null });
        return;
    }
    res.json({ task })
})


/**
 * 
 * @description create new task
 * @route POST /api/tasks
 * @access private
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 * @returns 
 */
const addTask = asyncHandler(async (req, res) => {
    // req.body = {
    //     taskid,
    //     userid,
    //     description,
    //     createdat,
    //     deadline,
    //     completed,
    //     id
    // }
    const { taskid, userid, description, createdat, deadline, completed, id } = req.body;
    const missing = new Array();

    // if (!taskid)
    //     missing.push("taskid")
    if (!userid)
        missing.push("userid");
    if (!description)
        missing.push("description");
    if (!createdat)
        missing.push("createdat");
    if (!deadline)
        missing.push("deadline");
    // if (!id)
    //     missing.push("id");
    if (!completed) {
        req.body.completed = false;
    }
    if (missing.length > 0) {
        res.json({ error: missing.join(", ") + " are required" })
        return;
    }
    const [res1] = await knex(USERS_TABLE).select('taskscount').where({ userid });
    req.body.taskid = `${userid}_${res1.taskscount}`;
    req.body.id = res1.taskscount
    const [task] = await knex(TASKS_TABLE).insert(req.body).returning('*');
    await knex(USERS_TABLE).increment("taskscount", 1).where({ userid });
    res.json({ task, error: null });
})

/**
 * 
 * @description update the task
 * @route PUT /api/tasks/:taskid
 * @access private
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 * @returns 
 */
const updateTask = asyncHandler(async (req, res) => {
    const settings = req.body;
    const taskid = req.params.taskid;
    if (!taskid || taskid == "undefined" || taskid == 'null') {
        res.json({ error: "provide a valid user id", user: null });
        return;
    }
    const [task] = await knex(TASKS_TABLE).update(settings).where({ taskid }).returning('*');

    res.json({ task });
})

//@desc delete the task
//@route DELETE /api/tasks/:taskid
//@access public
const deleteTask = asyncHandler(async (req, res) => {
    const taskid = req.params.taskid;
    if (!taskid || taskid == "undefined" || taskid == 'null') {
        res.json({ error: "provide a valid user id", user: null });
        return;
    }
    const deleteResult = await knex(TASKS_TABLE)
        .where({ taskid })
        .del();

    if (deleteResult === 1) {
        res.json({ message: "Successfully deleted the task" })
    } else {
        res.json({ error: "Task not found", task: null });
    }

})

module.exports = { deleteTask, getTasks, addTask, updateTask, getTask }