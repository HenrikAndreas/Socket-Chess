class Tile {
    constructor(board, color, x, y, actual_cors) {
        this.original_color = color;
        this.a_cors = actual_cors; // Numeral Coordinates
        this.board = board;
        this.color = color;
        this.xCor = x;
        this.yCor = y;
        this.cors = [this.xCor, this.yCor];
        this.square = this.create();
        this.selected = false;
        this.piece = null;
        this.picture = null;

    }

    get_square() {
        return this.square;
    }

    create() { // Creating the HTML element
        var square = document.createElement('div');
        square.className = 'square';
        square.style.backgroundColor = this.color;
        
        var _this = this;
        square.onclick = function() {
            _this.select();
            
        };

        return square;
    }
    
    select() {
        if ((this.board.get_selected_tiles().length == 0) && !this.is_occupied()) {
            return;
        }
        if ((this.board.get_selected_tiles().length == 0) && !(board.player.color == this.piece.color)) {

            return;
        }
        
        this.selected = true;
        var allow_move = false;
        var illegal_move = false;
        

        if (this.board.get_selected_tiles().includes(this)) {
            allow_move = true;

        }
        // Thanks Joe Bayer
        if (this.board.get_selected_tiles().length == 1 && this.piece != null && this.piece.color == this.board.get_selected_tiles()[0].piece.color) {
            illegal_move = true;
        }
        
        if ((this.board.get_selected_tiles().length == 1) && !allow_move && !illegal_move) {
            var possible_moves = this.board.get_selected_tiles()[0].piece.get_moves();
            var x = this.a_cors[0];
            var y = this.a_cors[1];

            for (var i = 0; i < possible_moves.length; i++) {
                if ((possible_moves[i][0] == x && possible_moves[i][1] == y)) {
                    allow_move = true;
                }
            }
            
        }
        this.board.reset_draw_moves();
        if (!allow_move && this.board.get_selected_tiles().length == 1) {
            return;
        }

        // If you choose a tile that is occupied and no tiles have been selected, then that show moves from that pice
        if ((this.is_occupied()) && (this.board.get_selected_tiles().length == 0)) { 
           var possible_moves = this.piece.get_moves();
           this.board.draw_moves(possible_moves);
        }
        // Resets selected tiles if you select an already selected tile
        if (this.board.get_selected_tiles().includes(this)) {
            this.board.reset_draw_moves();
            this.selected = false;
            this.board.remove_selected_tiles();
        }
        // Adds tile to list of selected tiles
        if (this.selected) {
            this.board.add_selected_tile(this);
        }
        // Clears Selected tiles if it's double selected, or if you have selected more than two tiles
        if (this.board.get_selected_tiles().length == this.board.get_maxSelect()) {
            this.board.move(this.board.get_selected_tiles());
            this.board.remove_selected_tiles();
        }


        // Colors selcted tile
        this.board.update_color();
    }

    add_piece(piece) {


        this.piece = piece;
        this.picture = piece.picture;
        this.square.style.backgroundImage = "url("+this.picture +")";

    }
    remove_piece() {
        this.piece = null;
        this.picture = null;
        this.square.style.backgroundImage = this.picture;
    }
    get_piece() {
        return this.piece;
    }

    is_occupied() {
        return (this.piece != null) ? true : false;
    }
    
}