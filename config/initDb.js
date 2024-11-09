// // config/initDb.js
// const db = require('./database');

// const initDb = async () => {
//   try {
//     await db.query(`
//       CREATE TABLE IF NOT EXISTS problems (
//         id SERIAL PRIMARY KEY,
//         title VARCHAR(255) NOT NULL,
//         description TEXT NOT NULL
//       );

//       CREATE TABLE IF NOT EXISTS leaderboard (
//         id SERIAL PRIMARY KEY,
//         wallet_address VARCHAR(42) NOT NULL,
//         problems_solved INT DEFAULT 0
//       );
//     `);

//     console.log("Database initialized successfully.");
//   } catch (error) {
//     console.error("Error initializing database:", error);
//   }
// };

// initDb();
