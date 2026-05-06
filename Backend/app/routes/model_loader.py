import os
import gdown

MODEL_DIR = "models"

FILES = {
    "eurosat_model.keras": "1eD9unL6Y_gFaJrIFt6I9_83FfD0TIM86",
    "transferlearnig_model.keras": "1VW8rDY_LsPuvqli139zpKudmut5VoKyU",
    "class_names.json": "1H0k3nzu3i5sIp5_oJwknH-l6oB_-4ODs"
}

def download_if_needed(filename):
    os.makedirs(MODEL_DIR, exist_ok=True)

    path = os.path.join(MODEL_DIR, filename)

    if not os.path.exists(path):
        file_id = FILES[filename]

        url = f"https://drive.google.com/uc?id={file_id}"

        print(f"Downloading {filename}...")

        gdown.download(url, path, quiet=False)

    return path