const express = require('express');
const router = express.Router();

const authController = require('../controllers/authControllers');
const { authenticateToken } = require('../middleware/authMiddleware');

// User registration route
router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);
router.get('/profile', authenticateToken, authController.getUserProfile);
router.post('/updatepassword', authenticateToken, authController.updatePassword);
router.post('/updateemail', authenticateToken, authController.updateEmail);

module.exports = router;
