import requests

url = "http://localhost:14024/uploadfile/"

payload = {}
files=[
  ('input',('tester.wav',open('tester.mp3','rb'),'audio/wav'))
]
headers = {}

response = requests.request("POST", url, headers=headers, data=payload, files=files)

print(response.text)
