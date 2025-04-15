const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER || 'dhavalvaghela',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'apollo_auth',
  password: process.env.DB_PASS || 'apollo',
  port: process.env.DB_PORT || 5432,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};



// CREATE TABLE users (
//   id SERIAL PRIMARY KEY,
//   name VARCHAR(100),
//   email VARCHAR(100) UNIQUE
// );

