import React from "react";
import '../styles/mapEditor.css';
import { Link } from 'react-router-dom';
import Map from '../Model/Map';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import TileComponent from '../Model/TileComponent';

const LoadMap = () => {
  const transformOptions = {
    initialScale: 1,
    minScale: 0.5,
    maxScale: 2
  }

  const seed = 'exampleSeed';
  const map = new Map(seed, 20, 3, 6, 7);
  map.createGrid();
  const grid = map.getMap();

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
