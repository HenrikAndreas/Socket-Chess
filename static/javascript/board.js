// Idea --> Make square objects > put in list > draw
// If white is playing --> Reverse drawing order so that player always is at bottom
class Board {
    constructor() {
        this.rows = 8;
        this.columns = 8;
        this.y = [1, 2, 3, 4, 5, 6, 7, 8];
        this.x = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
        this.tileSize = 10;
        this.tiles = [];
        this.make_squares();
    }

    make_squares() {
        var change = false;
        var reverse = false;

        for (var i = 0; i < this.rows; i++) {
            reverse = reverse ? false : true;
            this.tiles.push([])
            for (var j = 0; j < this.columns; j++) {
                // Coordinates
                var x = this.x[j];
                var y = this.y[i];
                if(!reverse) {
                    var color = change ? 'black' : 'white';
                    this.tiles[i].push(new Tile(color, x, y));
                } else {
                    var color = change ? 'white' : 'black';
                    this.tiles[i].push(new Tile(color, x, y));
                }
                change = change ? false : true;
            }
        }
    }

    draw_board() {
        let board = document.getElementById("chessBoard");
        // For white player:
        for (var i = this.rows-1; i >= 0; i--) {
            var row = document.createElement('div');
            row.className = "row";        
            for (var j = 0; j < this.columns; j++) {
                var square = this.tiles[i][j].create();

                row.appendChild(square);
            }
            board.appendChild(row);
        }
        // For black player:
        // for (var i = 0; i < this.rows; i++)

    }

}
