import React from "react";
import Player from "../Model/Player";
import Map from "../Model/Map";
import { useLocation } from "react-router-dom";
import { ReactP5Wrapper } from "@p5-wrapper/react";

const LoadMap = () => {
  const { state } = useLocation();
  let mapObj;
  let mapped = [];
  let players = [];
  let activePlayer = -1;
  let prevX = -1;
  let prevY = -1;
  let mapX = 0;
  let mapY = 0;
  let tileSize = 32;
  let wallImg;
  let floorImg;
  let doorImg;
  let playerImg;

  function sketch(p5) {
    function draw() {
      p5.background(220);

      // draw map
      mapped.forEach(r => r.forEach(t => t.draw(p5, tileSize, mapX, mapY, floorImg, wallImg, doorImg)));

      // draw players
      players.forEach(p => p.draw(p5, tileSize, mapX, mapY));

      p5.frameRate(60);

    }

    // detect mouse clicks
    p5.mouseClicked = () => {
      let x = Math.floor(p5.mouseX / tileSize);
      let y = Math.floor(p5.mouseY / tileSize);

      //zoom in
      let tile = mapped.find(t => t.x + mapX === x && t.y + mapY === y);
      if (tile) {
        tile.type = "selected";
      }
    }

    p5.mousePressed = () => {
      if (prevX === -1 && prevY === -1) {
        prevX = p5.mouseX;
        prevY = p5.mouseY;
      }

      players.forEach(p => {
        if (p.on(p5.mouseX + (-(mapX) * tileSize), p5.mouseY + (-(mapY) * tileSize), p5, tileSize)) {
          activePlayer = p;
        }
      })

      if (!players.some(p => p.on(p5.mouseX + (-(mapX) * tileSize), p5.mouseY + (-(mapY) * tileSize), p5, tileSize))) {
        activePlayer = -1;
      }
    }

    p5.mouseDragged = () => {
      if (activePlayer !== -1) {
        activePlayer.x = p5.mouseX + (-(mapX) * tileSize);
        activePlayer.y = p5.mouseY + (-(mapY) * tileSize);
      } else {
        mapX += (p5.mouseX - prevX) / tileSize;
        mapY += (p5.mouseY - prevY) / tileSize;
        prevX = p5.mouseX;
        prevY = p5.mouseY;
      }
    }

    p5.mouseReleased = () => {
      prevX = -1;
      prevY = -1;
      if (activePlayer !== -1) {
        activePlayer.x = snapGrid(activePlayer.x + mapX + (tileSize / 2)) - (tileSize / 2);
        activePlayer.y = snapGrid(activePlayer.y + mapY + (tileSize / 2)) - (tileSize / 2);
        players.forEach(p => {
          if(p.id === activePlayer.id) {
            p.x = activePlayer.x;
            p.y = activePlayer.y;
          }
        });
      }
    }

    function snapGrid(x) {
      return Math.round(x / tileSize) * tileSize;
    }
    function preload(theme){
      wallImg = p5.loadImage("TilesImg/tileURDL.png");
      floorImg = p5.loadImage("TilesImg/tile.png");
      doorImg = p5.loadImage("TilesImg/door.png");
      playerImg = p5.loadImage("TilesImg/player1.png");
    }
    function setup() {
      const seed = 'exampleSeed';
      preload(state.theme);
      mapObj = new Map(state.width, state.height, seed);
      mapped = mapObj.tiles;
      // create map and players
      const cols = 80;
      const rows = 45;
      players.push(new Player(0, 40, 40, playerImg));
    }

    p5.setup = () => {
      p5.createCanvas(window.innerWidth - 4, window.innerHeight - 4);
      let zoomInButton = p5.createButton("+");
      let zoomOutButton = p5.createButton("-");

      zoomInButton.position(10, 10);
      zoomOutButton.position(10, 120);

      zoomInButton.size(100, 100);
      zoomOutButton.size(100, 100);
      zoomInButton.mousePressed(() => {
        tileSize *= 1.1;
        players.forEach(p => {
          p.x *= 1.1;
          p.y *= 1.1;
        });
      });
      zoomOutButton.mousePressed(() => {
        tileSize *= 0.9;
        players.forEach(p => {
          p.x *= 0.9;
          p.y *= 0.9;
        });
      });
      setup();
    }

    p5.draw = () => {
      draw();
    };
  }

  const seed = 'exampleSeed';
  const map = new Map(state.width, state.height, seed, state.theme);
  const grid = map.tiles;

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
