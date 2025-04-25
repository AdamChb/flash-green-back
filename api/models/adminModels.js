const { pool } = require('../db.js');

const getAllUsers = async () => {
    const query = 'SELECT ID_personne, Pseudo, Email, Role_User FROM Personne';
    try {
        const [rows] = await pool.query(query);
        return rows;
    } catch (error) {
        throw new Error('Error fetching users: ' + error.message);
    }
};

const getUserById = async (id) => {
    const query = 'SELECT ID_personne, Pseudo, Email, Role_User FROM Personne WHERE ID_personne = ?';
    const values = [id];
    try {
        const [rows] = await pool.query(query, values);
        return rows[0];
    } catch (error) {
        throw new Error('Error fetching user: ' + error.message);
    }
};

const createUser = async (username, email, password, role) => {
    const query = 'INSERT INTO Personne (Pseudo, Email, Mot_de_passe, Role_User) VALUES (?, ?, ?, ?)';
    const values = [username, email, password, role];
    try {
        const [rows] = await pool.query(query, values);
        return rows[0];
    } catch (error) {
        throw new Error('Error creating user: ' + error.message);
    }
};

const updateUser = async (id, username, email, role) => {
    const query = 'UPDATE Personne SET Pseudo = ?, Email = ?, Role_User = ? WHERE ID_Personne = ?';
    const values = [username, email, role, id];
    try {
        const [rows] = await pool.query(query, values);
        return rows.info;
    } catch (error) {
        throw new Error('Error updating user: ' + error.message);
    }
};

const deleteUser = async (id) => {
    const query = 'DELETE FROM Personne WHERE ID_Personne = ?';
    const values = [id];
    try {
        const [rows] = await pool.query(query, values);
        console.log(rows);
        return rows.affectedRows;
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
