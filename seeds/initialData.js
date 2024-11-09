const db = require('../config/database');

async function seedProblems() {
  const problemsExist = await db.query('SELECT COUNT(*) FROM problems');
  if (parseInt(problemsExist.rows[0].count) === 0) {
    await db.query(`
      INSERT INTO problems (title, description) VALUES 
      ('Token Transfer', 'Implement a token transfer function...'),
      ('Allowance', 'Implement an allowance function...'),
      ('Time-Lock', 'Implement a time-lock contract...');
    `);
  }
}

seedProblems().then(() => db.end());

