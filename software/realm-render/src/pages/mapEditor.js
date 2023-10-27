import React, { useRef, useEffect } from "react";
import Player from "../Model/Player";
import Map from "../Model/Map";
import Tile from "../Model/Tile";
import { useLocation, useNavigate } from "react-router-dom";
import { ReactP5Wrapper } from "@p5-wrapper/react";
import PlayerStatistics from '../Model/PlayerStatistics';
import html2canvas from "html2canvas";
import jsPdf from "jspdf";
import '../styles/mapEditor.css';
import Fog from "../Model/Fog";


const LoadMap = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    if (state.action === 'load') {
      alert('Map loaded successfully!');
      //parse the json data map into an array
      let maps = JSON.parse(localStorage.getItem("maps"));
      //get the selected map
      let selectedMap = maps[state.index];
      console.log("selectedMap");
      console.log(selectedMap);


    }
    else if(state.action === 'create') {
      alert('Map created successfully!');
    }
  }, [state.action]);

  let mapObj;
  let mapped = [];
  let fog = [];
  let fogOn = false;
  let players = [];
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

  let rogueImg, knightImg, wizardImg, tokenImg;

  //let players 1 through 6 player stats
  let zeroOpacityFogImg, halfOpacityFogImg, fullOpacityFogImg;

  function sketch(p5) {
    function draw() {
      p5.background('#0f1f1f');
      // draw map
      mapped.forEach(r => r.forEach(t => t.draw(p5, tileSize, mapX, mapY)));
     //monsters.forEach(m => m.draw(p5, tileSize, mapX, mapY));


      // draw players
      players.forEach(p => {
        if(p.playerStats.stats['classLevel'].includes("Rogue")){
          p.img = rogueImg;
        }
        else if(p.playerStats.stats['classLevel'].includes("Knight")){
          p.img = knightImg;
        }
        else if(p.playerStats.stats['classLevel'].includes("Wizard")){
          p.img = wizardImg;
        }
        else{
          p.img = tokenImg;
        }
      });
      players.forEach(p => p.draw(p5, tileSize, mapX, mapY));

      if (fogOn) {
        fog.forEach(r => r.forEach(t => t.draw(p5, tileSize, mapX, mapY)));
      }

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
            if (i === -radius || i === radius || j === -radius || j === radius) {
              if (fog[x + i][y + j].opacity !== 0) {
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

      rogueImg = p5.loadImage("TilesImg/player4.png");
      knightImg = p5.loadImage("TilesImg/player3.png");
      wizardImg = p5.loadImage("TilesImg/player5.png");
      tokenImg = p5.loadImage("TilesImg/player1.png");

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
      //check if map is being loaded or created
      if (state.action === 'load') {
        //parse the json data map into an array
        let maps = JSON.parse(localStorage.getItem("maps"));
        //get the selected map
        let selectedMap = maps[state.index];
        console.log(selectedMap);
        //set the map width and height
        state.width = selectedMap.width;
        state.height = selectedMap.height;
        //set the map theme
        state.theme = selectedMap.theme;
        preload(state.theme);
        mapObj = new Map(state.width, state.height, seed);

        //set the map tiles
        mapped = [];
        //set the mapped to be an array of tile objects
        selectedMap.tiles.forEach(r => {
          let row = [];
          r.forEach(t => {
            let tile = new Tile(t.x, t.y, t.type, t.seed);
            tile.p5Image = null;
            tile.image = t.image;
            row.push(tile);
          });
          mapped.push(row);
        });
        mapped.forEach(r => r.forEach(t => storeImage(t)));
        mapObj.tiles = mapped;
        console.log(mapObj.tiles);
        //set the map fog
        fog = [];
        selectedMap.fog.forEach(r => {
          let row = [];
          r.forEach(t => {
            let tile = new Fog(t.x, t.y);
            row.push(tile);
          });
          fog.push(row);
        });
        fog.forEach(r => r.forEach(t => t.setImage(fullOpacityFogImg)));
        //set the map players
        players = [];
        selectedMap.players.forEach(p => {
          let player = new Player(p.id, p.x, p.y, p.img, p.playerStats);
          players.push(player);
          fogUpdate(player);
        });
        //set the map name
        state.name = selectedMap.name;
      }else{
        mapObj = new Map(state.width, state.height, seed);
        mapped = mapObj.tiles;
        fog = mapObj.fogLayer;
        console.log(mapObj);
        preload(state.theme);
        // create map and players
        mapped.forEach(r => r.forEach(t => storeImage(t)));
        let entranceX = snapGrid((state.width / 2) * tileSize) - (tileSize / 2);
        let entranceY = snapGrid((state.height - 1) * tileSize) - (tileSize / 2);
        for (let i = 0; i < state.players; i++) {
          let placerHolderImg;
          let placeHolderStats = new PlayerStatistics(i)
          if(placeHolderStats.stats['classLevel'].includes("Rogue")){
            placerHolderImg = rogueImg;
          }
          else if(placeHolderStats.stats['classLevel'].includes("Knight")){
            placerHolderImg = knightImg;
          }
          else if(placeHolderStats.stats['classLevel'].includes("Wizard")){
            placerHolderImg = wizardImg;
          }
          else{
            placerHolderImg = tokenImg;
          }
          players.push(new Player(i, entranceX + (i * tileSize) - (Math.ceil((state.players / 2) - 1) * tileSize), entranceY, placerHolderImg, placeHolderStats));

          fogUpdate(players[i]);
        }
      }



    }


    p5.setup = () => {
      p5.createCanvas(window.innerWidth, window.innerHeight);
      let backButton = p5.createButton("🠈");
      let zoomInButton = p5.createButton("+");
      let zoomOutButton = p5.createButton("-");
      let fogToggle = p5.createButton("👁");
      let exportButton = p5.createButton("Export PDF");
      let png = p5.createButton("Export PNG");
      let save = p5.createButton("Save");

      backButton.position(10, 10);
      zoomInButton.position(10, 10);
      zoomOutButton.position(10, 10);
      fogToggle.position(10, 10);
      exportButton.position(10, 10);
      png.position(10, 10);
      save.position(10, 10);

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

      fogToggle.style('width', '5vw');
      fogToggle.style('height', '5vw');
      fogToggle.style('margin-top', '18vw');
      fogToggle.style('font-size', '2vw');

      backButton.mousePressed(() => {
        navigate("/index");
      });
      exportButton.style('width', '5vw');
      exportButton.style('height', '5vw');
      exportButton.style('margin-top', '30vw');
      exportButton.style('font-size', '1vw');

      png.style('width', '5vw');
      png.style('height', '5vw');
      png.style('margin-top', '24vw');
      png.style('font-size', '1vw');


      save.style('width', '5vw');
      save.style('height', '5vw');
      save.style('margin-top', '36vw');
      save.style('font-size', '1vw');

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

      fogToggle.mousePressed(() => {
        fogOn = !fogOn;
      })
      exportButton.mousePressed(async () => {
        mapX = 0;
        mapY = 0;
        fogOn = false;
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
        mapX = 0;
        mapY = 0;
        fogOn = false;
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

      save.mousePressed(async () => {
        localStorage.clear();
        console.log("save")
        //         tiles: mapped,
        //fog: fog,

        //remove img from players
        //copy the players array
        console.log(players);
        let playersCopy = [];
        players.forEach(p => {
          let player = new Player(p.id, p.x, p.y, p.img, p.playerStats);
          player.img = null;
          playersCopy.push(player);
        });

        //deep copy the tiles array
        let tilesCopy = [];
        mapped.forEach(r => {
          let row = [];
          r.forEach(t => {
            let tile = new Tile(t.x, t.y, t.type, t.seed);
            tile.p5Image = null;
            tile.image = t.image;
            row.push(tile);
          });
          tilesCopy.push(row);
        });

        //deep copy the fog array
        let fogCopy = [];
        fog.forEach(r => {
          let row = [];
          r.forEach(t => {
            let tile = new Fog(t.x, t.y);
            tile.img = null;
            row.push(tile);
          });
          fogCopy.push(row);
        });

        console.log(playersCopy);
        let saveData = {
          name: state.name,
          width: state.width,
          height: state.height,
          theme: state.theme,
          tiles: tilesCopy,
          fog: fogCopy,
          players: playersCopy,
        }
        console.log(saveData);

        //store map into local storage
        const storedData = localStorage.getItem('maps');
        let maps = [];
        if(storedData){
          maps = JSON.parse(storedData);
        }
        maps.push(saveData);
        localStorage.setItem('maps', JSON.stringify(maps));
        console.log("saved");
      });

      setup();

    }

    p5.draw = () => {
      draw();
    };
  }

  const pdfRef = useRef();

  return (
    <div id="P5Wrapper" className="editorWrapper" ref={pdfRef}>
      <ReactP5Wrapper sketch={sketch} />
    </div>
  );
};
export default LoadMap;
