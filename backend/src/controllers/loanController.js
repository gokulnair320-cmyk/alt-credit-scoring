const mongoose = require('mongoose');
const LoanApplication = require('../models/LoanApplication');
const predictionService = require('../services/predictionService');

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

        // Call prediction service
        try {
            const features = {
                revolvingUtilization: loan.revolvingUtilization,
                age: loan.age,
                times30To59DaysLate: loan.times30To59DaysLate,
                debtRatio: loan.debtRatio,
                monthlyIncome: loan.monthlyIncome,
                openCreditLines: loan.openCreditLines,
                times90DaysLate: loan.times90DaysLate,
                realEstateLoans: loan.realEstateLoans,
                times60To89DaysLate: loan.times60To89DaysLate,
                dependents: loan.dependents,
                loanAmount: loan.loanAmount,
                loanPurpose: loan.loanPurpose
            };
            
            const predictionResponse = await predictionService.predictLoan(features);
            console.log("Prediction Response from FastAPI:", predictionResponse);
        } catch (predictionError) {
            console.error("Failed to get prediction from ML service:", predictionError.message);
        }

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

const getMyApplications = async (req, res) => {
    try {
        const userId = req.user.userId;
        const loans = await LoanApplication.find({ applicant: userId });
        
        return res.status(200).json({
            count: loans.length,
            loans
        });
    } catch (error) {
        return res.status(500).json({
            message: "Server error retrieving loan applications"
        });
    }
};

const getLoanById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid loan ID" });
        }

        const loan = await LoanApplication.findById(id);

        if (!loan) {
            return res.status(404).json({ message: "Loan application not found" });
        }

        if (loan.applicant.toString() !== req.user.userId) {
            return res.status(403).json({ message: "Access denied" });
        }

        return res.status(200).json(loan);
    } catch (error) {
        return res.status(500).json({
            message: "Server error retrieving loan application"
        });
    }
};

// Export createLoanApplication, getMyApplications, getLoanById
module.exports = {
    createLoanApplication,
    getMyApplications,
    getLoanById
};
