from fastapi import FastAPI, UploadFile, HTTPException, BackgroundTasks, Request
from fastapi.responses import FileResponse, RedirectResponse
from uvicorn import run
from utils import generate_temp_filename
import examiner 
import shutil
import os
import time
import json

app = FastAPI()

@app.get("/")
async def health_check():
    return "Hello, lai la Minh day"

@app.post("/upload/")
async def upload_file(
    user_data: Request
):
    print("Received request")
    
    start = time.time()
    
    filename = generate_temp_filename()
    
    try:
        path = f"uploads/{filename}"
        with open(path, 'w', encoding='utf-8') as f:
            json.dump(await user_data.json(), f, ensure_ascii=False, indent=4)
    except: 
        print("error saving user's data")
    
    
    result = examiner.examine(await user_data.json())
    # f = open(f"uploads/{result}", "r")
    
    time_elapsed = time.time() - start
    return {"result": result, "time_elapsed": time_elapsed}

if __name__ == '__main__':
    os.system("mkdir uploads")
    run('app:app', host='0.0.0.0', port=14023, reload=True)