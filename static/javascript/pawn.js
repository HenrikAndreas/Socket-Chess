class Pawn {
    constructor(board, x, y, color) {
        this.board = board;
        this.first_move = true;
        this.y = y;
        this.x = x;
        this.color = color;
        this.name = 'pawn';
        if (this.color == 'white') {
            this.picture = 'https://raw.githubusercontent.com/patosai/chess/master/Sprites/whitePawn.png';
        } else {
            this.picture = 'https://raw.githubusercontent.com/patosai/chess/master/Sprites/blackPawn.png';
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
        var in_front = false;

        if (this.first_move == true) {
            if (this.color == 'white') {
                if (! this.board.tiles[this.x+1][this.y].is_occupied()) {
                    moves.push([this.x+1, this.y]);
                    in_front = true;
                }
                if (!this.board.tiles[this.x+2][this.y].is_occupied() && in_front) {
                    moves.push([this.x+2, this.y]);            
                }
            } else {
                if (! this.board.tiles[this.x-1][this.y].is_occupied()) {
                    moves.push([this.x-1, this.y]);
                    in_front = true;
                }
                if (!this.board.tiles[this.x-2][this.y].is_occupied() && in_front) {
                    moves.push([this.x-2, this.y]);            
                }
            }
        } else {
            if ((this.x + 1) < this.board.columns) {
                if (this.color == 'white') {
                    if (! this.board.tiles[this.x+1][this.y].is_occupied()) {
                        moves.push([this.x+1, this.y]);
                    }
                } else {
                    if (! this.board.tiles[this.x-1][this.y].is_occupied()) {
                        moves.push([this.x-1, this.y]);
                    }

                }
            }
        }

        if (this.color == 'white') {
            if (this.x+1 < this.board.columns && this.y+1 < this.board.rows){
                if (this.board.tiles[this.x+1][this.y+1].is_occupied() && this.board.tiles[this.x+1][this.y+1].piece.color != this.board.player.color ) {
                    moves.push([this.x+1, this.y+1]);
                }    
            }
            if (this.x+1 < this.board.columns && this.y-1 >= 0) {
                if (this.board.tiles[this.x+1][this.y-1].is_occupied() && this.board.tiles[this.x+1][this.y-1].piece.color != this.board.player.color ) {
                    moves.push([this.x+1, this.y-1]);
                }
            }
        } else {
            if (this.x-1 >= 0 && this.y-1 >= 0) {
                if (this.board.tiles[this.x-1][this.y-1].is_occupied() && this.board.tiles[this.x-1][this.y-1].piece.color != this.board.player.color ) {
                    moves.push([this.x-1, this.y-1]);
                }
            }
            
            if (this.x-1 >= 0 && this.y+1 < this.board.rows) {
                if (this.board.tiles[this.x-1][this.y+1].is_occupied() && this.board.tiles[this.x-1][this.y+1].piece.color != this.board.player.color ) {
                    moves.push([this.x-1, this.y+1]);
                }
            }
        }


        return moves;
    }


}
