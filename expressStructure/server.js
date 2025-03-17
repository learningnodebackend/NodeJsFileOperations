const express = require("express");
const app = express();
const PORT = 3000;

const usersRoutes = require("./routes/users");
const orderRoutes = require("./routes/orders");

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use("/users", usersRoutes);
app.use("/orders", orderRoutes);


// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
