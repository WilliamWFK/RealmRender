import Tile from '../Model/Tile';

const medium = (dimension) => {
    return (dimension/ 3) - 2;
};

class Room {
    constructor(width, height, size) {
        this.id = 0;
        
        this.name = "";
        this.description = "";
        this.exits = {
            left: [],
            right: [],
            up: [],
            down: [],
        };
        this.items = [];
        this.characters = [];
        this.tiles = [];
        if (size === "medium") {
            this.roomWidth = medium(width);
            this.roomHeight = medium(height);
        }
        else {
            this.roomWidth = width;
            this.roomHeight = height;
        }
    }

    addExits(){
        edges = findEdges()

        //randomly selects a tile from edge wall tiles
        this.exits.up.push(edgeWallTiles.up[Math.floor(Math.random() * edgeWallTiles.up.length)]);
        this.exits.right.push(edgeWallTiles.right[Math.floor(Math.random() * edgeWallTiles.right.length)]);
        this.exits.down.push(edgeWallTiles.down[Math.floor(Math.random() * edgeWallTiles.down.length)]);
        this.exits.left.push(edgeWallTiles.left[Math.floor(Math.random() * edgeWallTiles.left.length)]);
    }

    findEdges() {
        const edgeWallTiles = {
          up: [],
          right: [],
          down: [],
          left: []
        };
    
        // Iterate through the top row
        for (let x = 0; x < this.width; x++) {
          if (this.tiles[x][0].isWall) {
            edgeWallTiles.up.push(this.tiles[x][0]);
          }
        }
    
        // Iterate through the bottom row
        for (let x = 0; x < this.width; x++) {
          if (this.tiles[x][this.height - 1].isWall) {
            edgeWallTiles.down.push(this.tiles[x][this.height - 1]);
          }
        }
    
        // Iterate through the left column
        for (let y = 1; y < this.height - 1; y++) {
          if (this.tiles[0][y].isWall) {
            edgeWallTiles.left.push(this.tiles[0][y]);
          }
        }
    
        // Iterate through the right column
        for (let y = 1; y < this.height - 1; y++) {
          if (this.tiles[this.width - 1][y].isWall) {
            edgeWallTiles.right.push(this.tiles[this.width - 1][y]);
          }
        }
    
        return edgeWallTiles;
    }

    setTiles(newTiles){
        this.tiles = newTiles;
    }

    setCharacters(newChara){
        this.characters = newChara;
    }
}

export default Room