const db = require('./database');
const fs = require('fs');
const path = require('path');

const initDb = async () => {
  try {
    console.log("Initializing database...");

    // Create table for problems
    await db.query(`
      CREATE TABLE IF NOT EXISTS problems (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        initial_code TEXT NOT NULL
      );
    `);
    console.log("Table 'problems' ensured.");

    // Check if the table is empty
    const { rows } = await db.query('SELECT COUNT(*) FROM problems');
    if (parseInt(rows[0].count, 10) === 0) {
      console.log("Table 'problems' is empty. Inserting initial data...");

      // Load initial problems data
      const problemsPath = path.join(__dirname, '../data/problems.json');
      const problemsData = JSON.parse(fs.readFileSync(problemsPath, 'utf8'));

      // Insert each problem
      for (const problem of problemsData) {
        await db.query(
          'INSERT INTO problems (title, description, initial_code) VALUES ($1, $2, $3)',
          [problem.title, problem.description, problem.initial_code]
        );
      }
      console.log("Initial problems data inserted.");
    } else {
      console.log("Problems table already populated.");
    }

    console.log("Database initialized successfully.");
  } catch (error) {
    console.error("Error initializing database:", error);
  }
};

module.exports = initDb;
