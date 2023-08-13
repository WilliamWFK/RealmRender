import React from 'react';

const TileComponent = ({ tile }) => {
  return (
    <div className="tile">
      <img src={tile.image} style={{transform: `rotate(${tile.rotate}deg)`}} alt={`Tile (${tile.x}, ${tile.y})`}/>
    </div>
  );
};

export default TileComponent;