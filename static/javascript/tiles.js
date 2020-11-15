class Tile {
    constructor(board, color, x, y, actual_cors) {
        this.original_color = color;
        this.a_cors = actual_cors;
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
    // FIX --> if selected tiles is empty, only tiles with piece selectable. If selected tiles has first tile as occupied, then all in range are selectable


        // console.log(this.xCor, this.yCor);
        // console.log(this.board.get_selected_tiles());

        this.board.reset_draw_moves();

    // If you choose a tile that is occupied and no tiles have been selected, then that show moves from that pice
        if ((this.is_occupied()) && (this.board.get_selected_tiles.length == 0)) { 
           var possible_moves = this.piece.get_moves();
           this.board.draw_moves(possible_moves);
        }
    // Resets selected tiles if you select an already selected tile
        if (this.board.get_selected_tiles().includes(this)) {
            this.board.reset_draw_moves();
            this.board.remove_selected_tiles();
        }
    // Adds tile to list of selected tiles
        this.selected = (this.selected) ? false : true;
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