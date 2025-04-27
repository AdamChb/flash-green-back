const bwcrypt = require('bcrypt');

const Admin = require('../models/adminModels');

const getAllUsers = async (req, res) => {
    try {
        // Check if the user is authenticated
        if (!req.user || req.user.role !== 0) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        // Check if the user has the required role (e.g., 'admin', 'teacher')
        if (req.user.role !== 0) {
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
        if (!req.user || req.user.role !== 0) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        // Check if the user has the required role (e.g., 'admin', 'teacher')
        if (req.user.role !== 0) {
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
        if (!req.user || req.user.role !== 0) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        // Check if the user has the required role (e.g., 'admin', 'teacher')
        if (req.user.role !== 0) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const { username, email, password, role } = req.body;
        const hashedPassword = await bwcrypt.hash(password, 10);
        const newUser = await Admin.createUser(username, email, hashedPassword, role);
        res.status(200).json({ message: 'User creeated successfully'});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateUser = async (req, res) => {
    try {
        // Check if the user is authenticated
        if (!req.user || req.user.role !== 0) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        // Check if the user has the required role (e.g., 'admin', 'teacher')
        if (req.user.role !== 0) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const { username, email, role } = req.body;
        const updatedUser = await Admin.updateUser(req.params.id, username, email, role);
        res.status(200).json({ message: updatedUser });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        // Check if the user is authenticated
        if (!req.user || req.user.role !== 0) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        // Check if the user has the required role (e.g., 'admin', 'teacher')
        if (req.user.role !== 0) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const deletedUser = await Admin.deleteUser(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).send({ message: 'User deleted successfully' });
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
