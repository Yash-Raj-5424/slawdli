from fastapi import FastAPI, File, UploadFile, HTTPException
try:
    from fastapi.middleware.cors import CORSMiddleware
except Exception:
    # Fallback if fastapi.middleware.cors isn't available in the environment
    from starlette.middleware.cors import CORSMiddleware
from app.api.v1.routes import prediction
from app.api.v1.routes.auth import router as auth_router
app = FastAPI(
    title="Skin Disease Detection API",
    description="API for detecting skin diseases from images",
    version="1.0.0"
)

# CORS middleware configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/predict", tags=["prediction"])
async def predict(image: UploadFile = File(...)):
    try:
        contents = await image.read()
        with open("temp.jpg", "wb") as f:
            f.write(contents)
        result = prediction.predict_image("temp.jpg")
        return {"prediction": result}
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc))

# Include routers
app.include_router(auth_router, prefix="/api/v1")
app.include_router(prediction.router, prefix="/api/v1", tags=["prediction"])

@app.get("/")
async def root():
    return {"message": "Skin Disease Detection API is running"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}
