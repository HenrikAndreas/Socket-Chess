class Tile {
    constructor(color, x, y) {
        this.color = color;
        this.xCor = x;
        this.yCor = y;
        this.cors = [this.xCor, this.yCor];
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

    


}