const { pool } = require('../index.js');

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
    const query = 'SELECT * FROM Personne WHERE ID_personne = $1';
    const values = [id];
    try {
        const [rows] = await pool.query(query, values);
        return rows[0];
    } catch (error) {
        throw new Error('Error fetching user: ' + error.message);
    }
};

const createUser = async (username, password, role) => {
    const query = 'INSERT INTO Personne (Pseudo, Mot_de_passe, Role_User) VALUES ($1, $2, $3) RETURNING *';
    const values = [username, password, role];
    try {
        const [rows] = await pool.query(query, values);
        return rows[0];
    } catch (error) {
        throw new Error('Error creating user: ' + error.message);
    }
};

const updateUser = async (id, username, password, role) => {
    const query = 'UPDATE Personne SET Pseudo = $1, Role_User = $2 WHERE ID_Personne = $3 RETURNING *';
    const values = [username, password, role, id];
    try {
        const [rows] = await pool.query(query, values);
        return rows[0];
    } catch (error) {
        throw new Error('Error updating user: ' + error.message);
    }
};

const deleteUser = async (id) => {
    const query = 'DELETE FROM Personne WHERE ID_Personne = $1 RETURNING *';
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
