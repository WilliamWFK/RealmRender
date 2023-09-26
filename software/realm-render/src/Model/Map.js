/**
 * Map will represent the current dungeon map.
 * The dungeon map will be a 2D array of tiles.
 * There are different rooms and hallways.
 * and each tile will have a type with various items possiblys
 * Map is currently unused in the current build.
 */
import { SquareRoom, TshapeRoom } from "../Model/BasicRooms";
import Tile from '../Model/Tile';

class Map {
    constructor(width, height) {
        console.log('hello create map');
        this.tiles = [];
        this.rooms = [];
        this.width = width;
        this.height = height;
        this.gmView = false;
        this.makeEmptyMap(this.width, this.height);
    }

    /**
     * creates an empty map
     * 
     * @param {int} width 
     * @param {int} height 
     */
    makeEmptyMap(width, height){
        console.log('hello create empty');
        const newMap = []
        for (let x = 0; x < width; x++) {
            const row = [];
            for (let y = 0; y < height; y++) {
                const tile = new Tile(x, y, 0, "", "nothing");
                tile.selectImage();
                row.push(tile);
            }
            newMap.push(row)
        }
        this.tiles = newMap;
    }

    placeRooms(){
        console.log('hello create place room');
        this.tiles = new Array(this.width);
        for (let x = 0; x < this.width; x++) {
            this.tiles[x] = new Array(this.height);
        }

        const sectionWidth = this.width/3;
        const sectionHeight = this.height/3;
        let sectionX = 0;
        let sectionY = 0;
        while (sectionX < this.width && sectionY < this.height){
            const room = this.rooms[Math.floor(Math.random() * this.rooms.length)]

            // Place the room within the section
            for (let x = sectionX; x < sectionX + sectionWidth; x++) {
                for (let y = sectionY; y < sectionY + sectionHeight; y++) {

                    const roomX = x - sectionX;
                    const roomY = y - sectionY;
                    console.log(`x: ${x}, y: ${y}, roomX: ${roomX}, roomY: ${roomY}`);
                    // Check if the relative positions are within the room's dimensions
                    if (roomX >= 0 && roomX < room.roomWidth && roomY >= 0 && roomY < room.roomHeight) {
                        this.tiles[x][y] = room.tiles[roomX][roomY];
                    }
                }
            }

            sectionX += sectionWidth;
            if (sectionX >= this.width) {
                sectionX = 0;
                sectionY += sectionHeight;
            }
            
        }
        

    }

    setTiles(newTiles){
        this.tiles = newTiles;
    }

    setRooms(newRooms){
        console.log('hello set rooms');
        this.rooms = newRooms;
        console.log('Rooms:', this.rooms);
        this.placeRooms();
    }
}

export default Map

