// server.js
require('dotenv').config();

const express = require('express');
const db = require('./config/database');
const initDb = require('./config/initDb'); // Import database initialization script
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', async (req, res) => {
  try {
    const problems = await db.query('SELECT * FROM problems');
    console.log("Problems data fetched:", problems.rows);
    res.render('index', { problems: problems.rows });
  } catch (err) {
    console.error('Error fetching problems:', err);
    res.status(500).send('Server error');
  }
});

const connectWithRetry = async (retries = 5, delay = 5000) => {
  try {
    await db.connect();
    console.log('Connected to PostgreSQL database.');
    await initDb(); // Ensure database structure and data initialization
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

const startServer = () => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

(async () => {
  await connectWithRetry();
  startServer();
})();
