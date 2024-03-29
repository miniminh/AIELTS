import os

async def transcribe(path, filename):
    print(path)
    os.system(f"ffmpeg -i {path} -ar 16000 -ac 1 -c:a pcm_s16le {path}_output.wav")
    os.system(f"whisper.cpp/main -m whisper.cpp/models/ggml-tiny.en.bin -f {path}_output.wav -otxt -p 8")
    return f"{filename}_output.wav.txt"