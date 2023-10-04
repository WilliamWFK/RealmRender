import React, { Component } from "react";
import { ReactP5Wrapper } from "@p5-wrapper/react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

let mapped = [];
let players = [];
let activePlayer = -1;
let prevX = -1;
let prevY = -1;
let mapX = 0;
let mapY = 0;
let tileSize = 30;

function sketch(p5) {

  class Tile {
    constructor(x, y, type) {
      this.x = x;
      this.y = y;
      this.type = type;
    }

    draw() {
      if (this.type == "floor") {
        p5.fill(150, 150, 150);
      } else if (this.type == "selected") {
        p5.fill(0, 255, 0);
      } else {
        p5.fill(50, 50, 200);
      }
      p5.rect((this.x + mapX) * tileSize, (this.y + mapY) * tileSize, tileSize);
    }
    on(x, y) {
      // return if x and y is on tile
      return p5.dist(this.x, this.y, x, y) <= tileSize;
    }
  }

  class Player {
    constructor(id, x, y) {
      this.id = id;
      this.x = x;
      this.y = y;
    }

    draw() {
      p5.fill(255, 0, 0);
      p5.circle(this.x + mapX * tileSize, this.y + mapY * tileSize, tileSize);
    }

    on(x, y) {
      // return if x and y is on player including the circle radius
      console.log(this.x + ", " + this.y + ", " + x + ", " + y)
      return p5.dist(this.x, this.y, x, y) <= tileSize;
    }
  }

  function draw() {
    p5.background(220);

    // draw map
    mapped.forEach(t => t.draw());

    // draw players
    players.forEach(p => p.draw());

    p5.frameRate(20);

  }

  // detect mouse clicks
  p5.mouseClicked = () => {
    /**console.log("mouse clicked");
    console.log("mouse pos at: " + p5.mouseX + ", " + p5.mouseY);*/
    let x = Math.floor(p5.mouseX / tileSize);
    let y = Math.floor(p5.mouseY / tileSize);

    //zoom in
    let tile = mapped.find(t => t.x + mapX === x && t.y + mapY === y);
    if (p5.mouseX > 2000) {
      tileSize *= 1.1;
      players.forEach(p => {
        p.x += (tileSize * 0.11)
        p.y += (tileSize * 0.11)
      })
    }
    //zoom out
    else if (p5.mouseX < 50) {
      tileSize /= 1.1;
      players.forEach(p => {
        p.x -= (tileSize * 0.09)
        p.y -= (tileSize * 0.09)
      })

    }
    else if (tile) {
      tile.type = "selected";
    }
  }

  p5.mousePressed = () => {
    if (prevX == -1 && prevY == -1) {
      prevX = p5.mouseX;
      prevY = p5.mouseY;
    }

    players.forEach(p => {
      /**console.log("press pos at: " + (p5.mouseX + (-(mapX) * tileSize)) + ", " + (p5.mouseY + (-(mapY) * tileSize)));
      console.log("player pos at: " + p.x + ", " + p.y);
      console.log("map pos at: " + mapX + ", " + mapY);*/
      if (p.on(p5.mouseX + (-(mapX) * tileSize), p5.mouseY + (-(mapY) * tileSize))) {
        activePlayer = p;
      }
    })

    if (!players.some(p => p.on(p5.mouseX + (-(mapX) * tileSize), p5.mouseY + (-(mapY) * tileSize)))) {
      activePlayer = -1;
    }
  }

  p5.mouseDragged = () => {
    if (activePlayer != -1) {
      activePlayer.x = p5.mouseX+ (-(mapX) * tileSize);
      activePlayer.y = p5.mouseY+ (-(mapY) * tileSize);
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

    // if (activePlayer != -1) {
    //   let x = 50;
    //   let y = 50;
    //   mapped.find(t => t.x === x && t.y === y);
    //   activePlayer.x = x;
    //   activePlayer.y = y;
    // }
    // activePlayer = -1;
    if (activePlayer != -1) {
      activePlayer.x = snapGrid(activePlayer.x + mapX) - (tileSize / 2);
      activePlayer.y = snapGrid(activePlayer.y + mapY) - (tileSize / 2);
      players.forEach(p => {
        if(p.id == activePlayer.id) {
          p.x = activePlayer.x;
          p.y = activePlayer.y;
        }
      });
    }
  }

  function snapGrid(x) {
    return Math.ceil(x / tileSize) * tileSize;
  }

  function setup() {

    // create map and players
    const cols = 80;
    const rows = 45;

    for (let col = 0; col < cols; col++) {
      for (let row = 0; row < rows; row++) {
        let type = Math.random() > 0.5 ? "floor" : "wall";
        mapped.push(new Tile(col, row, type))
      }
    }
    players.push(new Player(0, 40, 40));
  }

  p5.setup = () => {
    p5.createCanvas(window.innerWidth - 4, window.innerHeight - 4);
    setup();
  }

  p5.draw = () => {
    draw();
  };


}

export default function MapEditor() {
  return (
    <div>
      <ReactP5Wrapper sketch={sketch} />
    </div>
  );
}
