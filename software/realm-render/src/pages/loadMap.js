import React from "react";
import '../styles/LoadMap.css';
import { Link } from 'react-router-dom';
import Tile from '../Model/Tile';
import TileComponent from '../Model/TileComponent';
import seedrandom from 'seedrandom';
import { SquareRoom, TshapeRoom } from "../Model/BasicRooms";
import Map from "../Model/Map";

const createGrid = (width, height) => {
  console.log('hello create grid');
  const map = new Map(width, height);
  const room1 = new SquareRoom(width/3, height/3);
  const room2 = new TshapeRoom(width/3, height/3);
  const rooms = [room1, room2];
  map.setRooms(rooms);
  const grid = map.tiles;
//   for (let x = 0; x < sectionWidth; x++) {
//     for (let y = 0; y < sectionHeight; y++) {
//         const testTile = this.tiles[x][y];
//         console.log(`Tile at (${x}, ${y}):`);
//         console.log(`  Type: ${testTile.type}`);
//         console.log(`  Contents: ${testTile.contents}`);
//         console.log(`  Directions:`, testTile.directions);
// // Add more properties as needed
//     }
// }

  return grid;
};

const LoadMap = () => {
    console.log('hello loadMap')
    const seed = 'exampleSeed';
    const grid = createGrid(30, 30);
    return (
      <div className="LoadMap">
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
    );
  };

export default LoadMap;
