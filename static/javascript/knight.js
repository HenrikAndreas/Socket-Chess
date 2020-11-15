class Knight {
    constructor(board, x, y) {
        this.board = board;
        this.y = y;
        this.x = x;
        this.color = 'green';

    }
    add_piece_to_board() {
        this.board.tiles[this.x][this.y].add_piece(this);
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
