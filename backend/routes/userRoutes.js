const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControllers');

// Register Route
router.post('/register', userController.User_Registration);

// Login Route
router.post('/login', userController.User_Login);

module.exports = router;
