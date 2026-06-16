from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1.routes import prediction
from app.api.v1.routes.auth import router as auth_router
from app.api.v1.routes.reports import router as reports_router

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
app.include_router(auth_router, prefix="/api/v1")
app.include_router(prediction.router, prefix="/api/v1", tags=["prediction"])
app.include_router(reports_router, prefix="/api/v1", tags=["reports"])

@app.get("/")
async def root():
    return {"message": "Skin Disease Detection API is running"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}
