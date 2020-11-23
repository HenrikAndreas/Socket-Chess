class King {
    constructor(board, x, y, color) {
        this.board = board;
        this.y = y;
        this.x = x;
        this.color = color;
        this.name = 'king';
        if (this.color == 'white') {
            this.picture = 'https://raw.githubusercontent.com/patosai/chess/master/Sprites/whiteKing.png';
        } else {
            this.picture = 'https://raw.githubusercontent.com/patosai/chess/master/Sprites/blackKing.png';
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
       
        for (var i = -1; i < 2; i++) {
            for (var j = -1; j < 2; j++) {
                var x = this.x + i;
                var y = this.y + j;

                if (!( x == this.x && y == this.y )){
                    if (!(((x < 0) || (x >= this.board.rows)))) {
                        if (!(((y < 0) || (y >= this.board.columns)))) {
                            moves.push([x, y]);
                        }
                    }
                }
            }
        }

        return moves;
    }


}
