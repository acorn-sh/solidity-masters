const express = require('express');
const router = express.Router();
const db = require('../config/database'); // Make sure this path matches your setup

// Render the main index page
router.get('/', (req, res) => {
    res.render('index');
});

// Route to get all problems
router.get('/api/problems', async (req, res) => {
    try {
        const result = await db.query('SELECT id, title, description, initial_code FROM problems');
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching problems:', error);
        res.status(500).json({ error: 'Failed to fetch problems' });
    }
});

// Route to get a specific problem by ID
router.get('/api/problems/:id', async (req, res) => {
    const problemId = req.params.id;
    try {
        const result = await db.query('SELECT title, description, initial_code FROM problems WHERE id = $1', [problemId]);
        if (result.rows.length > 0) {
            res.json(result.rows[0]);
        } else {
            res.status(404).json({ error: 'Problem not found' });
        }
    } catch (error) {
        console.error('Error fetching problem:', error);
        res.status(500).json({ error: 'Failed to fetch problem' });
    }
});

module.exports = router;
