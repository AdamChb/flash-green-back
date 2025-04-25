const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

// User registration route
router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);
router.get('/profile', authMiddleware, authController.getUserProfile);
router.post('/updatepassword', authMiddleware, authController.updatePassword);
router.post('/updateemail', authMiddleware, authController.updateEmail);