const { pool } = require('../db.js');

const getAllUsers = async () => {
    const query = 'SELECT * FROM Personne';
    try {
        const [rows] = await pool.query(query);
        return rows;
    } catch (error) {
        throw new Error('Error fetching users: ' + error.message);
    }
};

const getUserById = async (id) => {
    const query = 'SELECT * FROM Personne WHERE ID_personne = ?';
    const values = [id];
    try {
        const [rows] = await pool.query(query, values);
        return rows[0];
    } catch (error) {
        throw new Error('Error fetching user: ' + error.message);
    }
};

const createUser = async (username, password, role) => {
    const query = 'INSERT INTO Personne (Pseudo, Mot_de_passe, Role_User) VALUES (?, ?, ?) RETURNING *';
    const values = [username, password, role];
    try {
        const [rows] = await pool.query(query, values);
        return rows[0];
    } catch (error) {
        throw new Error('Error creating user: ' + error.message);
    }
};

const updateUser = async (id, username, password, role) => {
    const query = 'UPDATE Personne SET Pseudo = ?, Role_User = ? WHERE ID_Personne = ? RETURNING *';
    const values = [username, password, role, id];
    try {
        const [rows] = await pool.query(query, values);
        return rows[0];
    } catch (error) {
        throw new Error('Error updating user: ' + error.message);
    }
};

const deleteUser = async (id) => {
    const query = 'DELETE FROM Personne WHERE ID_Personne = ? RETURNING *';
    const values = [id];
    try {
        const [rows] = await pool.query(query, values);
        return rows[0];
    } catch (error) {
        throw new Error('Error deleting user: ' + error.message);
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};
