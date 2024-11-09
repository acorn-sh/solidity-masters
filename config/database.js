// // config/database.js
// const { Client } = require('pg');

// const client = new Client({
//   host: process.env.DB_HOST || 'localhost',
//   user: process.env.DB_USER || 'solidity_user',
//   password: process.env.DB_PASSWORD || 'solidity_password',
//   database: process.env.DB_NAME || 'solidity_db',
// });

// module.exports = client;


// config/database.js vercel
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL, // Vercel's environment variable for PostgreSQL
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = pool;
