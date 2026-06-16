"""
Prediction Service
Handles the business logic for skin disease prediction.
Coordinates between API layer and ML model.
"""

import logging
from typing import Dict, Any, List
from datetime import datetime
from app.core.model_loader import load_model, is_model_loaded, predict as model_predict

logger = logging.getLogger(__name__)

class PredictionService:
    def __init__(self):
        self.model_loaded = False
        self._predictions: List[Dict[str, Any]] = []
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
            # Store prediction for reporting
            self._predictions.append({
                "timestamp": datetime.utcnow(),
                "filename": filename,
                "prediction": result.get("prediction"),
                "confidence": result.get("confidence"),
                "all_predictions": result.get("all_predictions")
            })
            return result

        except Exception as e:
            logger.error(f"Prediction service error: {str(e)}")
            raise

    def get_all_predictions(self) -> List[Dict[str, Any]]:
        """Return a copy of stored predictions."""
        return list(self._predictions)

    def get_prediction_stats(self) -> Dict[str, Any]:
        """Compute aggregate statistics from stored predictions."""
        total = len(self._predictions)
        if total == 0:
            return {
                "total_predictions": 0,
                "prediction_counts": {},
                "average_confidence": 0.0,
                "earliest_timestamp": None,
                "latest_timestamp": None
            }

        # Count predictions per class
        counts: Dict[str, int] = {}
        confidences = []
        timestamps = []
        for p in self._predictions:
            pred = p.get("prediction")
            if pred:
                counts[pred] = counts.get(pred, 0) + 1
            conf = p.get("confidence")
            if isinstance(conf, (int, float)):
                confidences.append(conf)
            ts = p.get("timestamp")
            if ts:
                timestamps.append(ts)

        avg_conf = sum(confidences) / len(confidences) if confidences else 0.0
        earliest = min(timestamps) if timestamps else None
        latest = max(timestamps) if timestamps else None

        return {
            "total_predictions": total,
            "prediction_counts": counts,
            "average_confidence": round(avg_conf, 4),
            "earliest_timestamp": earliest.isoformat() if earliest else None,
            "latest_timestamp": latest.isoformat() if latest else None
        }

# Global service instance
prediction_service = PredictionService()