const db = require('./database');
const fs = require('fs');
const path = require('path');

const initDb = async () => {
  try {
    // Create tables if they do not exist
    await db.query(`
      CREATE TABLE IF NOT EXISTS problems (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        initial_code TEXT NOT NULL
      );
    `);

    // Read problems from JSON file
    const problemsPath = path.join(__dirname, 'problems.json');
    const problemsData = JSON.parse(fs.readFileSync(problemsPath, 'utf8'));

    // Insert each problem if the table is empty
    const { rows } = await db.query('SELECT COUNT(*) FROM problems');
    if (parseInt(rows[0].count, 10) === 0) {
      for (const problem of problemsData) {
        await db.query(
          'INSERT INTO problems (title, description, initial_code) VALUES ($1, $2, $3)',
          [problem.title, problem.description, problem.initial_code]
        );
      }
      console.log("Problems inserted successfully.");
    } else {
      console.log("Problems table already contains data. Skipping insert.");
    }

    console.log("Database initialized successfully.");
  } catch (error) {
    console.error("Error initializing database:", error);
  }
};

initDb();
