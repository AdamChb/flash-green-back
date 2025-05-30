const express = require('express');
const router = express.Router();

const questionController = require('../controllers/questionControllers');
const { authenticateToken } = require('../middleware/authMiddleware');

router.get('/', authenticateToken, questionController.getAllQuestions);
router.get('/:id', authenticateToken, questionController.getQuestionById);
router.post('/', authenticateToken, questionController.createQuestion);
router.put('/:id', authenticateToken, questionController.updateQuestion);
router.delete('/:id', authenticateToken, questionController.deleteQuestion);
router.get('/known/:userId', authenticateToken, questionController.getKnownQuestionsByUserId);
router.get('/unknown/:userId', authenticateToken, questionController.getUnknownQuestionsByUserId);
router.post('/validate', authenticateToken, questionController.validateQuestion);

module.exports = router;
