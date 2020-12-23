class Queen {
    constructor(board,  x, y, color) {
        this.board = board;
        this.y = y;
        this.x = x;
        this.color = color;
        this.name = 'queen';
        if (this.color == 'white') {
            this.picture = 'https://raw.githubusercontent.com/patosai/chess/master/Sprites/whiteQueen.png';
        } else {
            this.picture = 'https://raw.githubusercontent.com/patosai/chess/master/Sprites/blackQueen.png';
        }
    }
    get_name() {
        return this.name;
    }
    add_piece_to_board() {
        this.board.tiles[this.x][this.y].add_piece(this);
    }
    set_cors(cors) {
        this.x = cors[0];
        this.y = cors[1];
    }

    get_moves(mode_change) {
        mode_change = mode_change || false;
        
        if (mode_change == true) {
            var color = this.board.player.color;
            this.board.player.color = (this.board.player.color == 'black') ? 'white' : 'black';
        }
        var moves = [];

        // --- START DIAGONAL MOVES ---
        var i = this.y + 1;
        var j = this.x + 1;
        while ((i < this.board.rows) && (j < this.board.columns)) {
            if (this.board.tiles[j][i].is_occupied()) {
                if (this.board.tiles[j][i].piece.color == this.board.player.color) {
                    break;
                } else {
                    moves.push([j, i]);
                    break;
                }
            }
            moves.push([j, i]);
            i++; j++;
        }
        
        var i = this.y - 1;
        var j = this.x - 1;
        while ((i >= 0) && (j >= 0)) {
            if (this.board.tiles[j][i].is_occupied()) {
                if (this.board.tiles[j][i].piece.color == this.board.player.color) {
                    break;
                } else {
                    moves.push([j, i]);
                    break;
                }
            }
            moves.push([j, i]);
            i--; j--;
        }
        
        var i = this.y + 1;
        var j = this.x - 1;
        while ((i < this.board.rows) && (j >= 0)) {
            if (this.board.tiles[j][i].is_occupied()) {
                if (this.board.tiles[j][i].piece.color == this.board.player.color) {
                    break;
                } else {
                    moves.push([j, i]);
                    break;
                }
            }
            moves.push([j, i]);
            i++; j--;
        }

        var i = this.y - 1;
        var j = this.x + 1;
        while((i >= 0) && (j < this.board.columns)) {
            if (this.board.tiles[j][i].is_occupied()) {
                if (this.board.tiles[j][i].piece.color == this.board.player.color) {
                    break;
                } else {
                    moves.push([j, i]);
                    break;
                }
            }
            moves.push([j, i]);

            i--; j++;
        }
        // --- END DIAGONAL MOVES ---

        // --- START CROSS MOVES ---
        // Make list of possible elements and loop over to check if possible
        // -Sergey's Ide
        for (var i = this.x+1; i < this.board.rows; i++) {
            if (this.board.tiles[i][this.y].is_occupied()) {
                if (this.board.tiles[i][this.y].piece.color == this.board.player.color) {
                    break;
                } else {
                    moves.push([i, this.y]);
                    break;  
                }
            }
            moves.push([i, this.y]);
        }
        for (var j = this.x - 1; j >= 0; j--) {
            if (this.board.tiles[j][this.y].is_occupied()) {
                if (this.board.tiles[j][this.y].piece.color == this.board.player.color) {
                    break;
                } else {
                    moves.push([j, this.y]);
                    break;  
                }
            }
            moves.push([j, this.y]);
        }
        for (var k = this.y - 1; k >= 0; k--) {
            if (this.board.tiles[this.x][k].is_occupied()) {
                if (this.board.tiles[this.x][k].piece.color == this.board.player.color) {
                    break;
                } else {
                    moves.push([this.x, k]);
                    break;
                }
            }
            moves.push([this.x, k]);
        }
        for (var l = this.y + 1; l < this.board.columns; l++) {
            if (this.board.tiles[this.x][l].is_occupied()) {
                if (this.board.tiles[this.x][l].piece.color == this.board.player.color) {
                    break;
                } else {
                    moves.push([this.x, l]);
                    break;  
                }
            }
            moves.push([this.x, l]);
        }
        // --- END CROSS MOVES ---
        if (mode_change) {
            this.board.player.color = color;
        }        
        return moves;
    }
}