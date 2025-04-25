const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminControllers');
const { authenticateToken } = require('../middleware/authMiddleware');

router.get('/users', authenticateToken, adminController.getAllUsers);
router.get('/users/:id', authenticateToken, adminController.getUserById);
router.post('/users', authenticateToken, adminController.createUser);
router.put('/users/:id', authenticateToken, adminController.updateUser);
router.delete('/users/:id', authenticateToken, adminController.deleteUser);
