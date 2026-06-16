from fastapi import APIRouter, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
from app.services.prediction_service import prediction_service
from app.schemas.prediction import PredictionResponse
import logging

logger = logging.getLogger(__name__)

router = APIRouter()

@router.post("/predict", response_model=PredictionResponse)
async def predict_skin_disease(image: UploadFile = File(...)):
    """
    Predict skin disease from uploaded image
    """
    # Validate file type
    if not image.content_type.startswith('image/'):
        raise HTTPException(status_code=400, detail="File must be an image")

    try:
        # Read file contents
        contents = await image.read()

        # Call prediction service
        result = await prediction_service.predict(contents, image.filename)

        return JSONResponse(content=result)

    except Exception as e:
        logger.error(f"Error processing image: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")