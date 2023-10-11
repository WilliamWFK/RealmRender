import React, { useState } from 'react';
import Player from "../Model/Player";
import Map from "../Model/Map";
import { useLocation, useNavigate } from "react-router-dom";
import { ReactP5Wrapper } from "@p5-wrapper/react";
import PlayerStatistics from '../Model/PlayerStatistics';


const LoadMap = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  let mapObj;
  let mapped = [];
  let players = [];
  let tileSize = 32;
  let activePlayer = -1;
  let prevX = -1;
  let prevY = -1;



  let mapX = ((state.width / 2) * -1) + (window.innerWidth / tileSize) / 2;
  let mapY = (state.height - (window.innerHeight / tileSize)) * -1;

  let maxTileSize = tileSize * 2;
  let minTileSize = Math.min(window.innerHeight / state.height, window.innerWidth / state.width);


  let chest1;
  let chest2;
  let big_object1;
  let big_object2;
  let object1;
  let object2;
  let object3;
  let object4;
  let object5;
  let floor;
  let wall;
  let door;
  let background;
  let playerImg;

  function sketch(p5) {
    function draw() {
      p5.background('#0f1f1f');

      // draw map
      mapped.forEach(r => r.forEach(t => t.draw(p5, tileSize, mapX, mapY)));

      // draw players
      players.forEach(p => p.draw(p5, tileSize, mapX, mapY));
      mapX = Math.min((window.innerWidth / 3) / tileSize, mapX);
      mapY = Math.min((window.innerHeight / 3) / tileSize, mapY);

      mapX = Math.max(((state.width) * -1) + ((window.innerWidth * (2 / 3)) / tileSize), mapX);
      mapY = Math.max(((state.height) * -1) + ((window.innerHeight * (2 / 3)) / tileSize), mapY);


      p5.frameRate(60);

    }

    p5.mousePressed = () => {

      if (prevX === -1 && prevY === -1) {
        prevX = p5.mouseX;
        prevY = p5.mouseY;
      }

      players.forEach(p => {
        if (p.on(p5.mouseX + (-(mapX) * tileSize), p5.mouseY + (-(mapY) * tileSize), p5, tileSize)) {
          activePlayer = p;
          p.printStats();
        }

       if (!players.some(p => p.on(p5.mouseX + (-(mapX) * tileSize), p5.mouseY + (-(mapY) * tileSize), p5, tileSize))) {
          activePlayer = -1;
        }
      });
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
        activePlayer.x = snapGrid(p5.mouseX - mapX * tileSize) + (tileSize / 2);
        activePlayer.y = snapGrid(p5.mouseY - mapY * tileSize) + (tileSize / 2);
        players.forEach(p => {
          if(p.id === activePlayer.id) {
            p.x = activePlayer.x;
            p.y = activePlayer.y;
          }
        });
      }
    }

    function snapGrid(x) {
      return Math.floor(x / tileSize) * tileSize;
    }

    function preload(theme){
      //load all images for drawing
      let path = "TilesImg/" + theme + "/";
      //loading chests
      chest1 = p5.loadImage(path + "chests/chest.png");
      chest2 = p5.loadImage(path + "chests/chest1.png");
      //loading small objects
      object1 = p5.loadImage(path + "objects/object1.png");
      object2 = p5.loadImage(path + "objects/object2.png");
      object3 = p5.loadImage(path + "objects/object3.png");
      object4 = p5.loadImage(path + "objects/object4.png");
      object5 = p5.loadImage(path + "objects/object5.png");
      //loading big objects
      big_object1 = p5.loadImage(path + "objects/big_object1.png");
      big_object2 = p5.loadImage(path + "objects/big_object2.png");
      //loading base tiles
      floor = p5.loadImage(path + "tile.png");
      wall = p5.loadImage(path + "tileURDL.png");
      door = p5.loadImage(path + "door.png");
      background = p5.loadImage(path + "background.png");
      //load player
      playerImg = p5.loadImage("TilesImg/player1.png");
    }

    function storeImage(tile){
      let type = tile.image.split("-");
      switch(type[0]){
        case "big_object":
          switch(type[1]){
            case "0":
              tile.setImage(big_object1);
              break;
            case "1":
              tile.setImage(big_object2);
              break;
            default:
              tile.setImage(big_object1);
              break;
          }
          break;
        case "object":
          switch(type[1]){
            case "0":
              tile.setImage(object1);
              break;
            case "1":
              tile.setImage(object2);
              break;
            case "2":
              tile.setImage(object3);
              break;
            case "3":
              tile.setImage(object4);
              break;
            case "4":
              tile.setImage(object5);
              break;
            default:
              tile.setImage(object1);
              break;
          }
          break;
        case "chest":
          switch(type[1]){
            case "0":
              tile.setImage(chest1);
              break;
            case "1":
              tile.setImage(chest2);
              break;
            default:
              tile.setImage(chest1);
              break;
          }
          break;
        case "floor":
          tile.setImage(floor);
          break;
        case "wall":
          tile.setImage(wall);
          break;
        case "door":
          tile.setImage(door);
          break;
        case "background":
          tile.setImage(background);
          break;
        default:
          tile.setImage(background);
          break;
      }
    }
    function setup() {
      const seed = 'exampleSeed';
      mapObj = new Map(state.width, state.height, seed);
      mapped = mapObj.tiles;
      preload(state.theme);
      // create map and players
      mapped.forEach(r => r.forEach(t => storeImage(t)));
      let entranceX = snapGrid((state.width / 2) * tileSize) - (tileSize / 2);
      let entranceY = snapGrid((state.height - 1) * tileSize) - (tileSize / 2);
      for (let i = 0; i < state.players; i++) {
        players.push(new Player(i, entranceX + (i * tileSize) - (Math.ceil((state.players / 2) - 1) * tileSize), entranceY, playerImg, new PlayerStatistics(i)));
      }
    }


    p5.setup = () => {
      p5.createCanvas(window.innerWidth - 4, window.innerHeight - 4);
      let backButton = p5.createButton("<");
      let zoomInButton = p5.createButton("+");
      let zoomOutButton = p5.createButton("-");

      backButton.position(10, 10);
      zoomInButton.position(10, 10);
      zoomOutButton.position(10, 10);

      backButton.style('width', '5vw');
      backButton.style('height', '5vw');
      backButton.style('font-size', '2vw');

      zoomInButton.style('width', '5vw');
      zoomInButton.style('height', '5vw');
      zoomInButton.style('margin-top', '6vw');
      zoomInButton.style('font-size', '2vw');

      zoomOutButton.style('width', '5vw');
      zoomOutButton.style('height', '5vw');
      zoomOutButton.style('margin-top', '12vw');
      zoomOutButton.style('font-size', '2vw');

      backButton.mousePressed(() => {
        navigate("/index");
      });


      zoomInButton.mousePressed(() => {
        if (tileSize < maxTileSize) {
          Math.round(tileSize *= 1.1);
          players.forEach(p => {
            Math.round(p.x *= 1.1);
            Math.round(p.y *= 1.1);
          });
        }
      });
      zoomOutButton.mousePressed(() => {
        if (tileSize > minTileSize) {
          Math.round(tileSize *= 0.9);
          players.forEach(p => {
            Math.round(p.x *= 0.9);
            Math.round(p.y *= 0.9);
          });
        }
      });
      setup();
    }

    p5.draw = () => {
      draw();
    };
  }
  return (
    <div id="P5Wrapper">
      <ReactP5Wrapper sketch={sketch} />
    </div>
  );
};
export default LoadMap;
