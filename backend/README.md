# Skin Disease Detection Backend

This is the FastAPI backend for the skin disease detection project.

## Project Structure

```
backend/
├── app/                    # Main application
│   ├── api/                # API routes
│   │   └── v1/             # Versioned API
│   │       └── routes/     # Route definitions
│   ├── core/               # Core configurations & utilities
│   ├── schemas/            # Pydantic models
│   └── services/           # Business logic
├── model/                  # Directory for ML model file (provided by ML team)
├── requirements.txt        # Python dependencies
└── .gitignore              # Git ignore rules
```

## Setup Instructions

1. **Create a virtual environment** (recommended):
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

3. **Place the ML model**:
   - The ML team should place the trained model file in the `backend/model/` directory
   - Supported formats depend on the ML implementation (e.g., .pth, .h5, .pkl)

4. **Update model loader**:
   - The ML team needs to implement the actual model loading and prediction logic in:
     `backend/app/core/model_loader.py`

## Running the Application

```bash
# Development mode with auto-reload
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload

# Production mode
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

## API Endpoints

- `GET /` - Root endpoint with welcome message
- `GET /health` - Health check endpoint
- `POST /api/v1/predict` - Upload image for skin disease prediction
  - Accepts: multipart/form-data with file field
  - Returns: JSON with prediction results

## Model Integration

The backend provides a stub interface for the ML model in `app/core/model_loader.py`:
- `load_model()` - Load the model from disk
- `predict(image_data, filename)` - Make prediction on image data

The ML team should replace the stub implementation with their actual model code.

## Dependencies

- FastAPI: Web framework
- Uvicorn: ASGI server
- Python-multipart: Handle file uploads
- Pydantic: Data validation
- Pillow: Image processing (if needed for preprocessing)

## Notes

- CORS is configured to allow all origins (`*`) for development. In production, restrict to specific origins.
- Error handling is implemented with appropriate HTTP status codes.
- The service is designed to be easily testable and maintainable.