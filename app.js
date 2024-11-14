require('dotenv').config();

const express = require('express');
const path = require('path');
const db = require('./config/database');
const updateProblems = require('./server/updateProblems');


// Import routes
const indexRouter = require('./routes/index');
const problemsRouter = require('./routes/problems'); // Changed to avoid duplicate usage of index router
const leaderboardRouter = require('./routes/leaderboard');
const adminRoutes = require('./routes/admin');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set up static files serving
app.use(express.static(path.join(__dirname, 'public')));

// Set up view engine (if using e.g., EJS)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Initialize database and load problems
(async () => {
  try {
    console.log('Initializing database...');
    await updateProblems();
    console.log('Database initialized and problems loaded successfully.');
  } catch (err) {
    console.error('Failed to initialize database or load problems:', err);
    process.exit(1); // Exit the process if the database initialization fails
  }
})();

// Connect to the database and start the server
db.connect()
  .then(() => {
    console.log('Connected to PostgreSQL database.');

    // Use routes
    app.use('/', indexRouter);
    app.use('/api/problems', problemsRouter); // Updated path for clarity
    app.use('/admin', adminRoutes);
    app.use('/api/leaderboard', leaderboardRouter);

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to the database:', err);
    process.exit(1); // Exit the process if the database connection fails
  });

module.exports = app;
