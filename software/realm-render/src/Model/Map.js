/**
 * Map will represent the current dungeon map.
 * The dungeon map will be a 2D array of tiles.
 * There are different rooms and hallways.
 * and each tile will have a type with various items possiblys
 * Map is currently unused in the current build.
 */

class Map {
    constructor(width, height) {
        this.tiles = [];
        this.rooms = [];
        this.width = width;
        this.height = height;
        this.gmView = false;
    }

    setTiles(newTiles){
        this.tiles = newTiles;
    }

    setRooms(newRoom){
        this.newRoom = newRoom;
    }
}

export default Map
