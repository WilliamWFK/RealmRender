import React, { useState, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import RTDbObject from '../Model/RTDbObject';
import { ReactP5Wrapper } from "@p5-wrapper/react";
import { get, getDatabase, onValue, ref, update, set } from "firebase/database";
import firebaseConfig from "../firebaseConfig.js";

import Player from "../Model/Player";
import Map from "../Model/Map";
import Tile from "../Model/Tile";
import PlayerStatistics from '../Model/PlayerStatistics';
import Fog from "../Model/Fog";
import { initializeApp } from 'firebase/app';

// create new RTDbObject



const Join = () => {

    let mapData;

    const navigate = useNavigate();
    const { state } = useLocation();

    let mapWidth;
    let mapHeight;
    let mapTheme;
    let mapSeed;
    let selectedGame;

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
    let zoom = 0;

    let mapX = 0;
    let mapY = 0;

    let maxTileSize;
    let minTileSize;

    let chest1, chest2;
    let big_object1, big_object2, object1, object2, object3, object4, object5;
    let floor, wall, door, background;

    let rogueImg, knightImg, wizardImg, tokenImg;

    let zeroOpacityFogImg, halfOpacityFogImg, fullOpacityFogImg;


    function sketch(p5) {

        const rtdb = new RTDbObject("BBBB");
        const gameId = "BBBB";
        const app = initializeApp(firebaseConfig);
        const db = getDatabase(app);
        const mapReference = ref(db, 'maps/' + gameId);
        get(mapReference).then((snapshot) => {
            if (snapshot.exists()) {
                mapData = snapshot.val();
                // console.log(mapData.tiles);
            }
        }).catch((error) => {
            console.error(error);
        });

        function updateJSON() {
            onValue(mapReference, (snapshot) => {
                console.log("Map update received");
                mapData = snapshot.val();
                parseJSON();
                preload(mapTheme);
            });
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

            selectedGame.tiles.forEach(r => {
                let row = [];
                r.forEach(t => {
                    let tile = new Tile(t.x, t.y, t.type, t.seed);
                    tile.p5Image = null;
                    tile.image = t.image;
                    storeImage(tile);
                    row.push(tile);
                });
                mapped.push(row);
            });
            selectedGame.players.forEach(p => {
                players.push(new Player(p.id, p.x, p.y, tokenImg, p.playerStats));
            });
            selectedGame.fog.forEach(r => {
                let row = [];
                r.forEach(f => {
                    let fogTile = new Fog(f.x, f.y);
                    fogTile.opacity = f.opacity;
                    row.push(fogTile);
                });
                fog.push(row);
            });
            fog.forEach(r => r.forEach(t => decideImage(t)));
            mapObj.fogLayer = fog;
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

        function parseJSON() {
            let games = JSON.parse(mapData.tiles);

            selectedGame = games;

            mapWidth = selectedGame.width;
            mapHeight = selectedGame.height;

            mapTheme = selectedGame.theme;

            mapObj = new Map(mapWidth, mapHeight, mapSeed);

            mapped = [];
            players = [];
            fog = [];

            mapObj.tiles = mapped;

            mapX = ((mapWidth / 2) * -1) + (window.innerWidth / tileSize) / 2;
            mapY = (mapHeight - (window.innerHeight / tileSize)) * -1;

            maxTileSize = tileSize * 2;
            minTileSize = Math.min(window.innerHeight / mapHeight, window.innerWidth / mapWidth);
        }

        function decideImage(f) {
            switch (f.opacity) {
                case 0:
                    f.setImage(zeroOpacityFogImg);
                    break;
                case 127:
                    f.setImage(halfOpacityFogImg);
                    break;
                case 255:
                    f.setImage(fullOpacityFogImg);
                    break;
                default:
                    f.setImage(zeroOpacityFogImg);
                    break;
            }
        }

        p5.mousePressed = () => {

            if (prevX === -1 && prevY === -1) {
                prevX = p5.mouseX;
                prevY = p5.mouseY;
            }

            players.forEach(p => {
                if (p.on(p5.mouseX + (-(mapX) * tileSize), p5.mouseY + (-(mapY) * tileSize), p5, tileSize)) {
                    p.printStats();
                }
            });
        }

        p5.mouseDragged = () => {
            mapX += (p5.mouseX - prevX) / tileSize;
            mapY += (p5.mouseY - prevY) / tileSize;
            prevX = p5.mouseX;
            prevY = p5.mouseY;
        }

        p5.mouseReleased = () => {
            prevX = -1;
            prevY = -1;
        }



        p5.setup = () => {
            p5.createCanvas(window.innerWidth, window.innerHeight);
            const mapSeed = 'exampleSeed';

            // Buttons
            let backButton = p5.createButton("<");
            let zoomInButton = p5.createButton("+");
            let zoomOutButton = p5.createButton("-");

            backButton.position(10, 10);
            zoomInButton.position(10, 10);
            zoomOutButton.position(10, 10);

            backButton.style('width', '8vh');
            backButton.style('height', '8vh');
            backButton.style('font-size', '4vh');

            zoomInButton.style('width', '8vh');
            zoomInButton.style('height', '8vh');
            zoomInButton.style('margin-top', '10vh');
            zoomInButton.style('font-size', '4vh');

            zoomOutButton.style('width', '8vh');
            zoomOutButton.style('height', '8vh');
            zoomOutButton.style('margin-top', '20vh');
            zoomOutButton.style('font-size', '4vh');

            backButton.mousePressed(() => {
                navigate("/index");
            });

            zoomInButton.mousePressed(() => {
                if (tileSize < maxTileSize) {
                    zoom++;
                    Math.round(tileSize *= 1.1);
                    players.forEach(p => {
                        Math.round(p.x *= 1.1);
                        Math.round(p.y *= 1.1);
                    });
                }
            });

            zoomOutButton.mousePressed(() => {
                if (tileSize > minTileSize) {
                    zoom--;
                    Math.round(tileSize /= 1.1);
                    players.forEach(p => {
                        Math.round(p.x /= 1.1);
                        Math.round(p.y /= 1.1);
                    });
                }
            });

            updateJSON();
        };

        p5.draw = () => {
            p5.background('#0f1f1f');
            p5.frameRate(60);

            // Draw Tiles
            mapped.forEach(r => r.forEach(t => t.draw(p5, tileSize, mapX, mapY)));

            // Draw Fog
            fog.forEach(r => {
                r.forEach(t => {
                    t.draw(p5, tileSize, mapX, mapY)
                });
            });

            // Draw Players
            players.forEach(p => {
                if (p.playerStats.stats['classLevel'].includes("Rogue")) {
                    p.img = rogueImg;
                }
                else if (p.playerStats.stats['classLevel'].includes("Knight")) {
                    p.img = knightImg;
                }
                else if (p.playerStats.stats['classLevel'].includes("Wizard")) {
                    p.img = wizardImg;
                }
                else {
                    p.img = tokenImg;
                }
            });
            players.forEach(p => p.draw(p5, tileSize, mapX, mapY));




            // Place bounds on panning
            mapX = Math.min((window.innerWidth / 3) / tileSize, mapX);
            mapY = Math.min((window.innerHeight / 3) / tileSize, mapY);
            mapX = Math.max(((mapWidth) * -1) + ((window.innerWidth * (2 / 3)) / tileSize), mapX);
            mapY = Math.max(((mapHeight) * -1) + ((window.innerHeight * (2 / 3)) / tileSize), mapY);
        };
    }

    return (
        <div id="P5Wrapper" className="viewerWrapper">
            <ReactP5Wrapper sketch={sketch} />
        </div>
    )
}

export default Join;
