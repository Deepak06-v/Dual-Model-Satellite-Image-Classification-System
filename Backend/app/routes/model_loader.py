import os
from huggingface_hub import hf_hub_download

def download_model(filename):
    # Get token from environment variable
    token = os.getenv("HF_TOKEN")
    
    return hf_hub_download(
        repo_id="Deepak-6/eurosat-model",
        filename=filename,
        token=token  # Pass the token here
    )