from fastapi import FastAPI, File, UploadFile, HTTPException
from werkzeug.utils import secure_filename
import os

app = FastAPI()

UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'mp3', 'caf', 'cat', 'wav'}  # Adjust based on your audio format
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS
@app.post("/upload_audio")
async def upload_audio(audio: UploadFile = File(...)):
    try:
        if not audio:
            raise HTTPException(status_code=400, detail="No audio file provided")

        filename = secure_filename(audio.filename)

        if not allowed_file(filename):
            raise HTTPException(status_code=400, detail="Invalid file format")

        file_path = os.path.join(UPLOAD_FOLDER, filename)

        with open(file_path, 'wb') as f:
            f.write(audio.file.read())

        # Print the received data
        print('File saved at:', file_path)

        # Modify this part to send a response to the frontend
        return {'message': 'Audio file uploaded successfully', 'score': 9}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == '__main__':
    if not os.path.exists(UPLOAD_FOLDER):
        os.makedirs(UPLOAD_FOLDER)
    import uvicorn
    uvicorn.run(app, host='0.0.0.0', port=8082)
