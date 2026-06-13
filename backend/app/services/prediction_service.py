"""
Prediction Service
Handles the business logic for skin disease prediction.
Coordinates between API layer and ML model.
"""

import logging
from typing import Dict, Any
from app.core.model_loader import load_model, is_model_loaded, predict as model_predict

logger = logging.getLogger(__name__)

class PredictionService:
    def __init__(self):
        self.model_loaded = False
        self._initialize_model()

    def _initialize_model(self):
        """Initialize/load the ML model"""
        try:
            self.model_loaded = load_model()
            if self.model_loaded:
                logger.info("Model loaded successfully")
            else:
                logger.warning("Failed to load model during initialization")
        except Exception as e:
            logger.error(f"Error initializing model: {str(e)}")
            self.model_loaded = False

    async def predict(self, image_data: bytes, filename: str) -> Dict[str, Any]:
        """
        Process image and return prediction

        Args:
            image_data: Raw image bytes
            filename: Original filename

        Returns:
            Dictionary with prediction results
        """
        if not is_model_loaded():
            # Try to load model if not already loaded
            self._initialize_model()
            if not is_model_loaded():
                raise RuntimeError("Model is not available")

        try:
            # Call the model prediction function
            result = model_predict(image_data, filename)
            return result

        except Exception as e:
            logger.error(f"Prediction service error: {str(e)}")
            raise

# Global service instance
prediction_service = PredictionService()