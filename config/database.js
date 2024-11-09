// config/database.js
const { Client } = require('pg');

const client = new Client({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'solidity_user',
  password: process.env.DB_PASSWORD || 'solidity_password',
  database: process.env.DB_NAME || 'solidity_db',
});

module.exports = client;
