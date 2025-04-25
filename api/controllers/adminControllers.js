const bwcrypt = require('bcrypt');

const Admin = require('../models/adminModel');

const getAllUsers = async (req, res) => {
    try {
        // Check if the user is authenticated
        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        // Check if the user has the required role (e.g., 'admin', 'teacher')
        if (!req.user.role || req.user.role !== 0) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const users = await Admin.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getUserById = async (req, res) => {
    try {
        // Check if the user is authenticated
        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        // Check if the user has the required role (e.g., 'admin', 'teacher')
        if (!req.user.role || req.user.role !== 0) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const user = await Admin.getUserById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createUser = async (req, res) => {
    try {
        // Check if the user is authenticated
        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        // Check if the user has the required role (e.g., 'admin', 'teacher')
        if (!req.user.role || req.user.role !== 0) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        pass
        const { username, password, role } = req.body;
        const hashedPassword = await bwcrypt.hash(password, 10);
        const newUser = await Admin.createUser(username, hashedPassword, role);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateUser = async (req, res) => {
    try {
        // Check if the user is authenticated
        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        // Check if the user has the required role (e.g., 'admin', 'teacher')
        if (!req.user.role || req.user.role !== 0) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const { username, role } = req.body;
        const updatedUser = await Admin.updateUser(req.params.id, username, role);
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        // Check if the user is authenticated
        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        // Check if the user has the required role (e.g., 'admin', 'teacher')
        if (!req.user.role || req.user.role !== 0) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        await Admin.deleteUser(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};
