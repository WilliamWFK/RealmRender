import React from "react";
import '../styles/mapEditor.css';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import TileComponent from '../Model/TileComponent';
import seedrandom from 'seedrandom';
import { useLocation } from 'react-router-dom';
import { SquareRoom, TshapeRoom, LShapeRoom, RectShapeRoom, PlusShapeRoom, HoleShapeRoom } from "../Model/BasicRooms";
import Map from "../Model/Map";
import { useEffect } from 'react';


const LoadMap = () => {
  const location = useLocation();
  const { state } = location;

  const createGrid = (width, height, seed) => {
    console.log('hello create grid');
    const map = new Map(width, height);
    const room1 = new SquareRoom(width/3 - 2, height/3 - 2);
    const room2 = new TshapeRoom(width/3 - 2, height/3 - 2);
    const room3 = new LShapeRoom(width/3 - 2, height/3 - 2);
    const room4 = new RectShapeRoom(width/3 - 2, height/3 - 2);
    const room5 = new PlusShapeRoom(width/3 - 2, height/3 - 2);
    const room6 = new HoleShapeRoom(width/3 - 2, height/3 - 2);
    const rooms = [room6, room5, room4];
    map.setRooms(rooms);
    const grid = map.tiles;

    return grid;
  };

  const transformOptions = {
    initialScale: 1,
    minScale: 0.5,
    maxScale: 2
  }

  const seed = 'exampleSeed';
  const grid = createGrid(state.width, state.height, seed);

  const containerStyles = {
    '--columns': state.width,
    '--rows': state.height,
  };
  

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
                <div className="map-container" style={containerStyles}>
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
