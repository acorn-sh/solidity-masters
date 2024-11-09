// server.js
const express = require('express');
const db = require('./config/database');

const app = express();
const PORT = process.env.PORT || 3001;

// Function to connect to the database with retry logic
const connectWithRetry = async (retries = 5, delay = 5000) => {
  try {
    await db.connect();
    console.log('Connected to PostgreSQL database.');
  } catch (err) {
    if (retries === 0) {
      console.error('Failed to connect to the database. Exiting.');
      process.exit(1);
    } else {
      console.warn(`Database connection failed. Retrying in ${delay / 1000} seconds... (${retries} retries left)`);
      setTimeout(() => connectWithRetry(retries - 1, delay), delay);
    }
  }
};

// Initialize server after establishing database connection
const startServer = () => {
  // Define your routes here
  app.get('/', (req, res) => {
    res.send('Hello, Solidity programming competition!');
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

// Start the application
(async () => {
  await connectWithRetry();
  startServer();
})();
