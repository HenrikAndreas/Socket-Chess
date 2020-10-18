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
        
        var _this = this;
        square.onclick = function() {
            _this.add_piece();
            console.log(_this.cors);
        };


        return square;
    }

    add_piece() {
        var color = (this.square.style.backgroundColor=="red") ? this.color : "red";
        this.square.style.backgroundColor = color;
        // this.piece = piece;
        // InnerHTML / Add picture
    }

    is_occupied() {
        return (this.piece != null) ? true : false;
    }
    

}