const socket = io.connect("127.0.0.1:80");

var board = new Board();
board.draw_board();


socket.on('chess_move', function(cors) {
    var from = cors["from"];
    var to = cors["to"];
    board.online_move(from, to);
});

socket.on('set_player', function(color) {
    board.online_set_player(color);
});