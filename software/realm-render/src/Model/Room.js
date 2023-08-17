class Room {
    constructor() {
        this.id = 0;
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
}

export default Room