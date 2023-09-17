/**
 * Map will represent the current dungeon map.
 * The dungeon map will be a 2D array of tiles.
 * There are different rooms and hallways.
 * and each tile will have a type with various items possiblys
 * Map is currently unused in the current build.
 */

import Tile from '../Model/Tile';
import seedrandom from 'seedrandom';


class Map {
    constructor(seed, gridSize, numberOfRooms, minRoomSize, maxRoomSize) {
        this.tiles = [];
        this.rooms = [];
        this.gmView = false;
        this.seed = seed;
        this.gridSize = gridSize;
        this.numberOfRooms = numberOfRooms;
        this.minRoomSize = minRoomSize;
        this.maxRoomSize = maxRoomSize;
    }
    getMap(){
        return this.tiles;
    }

    setTiles(newTiles){
        this.tiles = newTiles;
    }

    setRooms(newRoom){
        this.newRoom = newRoom;
    }
      /**
       * Creates a default grid to be used for the map
       * @returns grid
       */
      createGrid(){
        const random = seedrandom(this.seed);
        for (let x = 0; x < this.gridSize; x++) {
            const row = [];
            for (let y = 0; y < this.gridSize; y++) {
              const tile = new Tile(x, y, 0, "grass", "nothing");
              tile.setDirections("wall", "wall", "wall", "wall");
              row.push(tile);
            }
            this.tiles.push(row);
          }
      
          // Create rooms without overlap
          for (let i = 0; i < this.numberOfRooms; i++) {
            let overlap;
            let room;
            do {
              overlap = false;
              const roomWidth = Math.floor(random() * (this.maxRoomSize - this.minRoomSize + 1)) + this.minRoomSize;
              const roomHeight = Math.floor(random() * (this.maxRoomSize - this.minRoomSize + 1)) + this.minRoomSize;
              const startX = Math.floor(random() * (this.gridSize - roomWidth)) + 1;
              const startY = Math.floor(random() * (this.gridSize - roomHeight)) + 1;
              room = { startX, startY, width: roomWidth, height: roomHeight };
      
              // Check for overlap with existing rooms
              for (const existingRoom of this.rooms) {
                if (
                  startX - 1 < existingRoom.startX + existingRoom.width + 1 &&
                  startX + roomWidth + 1 > existingRoom.startX - 1 &&
                  startY - 1 < existingRoom.startY + existingRoom.height + 1 &&
                  startY + roomHeight + 1 > existingRoom.startY - 1
                ) {
                  overlap = true;
                  break;
                }
              }
            } while (overlap);
            this.createRoom(room.startX, room.startY, room.width, room.height);
            this.rooms.push(room);
          }
      
          // Connect rooms with corridors
          for (let i = 0; i < this.rooms.length - 1; i++) {
            const room1 = this.rooms[i];
            const room2 = this.rooms[i + 1];
            const startX = room1.startX + Math.floor(room1.width / 2);
            const startY = room1.startY + Math.floor(room1.height / 2); // Connect from the center
            const endX = room2.startX + Math.floor(room2.width / 2);
            const endY = room2.startY + Math.floor(room2.height / 2); // Connect to the center
      
            this.createCorridor(startX, startY, endX, endY);
          }
      }
      /**
     * Creates a room and adds it to the map
     * @param {*} grid 
     * @param {*} startX 
     * @param {*} startY 
     * @param {*} roomWidth 
     * @param {*} roomHeight 
     */
    createRoom(startX, startY, roomWidth, roomHeight){
      for (let x = startX; x < startX + roomWidth; x++) {
          for (let y = startY; y < startY + roomHeight; y++) {
            const tile = this.tiles[x][y];
            if (x === startX || x === startX + roomWidth - 1 || y === startY || y === startY + roomHeight - 1) {
              tile.setDirections("wall", "wall", "wall", "wall");
            } else {
              tile.setDirections("empty", "empty", "empty", "empty");
            }
            tile.selectImage();
          }
      }
  }

  /**
   * Creates corridors between placed rooms
   * @param {*} grid 
   * @param {*} startX 
   * @param {*} startY 
   * @param {*} endX 
   * @param {*} endY 
   */
  createCorridor(startX, startY, endX, endY){
      let x = startX;
      let y = startY;
  
      // Determine whether to move horizontally or vertically first
      const moveHorizontallyFirst = Math.abs(endX - startX) > Math.abs(endY - startY);
  
      while (x !== endX || y !== endY) {
        const tile = this.tiles[x][y];
        tile.setDirections("wall", "wall", "wall", "wall");
  
        // Determine the direction of the corridor
        let horizontal = 0;
        let vertical = 0;
  
        if (moveHorizontallyFirst) {
          if (x !== endX) {
            horizontal = x < endX ? 1 : -1;
          } else {
            vertical = y < endY ? 1 : -1;
          }
        } else {
          if (y !== endY) {
            vertical = y < endY ? 1 : -1;
          } else {
            horizontal = x < endX ? 1 : -1;
          }
        }
  
        // Set the directions based on the movement
        if (horizontal !== 0) {
          tile.setDirections("wall", "empty", "wall", "empty");
        } else {
          tile.setDirections("empty", "wall", "empty", "wall");
        }
  
        tile.selectImage();
  
        // Move to the next tile in the corridor
        x += horizontal;
        y += vertical;
      }
    }
}

export default Map

