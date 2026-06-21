const mongoose = require("mongoose");

const loanApplicationSchema = new mongoose.Schema(
  {
    applicant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    revolvingUtilization: {
      type: Number,
      required: true,
      min: 0,
    },
    age: {
      type: Number,
      required: true,
      min: 18,
      max: 100,
    },
    times30To59DaysLate: {
      type: Number,
      required: true,
      min: 0,
    },
    debtRatio: {
      type: Number,
      required: true,
      min: 0,
    },
    monthlyIncome: {
      type: Number,
      required: true,
      min: 0,
    },
    openCreditLines: {
      type: Number,
      required: true,
      min: 0,
    },
    times90DaysLate: {
      type: Number,
      required: true,
      min: 0,
    },
    realEstateLoans: {
      type: Number,
      required: true,
      min: 0,
    },
    times60To89DaysLate: {
      type: Number,
      required: true,
      min: 0,
    },
    dependents: {
      type: Number,
      required: true,
      min: 0,
      max: 20,
    },
    loanAmount: {
      type: Number,
      required: true,
      min: 1000,
    },
    loanPurpose: {
      type: String,
      required: true,
      enum: [
        "home",
        "education",
        "business",
        "vehicle",
        "medical",
        "personal",
      ],
    },
    status: {
      type: String,
      enum: [
        "submitted",
        "prediction_completed",
        "officer_review_pending",
        "approved",
        "rejected",
      ],
      default: "submitted",
    },
    mlPrediction: {
      prediction: String,
      riskScore: Number,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("LoanApplication", loanApplicationSchema);
