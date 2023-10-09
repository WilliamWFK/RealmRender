import seedrandom from "seedrandom";
class Tile {
    imageStart = "TilesImg/";
    image;
    rotate;
    constructor(x, y, type, theme, seed) {
        this.x = x;
        this.image = "";
        this.y = y;
        this.type = type;       // Thematic type of tile
        this.directions = { //to tell whats edges are made of
            up: "empty",
            right: "empty",
            down: "empty",
            left: "empty"
        };
        this.theme = theme;     // Theme of tile
        /**this.selectImage();*/
        this.seed = seed;
    }

    isWall() {
      // Check if all directions are "wall"
      return (this.type === "wall");
    }

    isFloor() {
      return (this.type ==="floor");
    }

    isCleanFloor() {
      return (this.type === "cleanFloor");
    }


    //used for setting the edges of the tile
    setDirections(up, right, down, left) {
        this.directions = {
          up: up,
          right: right,
          down: down,
          left: left
        };
    }

    //set Up
    setUp(newDir) {
      this.directions.up = newDir;
    }

    //set Right
    setRight(newDir) {
      this.directions.right = newDir;
    }

    //set Down
    setDown(newDir) {
      this.directions.down = newDir;
    }

    //set Left
    setLeft(newDir) {
      this.directions.left = newDir;
    }
    setType(type){
      this.type = type;
      this.selectImage();
    }
    setImage(image){
      this.image = image;
    }
    draw(p5, tileSize, mapX, mapY){
      /*if (this.type == "floor") {
        p5.image(floorImg, (this.x + mapX) * tileSize, (this.y + mapY) * tileSize, tileSize, tileSize);
      } else if(this.type == "door"){
        p5.image(doorImg, (this.x + mapX) * tileSize, (this.y + mapY) * tileSize, tileSize, tileSize);
      } else {
        p5.image(wallImg, (this.x + mapX) * tileSize, (this.y + mapY) * tileSize, tileSize, tileSize);
      }*/
      p5.image(this.image, (this.x + mapX) * tileSize, (this.y + mapY) * tileSize, tileSize, tileSize);
    }

    on(x, y, p5, tileSize){
      return p5.dist(this.x, this.y, x, y) <= tileSize;
    }

    /**
     * used for selecting the image to be used based on properties of the tile
     * also used for updating the image being shown currently
     * */
    selectImage(){
      const random = seedrandom(this.seed);

      if(this.type === "floor"){
        this.image = "floor-0";
      } else if (this.type === "cleanFloor"){
        this.image = "floor-0";
      }

      else if (this.type === "wall"){
        this.image = "wall-0";
      } else if (this.type === "door"){
        this.image = "door-0";
      } else if (this.type === "object"){
        let rand = Math.floor(random()*100) +1;
        if(rand <= 30) this.image = "object-0";
        else if(rand <= 60) this.image = "object-1";
        else if(rand <= 80) this.image = "object-2";
        else if(rand <= 90) this.image = "object-3";
        else this.image = "object-4";
      } else if (this.type === "chest"){
        let rand = Math.floor(random()*100) +1;
        if(rand <=50) this.image = "chest-0";
        else this.image = "chest-1";
      } else if (this.type === "BigObject"){
        let rand = Math.floor(random()*100) +1;
        if(rand <= 50) this.image = "big_object-0";
        else this.image = "big_object-1";
      }
      else {
        this.image = "background-0";
      }
    }
}

export default Tile;
