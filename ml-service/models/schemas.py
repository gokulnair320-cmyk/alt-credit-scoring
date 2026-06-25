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
    age: int = Field(..., description="Age of the applicant", ge=18, le=100)
    annual_income: float = Field(..., description="Annual income of the applicant")
    employment_status: str = Field(..., description="Employment status (e.g., employed, self-employed, unemployed)")
    credit_score: Optional[int] = Field(None, description="Traditional credit score if available")
    loan_amount: float = Field(..., description="Requested loan amount")
    loan_term_months: int = Field(..., description="Duration of the loan in months")
    debt_to_income_ratio: float = Field(..., description="Debt to income ratio")
    # Add other necessary ML input features here

class PredictionResponse(BaseModel):
    """
    Represents the output from the ML service.
    """
    prediction: int = Field(..., description="Binary prediction (e.g., 1 for approved, 0 for rejected)")
    risk_score: float = Field(..., description="Continuous risk score or probability (0.0 to 1.0)")
