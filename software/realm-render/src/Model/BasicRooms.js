import Room from './Room';
import Tile from '../Model/Tile';
import { rotate2DArray, decorateFloorTiles } from './ArrayUtils';

class SquareRoom extends Room {
    constructor(width, height, size, theme, seed) {
        super(width, height, size, theme, seed); // Call the constructor of the base Room class
        // Customize properties for your square room
        this.name = "Square Room";
        this.description = "A square room with walls on all sides.";
        this.tiles = this.createSquareTiles();
        this.addExits();
        this.seed = seed;
    }

    createSquareTiles() {
        // console.log('hello create sqRoom create');
        // Create a grid of Tile objects for the square room
        const squareTiles = [];
        const startX = 0, startY = 0
        for (let x = 0; x < this.roomWidth; x++) {
            const row = [];
            for (let y = 0; y < this.roomHeight; y++) {
                const tile = new Tile(x, y, 0, super.getTheme(), "nothing");
                // Customize tile directions as needed
                if (x === startX || x === startX + this.roomWidth - 1 || y === startY || y === startY + this.roomHeight - 1) {
                    tile.setType("wall")
                } else {
                    tile.setType("floor")
                }
                row.push(tile);
            }
            squareTiles.push(row)
        }
        let tilesCopy = [...squareTiles];
        tilesCopy = decorateFloorTiles(tilesCopy, this.seed);

        return tilesCopy;
    }
}

class TshapeRoom extends Room {
    constructor(width, height, size, theme, seed) {
        super(width, height, size, theme, seed); // Call the constructor of the base Room class
        // Customize properties for your square room
        this.name = "Tshape Room";
        this.description = "A T shaped room with walls on all sides.";
        this.tiles = this.createTshapeTiles();
        this.roomWidth = this.tiles.length;
        this.roomHeight = this.tiles[0].length;   
        this.addExits();
    }

    createTshapeTiles() {
        // Create a grid of Tile objects for the square room
        const tTiles = [];
        const startX = 0, startY = 0
        for (let x = 0; x < this.roomWidth; x++) {
            const row = [];
            for (let y = 0; y < this.roomHeight; y++) {
                const tile = new Tile(x, y, "", super.getTheme(), this.seed);
                // Customize tile directions as needed
                if (x === startX) {
                    tile.setType("wall")
                } else if (x >= startX + Math.round(this.roomWidth/4) && x <= startX + this.roomWidth - 1 && y === startY + Math.round((this.roomHeight/2 - Math.round(this.roomWidth/4)))){
                    tile.setType("wall")
                } else if (x >= startX + Math.round(this.roomWidth/4) && x <= startX + this.roomWidth - 1 && y === startY + this.roomHeight - Math.round((1 + (this.roomWidth/2 ) - Math.round(this.roomWidth/4)))){
                    tile.setType("wall")
                } else if (x >= startX && x <= startX + Math.round(this.roomWidth/4) && y === startY + this.roomHeight - 1){
                    tile.setType("wall")
                } else if (x >= startX && x <= startX + Math.round(this.roomWidth/4) &&  y === startY){
                    tile.setType("wall")
                } else if (x >= startX + Math.round(this.roomWidth/4) && x <= startX + this.roomWidth - 1 && y >= startY + Math.round((this.roomHeight/2 - Math.round(this.roomWidth/4))) && y <= startY + this.roomHeight - Math.round((1 + (this.roomWidth/2 ) - Math.round(this.roomWidth/4)))){
                    tile.setType("floor")
                } else if (x >= startX && x <= startX + Math.round(this.roomWidth/4) && y <= startY + this.roomHeight - 1 &&  y >= startY){
                    tile.setType("floor")
                } else {
                    tile.setType("")
                }
                
                if (x === Math.round(startX + this.roomWidth/4) && y <= startY + (this.roomHeight/2 - Math.round(this.roomHeight/4))){
                    tile.setType("wall")
                } else if (x === Math.round(startX + this.roomWidth/4) && y >= startY + this.roomHeight - (1 + (this.roomWidth/2 - Math.round(this.roomHeight/4)))){
                     tile.setType("wall")
                }

                if ((x === this.roomWidth - 1 && y <= startY + (this.roomHeight-1) - (this.roomWidth/2 - Math.round(this.roomHeight/4)) && y >= startY + (this.roomHeight/2 - Math.round(this.roomHeight/4)))){
                    tile.setType("wall")
                }
                tile.selectImage();
                row.push(tile);
            }
            tTiles.push(row)
        }
        let tilesCopy = [...tTiles];
        // rotate the 2d array of tiles x times
        for(let i = 0; i < Math.floor(Math.random() * 4); i++){
            tilesCopy = rotate2DArray(tilesCopy); // Rotate the copied array
        }
        tilesCopy = decorateFloorTiles(tilesCopy, this.seed);
        return tilesCopy;
    }
}


