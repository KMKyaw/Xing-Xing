import os
from yt_dlp import YoutubeDL
import subprocess
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import whisper
import torch

app = FastAPI()

class URLRequest(BaseModel):
    url: str

def download_audio(url, output_filename='downloaded_audio'):
    output_path = os.path.abspath(output_filename)
    ydl_opts = {
        'format': 'bestaudio/best',
        'outtmpl': output_path,
        'postprocessors': [{
            'key': 'FFmpegExtractAudio',
            'preferredcodec': 'mp3',
            'preferredquality': '192',
        }],
        'quiet': True,
        'no_warnings': True,
    }
    with YoutubeDL(ydl_opts) as ydl:
        ydl.download([url])
    return output_path + ".mp3"

def separate_sources(audio_path, output_dir='separated'):
    audio_path = os.path.abspath(audio_path)
    output_dir = os.path.abspath(output_dir)
    os.makedirs(output_dir, exist_ok=True)
    command = [
        'demucs',
        audio_path,
        '--out', output_dir,
        '--two-stems', 'vocals'
    ]
    subprocess.run(command, check=True)

@app.post("/process")
def process_audio(request: URLRequest):
    try:
        audio_file = download_audio(request.url)
        separate_sources(audio_file)
        # Force to CPU to avoid MPS sparse tensor issues
        device = "cpu"
        # print(f"Using device: {device}")

        model = whisper.load_model("base", device=device)
        result = model.transcribe("./separated/htdemucs/downloaded_audio/vocals.wav", language="zh") 
        # print(result["text"])
        return {"message": "Processing complete", "lyric": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))