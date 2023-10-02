import React from "react";
import '../styles/mapEditor.css';
import TileComponent from '../Model/TileComponent';
import { useLocation } from 'react-router-dom';
import Map from "../Model/Map";
import { ReactP5Wrapper } from "@p5-wrapper/react";
import { useEffect } from 'react';


const LoadMap = () => {
  const location = useLocation();
  const { state } = location;

  const transformOptions = {
    initialScale: 1,
    minScale: 0.5,
    maxScale: 2
  }

  const seed = 'exampleSeed';
  const map = new Map(state.width, state.height, seed);
  const grid = map.tiles;

  const containerStyles = {
    '--columns': state.width,
    '--rows': state.height,
  };



  return <ReactP5Wrapper sketch={setup} />;
};

export default LoadMap;

// <TransformWrapper
//         initialScale={2}
//         options={transformOptions}
//         initialPositionX={0}
//         initialPositionY={0}
//       >
//         {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
//           <React.Fragment>
//             {/* <div className="tools">
//               <button onClick={() => zoomIn()}>+</button>
//               <button onClick={() => zoomOut()}>-</button>
//               <button onClick={() => resetTransform()}>x</button>
//             </div> */}
//             <TransformComponent>
//               <div className="viewPane">
//                   <div className="CreateMap">
//                   <h1>Create Map Here with Received Data</h1>
//                   <div>{state.name}</div>
//                   <div>{state.theme}</div>
//                   <div>{state.width}</div>
//                   <div>{state.height}</div>
//                   <div>{state.players}</div>
//               </div>
//                 <div className="map-container" style={containerStyles}>
//                   {grid.map((row, rowIndex) => (
//                     <div key={rowIndex} className="grid-row">
//                       {row.map((tile, columnIndex) => (
//                         <TileComponent key={columnIndex} tile={tile} />
//                       ))}
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </TransformComponent>
//           </React.Fragment>
//         )}
//       </TransformWrapper>
