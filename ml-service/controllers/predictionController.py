"""
This module handles HTTP requests related to predictions.
Responsibilities:
- Receive HTTP request
- Validate using Pydantic (schemas.py)
- Call predictionService
- Return HTTP response

It does NOT contain any ML logic, database code, or direct file loading.
"""

from fastapi import APIRouter, HTTPException
from models.schemas import PredictionRequest, PredictionResponse
from services.predictionService import predict_loan_approval

router = APIRouter()

@router.post("/predict", response_model=PredictionResponse)
async def predict(request: PredictionRequest):
    """
    Endpoint to predict loan approval based on applicant features.
    
    Receives HTTP requests, validates the input using Pydantic models,
    calls the prediction service, and returns a JSON response.
    """
    try:
        # Pass the typed PredictionRequest object directly to the service
        # avoiding generic dictionary conversions here to maintain strong typing
        result = predict_loan_approval(request)
        
        # Return the response formatted via Pydantic model
        return PredictionResponse(**result)
        
    except Exception as e:
        # Catch errors and return an appropriate HTTP response
        raise HTTPException(status_code=500, detail=str(e))
