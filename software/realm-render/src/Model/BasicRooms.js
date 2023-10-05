import Room from './Room';
import Tile from '../Model/Tile';

class SquareRoom extends Room {
    constructor(width, height, size) {
        super(width, height, size); // Call the constructor of the base Room class
        console.log('hello create sqRoom');
        // Customize properties for your square room
        this.name = "Square Room";
        this.description = "A square room with walls on all sides.";
        this.tiles = this.createSquareTiles();
    }

    createSquareTiles() {
        console.log('hello create sqRoom create');
        // Create a grid of Tile objects for the square room
        const squareTiles = [];
        const startX = 0, startY = 0
        for (let x = 0; x < this.roomWidth; x++) {
            const row = [];
            for (let y = 0; y < this.roomHeight; y++) {
                const tile = new Tile(x, y, "");
                // Customize tile directions as needed
                if (x === startX || x === startX + this.roomWidth - 1 || y === startY || y === startY + this.roomHeight - 1) {
                    tile.setDirections("wall", "wall", "wall", "wall");
                    tile.setType("wall");
                } else {
                    tile.setDirections("empty", "empty", "empty", "empty");
                    tile.setType("floor");
                }
                tile.selectImage();
                row.push(tile);
            }
            squareTiles.push(row)
        }
        return squareTiles;
    }
}

class TshapeRoom extends Room {
    constructor(width, height, size) {
        super(width, height, size); // Call the constructor of the base Room class
        console.log('hello create Troom');
        // Customize properties for your square room
        this.name = "Tshape Room";
        this.description = "A T shaped room with walls on all sides.";
        this.tiles = this.createTshapeTiles();
    }

    createTshapeTiles() {
        // Create a grid of Tile objects for the square room
        const tTiles = [];
        const startX = 0, startY = 0
        for (let x = 0; x < this.roomWidth; x++) {
            const row = [];
            for (let y = 0; y < this.roomHeight; y++) {
                const tile = new Tile(x, y, "");
                // Customize tile directions as needed
                if (x === startX) {
                    tile.setDirections("wall", "wall", "wall", "wall");
                    tile.setType("wall");
                } else if (x >= startX + this.roomWidth/4 && x <= startX + this.roomWidth - 1 && y === startY + (this.roomHeight/2 - Math.round(this.roomWidth/4))){
                    tile.setDirections("wall", "wall", "wall", "wall");
                    tile.setType("wall");
                } else if (x >= startX + this.roomWidth/4 && x <= startX + this.roomWidth - 1 && y === startY + this.roomHeight - (1 + (this.roomWidth/2 ) - Math.round(this.roomWidth/4))){
                    tile.setDirections("wall", "wall", "wall", "wall");
                    tile.setType("wall");
                } else if (x >= startX && x <= startX + this.roomWidth/4 && y === startY + this.roomHeight - 1){
                    tile.setDirections("wall", "wall", "wall", "wall");
                    tile.setType("wall");
                } else if (x >= startX && x <= startX + this.roomWidth/4 &&  y === startY){
                    tile.setDirections("wall", "wall", "wall", "wall");
                    tile.setType("wall");
                } else {
                    tile.setDirections("empty", "empty", "empty", "empty");
                    tile.setType("floor");
                }
                if (x === Math.round(startX + this.roomWidth/4) && y <= startY + (this.roomHeight/2 - Math.round(this.roomHeight/3))){
                    tile.setDirections("wall", "wall", "wall", "wall");
                    tile.setType("wall");
                } else if (x === Math.round(startX + this.roomWidth/4) && y >= startY + this.roomHeight - (1 + (this.roomWidth/2 - Math.round(this.roomHeight/3)))){
                    tile.setDirections("wall", "wall", "wall", "wall");
                    tile.setType("wall");
                }
                tile.selectImage();
                row.push(tile);
            }
            tTiles.push(row)
        }
        return tTiles;
    }
}



export {SquareRoom, TshapeRoom};
