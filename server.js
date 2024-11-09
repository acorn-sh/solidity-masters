const express = require('express');
const db = require('./config/database');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Set view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware for parsing JSON requests
app.use(express.json());

// Serve static files (CSS, JS, images) from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Route to render main page with data from database
app.get('/', async (req, res) => {
  try {
    const problems = await db.query('SELECT * FROM problems'); // Fetch data from 'problems' table
    console.log("Problems data fetched:", problems.rows); // Check if data is returned
    res.render('index', { problems: problems.rows }); // Pass data to EJS template
  } catch (err) {
    console.error('Error fetching problems:', err);
    res.status(500).send('Server error');
  }
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
      await new Promise((resolve) => setTimeout(resolve, delay));
      return connectWithRetry(retries - 1, delay);
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
