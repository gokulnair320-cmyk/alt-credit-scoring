"""
Main application file for the FastAPI ML Service.
Responsibilities:
- Initialize the FastAPI application
- Register HTTP route controllers
- Handle application lifecycle events (like model loading on startup)

Keeps architecture clean by delegating routing and business logic.
"""

from fastapi import FastAPI
from controllers.predictionController import router as prediction_router

# Initialize the FastAPI application
app = FastAPI(
    title="ML Credit Scoring Service",
    description="An independent ML service for loan approval prediction",
    version="1.0.0"
)

# Note: Future model loading logic will go here (e.g., via lifespan events).
# The ML model should be loaded exactly once when the application starts,
# and NOT on every incoming request.

# Register the routes from the controller
app.include_router(prediction_router, prefix="/api/v1")

@app.get("/")
async def root():
    """
    Health check endpoint.
    """
    return {"message": "ML Service is up and running."}

if __name__ == "__main__":
    import uvicorn
    # Run the application using Uvicorn
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)
