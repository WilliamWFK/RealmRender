import Tile from '../Model/Tile';

const medium = (dimension) => {
    return (dimension/ 3) - 2;
};

class Room {
    constructor(width, height, size) {
        this.id = 0;
        
        this.name = "";
        this.description = "";
        this.exits = [];
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

    

    setTiles(newTiles){
        this.tiles = newTiles;
    }

    setCharacters(newChara){
        this.characters = newChara;
    }
}

export default Room