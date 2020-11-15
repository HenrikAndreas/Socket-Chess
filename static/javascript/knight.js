class Knight {
    constructor(board, x, y) {
        this.board = board;
        this.y = y;
        this.x = x;
        this.color = 'green';
        this.name = 'knight';
        this.picture = 'https://github.com/patosai/chess/blob/master/Sprites/whiteKnight.png?raw=true'

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
