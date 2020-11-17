from flask import Flask, render_template, request
from flask_socketio import SocketIO, emit, send
import os

app = Flask(__name__)
app.config["SECRET_KEY"] = os.urandom(64) # 64 random bytes
socketio = SocketIO(app)

@app.route("/")
def home():
    return render_template('index.html')

@socketio.on('chess_move')
def chess_move(cors):
    emit('chess_move', cors, broadcast=True, include_self=False)

@socketio.on('set_player')
def set_player(color):
    emit('set_player', color, broadcast=True, include_self=False)

if __name__ == "__main__":
    socketio.run(app, host="127.0.0.1", port=80, debug=True)