// require("dotenv").config();
const express = require("express");
const { Sequelize, DataTypes } = require("sequelize");

const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// Initialize Sequelize with PostgreSQL
const sequelize = new Sequelize(
  "apollo_auth",  // Database name
  "dhavalvaghela", //Database User
  "apollo", // password
  {
  host: "localhost",
  port: 5432,
  dialect: "postgres",
  logging: false,
});

// Test Database Connection
sequelize
  .authenticate()
  .then(() => console.log("PostgreSQL Connected"))
  .catch((err) => console.error("PostgreSQL Connection Error:", err));

// Define User Model
const User = sequelize.define("User", {
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
});

// Sync Database
sequelize.sync({ alter: true }) // Creates table if not exists, alters if changed
  .then(() => console.log("Database Synced"))
  .catch((err) => console.error("Sync Error:", err));

// Create (POST)
app.post("/users", async (req, res) => {
  try {
    const { name, email } = req.body;
    const newUser = await User.create({ name, email });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Read All (GET)
app.get("/users", async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Read One (GET by ID)
app.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    user ? res.json(user) : res.status(404).json({ message: "User not found" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update (PUT)
app.put("/users/:id", async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = await User.findByPk(req.params.id);

    if (user) {
      user.name = name || user.name;
      user.email = email || user.email;
      await user.save();
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete (DELETE)
app.delete("/users/:id", async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      await user.destroy();
      res.json({ message: "User deleted" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
