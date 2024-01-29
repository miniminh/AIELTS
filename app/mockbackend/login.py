from flask import Flask, request, jsonify
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
@app.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')

        # Print the received data (you can replace this with your actual logic)
        print(f"Received username: {username}, password: {password}")

        # You can perform authentication and respond accordingly
        # For simplicity, just sending a success response
        return jsonify({"message": "Hello from backend"}), 200

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": "An error occurred"}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0',port = 5000, debug=True)
