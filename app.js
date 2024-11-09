// app.js
const express = require('express');
const path = require('path');
const db = require('./config/database');

// Import routes
const indexRouter = require('./routes/index');  // Handles `/`
const problemsRouter = require('./routes/index'); // Use this for `/problems`
const leaderboardRouter = require('./routes/leaderboard');

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

// Connect to the database
db.connect()
  .then(() => {
    console.log('Connected to PostgreSQL database.');

    // Use routes with `api` prefix
    app.use('/', indexRouter); // Handles `/`
    app.use('/api', problemsRouter); // Handles `/api/problems`
    app.use('/api/leaderboard', leaderboardRouter);

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to the database:', err);
    process.exit(1);
  });

module.exports = app;
