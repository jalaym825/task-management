const express = require('express');
const router = express.Router();
const { deleteTask, getTasks, addTask, updateTask, getTask } = require('../controllers/tasksController');

router.route('/').post(addTask)
router.route('/users/:userid').get(getTasks);
router.route('/:taskid').get(getTask).put(updateTask).delete(deleteTask);

module.exports = router;