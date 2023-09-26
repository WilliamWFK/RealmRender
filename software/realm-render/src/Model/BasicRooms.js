import Room from './Room';
import Tile from '../Model/Tile';

class SquareRoom extends Room {
    constructor(width, height) {
        super(width, height); // Call the constructor of the base Room class
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
                const tile = new Tile(x, y, 0, "", "nothing");
                // Customize tile directions as needed
                if (x === startX || x === startX + this.roomWidth - 1 || y === startY || y === startY + this.roomHeight - 1) {
                    tile.setDirections("wall", "wall", "wall", "wall");
                } else {
                    tile.setDirections("empty", "empty", "empty", "empty");
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
    constructor(width, height) {
        super(width, height); // Call the constructor of the base Room class
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
                const tile = new Tile(x, y, 0, "", "nothing");
                // Customize tile directions as needed
                if (x === startX) {
                    tile.setDirections("wall", "wall", "wall", "wall");
                } else if (x >= startX + this.roomWidth/4 && x <= startX + this.roomWidth - 1 && y === startY + (this.roomHeight/2 - Math.round(this.roomWidth/4))){
                    tile.setDirections("wall", "wall", "wall", "wall");
                } else if (x >= startX + this.roomWidth/4 && x <= startX + this.roomWidth - 1 && y === startY + this.roomHeight - (1 + (this.roomWidth/2 ) - Math.round(this.roomWidth/4))){
                    tile.setDirections("wall", "wall", "wall", "wall");
                } else if (x >= startX && x <= startX + this.roomWidth/4 && y === startY + this.roomHeight - 1){
                    tile.setDirections("wall", "wall", "wall", "wall");
                } else if (x >= startX && x <= startX + this.roomWidth/4 &&  y === startY){
                    tile.setDirections("wall", "wall", "wall", "wall");
                } else {
                    tile.setDirections("empty", "empty", "empty", "empty");
                }
                if (x === Math.round(startX + this.roomWidth/4) && y <= startY + (this.roomHeight/2 - Math.round(this.roomHeight/3))){
                    tile.setDirections("wall", "wall", "wall", "wall");
                } else if (x === Math.round(startX + this.roomWidth/4) && y >= startY + this.roomHeight - (1 + (this.roomWidth/2 - Math.round(this.roomHeight/3)))){
                    tile.setDirections("wall", "wall", "wall", "wall");
                }
                tile.selectImage();
                row.push(tile);
            }
            tTiles.push(row)
        }

        return tTiles;
    }
}

class LShapedRoom extends Room {
    constructor(width, height, orientation) {
        super(width, height);
        console.log('Creating L-shaped room');
        this.name = "L-Shaped Room";
        this.description = "An L-shaped room with walls forming an L shape.";
        this.tiles = this.createLShapedTiles(orientation);
    }

    createLShapedTiles(orientation) {
        console.log('Creating L-shaped room tiles');
        const lShapedTiles = [];
        const startX = 0;
        const startY = 0;
        for (let x = 0; x < this.roomWidth; x++) {
            const row = [];
            for (let y = 0; y < this.roomHeight; y++) {
                const tile = new Tile(x, y, 0, "", "nothing");

                // Customize tile directions based on the L-shape orientation
                switch (orientation) {
                    case 0: // L shape facing right
                        if (x === startX || (y === startY && x <= Math.floor(this.roomWidth / 2))) {
                            tile.setDirections("wall", "wall", "empty", "empty");
                        } else if (y === startY || x === this.roomWidth - 1 || y === this.roomHeight - 1) {
                            tile.setDirections("wall", "wall", "wall", "wall");
                        } else {
                            tile.setDirections("empty", "empty", "empty", "empty");
                        }
                        break;
                    case 1: // L shape facing down
                        if (x === startX || (y === this.roomHeight - 1 && x <= Math.floor(this.roomWidth / 2))) {
                            tile.setDirections("wall", "wall", "empty", "empty");
                        } else if (x === startX || y === startY || y === this.roomHeight - 1) {
                            tile.setDirections("wall", "wall", "wall", "wall");
                        } else {
                            tile.setDirections("empty", "empty", "empty", "empty");
                        }
                        break;
                    case 2: // L shape facing left
                        if (x === startX || (y === this.roomHeight - 1 && x >= Math.floor(this.roomWidth / 2))) {
                            tile.setDirections("empty", "empty", "wall", "wall");
                        } else if (x === this.roomWidth - 1 || y === startY || y === this.roomHeight - 1) {
                            tile.setDirections("wall", "wall", "wall", "wall");
                        } else {
                            tile.setDirections("empty", "empty", "empty", "empty");
                        }
                        break;
                    case 3: // L shape facing up
                        if (x === startX || (y === startY && x >= Math.floor(this.roomWidth / 2))) {
                            tile.setDirections("empty", "empty", "wall", "wall");
                        } else if (y === startY || x === startX || x === this.roomWidth - 1) {
                            tile.setDirections("wall", "wall", "wall", "wall");
                        } else {
                            tile.setDirections("empty", "empty", "empty", "empty");
                        }
                        break;
                    default:
                        console.error('Invalid orientation. Please provide a value between 0 and 3.');
                        return;
                }
                tile.selectImage();
                row.push(tile);
            }
            lShapedTiles.push(row);
        }
        return lShapedTiles;
    }
}








export {SquareRoom, TshapeRoom, LShapedRoom};
