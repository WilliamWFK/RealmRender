import Room from './Room'; 
import Tile from '../Model/Tile';
import { rotate2DArray } from './ArrayUtils';


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
        let tilesCopy = [...tTiles];
        //rotate the 2d array of tiles x times
        for(let i = 0; i < Math.floor(Math.random() * 4); i++){
            tilesCopy = rotate2DArray(tilesCopy); // Rotate the copied array
        }

        return tilesCopy;
    }
}

class LshapeRoom extends Room {
    constructor(width, height) {
        super(width, height); // Call the constructor of the base Room class
        console.log('hello create Lroom');
        // Customize properties for your square room
        this.name = "Lshape Room";
        this.description = "A L shaped room with walls on all sides.";
        this.tiles = this.createLshapeTiles();
    }


    createLshapeTiles() {
        // Create a grid of Tile objects for the square room
        const tTiles = [];
        const startX = 0, startY = 0
        let stickWidth = Math.floor(Math.random() * (this.roomWidth/2-1) + 1);
        let stickHeight = Math.floor(Math.random() * (this.roomHeight/2-1) + 1);
        let baseWidth = Math.floor(Math.random() * (this.roomWidth - this.roomWidth / 2 - 1)) + this.roomWidth / 2;
        let baseHeight = Math.floor(Math.random() * (this.roomHeight/2-2) + 2);
        console.log("stick width: " + stickWidth, "stick height: " + stickHeight, "base width: " + baseWidth, "base height: " + baseHeight);
        console.log(this.roomWidth, this.roomHeight);
        console.log(this.roomWidth/2, this.roomHeight/2);
        for (let x = 0; x < this.roomWidth; x++) {
            const row = [];
            for (let y = 0; y < this.roomHeight; y++) {
                const tile = new Tile(x, y, 0, "", "nothing");
                if (x === startX || x === startX + this.roomWidth - 1 || y === startY || y === startY + this.roomHeight - 1) {
                    tile.setDirections("wall", "wall", "wall", "wall");
                } else {
                    tile.setDirections("empty", "empty", "empty", "empty");
                }
                if( y < this.roomHeight/2){
                    //do the stick
                    if((this.roomHeight/2 - stickHeight) > y){
                        //set the tile to a wall
                        tile.setDirections("wall", "wall", "wall", "wall");
                    }else{
                        if(x > 0){
                            if(x > stickWidth){
                                //set the tile to a wall
                                tile.setDirections("wall", "wall", "wall", "wall");
                            }else{
                                tile.setDirections("empty", "empty", "empty", "empty");
                            }
                        }else {
                            tile.setDirections("wall", "wall", "wall", "wall");
                        }
                    } 
                }
                else{
                    //do the base
                    
                    //check if the tile is in the base
                    if(y > (this.roomHeight - baseHeight)){
                        //set the tile to a wall
                        tile.setDirections("wall", "wall", "wall", "wall");
                    }
                    else{
                        if(x > 0){
                            if(x > baseWidth){
                                //set the tile to a wall
                                tile.setDirections("wall", "wall", "wall", "wall");
                            }else{
                                tile.setDirections("empty", "empty", "empty", "empty");
                            }
                        }else {
                            tile.setDirections("wall", "wall", "wall", "wall");
                        }
                    }
                }
                tile.selectImage();
                row.push(tile);
            }
            tTiles.push(row)
        }
        let tilesCopy = [...tTiles];
        //rotate the 2d array of tiles x times
        for(let i = 0; i < Math.floor(Math.random() * 4); i++){
            tilesCopy = rotate2DArray(tilesCopy); // Rotate the copied array
        }

        return tilesCopy;
    }
}

export {SquareRoom, TshapeRoom, LshapeRoom};
