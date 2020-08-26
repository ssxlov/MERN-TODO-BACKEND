const express = require('express');
const userController = require('../controllers/user.controller');

const router = express.Router();

router.route('/users/:userId')
    .get(userController.getUser);

module.exports = router