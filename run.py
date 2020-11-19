from flask import Flask, render_template, request, redirect, url_for
from flask_socketio import SocketIO, emit, send
import os

app = Flask(__name__)
app.config["SECRET_KEY"] = os.urandom(32) # 64 random bytes
socketio = SocketIO(app)

users = {}

@app.route('/full')
def full():
    return "Server is full"

@app.route("/")
def home():
    if  (len(users) == 2):
        return redirect(url_for('full'))
    return render_template('index.html')

@socketio.on('chess_move')
def chess_move(cors):
    emit('chess_move', cors, broadcast=True, include_self=False)

@socketio.on('set_player')
def set_player(color):
    emit('set_player', color, broadcast=True, include_self=False)

@socketio.on('verify_play')
def verify_play():
    allow = True
    for id in users:
        if len(users[id]) == 0:
            allow = False
    emit('verify_play', allow, broadcast=True, include_self=True)



@socketio.on('connect')
def init_connect():
    users[request.sid] = []
    emit('add_user', users, broadcast=True)

@socketio.on('disconnect_user')
def disconnet_user():
    if (request.sid in users):
        del users[request.sid]
    emit('remove_user', request.sid)

# COLOR CHECKING
@socketio.on('verify_color')
def verify_color(color):
    for user in users:
        if (user != request.sid):
            if (len(users[user]) == 1): #If length is 0, no colors have been chosen
                if (users[user][0] == color):
                    emit('color_verification', {'verified' : False})
                    return;
    emit('color_verification', {'verified' : True, 'color' : color})

@socketio.on('color_selected')
def color_selected(color):
    users[request.sid].append(color);
    emit('color_selection', users, broadcast=True, include_self=True);

@socketio.on('de_select_color')
def de_selection(color):
    users[request.sid].remove(color)

if __name__ == "__main__":
    socketio.run(app, host="127.0.0.1", port=80, debug=True)
