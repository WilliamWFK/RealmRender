import React from "react";
import '../styles/mapEditor.css';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import Tile from '../Model/Tile';
import TileComponent from '../Model/TileComponent';
import seedrandom from 'seedrandom';
import { useLocation } from 'react-router-dom';

const LoadMap = () => {
  const location = useLocation();
  const { state } = location;

  const createRoom = (grid, startX, startY, roomWidth, roomHeight) => {
    for (let x = startX; x < startX + roomWidth; x++) {
      for (let y = startY; y < startY + roomHeight; y++) {
        const tile = grid[x][y];
        if (x === startX || x === startX + roomWidth - 1 || y === startY || y === startY + roomHeight - 1) {
          tile.setDirections("wall", "wall", "wall", "wall");
        } else {
          tile.setDirections("empty", "empty", "empty", "empty");
        }
        tile.selectImage();
      }
    }
  };

  const createCorridor = (grid, startX, startY, endX, endY) => {
    let x = startX;
    let y = startY;

    // Determine whether to move horizontally or vertically first
    const moveHorizontallyFirst = Math.abs(endX - startX) > Math.abs(endY - startY);

    while (x !== endX || y !== endY) {
      const tile = grid[x][y];
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
  };


  const createGrid = (seed) => {
    const gridSize = 20;
    const grid = [];
    const random = seedrandom(seed);
    const numberOfRooms = 3;
    const minRoomSize = 6;
    const maxRoomSize = 7;
    const rooms = [];

    for (let x = 0; x < gridSize; x++) {
      const row = [];
      for (let y = 0; y < gridSize; y++) {
        const tile = new Tile(x, y, 0, "grass", "nothing");
        tile.setDirections("wall", "wall", "wall", "wall");
        row.push(tile);
      }
      grid.push(row);
    }

    // Create rooms without overlap
    for (let i = 0; i < numberOfRooms; i++) {
      let overlap;
      let room;
      do {
        overlap = false;
        const roomWidth = Math.floor(random() * (maxRoomSize - minRoomSize + 1)) + minRoomSize;
        const roomHeight = Math.floor(random() * (maxRoomSize - minRoomSize + 1)) + minRoomSize;
        const startX = Math.floor(random() * (gridSize - roomWidth)) + 1;
        const startY = Math.floor(random() * (gridSize - roomHeight)) + 1;
        room = { startX, startY, width: roomWidth, height: roomHeight };

        // Check for overlap with existing rooms
        for (const existingRoom of rooms) {
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

      createRoom(grid, room.startX, room.startY, room.width, room.height);
      rooms.push(room);
    }

    // Connect rooms with corridors
    for (let i = 0; i < rooms.length - 1; i++) {
      const room1 = rooms[i];
      const room2 = rooms[i + 1];
      const startX = room1.startX + Math.floor(room1.width / 2);
      const startY = room1.startY + Math.floor(room1.height / 2); // Connect from the center
      const endX = room2.startX + Math.floor(room2.width / 2);
      const endY = room2.startY + Math.floor(room2.height / 2); // Connect to the center

      createCorridor(grid, startX, startY, endX, endY);
    }

    return grid;
  };

  const transformOptions = {
    initialScale: 1,
    minScale: 0.5,
    maxScale: 2
  }

  const seed = 'exampleSeed';
  const grid = createGrid(seed);

    return (
      <TransformWrapper
        initialScale={2}
        options={transformOptions}
        initialPositionX={0}
        initialPositionY={0}
      >
        {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
          <React.Fragment>
            {/* <div className="tools">
              <button onClick={() => zoomIn()}>+</button>
              <button onClick={() => zoomOut()}>-</button>
              <button onClick={() => resetTransform()}>x</button>
            </div> */}
            <TransformComponent>
              <div className="viewPane">
                  <div className="CreateMap">
                  <h1>Create Map Here with Received Data</h1>
                  <div>{state.name}</div>
                  <div>{state.theme}</div>
                  <div>{state.width}</div>
                  <div>{state.height}</div>
                  <div>{state.players}</div>
              </div>
                <div className="map-container">
                  {grid.map((row, rowIndex) => (
                    <div key={rowIndex} className="grid-row">
                      {row.map((tile, columnIndex) => (
                        <TileComponent key={columnIndex} tile={tile} />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </TransformComponent>
          </React.Fragment>
        )}
      </TransformWrapper>
    );
  };

export default LoadMap;
