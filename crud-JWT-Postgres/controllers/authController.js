const bcrypt = require("bcryptjs");
const jwt = require("../utils/jwt");
const { User } = require("../models");

const signup = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log("req.body",req.body)
    // Check if user exists
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    console.log("existingUser",existingUser)

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
     console.log("hashedPassword",hashedPassword);

    // Create user
    const newUser = await User.create({ username, password: hashedPassword });

    res.status(201).json({ message: "User registered successfully", userId: newUser.id });
  } catch (error) {
    res.status(500).json({ message: "Error signing up", error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.generateToken(user.id);


    //stored logged in time in db when user will login

  // store logout time in db 


    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};

// ✅ Get user info API
const getUserInfo = async (req, res) => {
    try {
      const user = await User.findByPk(req.user.userId, {
        attributes: ["id", "username", "createdAt"], // Select required fields
      });
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Error fetching user info", error: error.message });
    }
};

module.exports = { signup, login, getUserInfo };






