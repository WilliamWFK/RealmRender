import Tile from '../Model/Tile';

class Room {
    constructor(width, height) {
        this.id = 0;
        this.roomWidth = width
        this.roomHeight = height
        this.name = "";
        this.description = "";
        this.exits = [];
        this.items = [];
        this.characters = [];
        this.tiles = [];
    }

    setTiles(newTiles){
        this.tiles = newTiles;
    }

    setCharacters(newChara){
        this.characters = newChara;
    }
}

export default Room