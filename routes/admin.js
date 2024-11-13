// routes/admin.js
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const db = require('../config/database');

// Route for updating problems
router.get('/', (req, res) => {
    res.render('admin', { title: 'Admin Page' });
});

router.post('/update-problems', async (req, res) => {
    const dataDir = path.join(__dirname, '../data');
    try {
        const files = fs.readdirSync(dataDir);
        const problems = {};

        // Group files by problem name
        files.forEach((file) => {
            const ext = path.extname(file);
            const baseName = path.basename(file, ext);

            if (!problems[baseName]) problems[baseName] = {};
            problems[baseName][ext] = file;
        });

        // Insert or update problems in the database
        for (const [name, files] of Object.entries(problems)) {
            const jsonFile = files['.json'];
            const solFile = files['.sol'];
            const tSolFile = files['.t.sol'];

            if (jsonFile) {
                const jsonData = JSON.parse(
                    fs.readFileSync(path.join(dataDir, jsonFile), 'utf-8')
                );

                // Upsert to the database
                await db.query(
                    `INSERT INTO problems (name, description, solution_file, test_file)
                     VALUES ($1, $2, $3, $4)
                     ON CONFLICT (name) DO UPDATE SET
                     description = $2,
                     solution_file = $3,
                     test_file = $4`,
                    [name, jsonData.description, solFile, tSolFile]
                );
            }
        }

        res.status(200).send('Problems updated successfully.');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error updating problems.');
    }
});

module.exports = router;
