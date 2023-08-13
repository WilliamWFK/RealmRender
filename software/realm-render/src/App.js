import './styles/App.css';
import background from './RealmRenderWireframe1.drawio.svg';
import React from 'react';
import Tile from './Model/Tile';
import TileComponent from './Model/TileComponent';

const createGrid = () => {
  const tileEdge = ["wall", "empty"];
  const grid = [];
  for (let x = 0; x < 10; x++) {
    const row = [];
    for (let y = 0; y < 10; y++) {
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

const App = () => {
  const grid = createGrid();

  return (
    <div className="App">
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