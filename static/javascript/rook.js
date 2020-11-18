class Rook {
    constructor(board, x, y, color) {
        this.board = board;
        this.y = y;
        this.x = x;
        this.color = color;
        this.name = 'rook';
        if (this.color == 'white') {
            this.picture = 'https://raw.githubusercontent.com/patosai/chess/master/Sprites/whiteRook.png';
        } else {
            this.picture = 'https://raw.githubusercontent.com/patosai/chess/master/Sprites/blackRook.png';
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

    get_moves() {
        var moves = [];
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

        return moves;
    }


}
