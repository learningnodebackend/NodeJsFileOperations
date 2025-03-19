
// npm install express jsonwebtoken bcryptjs sequelize pg dotenv

const express = require("express");
const dotenv = require("dotenv");
const { initDB, User } = require("./models");
const authRoutes = require("./routes/auth");
const moment = require("moment");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
// Logging middleware
const logger = (req, res, next) => {
   let timestamp = moment().format('MMMM Do YYYY, h:mm:ss a')
    console.log(`[${timestamp}] ${req.method} ${req.url}`);
    next(); // Pass control to the next middleware or route handler
  };
  
  // Use the logger middleware for all routes
app.use(logger);

// Routes
app.use("/users", authRoutes);

// Start server & connect to DB
initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
});




// create User
// ------------
// mutation {
//   register(name: "Johnwww", email: "johnw@example.com", password: "password")
// }

// login user
// mutation {
//   login(email: "johnw@example.com", password: "password")
// }


// get users
// query {
//   users {
//     id
//     name
//     email
//   }
// }


// get me  -> pass token in request header - Authorization

// query {
//   me {
//     id
//     name
//     email
//   }
// }