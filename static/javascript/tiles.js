class Tile {
    constructor(color, x, y) {
        this.color = color;
        this.xCor = x;
        this.yCor = y;
        this.cors = [this.xCor, this.yCor];
        this.square = this.create();
        this.piece = null;
    }

    get_square() {
        return this.square;
    }

    create() { // Creating the HTML element
        var square = document.createElement('div');
        var cors = this.cors;
        square.className = 'square';
        square.style.backgroundColor = this.color;
        // square.addEventListener("click", function() {
        //     console.log(cors);
        // });
        return square;
    }

    add_piece(piece) {
        this.piece = piece;
        this.square.style.backgroundColor = "red";
        // InnerHTML / Add picture
    }

    is_occupied() {
        return (this.piece != null) ? true : false;
    }
    

}