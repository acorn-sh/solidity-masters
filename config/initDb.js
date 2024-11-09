const db = require('./database');
const fs = require('fs');
const path = require('path');

const initDb = async () => {
  try {
    console.log("Initializing database...");
    
    // Create the table if it doesn't exist
    await db.query(`
      CREATE TABLE IF NOT EXISTS problems (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        initial_code TEXT NOT NULL
      );
    `);
    console.log("Table creation checked.");

    // Check if the table is empty
    const { rows } = await db.query('SELECT COUNT(*) FROM problems');
    console.log("Row count:", rows[0].count);

    if (parseInt(rows[0].count, 10) === 0) {
      console.log("Table is empty, inserting data...");
      
      // Read problems data from JSON with a fallback check
      const problemsPath = path.join(__dirname, 'files/problems.json');
      if (!fs.existsSync(problemsPath)) {
        console.error("Error: problems.json file not found at", problemsPath);
        return;
      }
      
      const problemsData = JSON.parse(fs.readFileSync(problemsPath, 'utf8'));

      // Insert each problem from JSON into the database
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
