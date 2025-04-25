const { pool } = require('../db.js');

const getAllQuestions = async () => {
    const query = 'SELECT * FROM Question';
    try {
        const result = await pool.query(query);
        return result.rows; 
    } catch (error) {
        console.error('Error fetching all questions:', error);
        throw error;
    }
};

const getQuestionById = async (id) => {
    const query = 'SELECT * FROM Question WHERE ID_Question = ?';
    const values = [id];
    try {
        const result = await pool.query(query, values);
        return result.rows[0]; 
    } catch (error) {
        console.error('Error fetching question by ID:', error);
        throw error;
    }
};

const createQuestion = async (title, content) => {
    const query = 'INSERT INTO Question (Intitule, Reponse) VALUES (?, ?) RETURNING *';
    const values = [title, content];
    try {
        const result = await pool.query(query, values);
        return result.rows[0]; 
    } catch (error) {
        console.error('Error creating question:', error);
        throw error;
    }
};

const updateQuestion = async (id, title, content) => {
    const query = 'UPDATE Question SET Intitule = ?, Reponse = ? WHERE ID_Question = ? RETURNING *';
    const values = [title, content, id];    
    try {
        const result = await pool.query(query, values);
        return result.rows[0]; 
    } catch (error) {
        console.error('Error updating question:', error);
        throw error;
    }
};

const deleteQuestion = async (id) => {
    const query = 'DELETE FROM Question WHERE ID_Question = ? RETURNING *';
    const values = [id];
    try {
        const result = await pool.query(query, values);
        return result.rows[0]; 
    } catch (error) {
        console.error('Error deleting question:', error);
        throw error;
    }
};

const getQuestionsByUserId = async (userId) => {
    const query = 'SELECT * FROM Question WHERE ID_User = ?';
    const values = [userId];
    try {
        const result = await pool.query(query, values);
        return result.rows;
    } catch (error) {
        console.error('Error fetching questions by user ID:', error);
        throw error;
    }
};

const validateQuestion = async (questionId, userId) => {
    const query = 'INSERT INTO Personne_Questions (ID_Question, ID_Personne, Connue) VALUES (?, ?, ?) RETURNING *';
    const values = [questionId, userId, 1];
    try {
        const result = await pool.query(query, values);
        return result.rows[0]; 
    } catch (error) {
        console.error('Error validating question:', error);
        throw error;
    }
};

module.exports = {
    getAllQuestions,
    getQuestionById,
    createQuestion,
    updateQuestion,
    deleteQuestion,
    getQuestionsByUserId,
    validateQuestion
};