//not used doesnt work with current system possibly edit to fit but not crutial
//problems: findExits need walls on all outer extremities L doesnt always have that
//map gen can't handle having no exit on a side under the assumption there is an exit for all sides
//even if not used
class LShapeRoom extends Room {
    constructor(width, height, size, theme, seed) {
        super(width, height, size, theme, seed); // Call the constructor of the base Room class
        // Customize properties for your square room
        this.name = "Lshape Room";
        this.description = "A L shaped room with walls on all sides.";
        this.tiles = this.createLshapeTiles();
        this.addExits();
    }


    createLshapeTiles() {
        // Create a grid of Tile objects for the square room
        const tTiles = [];

        let stickWidth = Math.floor(Math.random() * (this.roomWidth/2-1) + 1);
        let stickHeight = Math.floor(Math.random() * (this.roomHeight/2-1) + 1);
        let baseWidth = Math.floor(Math.random() * (this.roomWidth - this.roomWidth / 2 - 1)) + this.roomWidth / 2;
        let baseHeight = Math.floor(Math.random() * (this.roomHeight/2-2) + 2);

        for (let x = 0; x < this.roomWidth; x++) {
            const row = [];
            for (let y = 0; y < this.roomHeight; y++) {
                const tile = new Tile(x, y, "floor", super.getTheme(), this.seed);

                if( y < this.roomHeight/2){
                    //do the stick
                    if((this.roomHeight/2 - stickHeight) > y){
                        //set the tile to a wall
                        tile.setType("wall")
                    }else{
                        if(x > 0){
                            if(x > stickWidth){
                                //set the tile to a wall
                                tile.setType("wall")
                            }else{
                                tile.setType("floor")
                            }
                        }else {
                            tile.setType("wall")
                        }
                    }
                }
                else{
                    //do the base

                    //check if the tile is in the base
                    if(y > (this.roomHeight - baseHeight)){
                        //set the tile to a wall
                        tile.setType("wall")
                    }
                    else{
                        if(x > 0){
                            if(x > baseWidth){
                                //set the tile to a wall
                                tile.setType("wall")
                            }else{
                                tile.setType("floor")
                            }
                        }else {
                            tile.setType("wall")
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

class RectShapeRoom extends Room {
    constructor(width, height, size, theme, seed) {
        let tempWidth = Math.floor(Math.random() * (width-1) + 2);
        let tempHeight = Math.floor(Math.random() * (height-1) + 2);
        super(tempWidth, tempHeight, size, theme, seed); // Call the constructor of the base Room class
        // Customize properties for your square room
        this.name = "Rectshape Room";
        this.description = "A Rectangle shaped room with walls on all sides.";
        this.tiles = this.createRectshapeTiles();
        this.roomWidth = this.tiles.length;
        this.roomHeight = this.tiles[0].length;   
        this.addExits();
    }


    createRectshapeTiles() {
        // Create a grid of Tile objects for the square room
        const tTiles = [];
        for (let x = 0; x < this.roomWidth; x++) {
            const row = [];
            for (let y = 0; y < this.roomHeight; y++) {
                const tile = new Tile(x, y, 0, super.getTheme(), "nothing");
                // Customize tile directions as needed
                if (x === 0 || x === 0 + this.roomWidth - 1 || y === 0 || y === 0 + this.roomHeight - 1) {
                    tile.setType("wall")
                } else {
                    tile.setType("floor")
                }
                row.push(tile);
            }
            tTiles.push(row)
        }
        let tilesCopy = [...tTiles];
        // //rotate the 2d array of tiles x times
        for(let i = 0; i < Math.floor(Math.random() * 4); i++){
            tilesCopy = rotate2DArray(tilesCopy); // Rotate the copied array
        }
        tilesCopy = decorateFloorTiles(tilesCopy, this.seed);

        return tilesCopy;
    }
}

class PlusShapeRoom extends Room {
    constructor(width, height, size, theme, seed) {
        super(width, height, size, theme, seed); // Call the constructor of the base Room class
        // Customize properties for your square room
        this.name = "Plusshape Room";
        this.description = "A Plus shaped room with walls on all sides.";
        this.tiles = this.createPlusshapeTiles();
        this.customExits();
    }

    customExits(){
        this.exits.up.push(this.tiles[Math.round(this.roomWidth/2) - 1][0])
        this.exits.right.push(this.tiles[this.roomWidth - 1][Math.round(this.roomHeight/2)-1])
        this.exits.left.push(this.tiles[0][Math.round(this.roomHeight/2)-1])
        this.exits.down.push(this.tiles[Math.round(this.roomWidth/2)-1][this.roomHeight -1])
        for (let exitDirection in this.exits) {
            const exitTiles = this.exits[exitDirection];
            for (let i = 0; i < exitTiles.length; i++) {
              const tile = exitTiles[i];
              if(tile !== undefined){
                this.tiles[tile.x][tile.y].setType("door");
              }
            }
        }
    }

    createPlusshapeTiles() {
        const tTiles = [];
        for (let x = 0; x < this.roomWidth; x++) {
            const row = [];
            for (let y = 0; y < this.roomHeight; y++) {
                const tile = new Tile(x, y, "floor", super.getTheme(), this.seed);
                //create a room where there are walls on the outside and a plus shape in the middle
                //if the roomWidth is odd, then the middle tile will be empty
                if(x === Math.round(this.roomWidth/2)-1 || y === Math.round(this.roomHeight/2)-1){
                    tile.setType("floor")
                }else{
                    tile.setType("wall")
                }
                //if the roomWidth is even the middle 2 tiles will be empty
                if(this.roomWidth % 2 === 0){
                    if(x === Math.round(this.roomWidth/2) || y === Math.round(this.roomHeight/2)){
                        tile.setType("floor")
                    }
                }
                //add empty square in the center of the room that is half the size of the room
                if(x >= Math.round(this.roomWidth/4) && x < Math.round(this.roomWidth/4) + Math.round(this.roomWidth/2) && y >= Math.round(this.roomHeight/4) && y < Math.round(this.roomHeight/4) + Math.round(this.roomHeight/2)){
                    tile.setType("floor")
                }

                if(x === 0 || x === this.roomWidth-1 || y === 0 || y === this.roomHeight-1){
                    tile.setType("wall")
                }

                row.push(tile);
            }
            tTiles.push(row)
        }

        let tilesCopy = [...tTiles];
        tilesCopy = decorateFloorTiles(tilesCopy, this.seed);

        return tilesCopy;
    }
}

class HoleShapeRoom extends Room {
    constructor(width, height, size, theme, seed) {
        super(width, height, size, theme, seed); // Call the constructor of the base Room class
        // console.log('hello create HoleRoom');
        // Customize properties for your square room
        this.name = "HoleShape Room";
        this.description = "A Hole shaped room with walls on all sides.";
        this.tiles = this.createHoleshapeTiles();
        this.addExits();
    }

    createHoleshapeTiles() {
        const tTiles = [];
        for (let x = 0; x < this.roomWidth; x++) {
            const row = [];
            for (let y = 0; y < this.roomHeight; y++) {
                const tile = new Tile(x, y, "floor", super.getTheme(), this.seed);

                //create a room where there is a center pillar which acts as a wall
                if(x >= Math.round(this.roomWidth/4) && x < Math.round(this.roomWidth/4) + Math.round(this.roomWidth/2) && y >= Math.round(this.roomHeight/4) && y < Math.round(this.roomHeight/4) + Math.round(this.roomHeight/2)){
                    tile.setType("wall")
                }else{
                    tile.setType("floor")
                }
                //set the corner tiles to be walls
                if((x === 0 && y === 0) || (x === 0 && y === this.roomHeight-1) || (x === this.roomWidth-1 && y === 0) || (x === this.roomWidth-1 && y === this.roomHeight-1)){
                    tile.setType("wall")
                }
                //set the corner of the center pillar to be empty
                if((x === Math.round(this.roomWidth/4) && y === Math.round(this.roomHeight/4)) || (x === Math.round(this.roomWidth/4) && y === Math.round(this.roomHeight/4) + Math.round(this.roomHeight/2) - 1) || (x === Math.round(this.roomWidth/4) + Math.round(this.roomWidth/2) - 1 && y === Math.round(this.roomHeight/4)) || (x === Math.round(this.roomWidth/4) + Math.round(this.roomWidth/2) - 1 && y === Math.round(this.roomHeight/4) + Math.round(this.roomHeight/2) - 1)){
                    tile.setType("floor")
                }

                if (x === 0 || y === 0 || x === this.roomWidth-1 || y === this.roomHeight-1){
                    tile.setType("wall")
                }
                tile.selectImage();
                row.push(tile);
            }
            tTiles.push(row)
        }

        let tilesCopy = [...tTiles];
        tilesCopy = decorateFloorTiles(tilesCopy, this.seed);

        return tilesCopy;
    }


}


export {SquareRoom, TshapeRoom, LShapeRoom, RectShapeRoom, PlusShapeRoom, HoleShapeRoom};
