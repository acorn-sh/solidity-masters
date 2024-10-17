const express = require('express');
const router = express.Router();

// Route for the storage project page
router.get('/quick-start', (req, res) => {
    res.render('pages/quick-start', { 
        title: 'Acorn SH - quick start', 
        description: 'Install in 3 simple steps'
    });
});

module.exports = router;