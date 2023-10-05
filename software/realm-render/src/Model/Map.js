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
                tile.setType("floor")
                row.push(tile);
            }
            newMap.push(row)
        }
        this.tiles = newMap;
    }

    placeRooms() {
        const random = seedrandom(this.seed);
        const spawnRoom = new SquareRoom(this.width, this.height, "medium");
        //spawnRoom.addExits();
        const spawnRoomStartX = Math.floor((this.width - spawnRoom.roomWidth) / 2);
        const spawnRoomStartY = this.height - spawnRoom.roomHeight;
        
        const leftRoom = this.rooms[Math.floor(Math.random() * this.rooms.length)];
        //leftRoom.addExits();
        const rightRoom = this.rooms[Math.floor(Math.random() * this.rooms.length)];
        //rightRoom.addExits();
        const topRoom = this.rooms[Math.floor(Math.random() * this.rooms.length)];
        //topRoom.addExits();
        
        const placeRoom = (room, startX, startY) => {
            room.globalX = startX;
            room.globalY = startY;
            for (let x = startX; x < startX + room.roomWidth; x++) {
                for (let y = startY; y < startY + room.roomHeight; y++) {
                    const roomX = x - startX;
                    const roomY = y - startY;
                    this.tiles[x][y].theme = room.tiles[roomX][roomY].theme;
                    this.tiles[x][y].contents = room.tiles[roomX][roomY].contents;
                    this.tiles[x][y].setType(room.tiles[roomX][roomY].type);
                }
            }
        };

    
        // Place the spawn room first.
        


        //Write a recursive function to place the rooms in the correct locations, and generate rooms from the left and right rooms like the spawn rooms
        
        let Depth = 0;
        
        const placeRoomRecursively = (parentRoom, startX, startY) => {
            placeRoom(parentRoom, startX, startY);

            // Determine the coordinates for the exits of the parent room
            const upExit = parentRoom.getGlobalExitCoordinates("up", 0);
            const leftExit = parentRoom.getGlobalExitCoordinates("left", 0);
            const rightExit = parentRoom.getGlobalExitCoordinates("right", 0);

            // Generate adjacent rooms
            const topRoom = this.rooms[Math.floor(Math.random() * this.rooms.length)];
            const topRoomStartX = upExit.x - topRoom.exits.down[0].x;
            const topRoomStartY = upExit.y - topRoom.exits.down[0].y;

            const leftRoom = this.rooms[Math.floor(Math.random() * this.rooms.length)];
            const leftRoomStartX = leftExit.x - leftRoom.exits.right[0].x;
            const leftRoomStartY = leftExit.y - leftRoom.exits.right[0].y;

            const rightRoom = this.rooms[Math.floor(Math.random() * this.rooms.length)];
            const rightRoomStartX = rightExit.x - rightRoom.exits.left[0].x;
            const rightRoomStartY = rightExit.y - rightRoom.exits.left[0].y;

            // Recursively place the adjacent rooms (add conditions to stop recursion as needed)
            Depth = Depth + 1;
            if(Depth >= 4){
                return;
            }
            placeRoomRecursively(topRoom, topRoomStartX, topRoomStartY);
            placeRoomRecursively(leftRoom, leftRoomStartX, leftRoomStartY);
            placeRoomRecursively(rightRoom, rightRoomStartX, rightRoomStartY);
            
            
        };

        placeRoomRecursively(spawnRoom, spawnRoomStartX, spawnRoomStartY);

        

        //const spawnRoomRightExit = spawnRoom.getGlobalExitCoordinates("right", 0)
        //const rightRoomStartX = spawnRoomRightExit.x - rightRoom.exits.left[0].x;
        //const rightRoomStartY = spawnRoomRightExit.y - rightRoom.exits.left[0].y;
        //placeRoom(rightRoom, rightRoomStartX, rightRoomStartY);
        

    
        // Determine the coordinates for the exits of the left room.
        //const leftRoomRightExitX = leftRoom.exits.right[0].x;
        //const leftRoomRightExitY = leftRoom.exits.right[0].y;
    
        // Calculate and place the left room.
        //const leftRoomStartX = spawnRoomStartX + spawnRoomUpExitX - leftRoomRightExitX;
        //const leftRoomStartY = spawnRoomStartY + spawnRoomUpExitY - leftRoomRightExitY;
        //placeRoom(leftRoom, leftRoomStartX, leftRoomStartY);
    
        // Determine the coordinates for the exits of the right room.
        //const rightRoomLeftExitX = rightRoom.exits.left[0].x;
        //const rightRoomLeftExitY = rightRoom.exits.left[0].y;
    
        // Calculate and place the right room.
        //const rightRoomStartX = spawnRoomStartX + spawnRoomUpExitX - rightRoomLeftExitX;
        //const rightRoomStartY = spawnRoomStartY + spawnRoomUpExitY - rightRoomLeftExitY;
        //placeRoom(rightRoom, rightRoomStartX, rightRoomStartY);
    
        // Determine the coordinates for the exits of the top room.
        //const topRoomDownExitX = topRoom.exits.down[0].x;
        //const topRoomDownExitY = topRoom.exits.down[0].y;
    
        // Calculate and place the top room.
        //const topRoomStartX = spawnRoomStartX + spawnRoomUpExitX - topRoomDownExitX;
        //const topRoomStartY = spawnRoomStartY + spawnRoomUpExitY - topRoomDownExitY;
        //placeRoom(topRoom, topRoomStartX, topRoomStartY);
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
            new SquareRoom(width, height, "medium"),
            new SquareRoom(width, height, "medium"),
            new SquareRoom(width, height, "medium"),
            //new TshapeRoom(width, height, "medium"),
            //new LShapeRoom(width, height, "medium"),
            //new RectShapeRoom(width, height, "medium"),
            // new PlusShapeRoom(width, height, "medium"),
            // new HoleShapeRoom(width, height, "medium"),
        ];
        this.rooms = rooms;
        this.placeRooms();
      };
}

export default Map
