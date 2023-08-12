import React from 'react';

const TileComponent = ({ tile }) => {
  return (
    <div className="tile">
      <img src={tile.image} alt={`Tile (${tile.x}, ${tile.y})`} />
    </div>
  );
};

export default TileComponent;