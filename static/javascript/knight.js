class Knight {
    constructor(board, x, y, color) {
        this.board = board;
        this.y = y;
        this.x = x;
        this.color = color;
        this.name = 'knight';
        if (this.color == 'white') {
            // Lagre egne bilder på github
            this.picture = 'https://github.com/patosai/chess/blob/master/Sprites/whiteKnight.png?raw=true';
        } else {
            this.picture = 'https://raw.githubusercontent.com/patosai/chess/master/Sprites/blackKnight.png';
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
        
        if(this.x-1 >= 0) {
            if (this.y+2 <= 7) {
                moves.push([this.x-1, this.y+2]);
            }
            if (this.y-2 >= 0) {
                moves.push([this.x-1, this.y-2]);
            }
        }
        if (this.x-2 >= 0) {
            if (this.y-1 >= 0) {
                moves.push([this.x-2, this.y-1]);
            }
            if (this.y+1 <= 7) {
                moves.push([this.x-2, this.y+1]);
            }
        } 
        if (this.x+1 <= 7) {
            if (this.y+2 <= 7) {
                moves.push([this.x+1, this.y+2]);
            }
            if (this.y-2 >= 0) {
                moves.push([this.x+1, this.y-2]);
            } 
        }
        if (this.x+2 <= 7) {
            if (this.y+1 <= 7) {
                moves.push([this.x+2, this.y+1]);
            }
            if (this.y-1 >= 0) {
                moves.push([this.x+2, this.y-1]);
            }
        }
        return moves;
    }

}
