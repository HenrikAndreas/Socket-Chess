class Bishop {
    constructor(board, x, y, color) {
        this.board = board;
        this.y = y;
        this.x = x;
        this.color = color;
        this.name = 'bishop';
        if (this.color == 'white') {
            this.picture = 'https://raw.githubusercontent.com/patosai/chess/master/Sprites/whiteBishop.png';
        } else {
            this.picture = 'https://raw.githubusercontent.com/patosai/chess/master/Sprites/blackBishop.png';
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

    

        return moves;
    }


}
