const { pool } = require('../db.js');

const findByEmail = async ({ email }) => {  
  const query = 'SELECT * FROM Personne WHERE Email = ?';
  const values = [email];

  try {
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error('Error finding user by email:', error);
    throw error;
  }
};

const findById = async ({ id }) => {
    const query = 'SELECT * FROM Personne WHERE ID_personne = ?';
    const values = [id];
    
    try {
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.error('Error finding user by ID:', error);
        throw error;
    }
};

const createUser = async ({ username, email, password }) => {
    const query = 'INSERT INTO Personne (Pseudo, Email, Mot_de_passe) VALUES (?, ?, ?) RETURNING *';
    const values = [username, email, password];

    try {
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};

const updatePassword = async ({ id, newPassword }) => {
    const query = 'UPDATE Personne SET Mot_de_passe = ? WHERE ID_personne = ? RETURNING *';
    const values = [newPassword, id];

    try {
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.error('Error updating password:', error);
        throw error;
    }
};

const updateEmail = async ({ id, newEmail }) => {
    const query = 'UPDATE Personne SET Email = ? WHERE ID_personne = ? RETURNING *';
    const values = [newEmail, id];

    try {
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.error('Error updating email:', error);
        throw error;
    }
};

module.exports = {
    findByEmail,
    findById,
    createUser,
    updatePassword,
    updateEmail
};
