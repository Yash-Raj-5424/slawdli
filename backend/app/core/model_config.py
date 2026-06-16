from pathlib import Path

MODEL_DIR = Path(__file__).resolve().parents[2] / "model"
MODEL_PATH = MODEL_DIR / "skin_lesion_training_model.keras"

IMG_SIZE = 300
CLASS_LABELS = ["benign", "precancerous", "malignant"]
