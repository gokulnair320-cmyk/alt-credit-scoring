const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { createLoanApplication } = require('../controllers/loanController');

// POST /
router.post('/', authMiddleware, createLoanApplication);

module.exports = router;
