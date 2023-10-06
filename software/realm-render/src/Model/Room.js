import Tile from '../Model/Tile';

const medium = (dimension) => {
    return (dimension/ 3) - 2;
};

class Room {
    globalX;
    globalY;
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

    //find exits x and y for the global map scale.
    getGlobalExitCoordinates(exitDirection, exitIndex) {
        const exitTile = this.exits[exitDirection][exitIndex];
        if (!exitTile) return null; // Exit doesn't exist
        console.log("global X, y", this.globalX, this.globalY)
        console.log("global X, y", this.globalX + exitTile.x, this.globalY + exitTile.y)
        console.log("global X, y", exitTile.x, exitTile.y)

        return { x: this.globalX + exitTile.x, y: this.globalY + exitTile.y };
    }

    addExits(){
        const edgeWallTiles = this.findEdges()


        //randomly selects a tile from edge wall tiles
        this.exits.up.push(edgeWallTiles.up[Math.floor(Math.random() * edgeWallTiles.up.length)]);
        console.log("in exit test", this.exits.up);
        this.exits.right.push(edgeWallTiles.right[Math.floor(Math.random() * edgeWallTiles.right.length)]);
        this.exits.down.push(edgeWallTiles.down[Math.floor(Math.random() * edgeWallTiles.down.length)]);
        this.exits.left.push(edgeWallTiles.left[Math.floor(Math.random() * edgeWallTiles.left.length)]);

        for (let exitDirection in this.exits) {
            const exitTiles = this.exits[exitDirection];
            for (let i = 0; i < exitTiles.length; i++) {
                const tile = exitTiles[i];
                this.tiles[tile.x][tile.y].setType("door");
            }
        }
    }

    findEdges(){
        const edgeWallTiles = {
          up: [],
          right: [],
          down: [],
          left: []
        };

        // Iterate through the top row
        for (let x = 1; x < this.roomWidth-1; x++) {
          if (this.tiles[x][0].isWall) {
            edgeWallTiles.up.push(this.tiles[x][0]);
          }
        }

        // Iterate through the bottom row
        for (let x = 1; x < this.roomWidth-1; x++) {
          if (this.tiles[x][this.roomHeight - 1].isWall) {
            edgeWallTiles.down.push(this.tiles[x][this.roomHeight - 1]);
          }
        }

        // Iterate through the left column
        for (let y = 1; y < this.roomHeight - 1; y++) {
          if (this.tiles[0][y].isWall) {
            edgeWallTiles.left.push(this.tiles[0][y]);
          }
        }

        // Iterate through the right column
        for (let y = 1; y < this.roomHeight - 1; y++) {
          if (this.tiles[this.roomWidth - 1][y].isWall) {
            edgeWallTiles.right.push(this.tiles[this.roomWidth - 1][y]);
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
