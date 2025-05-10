from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app)

USERS_FILE = 'users.json'

# Ensure users file exists
if not os.path.exists(USERS_FILE):
    with open(USERS_FILE, 'w') as f:
        json.dump({}, f)

def load_users():
    with open(USERS_FILE, 'r') as f:
        return json.load(f)

def save_users(users):
    with open(USERS_FILE, 'w') as f:
        json.dump(users, f, indent=2)

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    print("Received data:", data)
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"message": "Email and password required"}), 400

    if len(password) < 8:
        return jsonify({"message": "Password must be at least 8 characters"}), 400

    users = load_users()
    if email in users:
        return jsonify({"message": "User already exists"}), 400

    users[email] = password
    save_users(users)
    print(f"[REGISTER] Registered user: {email}")
    return jsonify({"message": "Registration successful"}), 200

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    print("Received data:", data)
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"message": "Email and password required"}), 400

    users = load_users()
    stored_password = users.get(email)
    print(f"[LOGIN] Attempting login for: {email}")
    print(f"[LOGIN] Provided password: {password}")
    print(f"[LOGIN] Stored password: {stored_password}")

    if stored_password == password:
        return jsonify({"message": "Login successful"}), 200
    else:
        return jsonify({"message": "Invalid credentials"}), 401

if __name__ == '__main__':
    app.run(port=5000)
