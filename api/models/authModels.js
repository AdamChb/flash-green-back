const { pool } = require('../db.js');

const findByEmail = async ({ email }) => {  
  const query = 'SELECT * FROM Personne WHERE Email = ?';
  const values = [email];

  try {
    const [rows] = await pool.execute(query, values);
    return rows[0];
  } catch (error) {
    console.error('Error finding user by email:', error);
    throw error;
  }
};

const findById = async (id) => {
  const query = 'SELECT * FROM Personne WHERE ID_personne = ?';
  const values = [id];
  
  try {
    const [rows] = await pool.execute(query, values);
    return rows[0];
  } catch (error) {
    console.error('Error finding user by ID:', error);
    throw error;
  }
};

const createUser = async ({ username, email, password }) => {
  const query = 'INSERT INTO Personne (Pseudo, Email, Mot_de_passe) VALUES (?, ?, ?)';
  const values = [username, email, password];

  try {
    const [result] = await pool.execute(query, values);
    const insertedId = result.insertId;
    return { ID_personne: insertedId, Pseudo: username, Email: email, Mot_de_passe: password };
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

const updatePassword = async ({ id, newPassword }) => {
  const query = 'UPDATE Personne SET Mot_de_passe = ? WHERE ID_personne = ?';
  const values = [newPassword, id];

  try {
    const [result] = await pool.execute(query, values);
    if (result.affectedRows === 0) {
      throw new Error('No user found to update password');
    }
    return { ID_personne: id, Mot_de_passe: newPassword };
  } catch (error) {
    console.error('Error updating password:', error);
    throw error;
  }
};

const updateEmail = async (id, newEmail) => {
  const query = 'UPDATE Personne SET Email = ? WHERE ID_personne = ?';
  const values = [newEmail, id];

  try {
    const [result] = await pool.execute(query, values);
    if (result.affectedRows === 0) {
      throw new Error('No user found to update email');
    }
    return { ID_personne: id, Email: newEmail };
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