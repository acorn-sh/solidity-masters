// routes/leaderboard.js
const express = require('express');
const db = require('../config/database');
const router = express.Router();

// Update leaderboard
router.post('/', async (req, res) => {
  const { wallet_address, problems_solved } = req.body;
  await db.query(
    `INSERT INTO leaderboard (wallet_address, problems_solved) 
     VALUES ($1, $2) 
     ON CONFLICT (wallet_address) 
     DO UPDATE SET problems_solved = leaderboard.problems_solved + $2`,
    [wallet_address, problems_solved]
  );
  res.status(200).json({ success: true });
});

module.exports = router;
