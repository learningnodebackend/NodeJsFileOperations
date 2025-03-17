const express = require("express");
const app = express();
const PORT = 3000;

const usersRoutes = require("./routes/users");

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use("/users", usersRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
