/**
 * Map will represent the current dungeon map.
 * The dungeon map will be a 2D array of tiles.
 * There are different rooms and hallways.
 * and each tile will have a type with various items possiblys
 * Map is currently unused in the current build.
 */
import { SquareRoom, TshapeRoom, LShapeRoom, RectShapeRoom } from "../Model/BasicRooms";
import Tile from '../Model/Tile';
import seedrandom from 'seedrandom';



class Map {
    constructor(width, height, seed) {
        this.tiles = [];
        this.rooms = [];
        this.width = width;
        this.height = height;
        this.gmView = false;
        this.seed = seed;
        this.makeEmptyMap(this.width, this.height);
        this.createGrid(this.width, this.height);
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
                tile.setDirections("wall", "wall", "wall", "wall");
                tile.selectImage();
                row.push(tile);
            }
            newMap.push(row)
        }
        this.tiles = newMap;
    }

    placeRooms(){
        const random = seedrandom(this.seed);
        const sectionWidth = this.width/3;
        const sectionHeight = this.height/3;
        let sectionX = 0;
        let sectionY = 0;

        // Place the spawn room at the bottom middle
        const spawnRoom = new SquareRoom(this.width, this.height, "medium");
        const test = spawnRoom.tiles[0][0];
        const exitTile = spawnRoom.exits.left[0];
        console.log("test type", typeof test);
        console.log("test x,y", test.x, test.y);
        console.log("exitTile type", typeof exitTile);
        console.log("exit x,y", exitTile.x, exitTile.y)

        const spawnRoomStartX = Math.floor((this.width - spawnRoom.roomWidth) / 2);
        const spawnRoomStartY = this.height - spawnRoom.roomHeight;

        // Replace tiles with the spawn room's tiles
        for (let x = spawnRoomStartX; x < spawnRoomStartX + spawnRoom.roomWidth; x++) {
            for (let y = spawnRoomStartY; y < spawnRoomStartY + spawnRoom.roomHeight; y++) {
                const roomX = x - spawnRoomStartX;
                const roomY = y - spawnRoomStartY;
                this.tiles[x][y] = spawnRoom.tiles[roomX][roomY];
            }
        }

        // Get rooms to place around the spawn room
        // Get rooms to place around the spawn room
        const leftRoom = this.rooms[Math.floor(Math.random() * this.rooms.length)];
        const rightRoom = this.rooms[Math.floor(Math.random() * this.rooms.length)];
        const topRoom = this.rooms[Math.floor(Math.random() * this.rooms.length)];

        // Calculate starting positions for each room
        const leftRoomStartX = spawnRoomStartX - leftRoom.roomWidth +1;
        const leftRoomStartY = spawnRoomStartY;

        const rightRoomStartX = spawnRoomStartX + spawnRoom.roomWidth -1;
        const rightRoomStartY = spawnRoomStartY;

        const topRoomStartX = spawnRoomStartX;
        const topRoomStartY = spawnRoomStartY - topRoom.roomHeight+1;

        // Function to place a room at a given position
        const placeRoom = (room, startX, startY) => {
            for (let x = startX; x < startX + room.roomWidth; x++) {
                for (let y = startY; y < startY + room.roomHeight; y++) {
                const roomX = x - startX;
                const roomY = y - startY;
                this.tiles[x][y] = room.tiles[roomX][roomY];
                }
            }
        };

        // Place the rooms
        placeRoom(leftRoom, leftRoomStartX, leftRoomStartY);
        placeRoom(rightRoom, rightRoomStartX, rightRoomStartY);
        placeRoom(topRoom, topRoomStartX, topRoomStartY);
    }




//Create spawn Room

//     while (sectionX < this.width && sectionY < this.height){
//         const room = this.rooms[Math.floor(random() * this.rooms.length)]

//         // Place the room within the section
//         for (let x = sectionX; x < sectionX + sectionWidth; x++) {
//             for (let y = sectionY; y < sectionY + sectionHeight; y++) {

//                 const roomX = x - sectionX;
//                 const roomY = y - sectionY;
//                 // Check if the relative positions are within the room's dimensions
//                 if (roomX >= 0 && roomY >= 0  &&  roomX < room.roomWidth &&  roomY < room.roomHeight) {
//                     this.tiles[x][y] = room.tiles[roomX][roomY];
//                 }
//             }
//         }
//         sectionX += sectionWidth;
//         if (sectionX >= this.width) {
//             sectionX = 0;
//             sectionY += sectionHeight;
//         }
//     }



    createGrid = (width, height) => {
        // Set the size and shape of the rooms
        // determine if big/medium/small
        // if big then size is = 3-2
        // if med then = 5-4

        const rooms = [
            new SquareRoom(width, height, "medium"),
            new TshapeRoom(width, height, "medium"),
            new LShapeRoom(width, height, "medium"),
            new RectShapeRoom(width, height, "medium"),
            // new PlusShapeRoom(width, height, "medium"),
            // new HoleShapeRoom(width, height, "medium"),
        ];
        this.rooms = rooms;
        this.placeRooms();
      };
}

export default Map
