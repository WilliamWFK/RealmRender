import React, { useRef } from "react";
import Player from "../Model/Player";
import Map from "../Model/Map";
import { useLocation } from "react-router-dom";
import { ReactP5Wrapper } from "@p5-wrapper/react";
import html2canvas from "html2canvas";
import jsPdf from "jspdf";
import '../styles/mapEditor.css';

const LoadMap = () => {
  const { state } = useLocation();
  let mapObj;
  // tiles nand players
  let mapped = [];
  let players = [];
  // active storage
  let activePlayer = -1;
  let prevX = -1;
  let prevY = -1;
  let mapX = 0;
  let mapY = 0;
  // tile definition
  let tileSize = 32;
  let maxTileSize = tileSize * 2;
  let minTileSize = Math.min(window.innerHeight / state.height, window.innerWidth / state.width);
  // image storage
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
      p5.background(220);
      mapX = Math.min((window.innerWidth / 3) / tileSize, mapX);
      mapY = Math.min((window.innerHeight / 3) / tileSize, mapY);
      mapX = Math.max(((state.width) * -1) + ((window.innerWidth * (2/3)) / tileSize), mapX);
      mapY = Math.max(((state.height) * -1) + ((window.innerHeight * (2/3)) / tileSize), mapY);


      // draw map
      mapped.forEach(r => r.forEach(t => t.draw(p5, tileSize, mapX, mapY)));

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
        activePlayer.x = snapGrid(p5.mouseX - mapX*tileSize) + (tileSize / 2);
        activePlayer.y = snapGrid(p5.mouseY - mapY*tileSize) + (tileSize / 2);
        players.forEach(p => {
          if (p.id === activePlayer.id) {
            p.x = activePlayer.x;
            p.y = activePlayer.y;
          }
        });
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
      playerImg = p5.loadImage("TilesImg/player1.png");
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
      preload(state.theme);
      // create map and players
      mapped.forEach(r => r.forEach(t => storeImage(t)));
      players.push(new Player(0, 40, 40, playerImg));
    }

    p5.setup = () => {
      p5.createCanvas(window.innerWidth, window.innerHeight);
      let backButton = p5.createButton("<");
      let zoomInButton = p5.createButton("+");
      let zoomOutButton = p5.createButton("-");
      let exportButton = p5.createButton("Export PDF");
      let png = p5.createButton("Export PNG");

      backButton.position(10, 10);
      zoomInButton.position(10, 10);
      zoomOutButton.position(10, 10);
      exportButton.position(10, 10);
      png.position(10, 10);

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

      exportButton.style('width', '5vw');
      exportButton.style('height', '5vw');
      exportButton.style('margin-top', '18vw');
      exportButton.style('font-size', '1vw');

      png.style('width', '5vw');
      png.style('height', '5vw');
      png.style('margin-top', '24vw');
      png.style('font-size', '1vw');

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

      exportButton.mousePressed(async () => {
        
        // Define a function to zoom out
        async function zoomOut() {
          while (tileSize > minTileSize) {
            Math.round(tileSize *= 0.9);
            players.forEach(p => {
              Math.round(p.x *= 0.9);
              Math.round(p.y *= 0.9);
            });
            await new Promise(resolve => setTimeout(resolve, 0.1)); // Delay each zoom step
          }
        }
      
        // Zoom out first
        await zoomOut();

        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        console.log(screenWidth, screenHeight);

        

        html2canvas(pdfRef.current, {
          scrollX: 0,
          scrollY: 0,
          width: screenWidth, 
          height: screenHeight,
        }).then(canvas => {
          const imgData = canvas.toDataURL('image/png');
          const pdf = new jsPdf({
            orientation: 'landscape',
            unit: 'pt',
            format: [595.276, 841.890],
          });
          //var width = state.width * tileSize;
          //var height = state.height * tileSize;
          console.log(state.width*tileSize);
          console.log(pdf.internal.pageSize.getWidth());
          var width = pdf.internal.pageSize.getWidth()+(state.width*tileSize)/2;
          var height = pdf.internal.pageSize.getHeight();
          const imgX = -65;
          const imgY = 0;
          pdf.addImage(imgData, 'PNG', imgX, imgY, width, height);
          if(state.name === ""){
           pdf.save("Realm.pdf");
          }else{
            pdf.save(state.name + ".pdf");
          }
        });
      });



      png.mousePressed(async () => {
        async function zoomOut() {
          while (tileSize > minTileSize) {
            Math.round(tileSize *= 0.9);
            players.forEach(p => {
              Math.round(p.x *= 0.9);
              Math.round(p.y *= 0.9);
            });
            await new Promise(resolve => setTimeout(resolve, 0.1)); // Delay each zoom step
          }
        }
      
        // Zoom out first
        await zoomOut();
        if(state.name === ""){
          p5.saveCanvas("Render", "png");
        }else{
          p5.saveCanvas(state.name, "png");
        }
      });

      setup();

    }

    p5.draw = () => {
      draw();
    };
  }

  const pdfRef = useRef();

  return (
    <div class="editorWrapper" ref={pdfRef}>
      <ReactP5Wrapper sketch={sketch} />
    </div>
  );
};
export default LoadMap;
