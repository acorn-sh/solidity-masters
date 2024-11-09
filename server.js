// server.js
const express = require('express');
const db = require('./config/database');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware for parsing JSON requests
app.use(express.json());

// Route example (adjust as needed)
app.get('/', (req, res) => {
  res.send('Hello, Solidity programming competition!');
});

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
      await new Promise((resolve) => setTimeout(resolve, delay)); // Properly await delay
      return connectWithRetry(retries - 1, delay); // Retry connection
    }
  }
};

// Start the server after database connection
const startServer = () => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

// Self-invoking async function to initialize application
(async () => {
  await connectWithRetry();
  startServer();
})();
