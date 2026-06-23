const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { createLoanApplication, getMyApplications, getLoanById } = require('../controllers/loanController');

// POST /
router.post('/', authMiddleware, createLoanApplication);

// GET /my-applications
router.get('/my-applications', authMiddleware, getMyApplications);

// GET /:id
router.get('/:id', authMiddleware, getLoanById);

module.exports = router;
