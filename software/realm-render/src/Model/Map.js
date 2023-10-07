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
    constructor(width, height, seed, theme) {
        this.tiles = [];
        this.tilesOccupied = [];
        this.rooms = [];
        this.width = width;
        this.height = height;
        this.gmView = false;
        this.seed = seed;
        this.theme = theme;
        this.makeEmptyMap(this.width, this.height);
        this.createGrid(this.width, this.height);

    }

    /**
     * creates an empty map
     *
     * @param {int} width
     * @param {int} height
     */
    makeEmptyMap(width, height, theme){
        console.log('hello create empty');
        const newMap = []
        for (let x = 0; x < width; x++) {
            const row = [];
            for (let y = 0; y < height; y++) {
                const tile = new Tile(x, y, "", theme);
                row.push(tile);
            }
            newMap.push(row)
        }
        this.tiles = newMap;
    }


    placeRooms() {
        const random = seedrandom(this.seed);
        const spawnRoom = new SquareRoom(this.width, this.height, "medium", this.theme);
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

        //True if out of bounds
        const boundryCheckRoom = (room, startX, startY) => {
                return (startX < 0 || startY < 0 || startX + room.roomWidth > this.width || startY + room.roomHeight > this.height);
        };

        //True if overlapping
        const overlappingRooms = (room, startX, startY) => {


            for (let x = startX +1; x < startX + room.roomWidth -1; x++) {
                for (let y = startY+1; y < startY + room.roomHeight -1; y++) {
                    console.log(typeof this.tiles[0][0])
                    console.log(typeof this.tiles[x][y])
                    if(this.tiles[x][y].type !== ""){
                        return true;
                    }
                }
            }
            return false;
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
            const downExit = parentRoom.getGlobalExitCoordinates("down", 0);

            // Generate adjacent rooms
            let topRoom = this.rooms[Math.floor(Math.random() * this.rooms.length)];
            let topRoomStartX = upExit.x - topRoom.exits.down[0].x;
            let topRoomStartY = upExit.y - topRoom.exits.down[0].y;
            for(let i = 0; i < 20; i++){
                topRoom = this.rooms[Math.floor(Math.random() * this.rooms.length)];
                topRoomStartX = upExit.x - topRoom.exits.down[0].x;
                topRoomStartY = upExit.y - topRoom.exits.down[0].y;
                if(!boundryCheckRoom(topRoom, topRoomStartX, topRoomStartY)){
                    if(!overlappingRooms(topRoom, topRoomStartX, topRoomStartY)){
                        break;
                    }
                }
            }





            let leftRoom = this.rooms[Math.floor(Math.random() * this.rooms.length)];
            let leftRoomStartX = leftExit.x - leftRoom.exits.right[0].x;
            let leftRoomStartY = leftExit.y - leftRoom.exits.right[0].y;
            for(let i = 0; i < 20; i++){
                leftRoom = this.rooms[Math.floor(Math.random() * this.rooms.length)];
                leftRoomStartX = leftExit.x - leftRoom.exits.right[0].x;
                leftRoomStartY = leftExit.y - leftRoom.exits.right[0].y;
                if(!boundryCheckRoom(leftRoom, leftRoomStartX, leftRoomStartY)){
                    if(!overlappingRooms(leftRoom, leftRoomStartX, leftRoomStartY)){
                        break;
                    }
                }
            }


            let rightRoom = this.rooms[Math.floor(Math.random() * this.rooms.length)];
            let rightRoomStartX = rightExit.x - rightRoom.exits.left[0].x;
            let rightRoomStartY = rightExit.y - rightRoom.exits.left[0].y;
            for(let i = 0; i < 20; i++){
                rightRoom = this.rooms[Math.floor(Math.random() * this.rooms.length)];
                rightRoomStartX = rightExit.x - rightRoom.exits.left[0].x;
                rightRoomStartY = rightExit.y - rightRoom.exits.left[0].y;
                if(!boundryCheckRoom(rightRoom, rightRoomStartX, rightRoomStartY)){
                    if(!overlappingRooms(rightRoom, rightRoomStartX, rightRoomStartY)){
                        break;
                    }
                }
            }

            let downRoom = this.rooms[Math.floor(Math.random() * this.rooms.length)];
            let downRoomStartX = downExit.x - downRoom.exits.up[0].x;
            let downRoomStartY = downExit.y - downRoom.exits.up[0].y;
            for(let i = 0; i < 20; i++){
                downRoom = this.rooms[Math.floor(Math.random() * this.rooms.length)];
                downRoomStartX = downExit.x - downRoom.exits.up[0].x;
                downRoomStartY = downExit.y - downRoom.exits.up[0].y;
                if(!boundryCheckRoom(downRoom, downRoomStartX, downRoomStartY)){
                    if(!overlappingRooms(downRoom, downRoomStartX, downRoomStartY)){
                        break;
                    }
                }
            }


            // Recursively place the adjacent rooms (add conditions to stop recursion as needed)
            Depth = Depth + 1;
            if(Depth >= 25){
                return;
            }

            const actions = [
                () => {
                  if(!boundryCheckRoom(topRoom, topRoomStartX, topRoomStartY)){
                    if(!overlappingRooms(topRoom, topRoomStartX, topRoomStartY)){
                      placeRoomRecursively(topRoom, topRoomStartX, topRoomStartY);
                    }
                  }
                },
                () => {
                  if(!boundryCheckRoom(leftRoom, leftRoomStartX, leftRoomStartY)){
                    if(!overlappingRooms(leftRoom, leftRoomStartX, leftRoomStartY)){
                      placeRoomRecursively(leftRoom, leftRoomStartX, leftRoomStartY);
                    }
                  }
                },
                () => {
                  if(!boundryCheckRoom(rightRoom, rightRoomStartX, rightRoomStartY)){
                    if(!overlappingRooms(rightRoom, rightRoomStartX, rightRoomStartY)){
                      placeRoomRecursively(rightRoom, rightRoomStartX, rightRoomStartY);
                    }
                  }
                },
                () => {
                  if(!boundryCheckRoom(downRoom, downRoomStartX, downRoomStartY)){
                    if(!overlappingRooms(downRoom, downRoomStartX, downRoomStartY)){
                      placeRoomRecursively(downRoom, downRoomStartX, downRoomStartY);
                    }
                  }
                }
              ];

              // Fisher-Yates Shuffle
              for (let i = actions.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [actions[i], actions[j]] = [actions[j], actions[i]];
              }

              // Execute randomized actions
              actions.forEach((action) => action());



        };

        placeRoomRecursively(spawnRoom, spawnRoomStartX, spawnRoomStartY);


    }








    createGrid = (width, height) => {
        // Set the size and shape of the rooms
        // determine if big/medium/small
        // if big then size is = 3-2
        // if med then = 5-4

        const rooms = [
            new SquareRoom(width, height, "medium", this.theme),
            new SquareRoom(width, height, "medium", this.theme),
            new SquareRoom(width, height, "medium", this.theme),
            new SquareRoom(width, height, "medium", this.theme),
            new SquareRoom(width, height, "medium", this.theme),
            new SquareRoom(width, height, "medium", this.theme),
            new SquareRoom(width, height, "medium", this.theme),
            new SquareRoom(width, height, "medium", this.theme),
            new SquareRoom(width, height, "medium", this.theme),
            new SquareRoom(width, height, "medium", this.theme),
            new SquareRoom(width, height, "medium", this.theme),
            new SquareRoom(width, height, "medium", this.theme),
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
