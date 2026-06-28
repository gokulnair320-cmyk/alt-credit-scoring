"""
This module contains Pydantic schemas for data validation and documentation.
It defines the strict structure for incoming requests and outgoing responses.
By separating schemas from ML logic, we maintain a clean architecture.
"""
from pydantic import BaseModel, Field
from typing import Optional

class PredictionRequest(BaseModel):
    """
    Represents the input features required by the ML model.
    Only includes fields necessary for prediction.
    """
    revolvingUtilization: float = Field(..., description="Revolving utilization")
    age: int = Field(..., description="Age of the applicant", ge=18, le=100)
    times30To59DaysLate: int = Field(..., description="Times 30 to 59 days late")
    debtRatio: float = Field(..., description="Debt to income ratio")
    monthlyIncome: float = Field(..., description="Monthly income")
    openCreditLines: int = Field(..., description="Number of open credit lines")
    times90DaysLate: int = Field(..., description="Times 90 days late")
    realEstateLoans: int = Field(..., description="Number of real estate loans")
    times60To89DaysLate: int = Field(..., description="Times 60 to 89 days late")
    dependents: int = Field(..., description="Number of dependents")
    loanAmount: float = Field(..., description="Requested loan amount")
    loanPurpose: str = Field(..., description="Purpose of the loan")

class PredictionResponse(BaseModel):
    """
    Represents the output from the ML service.
    """
    prediction: int = Field(..., description="Binary prediction (e.g., 1 for approved, 0 for rejected)")
    risk_score: float = Field(..., description="Continuous risk score or probability (0.0 to 1.0)")
