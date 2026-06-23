const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { createLoanApplication, getMyApplications } = require('../controllers/loanController');

// POST /
router.post('/', authMiddleware, createLoanApplication);

// GET /my-applications
router.get('/my-applications', authMiddleware, getMyApplications);

module.exports = router;
