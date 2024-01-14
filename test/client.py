import requests

url = "localhost:14204/uploadfile/"

payload = {}
files=[
  ('input',('jfk.wav',open('/X:/PROJECT/AIELTS/AIELTS/api/whisper.cpp/samples/jfk.wav','rb'),'audio/wav'))
]
headers = {}

response = requests.request("POST", url, headers=headers, data=payload, files=files)

print(response.text)
