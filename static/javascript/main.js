const socket = io.connect("127.0.0.1:5000");
var player_color = null;
var online_users = {};
var board;


function setColor(color) {
    if (player_color == null) {
        socket.emit('verify_color', color)
    } else {
        if (player_color == color) {
            // De-select color
            player_color = null;
            socket.emit('de_select_color', color)
            document.getElementById(color).style.backgroundColor = 'black';
            document.getElementById('message').innerHTML = "";

        }
    }

}
function select_color(color) {
    player_color = color;

    document.getElementById('message').innerHTML = "You have selected " + color;
    document.getElementById(color).style.backgroundColor = 'blue';
    socket.emit('color_selected', color); // CHECK HERE LATER
}

function play_game() {
    socket.emit('verify_play');
}
function play() {
    document.getElementById('lobby').style.visibility = "hidden";
    document.getElementById('chessBoard').style.visibility = "visible";

    board = new Board();
    board.draw_board();
    board.player = player_color;
    board.set_player(player_color);
}

socket.on('color_verification', function(data) {
    verified = data['verified']
    if(verified == 0) {
        document.getElementById('message').innerHTML = "This side is occupied";
    } else {
        color = data['color']
        select_color(color);
    }
});

socket.on('color_selection', function(users){
    online_users = users;
});

socket.on('add_user', function(users) {
    online_users = users;
    document.getElementById('users').innerHTML = "";

    for (var id in users) {
        var user = document.createElement('p');
        user.innerHTML = id;
        document.getElementById('users').appendChild(user);
   
    }
});

socket.on('verify_play', function(allow) {
    if(allow) {
        play();
    } else {
        document.getElementById('message').innerHTML = "All players must choose side!";
    }
});

socket.on('chess_move', function(cors) {
    var from = cors["from"];
    var to = cors["to"];
    board.online_move(from, to);
});
socket.on('false_move', function(cors){
    var from = cors["to"];
    var to = cors["from"];
    // Reverting it, because this means the client used JS Console to move a piece illegally
    board.online_move(from, to);
});
socket.on('set_player', function(color) {
    board.online_set_player(color);
});

socket.on('remove_user', function(users) {
    online_users = users;
    document.getElementById('users').innerHTML = "";

    for (var id in users) {
        var user = document.createElement('p');
        user.innerHTML = id;
        document.getElementById('users').appendChild(user); 
    }

});

window.onbeforeunload = function() {
    socket.emit('disconnect_user');

}

//TODO_ Make a function for updating lobby-text