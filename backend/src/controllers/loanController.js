const LoanApplication = require('../models/LoanApplication');

const createLoanApplication = async (req, res) => {
    try {
        // Read applicant ID from the authenticated user
        const applicantId = req.user.userId;

        // Do NOT allow applicant to come from the request body
        // Overwrite applicant property if it was passed in req.body
        const loanData = {
            ...req.body,
            applicant: applicantId
        };

        // Create a new loan application
        const loan = await LoanApplication.create(loanData);

        // Return HTTP 201 Created on success
        return res.status(201).json({
            message: "Loan application created successfully",
            loan
        });
    } catch (error) {
        // Handle Mongoose validation errors
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                message: "Invalid loan application data"
            });
        }

        // Handle unexpected errors
        return res.status(500).json({
            message: "Server error creating loan application"
        });
    }
};

// Export createLoanApplication
module.exports = {
    createLoanApplication
};
