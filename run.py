from flask import Flask, render_template, request
from flask_socketio import SocketIO, emit, send
import os

app = Flask(__name__)
app.config["SECRET_KEY"] = os.urandom(64) # 64 random bytes
socketio = SocketIO(app)

@app.route("/")
def home():
    return render_template('index.html')

if __name__ == "__main__":
    socketio.run(app, host="10.0.0.40", port=80, debug=True)