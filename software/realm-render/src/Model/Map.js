/**
 * Map will represent the current dungeon map.
 * The dungeon map will be a 2D array of tiles.
 * There are different rooms and hallways.
 * and each tile will have a type with various items possiblys
 * Map is currently unused in the current build.
 */
import { SquareRoom, TshapeRoom, RectShapeRoom, PlusShapeRoom, HoleShapeRoom} from "../Model/BasicRooms";
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
    makeEmptyMap(width, height, theme) {
        // console.log('hello create empty');
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

        const placeRoom = (room, startX, startY) => {
            room.globalX = startX;
            room.globalY = startY;
            for (let x = startX; x < startX + room.roomWidth; x++) {
                for (let y = startY; y < startY + room.roomHeight; y++) {
                    const roomX = x - startX;
                    const roomY = y - startY;
                    if(!this.tiles[x][y].isWall()){
                        this.tiles[x][y].theme = room.tiles[roomX][roomY].theme;
                        this.tiles[x][y].contents = room.tiles[roomX][roomY].contents;
                        this.tiles[x][y].setType(room.tiles[roomX][roomY].type);
                    }
                }
            }
        };

        //True if out of bounds
        const boundryCheckRoom = (room, startX, startY) => {
            return (startX < 0 || startY < 0 || startX + room.roomWidth > this.width || startY + room.roomHeight > this.height);
        };

        //True if overlapping
        const overlappingRooms = (room, startX, startY) => {


            for (let x = startX + 1; x < startX + room.roomWidth - 1; x++) {
                for (let y = startY + 1; y < startY + room.roomHeight - 1; y++) {
                    //console.log(typeof this.tiles[0][0])
                    //console.log(typeof this.tiles[x][y])
                    if (this.tiles[x][y].type !== "") {
                        return true;
                    }
                }
            }
            return false;
        };



        // Place the spawn room first.



        //Write a recursive function to place the rooms in the correct locations, and generate rooms from the left and right rooms like the spawn rooms

        let Depth = 0;
        let usedExits = [];
        let allExits = [];

        const placeRoomRecursively = (parentRoom, startX, startY) => {

            placeRoom(parentRoom, startX, startY);




            // Determine the coordinates for the exits of the parent room
            const upExit = parentRoom.getGlobalExitCoordinates("up", 0);
            const leftExit = parentRoom.getGlobalExitCoordinates("left", 0);
            const rightExit = parentRoom.getGlobalExitCoordinates("right", 0);
            const downExit = parentRoom.getGlobalExitCoordinates("down", 0);

            // Add the exits to the list of all exits
            allExits.push(upExit);
            allExits.push(leftExit);
            allExits.push(rightExit);
            allExits.push(downExit);


            // Generate adjacent rooms

            let topRoom = this.rooms[Math.floor(random() * this.rooms.length)];
            let topRoomStartX = upExit.x - topRoom.exits.down[0].x;
            let topRoomStartY = upExit.y - topRoom.exits.down[0].y;
            for (let i = 0; i < 20; i++) {
                topRoom = this.rooms[Math.floor(random() * this.rooms.length)];
                topRoomStartX = upExit.x - topRoom.exits.down[0].x;
                topRoomStartY = upExit.y - topRoom.exits.down[0].y;
                if (!boundryCheckRoom(topRoom, topRoomStartX, topRoomStartY)) {
                    if (!overlappingRooms(topRoom, topRoomStartX, topRoomStartY)) {

                        break;
                    }
                }
            }






            let leftRoom = this.rooms[Math.floor(random() * this.rooms.length)];
            let leftRoomStartX = leftExit.x - leftRoom.exits.right[0].x;
            let leftRoomStartY = leftExit.y - leftRoom.exits.right[0].y;
            for (let i = 0; i < 20; i++) {
                leftRoom = this.rooms[Math.floor(random() * this.rooms.length)];
                leftRoomStartX = leftExit.x - leftRoom.exits.right[0].x;
                leftRoomStartY = leftExit.y - leftRoom.exits.right[0].y;
                if (!boundryCheckRoom(leftRoom, leftRoomStartX, leftRoomStartY)) {
                    if (!overlappingRooms(leftRoom, leftRoomStartX, leftRoomStartY)) {

                        break;
                    }
                }
            }


            let rightRoom = this.rooms[Math.floor(random() * this.rooms.length)];
            let rightRoomStartX = rightExit.x - rightRoom.exits.left[0].x;
            let rightRoomStartY = rightExit.y - rightRoom.exits.left[0].y;
            for (let i = 0; i < 20; i++) {
                rightRoom = this.rooms[Math.floor(random() * this.rooms.length)];
                rightRoomStartX = rightExit.x - rightRoom.exits.left[0].x;
                rightRoomStartY = rightExit.y - rightRoom.exits.left[0].y;
                if (!boundryCheckRoom(rightRoom, rightRoomStartX, rightRoomStartY)) {
                    if (!overlappingRooms(rightRoom, rightRoomStartX, rightRoomStartY)) {

                        break;
                    }
                }
            }

            let downRoom = this.rooms[Math.floor(random() * this.rooms.length)];
            let downRoomStartX = downExit.x - downRoom.exits.up[0].x;
            let downRoomStartY = downExit.y - downRoom.exits.up[0].y;
            for (let i = 0; i < 20; i++) {
                downRoom = this.rooms[Math.floor(random() * this.rooms.length)];
                downRoomStartX = downExit.x - downRoom.exits.up[0].x;
                downRoomStartY = downExit.y - downRoom.exits.up[0].y;
                if (!boundryCheckRoom(downRoom, downRoomStartX, downRoomStartY)) {
                    if (!overlappingRooms(downRoom, downRoomStartX, downRoomStartY)) {

                        break;
                    }
                }
            }


            // Recursively place the adjacent rooms (add conditions to stop recursion as needed)
            Depth = Depth + 1;
            if (Depth >= 30) {
                return;
            }

            const actions = [
                () => {
                    if (!boundryCheckRoom(topRoom, topRoomStartX, topRoomStartY)) {
                        if (!overlappingRooms(topRoom, topRoomStartX, topRoomStartY)) {
                            usedExits.push(upExit);
                            placeRoomRecursively(topRoom, topRoomStartX, topRoomStartY);
                        }
                    }
                },
                () => {
                    if (!boundryCheckRoom(leftRoom, leftRoomStartX, leftRoomStartY)) {
                        if (!overlappingRooms(leftRoom, leftRoomStartX, leftRoomStartY)) {
                            usedExits.push(leftExit);
                            placeRoomRecursively(leftRoom, leftRoomStartX, leftRoomStartY);
                        }
                    }
                },
                () => {
                    if (!boundryCheckRoom(rightRoom, rightRoomStartX, rightRoomStartY)) {
                        if (!overlappingRooms(rightRoom, rightRoomStartX, rightRoomStartY)) {
                            usedExits.push(rightExit);
                            placeRoomRecursively(rightRoom, rightRoomStartX, rightRoomStartY);
                        }
                    }
                },
                () => {
                    if (!boundryCheckRoom(downRoom, downRoomStartX, downRoomStartY)) {
                        if (!overlappingRooms(downRoom, downRoomStartX, downRoomStartY)) {
                            usedExits.push(downExit);
                            placeRoomRecursively(downRoom, downRoomStartX, downRoomStartY);
                        }
                    }
                }
            ];

            // Fisher-Yates Shuffle
            for (let i = actions.length - 1; i > 0; i--) {
                const j = Math.floor(random() * (i + 1));
                [actions[i], actions[j]] = [actions[j], actions[i]];
            }

            // Execute randomized actions
            actions.forEach((action) => action());



        };

        placeRoomRecursively(spawnRoom, spawnRoomStartX, spawnRoomStartY);
        //Check if the exit is a part of all exits but not a part of used exits replace with wall tile
        for (let i = 0; i < allExits.length; i++) {
            let found = false;
            for (let j = 0; j < usedExits.length; j++) {
                if (allExits[i].x === usedExits[j].x && allExits[i].y === usedExits[j].y) {
                    found = true;
                }
            }
            if (!found) {
                this.tiles[allExits[i].x][allExits[i].y].setType("wall");
            }
        }
        //If a floor tile is directly beside a used exit tile replace with a floor tile or chest tile or bigObject tile
        for (let i = 0; i < usedExits.length; i++) {
            const directions = [
                { dx: 1, dy: 0 }, // Right
                { dx: -1, dy: 0 }, // Left
                { dx: 0, dy: 1 }, // Below
                { dx: 0, dy: -1 }  // Above
            ];

            for (const { dx, dy } of directions) {
                const x = usedExits[i].x + dx;
                const y = usedExits[i].y + dy;
                const tileType = this.tiles[x][y].type;

              if (["floor", "chest", "BigObject", "object"].includes(tileType)) {
                  this.tiles[x][y].setType("cleanFloor");
              }
          }
      }
      //Make all tiles within spawn room that are of these types cleanFloor
      for (let x = spawnRoomStartX; x < spawnRoomStartX + spawnRoom.roomWidth; x++) {
          for (let y = spawnRoomStartY; y < spawnRoomStartY + spawnRoom.roomHeight; y++) {
              const tileType = this.tiles[x][y].type;
              if (["floor", "chest", "BigObject", "object"].includes(tileType)) {
                  this.tiles[x][y].setType("cleanFloor");
              }
          }
      }


    }








    createGrid = (width, height) => {
        // Set the size and shape of the rooms
        // determine if big/medium/small
        // if big then size is = 3-2
        // if med then = 5-4

        const rooms = [
            new SquareRoom(width, height, "medium", this.theme, this.seed),
            new SquareRoom(width, height, "medium", this.theme, this.seed + 1),
            new SquareRoom(width, height, "medium", this.theme, this.seed + 2),
            new SquareRoom(width, height, "medium", this.theme, this.seed + 3),
            new SquareRoom(width, height, "medium", this.theme, this.seed + 4),
            new SquareRoom(width, height, "medium", this.theme, this.seed + 5),
            new SquareRoom(width, height, "medium", this.theme, this.seed + 6),
            new SquareRoom(width, height, "medium", this.theme, this.seed + 7),
            new SquareRoom(width, height, "medium", this.theme, this.seed + 8),
            new SquareRoom(width, height, "medium", this.theme, this.seed + 9),
            new SquareRoom(width, height, "medium", this.theme, this.seed + 10),


            new SquareRoom(width, height, "large", this.theme, this.seed),
            new SquareRoom(width, height, "large", this.theme, this.seed + 1),
            new SquareRoom(width, height, "large", this.theme, this.seed + 2),
            new SquareRoom(width, height, "large", this.theme, this.seed + 3),
            new SquareRoom(width, height, "large", this.theme, this.seed + 4),
            new SquareRoom(width, height, "large", this.theme, this.seed + 5),


            new SquareRoom(width, height, "small", this.theme, this.seed),
            new SquareRoom(width, height, "small", this.theme, this.seed + 1),
            new SquareRoom(width, height, "small", this.theme, this.seed + 2),
            new SquareRoom(width, height, "small", this.theme, this.seed + 3),
            new SquareRoom(width, height, "small", this.theme, this.seed + 4),
            new SquareRoom(width, height, "small", this.theme, this.seed + 5),

            new TshapeRoom(width, height, "medium", this.theme, this.seed),
            new TshapeRoom(width, height, "medium", this.theme, this.seed + 1),
            new TshapeRoom(width, height, "medium", this.theme, this.seed + 2),
            new TshapeRoom(width, height, "medium", this.theme, this.seed + 3),
            new TshapeRoom(width, height, "medium", this.theme, this.seed + 4),

            new TshapeRoom(width, height, "large", this.theme, this.seed),
            new TshapeRoom(width, height, "large", this.theme, this.seed + 1),
            new TshapeRoom(width, height, "large", this.theme, this.seed + 2),
            new TshapeRoom(width, height, "large", this.theme, this.seed + 3),
            new TshapeRoom(width, height, "large", this.theme, this.seed + 4),

            //cant use TshapeRoom small size just dont work

            // L shape doesnt work with current system


            new RectShapeRoom(width, height, "medium", this.theme, this.seed),
            new RectShapeRoom(width, height, "medium", this.theme, this.seed + 1),
            new RectShapeRoom(width, height, "medium", this.theme, this.seed + 2),
            new RectShapeRoom(width, height, "medium", this.theme, this.seed + 3),
            new RectShapeRoom(width, height, "medium", this.theme, this.seed + 4),
            new RectShapeRoom(width, height, "medium", this.theme, this.seed + 5),

            new PlusShapeRoom(width, height, "medium", this.theme, this.seed),
            new PlusShapeRoom(width, height, "medium", this.theme, this.seed + 1),
            new PlusShapeRoom(width, height, "medium", this.theme, this.seed + 2),
            new PlusShapeRoom(width, height, "medium", this.theme, this.seed + 3),
            new PlusShapeRoom(width, height, "medium", this.theme, this.seed + 4),

            new PlusShapeRoom(width, height, "large", this.theme, this.seed),
            new PlusShapeRoom(width, height, "large", this.theme, this.seed + 1),
            new PlusShapeRoom(width, height, "large", this.theme, this.seed + 2),

            new HoleShapeRoom(width, height, "medium", this.theme, this.seed),
            new HoleShapeRoom(width, height, "medium", this.theme, this.seed + 1),
            new HoleShapeRoom(width, height, "medium", this.theme, this.seed + 2),
            new HoleShapeRoom(width, height, "medium", this.theme, this.seed + 3),

            new HoleShapeRoom(width, height, "large", this.theme, this.seed),
            new HoleShapeRoom(width, height, "large", this.theme, this.seed + 1),
            new HoleShapeRoom(width, height, "large", this.theme, this.seed + 2),
        ];
        this.rooms = rooms;
        this.placeRooms();
    };
}

export default Map
