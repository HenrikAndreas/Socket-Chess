class Board {
    constructor() {
        this.rows = 8;
        this.columns = 8;
        this.y = [1, 2, 3, 4, 5, 6, 7, 8];
        this.x = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
        this.tileSize = 10;
        this.tiles = [];
        this.num_of_players = 0; // Use this as logic for waiting room
        this.whitePlayer = false;
        this.blackPlayer = false;

        this.selectedTiles = [];
        this.maxSelect = 2;
        this.player = null;
        this.make_squares();
        this.initialize_pieces();
    }

    is_checkmate() {

        var moves = [];
        // Make a move
        // Does move put me in check?
        // If not, add move to list
        // Revert
        
    }

    is_check() {
        var moves = [];
        for (var i = 0; i < this.rows; i++) {
            for (var j = 0; j < this.columns; j++) {
                if (this.tiles[i][j].is_occupied() && this.tiles[i][j].piece.color != this.player.color) {
                    moves.push(this.tiles[i][j].piece.get_moves(true));
                }
            }
        }

        for (var i = 0; i < moves.length; i++) {
            for (var j = 0; j < moves[i].length; j++) {
                var move = moves[i][j];
                if (this.tiles[move[0]][move[1]].is_occupied() && this.tiles[move[0]][move[1]].piece.name == 'king' ){
                    if (this.tiles[move[0]][move[1]].piece.color == this.player.color) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    initialize_pieces() {
        // Once for white and once for black
        var pieces = [
            new Knight(this, 0, 1, 'white'), new Knight(this, 0, 6, 'white'), new Rook(this, 0, 7, 'white'), new Rook(this, 0, 0, 'white'),
            new Bishop(this, 0, 2, 'white'), new Bishop(this, 0, 5, 'white'), new Queen(this, 0, 3, 'white'),new King(this, 0, 4, 'white'),
            new Knight(this, 7, 1, 'black'), new Knight(this, 7, 6, 'black'), new Rook(this, 7, 7, 'black'), new Rook(this, 7, 0, 'black'),
            new Bishop(this, 7, 2, 'black'), new Bishop(this, 7, 5, 'black'), new Queen(this, 7, 3, 'black'), new King(this, 7, 4, 'black'),    
        ];

        for (var i = 0; i < this.rows; i++) {
            pieces.push(new Pawn(this, 1, i, 'white'));
            pieces.push(new Pawn(this, 6, i, 'black'));

        }
        for (var i = 0; i < pieces.length; i++) {
            pieces[i].add_piece_to_board();
        }
    }

    online_set_player(color) {
        if (color == 'white') {
            this.whitePlayer = true;
        } else {
            this.blackPlayer = true;
        }
    }
    set_player(color) {
        this.player = new Player(color);
        socket.emit('set_player', color);
        if (color == 'white') {
            if (this.whitePlayer) {
                console.log("occupied");
                return;
            }
            this.whitePlayer = true;
        } else {
            if (this.blackPlayer) {
                return;
            }
            this.blackPlayer = true;
        }
    }
    add_selected_tile(tile) {
        this.selectedTiles.push(tile);
    }
    remove_selected_tiles() {
        this.selectedTiles = [];
    }
    get_selected_tiles() {
        return this.selectedTiles;
    }
    get_maxSelect() {
        return this.maxSelect;
    }

    move(tiles) {


        if (this.player.turn) {
            this.player.turn = false;
        } else {
            return;
        }
        if (tiles[0].get_piece().get_name() == 'pawn') {
            tiles[0].get_piece().first_move = false;
        }
        tiles[1].add_piece(tiles[0].get_piece());
        tiles[1].get_piece().set_cors(tiles[1].a_cors);
        tiles[0].remove_piece();


        if (this.is_check()) {
            this.player.turn = true;
            if (tiles[1].get_piece().get_name() == 'pawn') {
                tiles[1].get_piece().first_move = true;
            }
            tiles[0].add_piece(tiles[1].get_piece());
            tiles[0].get_piece().set_cors(tiles[0].a_cors);
            tiles[1].remove_piece();

        } else {
            socket.emit('chess_move', {'from' : tiles[0].a_cors, 'to' : tiles[1].a_cors});
        }


    }

    online_move(from, to) {
        this.player.turn = true;
        var from_tile = this.tiles[from[0]][from[1]];
        var to_tile = this.tiles[to[0]][to[1]];
        to_tile.add_piece(from_tile.get_piece());
        to_tile.get_piece().set_cors(to_tile.a_cors);
        from_tile.remove_piece();
    }

    update_color() {
        for (var i = 0; i < this.rows; i++) {
            for (var j = 0; j < this.columns; j++) {
                var tile = this.tiles[i][j];
                if ( (tile == this.selectedTiles[0]) ) {
                    tile.square.style.backgroundColor = "#021174";
                } else {
                    tile.square.style.backgroundColor = tile.color;
                }
            }
        }
    }

    draw_moves(moves_list) {    // List of x,y coordinates that are possible
        for (var i = 0; i < moves_list.length; i++) {
            var cors = moves_list[i];
            this.tiles[cors[0]][cors[1]].color = "#021174";
        }
    }
    reset_draw_moves() {
        var change = false;
        var reverse = false;

        for (var i = 0; i < this.rows; i++) {
            reverse = reverse ? false : true;
            for (var j = 0; j < this.columns; j++) {
                if (!reverse) {
                    var color = change ? '#262626' : 'white';
                    this.tiles[i][j].color = color;
                } else {
                    var color = change ? 'white' : '#262626';

                    this.tiles[i][j].color = color;
                }
                change = change ? false : true;
            }
        }
    }

    make_squares() {
        var change = false;
        var reverse = false;

        for (var i = 0; i < this.rows; i++) {
            reverse = reverse ? false : true;
            this.tiles.push([]);
            for (var j = 0; j < this.columns; j++) {
                // Coordinates
                var x = this.x[j];
                var y = this.y[i];
                if(!reverse) {
                    // CHANGE HERE FOR COLOR 
                    var color = change ? '#262626' : 'white';
                    this.tiles[i].push(new Tile(this, color, x, y, [i, j]));
                } else {
                    var color = change ? 'white' : '#262626';
                    this.tiles[i].push(new Tile(this, color, x, y, [i, j]));
                }
                change = change ? false : true;
            }
        }
    }

    get_tile(x, y) {
        console.log(this.tiles[x][y].cors);
        // return this.tiles[x][y];
    }

    draw_board() {
        let board = document.getElementById("chessBoard");
        // For white player:
        if (player_color == 'white') {
            for (var i = this.rows-1; i >= 0; i--) {
                var row = document.createElement('div');
                row.className = "row";        
                for (var j = 0; j < this.columns; j++) {
                    var square = this.tiles[i][j].get_square(); 
                    row.appendChild(square);
                }
                board.appendChild(row);
            }
        } else {
            for (var i = 0; i < this.rows; i++) {
                    var row = document.createElement('div');
                    row.className = "row";        
                    for (var j = 0; j < this.columns; j++) {
                        var square = this.tiles[i][j].get_square(); 
                        row.appendChild(square);
                    }
                    board.appendChild(row);
                }
        }
    }
}
