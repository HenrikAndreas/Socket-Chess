class Tile {
    constructor(color, x, y) {
        this.initiated = false; // Logic since eventlistener will execute automatically first time
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
        square.addEventListener("click", function() {
            console.log(cors);
        });
        return square;
    }

    add_piece() {
        // this.piece = piece;
        // InnerHTML / Add picture
    }

    // is_occupied() {
    //     return (this.piece != null) ? true : false;
    // }
    

}