const sequelize = require("../config/database");
const User = require("./user");

const initDB = async () => {
  try {
    await sequelize.sync({ force: false }); // Change `force: true` to reset tables
    console.log("Database connected and synchronized");
  } catch (error) {
    console.error("Database connection failed:", error);
  }
};

module.exports = { initDB, User };
