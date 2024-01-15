from fastapi import FastAPI, UploadFile, HTTPException, BackgroundTasks
from fastapi.responses import FileResponse, RedirectResponse
from uvicorn import run
from utils import generate_temp_filename
import whisper
import shutil
import os
import time

app = FastAPI()

@app.get("/")
async def health_check():
    return "Hello, lai la Minh day"

@app.post("/uploadfile/")
async def upload_file(
    input: UploadFile,
):
    print("Received request")
    
    start = time.time()
    
    filename = generate_temp_filename()
    input.file.seek(0, 2)
    file_size = input.file.tell()

    # move the cursor back to the beginning
    await input.seek(0)
    
    if not input.filename.lower().endswith(('.mp3', '.wav', '.m4a')):
        raise HTTPException(status_code=403, detail="Invalid format") 
    elif file_size > 10 * 1024 * 1024:
        raise HTTPException(status_code=400, detail="File too large")
    else:
        try:
            path = f"uploads/{filename}"
            with open(path, "wb+") as tmp:
                shutil.copyfileobj(input.file, tmp)
        finally:    
            input.file.close()
        
        result = await whisper.transcribe(path, filename)
        f = open(f"uploads/{result}", "r")
        transcribe = f.read()
        time_elapsed = time.time() - start
        return {"transcribe": transcribe, "time_elapsed": time_elapsed}

if __name__ == '__main__':
    os.system("mkdir uploads")
    os.system("sed -i 's/\r$//' whisper.cpp/models/download-ggml-model.sh")
    os.system("bash whisper.cpp/models/download-ggml-model.sh tiny.en")
    os.system("cd whisper.cpp/models && python convert-whisper-to-openvino.py --model base.en")
    os.system("cd whisper.cpp && cmake -B build -DWHISPER_OPENVINO=1 && cmake --build build -j --config Release")
    run('app:app', host='0.0.0.0', port=14024, reload=True)