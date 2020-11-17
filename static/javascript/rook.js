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
            moves.push([i, this.y]);
            if (this.board.tiles[i][this.y].is_occupied()) {
                break;  
            }
        }
        for (var j = this.x - 1; j >= 0; j--) {
            moves.push([j, this.y]);
            if (this.board.tiles[j][this.y].is_occupied()) {
                break;  
            }
        }
        for (var k = this.y - 1; k >= 0; k--) {
            moves.push([this.x, k]);
            if (this.board.tiles[this.x][k].is_occupied()) {
                break;  
            }
        }
        for (var l = this.y + 1; l < this.board.columns; l++) {
            moves.push([this.x, l]);
            if (this.board.tiles[this.x][l].is_occupied()) {
                break;  
            }
        }

        return moves;
    }


}
