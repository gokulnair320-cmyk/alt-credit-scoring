"""
This module handles the core ML inference and business logic.
Responsibilities:
- Receive validated input (PredictionRequest object)
- Call preprocessing utility
- Run inference using an already-loaded model instance
- Return prediction results

It does NOT contain HTTP handling, file loading, FastAPI-specific code, or DB logic.
"""

from models.schemas import PredictionRequest
from utils.preprocessing import preprocess_features

def predict_loan_approval(request: PredictionRequest) -> dict:
    """
    Perform ML inference to determine loan approval and risk score.
    
    Args:
        request (PredictionRequest): The validated input features as a strongly-typed object.
        
    Returns:
        dict: A dictionary containing the 'prediction' and 'risk_score'.
    """
    # Step 1: Preprocess the input features
    # Passing the typed request object instead of a raw dictionary
    processed_features = preprocess_features(request)
    
    # Step 2: Run inference using an already-loaded model
    # Note: The trained XGBoost model is NOT loaded here. 
    # It should be loaded once at FastAPI startup to avoid latency on every request.
    # Future Plan: A utility like 'modelLoader.py' will be responsible for loading 
    # the model.pkl, scalers, and encoders. This service will just use the initialized instances.
    
    # TODO: prediction = loaded_model.predict(processed_features)
    # TODO: probabilities = loaded_model.predict_proba(processed_features)
    
    # Placeholder response
    dummy_prediction = 1
    dummy_risk_score = 0.85
    
    return {
        "prediction": dummy_prediction,
        "risk_score": dummy_risk_score
    }
