import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import RTDbObject from '../Model/RTDbObject';
import { ReactP5Wrapper } from "@p5-wrapper/react";
import Player from "../Model/Player";
import Map from "../Model/Map";
import LoadMap from './mapEditor';

// create new RTDbObject

const rtdb = new RTDbObject("ABCD");

rtdb.createMapListener(console.log)



const Join = () => {
    const navigate = useNavigate();

    let mapObj;
    let mapped = [];
    let fog = [];
    let fogOn = true;
    let players = [];
    let tileSize = 32;
    let activePlayer = -1;
    let prevX = -1;
    let prevY = -1;
    let fowRadius = 7;

    let mapX = 0;
    let mapY = 0;

    let chest1, chest2;
    let big_object1, big_object2, object1, object2, object3, object4, object5;
    let floor, wall, door, background;

    let rogueImg, knightImg, wizardImg, tokenImg;

    //let players 1 through 6 player stats
    let zeroOpacityFogImg, halfOpacityFogImg, fullOpacityFogImg;

    function sketch(p5) {
        function draw() {
            p5.background('#0f1f1f');
            mapped.forEach(r => r.forEach(t => t.draw(p5, tileSize, mapX, mapY)));
            // Draw Players

            // Draw Fog

            p5.frameRate(30);
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

        function setup() {
            const seed = 'exampleSeed';
            mapObj = new Map(fowRadius*2, fowRadius*2, seed); // Replace with map from data
            mapped = mapObj.tiles;
            fog = mapObj.fogLayer;

            preload("Atlantis");
            mapped.forEach(r => r.forEach(t => storeImage(t)));
        }

        p5.draw = () => {
            draw();
        };

        p5.setup = () => {
            p5.createCanvas(fowRadius*tileSize*2, fowRadius*tileSize*2);
            setup();
        }
    }

    return (
        <div class="App">
            <Link to="/index" class="backButton">Back</Link>
            <ReactP5Wrapper sketch={sketch}/>
        </div>
    )
}

export default Join;
