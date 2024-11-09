// // config/database.js
// const { Client } = require('pg');

// const client = new Client({
//   host: process.env.DB_HOST || 'localhost',
//   user: process.env.DB_USER || 'solidity_user',
//   password: process.env.DB_PASSWORD || 'solidity_password',
//   database: process.env.DB_NAME || 'solidity_db',
// });

// module.exports = client;


// config/database.js
const { Pool } = require('pg');

let pool;

// Check if running in a Vercel environment (production) or locally (development)
if (process.env.NODE_ENV === 'production') {
  // Vercel production configuration
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false, // Required for Vercel's self-signed certificates
    },
  });
} else {
  // Local development configuration
  pool = new Pool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'solidity_user',
    password: process.env.DB_PASSWORD || 'solidity_password',
    database: process.env.DB_NAME || 'solidity_db',
    port: process.env.DB_PORT || 5432,
  });
}

module.exports = pool;
