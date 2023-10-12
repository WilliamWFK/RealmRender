import React from 'react';
import Player from "../Model/Player";
import Map from "../Model/Map";
import { useLocation, useNavigate } from "react-router-dom";
import { ReactP5Wrapper } from "@p5-wrapper/react";
import PlayerStatistics from '../Model/PlayerStatistics';
import '../styles/mapEditor.css';


const LoadMap = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  let mapObj;
  let mapped = [];
  let fog = [];
  let players = [];
  let monsters = [];
  let tileSize = 32;
  let activePlayer = -1;
  let prevX = -1;
  let prevY = -1;
  let fowRadius = 7;

  let mapX = ((state.width / 2) * -1) + (window.innerWidth / tileSize) / 2;
  let mapY = (state.height - (window.innerHeight / tileSize)) * -1;

  let maxTileSize = tileSize * 2;
  let minTileSize = Math.min(window.innerHeight / state.height, window.innerWidth / state.width);


  let chest1, chest2;
  let big_object1, big_object2, object1, object2, object3, object4, object5;
  let floor, wall, door, background;
  let playerImg;
  let player1Img;
  let player2Img;
  let player3Img;
  let player4Img;
  let player5Img;
  let rogueImg;
  let knightImg;
  let wizardImg;
  let tokenImg;
  let playerImgs;
  let monsterImg;
  let monster1Img;
  let monster2Img;
  let monster3Img;
  let monster4Img;
  let monster5Img;
  let monster6Img;
  let monster7Img;
  let monster8Img;
  let monster9Img;
  let monsterImgs;

  //let players 1 through 6 player stats
  let player1PlayerStats;
  let player2PlayerStats;
  let player3PlayerStats;
  let player4PlayerStats;
  let player5PlayerStats;
  let player6PlayerStats;
  let playerPlayerStats;

  let zeroOpacityFogImg, halfOpacityFogImg, fullOpacityFogImg;

  function sketch(p5) {
    function draw() {
      p5.background('#0f1f1f');
      // draw map
      mapped.forEach(r => r.forEach(t => t.draw(p5, tileSize, mapX, mapY)));
      monsters.forEach(m => m.draw(p5, tileSize, mapX, mapY));


      // draw players
      let i = 0;
      players.forEach(p => {
        if(playerPlayerStats[i].stats['classLevel'].includes("Rogue")){
          p.img = rogueImg;
        }
        else if(playerPlayerStats[i].stats['classLevel'].includes("Knight")){
          p.img = knightImg;
        }
        else if(playerPlayerStats[i].stats['classLevel'].includes("Wizard")){
          p.img = wizardImg;
        }
        else{
          p.img = tokenImg;
        }
        i++;
      });
      players.forEach(p => p.draw(p5, tileSize, mapX, mapY));
      fog.forEach(r => r.forEach(t => t.draw(p5, tileSize, mapX, mapY)));
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
        fogUpdate(activePlayer);
        players.forEach(p => {
          if (p.id === activePlayer.id) {
            p.x = activePlayer.x;
            p.y = activePlayer.y;
          }
        });
      }
    }

    function fogUpdate(player) {
      let x = Math.round((player.x + tileSize / 2) / tileSize);
      let y = Math.round((player.y + tileSize / 2) / tileSize);
      let radius = fowRadius;

      for (let i = -radius; i <= radius; i++) {
        for (let j = -radius; j <= radius; j++) {
          if (x + i >= 0 && x + i < state.width && y + j >= 0 && y + j < state.height) {
            if(i === -radius || i === radius || j === -radius || j === radius){
              if(fog[x + i][y + j].opacity !== 0){
                fog[x + i][y + j].setImage(halfOpacityFogImg);
              }
            } else {
              fog[x + i][y + j].opacity = 0;
              fog[x + i][y + j].setImage(zeroOpacityFogImg);
            }
          }
        }
      }
    }

    function snapGrid(x) {
      return Math.floor(x / tileSize) * tileSize;
    }

    function preload(theme) {
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

      playerImg = p5.loadImage("TilesImg/player3.png");
      player1Img = p5.loadImage("TilesImg/player1.png");
      player2Img = p5.loadImage("TilesImg/player2.png");
      player3Img = p5.loadImage("TilesImg/player3.png");
      player4Img = p5.loadImage("TilesImg/player4.png");
      player5Img = p5.loadImage("TilesImg/player5.png");
      rogueImg = p5.loadImage("TilesImg/player4.png");
      knightImg = p5.loadImage("TilesImg/player3.png");
      wizardImg = p5.loadImage("TilesImg/player5.png");
      tokenImg = p5.loadImage("TilesImg/player1.png");
      playerImgs = [player3Img, player4Img, player5Img, player3Img, player4Img, player5Img];

      //load monster
      monster1Img = p5.loadImage("TilesImg/monster1.png");
      monster2Img = p5.loadImage("TilesImg/monster2.png");
      monster3Img = p5.loadImage("TilesImg/monster3.png");
      monster5Img = p5.loadImage("TilesImg/monster5.png");
      monster6Img = p5.loadImage("TilesImg/monster6.png");
      monster7Img = p5.loadImage("TilesImg/monster7.png");
      monster8Img = p5.loadImage("TilesImg/monster8.png");
      monster9Img = p5.loadImage("TilesImg/monster9.png");

      monsterImgs = [monster1Img, monster2Img, monster3Img, monster5Img, monster6Img, monster7Img, monster8Img, monster9Img];



      playerImg = p5.loadImage("TilesImg/player1.png");
      fullOpacityFogImg = p5.loadImage("TilesImg/fog.png");

      let full = p5.createGraphics(tileSize, tileSize);
      full.background(255, 255);

      fullOpacityFogImg.mask(full);
      halfOpacityFogImg = p5.createGraphics(tileSize, tileSize);
      halfOpacityFogImg.background(255, 127);

      fullOpacityFogImg.mask(halfOpacityFogImg);
      zeroOpacityFogImg = p5.createGraphics(tileSize, tileSize);
      zeroOpacityFogImg.background(255, 0);

      fullOpacityFogImg.mask(zeroOpacityFogImg);
      fog.forEach(r => r.forEach(t => t.setImage(fullOpacityFogImg)));
    }

    function storeImage(tile) {
      let type = tile.image.split("-");
      switch (type[0]) {
        case "big_object":
          switch (type[1]) {
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
          switch (type[1]) {
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
          switch (type[1]) {
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
      fog = mapObj.fogLayer;
      preload(state.theme);
      // create map and players
      mapped.forEach(r => r.forEach(t => storeImage(t)));
      let entranceX = snapGrid((state.width / 2) * tileSize) - (tileSize / 2);
      let entranceY = snapGrid((state.height - 1) * tileSize) - (tileSize / 2);
      playerPlayerStats = [player1PlayerStats, player2PlayerStats, player3PlayerStats, player4PlayerStats, player5PlayerStats, player6PlayerStats]
      for (let i = 0; i < state.players; i++) {
        playerPlayerStats[i] = new PlayerStatistics(i)
        if(playerPlayerStats[i].stats['classLevel'].includes("Rogue")){
          player1Img = rogueImg;
        }
        else if(playerPlayerStats[i].stats['classLevel'].includes("Knight")){
          player1Img = knightImg;
        }
        else if(playerPlayerStats[i].stats['classLevel'].includes("Wizard")){
          player1Img = wizardImg;
        }
        else{
          player1Img = tokenImg;
        }
        players.push(new Player(i, entranceX + (i * tileSize) - (Math.ceil((state.players / 2) - 1) * tileSize), entranceY, player1Img, playerPlayerStats[i]));

        players.push(new Player(i, entranceX + (i * tileSize) - (Math.ceil((state.players / 2) - 1) * tileSize), entranceY, playerImg, new PlayerStatistics(i)));
        fogUpdate(players[i]);
      }

    }


    p5.setup = () => {
      p5.createCanvas(window.innerWidth, window.innerHeight);
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
    <div id="P5Wrapper" className="editorWrapper">
      <ReactP5Wrapper sketch={sketch} />
    </div>
  );
};
export default LoadMap;
