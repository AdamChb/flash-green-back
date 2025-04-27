const Question = require("../models/questionModels");

const getAllQuestions = async (req, res) => {
    try {
        // Check if the user is authenticated
        if (!req.user || req.user.role !== 0) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const questions = await Question.getAllQuestions();
        res.status(200).json(questions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getQuestionById = async (req, res) => {
    try {
        // Check if the user is authenticated
        if (!req.user || req.user.role !== 0) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const question = await Question.getQuestionById(req.params.id);
        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }
        res.status(200).json(question);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createQuestion = async (req, res) => {
    try {
        // Check if the user is authenticated
        if (!req.user || req.user.role !== 0) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        // Check if the user has the required role (e.g., 'admin', 'teacher')
        if (req.user.role !== 0 && req.user.role !== 1) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const { title, content } = req.body;
        const newQuestion = await Question.createQuestion(title, content);
        res.status(201).json(newQuestion);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateQuestion = async (req, res) => {
    try {
        // Check if the user is authenticated
        if (!req.user || req.user.role !== 0) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        // Check if the user has the required role (e.g., 'admin', 'teacher')
        if (req.user.role !== 0 && req.user.role !== 1) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const { title, content } = req.body;
        const updatedQuestion = await Question.updateQuestion(req.params.id, title, content);
        if (!updatedQuestion) {
            return res.status(404).json({ message: 'Question not found' });
        }
        res.status(200).json(updatedQuestion);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteQuestion = async (req, res) => {
    try {
        // Check if the user is authenticated
        if (!req.user || req.user.role !== 0) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        // Check if the user has the required role (e.g., 'admin', 'teacher')
        if (req.user.role !== 0 && req.user.role !== 1) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const deletedQuestion = await Question.deleteQuestion(req.params.id);
        if (!deletedQuestion) {
            return res.status(404).json({ message: 'Question not found' });
        }
        res.status(200).send({ message: 'Question deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getKnownQuestionsByUserId = async (req, res) => {
    try {
        // Check if the user is authenticated
        if (!req.user || req.user.role !== 0) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const questions = await Question.getQuestionsByUserId(req.params.userId);
        res.status(200).json(questions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getUnknownQuestionsByUserId = async (req, res) => {
    try {
        // Check if the user is authenticated
        if (!req.user || req.user.role !== 0) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const questions = await Question.getUnknownQuestionsByUserId(req.params.userId);
        res.status(200).json(questions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const validateQuestion = async (req, res) => {
    try {
        // Check if the user is authenticated
        if (!req.user || req.user.role !== 0) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const { questionId, isValid } = req.body;
        const validatedQuestion = await Question.validateQuestion(questionId, req.user.id, isValid);
        if (!validatedQuestion) {
            return res.status(404).json({ message: 'Question not found' });
        }
        res.status(200).json({ message: 'Question validated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
  getAllQuestions,
  getQuestionById,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  getKnownQuestionsByUserId,
  getUnknownQuestionsByUserId,
  validateQuestion,
};
