const express = require('express');
const router = express.Router();
const { getUsers, createUser, getUser, updateUser, deleteUser, loginUser, verifyUser, requestVerificationLink } = require('../controllers/usersController');

router.route('/').get(getUsers).post(createUser);
router.route('/login/:id').get(loginUser);
router.route('/:id').get(getUser).put(updateUser).delete(deleteUser);
router.route('/verify/:id').post(verifyUser);
router.route('/requestLink/:id').post(requestVerificationLink);
module.exports = router;