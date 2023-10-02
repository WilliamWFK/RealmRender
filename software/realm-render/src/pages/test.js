import * as React from "react";
import { ReactP5Wrapper } from "@p5-wrapper/react";

let mapped = [];
let players = [];

function sketch(p5) {

    class Tile{
        constructor(x, y, type){
          this.x = x;
          this.y = y;
          this.type = type;
        }

        draw(){
          if(this.type === "floor"){
            p5.fill(150, 150, 150);
          } else {
            p5.fill(50, 50, 200);
          }
          p5.rect(this.x * 10, this.y * 10, 10);

        }
    }

    class Player {
        constructor(x, y){
          this.x = x;
          this.y = y;
        }

        draw(){
            p5.fill(255, 0, 0);
            p5.circle(this.x, this.y, 10);
        }
    }

    function draw() {
        p5.background(220);

        // draw map
        mapped.forEach(t => t.draw());

        // draw players
        players.forEach(p => p.draw());

    }

    function setup() {

        // create map and players
        const cols = 40;
        const rows = 40;

        for(let col = 0; col < cols; col++){
          for(let row = 0; row < rows; row++){
            let type = Math.random() > 0.5 ? "floor" : "wall";
            mapped.push(new Tile(col, row, type))
          }
        }
        players.push(new Player(40, 40));
    }

    p5.setup = () => {
        p5.createCanvas(300, 300, p5.WEBGL);
        setup();
    }

    p5.draw = () => {
        draw();
    };


}

export default function Test() {
  return <ReactP5Wrapper sketch={sketch} />;
}
