from pydantic import BaseModel
from typing import Dict, Optional


class PredictionResult(BaseModel):
    """Individual prediction result"""
    label: str
    confidence: float


class PredictionResponse(BaseModel):
    """Response model for prediction endpoint"""
    filename: str
    prediction: str
    confidence: float
    all_predictions: Optional[Dict[str, float]] = None

    class Config:
        schema_extra = {
            "example": {
                "filename": "skin_image.jpg",
                "prediction": "benign",
                "confidence": 0.85,
                "all_predictions": {
                    "benign": 0.85,
                    "precancerous": 0.10,
                    "malignant": 0.05
                }
            }
        }