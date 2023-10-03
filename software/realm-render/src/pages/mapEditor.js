import React, { Component } from "react";
import { ReactP5Wrapper } from "@p5-wrapper/react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

let mapped = [];
let players = [];
let activePlayer = -1;
let prevX = -1;
let prevY = -1;
let tileSize = 10;

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
      p5.rect(this.x * tileSize, this.y * tileSize, tileSize);

    }
  }

  class Player {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }

    draw() {
      p5.fill(255, 0, 0);
      p5.circle(this.x, this.y, tileSize);
    }

    on(x, y) {
      // return if x and y is on player including the circle radius
      return p5.dist(this.x, this.y, x, y) <= tileSize;
    }
  }

  function draw() {
    p5.background(220);

    // draw map
    mapped.forEach(t => t.draw());

    // draw players
    players.forEach(p => p.draw());

    p5.frameRate(24);

  }

  // detect mouse clicks
  p5.mouseClicked = () => {
    console.log("mouse clicked");
    let x = Math.floor(p5.mouseX / tileSize);
    let y = Math.floor(p5.mouseY / tileSize);

    let tile = mapped.find(t => t.x === x && t.y === y);

    if (tile) {
      tile.type = "selected";
    }

    if (p5.mouseX < 20 && p5.mouseY < 20) {
      tileSize += 10;
    }
  }


  p5.mousePressed = () => {
    if (prevX == -1 && prevY == -1) {
      prevX = p5.mouseX;
      prevY = p5.mouseY;
    }

    players.forEach(p => {
      if (p.on(p5.mouseX, p5.mouseY)) {
        activePlayer = p;
      }
    })

    if (!players.some(p => p.on(p5.mouseX, p5.mouseY))) {
      activePlayer = -1;
    }
  }

  p5.mouseDragged = () => {
    if (activePlayer != -1) {
      activePlayer.x = p5.mouseX;
      activePlayer.y = p5.mouseY;
    } else {
      players.forEach(p => {
        p.x += (p5.mouseX - prevX) / tileSize;
        p.y += (p5.mouseY - prevY) / tileSize;
      });

      mapped.forEach(t => {
        t.x += (p5.mouseX - prevX) / tileSize;
        t.y += (p5.mouseY - prevY) / tileSize;
      });
      prevX = p5.mouseX;
      prevY = p5.mouseY;
    }
  }

  p5.mouseReleased = () => {
    prevX = -1;
    prevY = -1;
  }


  function setup() {

    // create map and players
    const cols = 80;
    const rows = 80;

    for (let col = 0; col < cols; col++) {
      for (let row = 0; row < rows; row++) {
        let type = Math.random() > 0.5 ? "floor" : "wall";
        mapped.push(new Tile(col, row, type))
      }
    }
    players.push(new Player(40, 40));
  }





  p5.setup = () => {
    p5.createCanvas(400, 400);
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