const { pool } = require('../db.js');

const getAllQuestions = async () => {
    const query = 'SELECT * FROM Question';
    try {
        const [rows] = await pool.query(query);
        return rows; 
    } catch (error) {
        console.error('Error fetching all questions:', error);
        throw error;
    }
};

const getQuestionById = async (id) => {
    const query = 'SELECT * FROM Question WHERE ID_Question = ?';
    const values = [id];
    try {
        const [rows] = await pool.query(query, values);
        return rows[0]; 
    } catch (error) {
        console.error('Error fetching question by ID:', error);
        throw error;
    }
};

const createQuestion = async (title, content) => {
    const query = 'INSERT INTO Question (Intitule, Reponse) VALUES (?, ?)';
    const values = [title, content];
    try {
        const [rows] = await pool.query(query, values);
        return rows[0]; 
    } catch (error) {
        console.error('Error creating question:', error);
        throw error;
    }
};

const updateQuestion = async (id, title, content) => {
    const query = 'UPDATE Question SET Intitule = ?, Reponse = ? WHERE ID_Question = ?';
    const values = [title, content, id];    
    try {
        const [rows] = await pool.query(query, values);
        return rows.info; 
    } catch (error) {
        console.error('Error updating question:', error);
        throw error;
    }
};

const deleteQuestion = async (id) => {
    const query = 'DELETE FROM Question WHERE ID_Question = ?';
    const values = [id];
    try {
        const [rows] = await pool.query(query, values);
        return rows.affectedRows; 
    } catch (error) {
        console.error('Error deleting question:', error);
        throw error;
    }
};

const getKnownQuestionsByUserId = async (userId) => {
    const query = `
        SELECT q.* 
        FROM Question q
        INNER JOIN Personne_Questions pq ON q.ID_question = pq.ID_question
        WHERE pq.ID_personne = ? AND pq.Valide = 1
    `;
    const values = [userId];
    try {
        const [rows] = await pool.query(query, values);
        return rows;
    } catch (error) {
        console.error('Error fetching questions by user ID:', error);
        throw error;
    }
};

const getUnknownQuestionsByUserId = async (userId) => {
    const query = `
        SELECT q.* 
        FROM Question q
        LEFT JOIN Personne_Questions pq ON q.ID_question = pq.ID_question AND pq.ID_personne = ?
        WHERE pq.ID_personne IS NULL OR pq.Valide = 0
    `;
    const values = [userId];
    try {
        const [rows] = await pool.query(query, values);
        return rows;
    } catch (error) {
        console.error('Error fetching unknown questions by user ID:', error);
        throw error;
    }
};

const validateQuestion = async (questionId, userId, isValid) => {
    const query = `
        INSERT INTO Personne_Questions (ID_Question, ID_Personne, Valide) 
        VALUES (?, ?, ?)
        ON DUPLICATE KEY UPDATE Valide = VALUES(Valide)
    `;
    const values = [questionId, userId, isValid];
    try {
        const [rows] = await pool.query(query, values);
        return rows.affectedRows; 
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
    getKnownQuestionsByUserId,
    getUnknownQuestionsByUserId,
    validateQuestion
};