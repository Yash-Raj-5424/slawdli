from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1.routes import prediction

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

# Include routers
app.include_router(prediction.router, prefix="/api/v1", tags=["prediction"])

@app.get("/")
async def root():
    return {"message": "Skin Disease Detection API is running"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}