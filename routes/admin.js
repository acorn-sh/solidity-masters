const express = require('express');
const router = express.Router();
const updateProblems = require('../server/updateProblems');

// Endpoint to update problems
router.post('/update-problems', async (req, res) => {
    try {
        await updateProblems(); // Trigger the process to update problems
        res.status(200).send('Problems updated successfully.');
    } catch (err) {
        console.error('Error updating problems:', err);
        res.status(500).send('Error updating problems.');
    }
});

module.exports = router;
