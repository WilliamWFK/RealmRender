import './styles/App.css';
import background from './RealmRenderWireframe1.drawio.svg';
import React from 'react';
import Tile from './Model/Tile';
import Room from './Model/Room';
import Map from './Model/Map';
import Game from './Model/Game';
import TileComponent from './Model/TileComponent';

const createGrid = (width, height) => {
  const tileEdge = ["wall", "empty"];
  const grid = [];
  for (let x = 0; x < width; x++) {
    const row = [];
    for (let y = 0; y < height; y++) {
      const tile = new Tile(x, y, 0, "grass", "nothing");
      tile.setDirections(tileEdge[Math.floor(Math.random() * tileEdge.length)],tileEdge[Math.floor(Math.random() * tileEdge.length)]
      ,tileEdge[Math.floor(Math.random() * tileEdge.length)],tileEdge[Math.floor(Math.random() * tileEdge.length)]);
      tile.selectImage();
      row.push(tile);
    }
    grid.push(row);
  }

  return grid;
};

const createRoom = () => {
  const roomObj = new Room();
  const tileEdge = ["wall", "empty"];
  const room = [];
  for (let x = 0; x < 10; x++) {
    const row = [];
    for (let y = 0; y < 10; y++) {
      const tile = new Tile(x, y, 0, "grass", "nothing");
      if (y === 0){
        tile.setUp("wall");
      }
      if(x === 0){
        tile.setLeft("wall")
      }
      if(x === 9){
        tile.setRight("wall")
      }
      if(y === 9 && x < 4){
        tile.setDown("wall")
      }
      if(y === 9 && x > 5){
        tile.setDown("wall")
      }
      if(y > 5 && x === 3){
        tile.setRight("wall")
      }
      if(y > 5 && x === 5){
        tile.setRight("wall")
      }
      if(y === 6 && (x > 3 && x < 6)){
        tile.setUp("wall")
      }
      if(y === 2 && (x > 2 && x < 7)){
        tile.setUp("wall")
      }
      if(y === 4 && (x > 2 && x < 7)){
        tile.setDown("wall")
      }   
      if((y > 1 && y < 5) && x === 3){
        tile.setLeft("wall")
      }   
      if((y > 1 && y < 5) && x === 6){
        tile.setRight("wall")
      }   

      tile.selectImage();
      row.push(tile);
    }
    room.push(row);
  }
  roomObj.setTiles(room)
  return roomObj
}

const App = () => {
  const room = createRoom();
  const map = new Map(20,20);
  map.setRooms(room);
  map.setTiles(createGrid(map.width, map.height));
  const game = new Game();
  game.setMap(map);
  return (
    <div className="App">
      <div className="map-container">
      {map.tiles.map((row, rowIndex) => (
        <div key={rowIndex} className={"grid-row" + rowIndex}>
          {row.map((tile, colIndex) => {
            if (rowIndex < 10 && colIndex < 10) {
              // Render room tiles for the first 10 rows
              return <TileComponent key={colIndex} tile={room.tiles[rowIndex][colIndex]} />;
            } else {
              // Render regular map tiles for the remaining rows
              return <TileComponent key={colIndex} tile={tile} />;
            }
          })}
        </div>
      ))}
      </div>
    </div>
  );
};

export default App;

/** 
function App() {
  return (
    <div className="App">
      <header className="App-header">
        Realm Render
      </header>
      <div className="menuButtons">
        <a href="#" className="menuButtonItem"><p>New</p></a>
        <a href="#" className="menuButtonItem"><p>Load</p></a>
        <a href="#" className="menuButtonItem"><p>Join</p></a>
      </div>
      <img src={background} alt="background"></img>
    </div>
  );
}

export default App;
*/