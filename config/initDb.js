const db = require('./database');

const initDb = async () => {
    try {
        await db.query(`
            CREATE TABLE IF NOT EXISTS problems (
                id SERIAL PRIMARY KEY,
                title TEXT UNIQUE NOT NULL,
                status TEXT,
                topics TEXT[],
                companies TEXT[],
                description TEXT,
                examples JSONB,
                constraints TEXT[],
                follow_up TEXT,
                hints TEXT[],
                solidity_template TEXT,
                sol_file TEXT,
                t_sol_file TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log('Database initialized successfully.');
    } catch (err) {
        console.error('Error initializing database:', err);
        throw err;
    }
};

module.exports = initDb;
