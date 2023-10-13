import Tile from '../Model/Tile';
import seedrandom from 'seedrandom';


const medium = (dimension) => {
  return Math.floor((dimension / 30) + 7);
};

const large = (dimension) => {
  return Math.floor((dimension / 30) + 10);
}


class Room {
  globalX;
  globalY;

  constructor(width, height, size, theme, seed) {
    this.id = 0;
    this.seed = seed;
    this.name = "";
    this.description = "";
    this.theme = theme;
    this.exits = {
      left: [],
      right: [],
      up: [],
      down: [],
    };
    this.items = [];
    this.characters = [];
    this.tiles = [];
    const random = seedrandom(this.seed);
    if (size === "medium") {
      let variance = Math.round(random());
      this.roomWidth = medium(width) + variance;
      this.roomHeight = medium(height) + variance;
    }
    if (size === "large") {
      let variance = Math.round(random());
      this.roomWidth = large(width) + variance;
      this.roomHeight = large(height) + variance;
    }
    if (size === "small") {
      let variance = Math.round(random());
      //Pick a random dimension to make medium or large
      let dimension = Math.round(random());
      if (dimension === 0) {

        this.roomWidth = medium(width) + variance - 4;
        this.roomHeight = large(height) + variance - 2;
      }
      else {
        this.roomWidth = large(width) + variance - 2;
        this.roomHeight = medium(height) + variance - 4;
      }
    }
  }

  //find exits x and y for the global map scale.
  getGlobalExitCoordinates(exitDirection, exitIndex) {
    const exitTile = this.exits[exitDirection][exitIndex];
    if (!exitTile) return null; // Exit doesn't exist


    return { x: this.globalX + exitTile.x, y: this.globalY + exitTile.y };
  }

  addExits() {
    const edgeWallTiles = this.findEdges()
    const random = seedrandom(this.seed);



    //randomly selects a tile from edge wall tiles
    this.exits.up.push(edgeWallTiles.up[Math.floor(random() * edgeWallTiles.up.length)]);
    //console.log("in exit test", this.exits.up);
    this.exits.right.push(edgeWallTiles.right[Math.floor(random() * edgeWallTiles.right.length)]);
    this.exits.down.push(edgeWallTiles.down[Math.floor(random() * edgeWallTiles.down.length)]);
    this.exits.left.push(edgeWallTiles.left[Math.floor(random() * edgeWallTiles.left.length)]);

    for (let exitDirection in this.exits) {
      const exitTiles = this.exits[exitDirection];
      // console.log("length", exitTiles.length, "inside ", exitTiles[0])
      for (let i = 0; i < exitTiles.length; i++) {
        const tile = exitTiles[i];
        // console.log(tile)
        if(tile !== undefined){
          this.tiles[tile.x][tile.y].setType("door");
        }
      }
    }
  }

  findEdges() {
    const edgeWallTiles = {
      up: [],
      right: [],
      down: [],
      left: []
    };

    //console.log(this.tiles)
    //console.log(this.roomHeight, this.roomWidth)
    // Iterate through the top row
    for (let x = 1; x < this.roomWidth - 1; x++) {
      if (this.tiles[x][0].isWall()) {
        edgeWallTiles.up.push(this.tiles[x][0]);
      }
    }

    // Iterate through the bottom row
    for (let x = 1; x < this.roomWidth - 1; x++) {
      if (this.tiles[x][this.roomHeight - 1].isWall()) {
        edgeWallTiles.down.push(this.tiles[x][this.roomHeight - 1]);
      }
    }

    // Iterate through the left column
    for (let y = 1; y < this.roomHeight - 1; y++) {
      if (this.tiles[0][y].isWall()) {
        edgeWallTiles.left.push(this.tiles[0][y]);
      }
    }

    // Iterate through the right column
    for (let y = 1; y < this.roomHeight - 1; y++) {
      if (this.tiles[this.roomWidth - 1][y].isWall()) {
        edgeWallTiles.right.push(this.tiles[this.roomWidth - 1][y]);
      }
    }

    return edgeWallTiles;
  }

  setTiles(newTiles) {
    this.tiles = newTiles;
  }

  setCharacters(newChara) {
    this.characters = newChara;
  }

  getTheme() {
    return this.theme;
  }
}

export default Room
