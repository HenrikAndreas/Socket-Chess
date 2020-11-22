class Player {
    constructor(color) {
        this.color = color;
        this.turn = (color == 'white') ? true : false; // White begins
    }
}