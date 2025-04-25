const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;

const User = require("../models/authModels");

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findByEmail({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await User.createUser({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ 
        message: "User registered successfully" ,
        user: {
            id: newUser._id,
            username: newUser.username,
            email: newUser.email
        }
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findByEmail({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.Mot_de_passe); // Utilisez le bon nom de colonne
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user.ID_personne, role: user.Role_User }, JWT_SECRET, { expiresIn: "3h" });

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.ID_personne,
        username: user.Pseudo,
        email: user.Email,
        role: user.Role, // Assurez-vous que la colonne `Role` existe si utilisée
      },
    });

  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getUserProfile = async (req, res) => {
    const userId = req.user.id; // Extract user ID from the token
    
    try {
        // Find the user by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Return user profile information (excluding password)
        res.status(200).json({
            id: user.ID_personne,
            username: user.Pseudo,
            email: user.Mot_de_passe,
            role: user.Role_User,
        });
    } catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const updatePassword = async (req, res) => {
    const userId = req.user.id; // Extract user ID from the token
    const { oldPassword, newPassword } = req.body;

    try {
        // Find the user by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if the old password is correct
        const isOldPasswordValid = await bcrypt.compare(oldPassword, user.Mot_de_passe);
        if (!isOldPasswordValid) {
            return res.status(401).json({ message: "Invalid old password" });
        }

        // Hash the new password
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);

        // Update the user's password
        user.password = hashedNewPassword;
        await User.updatePassword({ id: userId, newPassword: hashedNewPassword });

        res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
        console.error("Error updating password:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const updateEmail = async (req, res) => {
    const userId = req.user.id; // Extract user ID from the token
    const { newEmail } = req.body;

    try {
        // Find the user by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Update the user's email
        await User.updateEmail(userId, newEmail);

        res.status(200).json({ message: "Email updated successfully" });
    } catch (error) {
        console.error("Error updating email:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  updatePassword,
  updateEmail,
};
