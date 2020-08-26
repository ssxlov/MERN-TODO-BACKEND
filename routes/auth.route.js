const express = require('express');
const authController = require('./../controllers/auth.controller');
const router = express.Router();

router.post('/login', authController.login);
router.post('/signup', authController.signup);
router.post('/refresh', authController.refresh);
router.get('/check-authorization', authController.authenticate, authController.pass);

module.exports = router;
