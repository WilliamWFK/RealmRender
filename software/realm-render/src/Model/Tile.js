class Tile {
    imageStart = "TilesImg/tile";
    image;
    rotate;
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.type = type;       // Thematic type of tile
        this.directions = { //to tell whats edges are made of
            up: "empty",
            right: "empty",
            down: "empty",
            left: "empty"
        };
        /**this.selectImage();*/
    }

    isWall() {
      // Check if all directions are "wall"
      return (
        this.directions.up === "wall" &&
        this.directions.right === "wall" &&
        this.directions.down === "wall" &&
        this.directions.left === "wall"
        );
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
    }
    draw(p5, tileSize, mapX, mapY, floorImg, wallImg){
      if (this.type == "floor") {
        p5.image(floorImg, (this.x + mapX) * tileSize, (this.y + mapY) * tileSize, tileSize, tileSize);
      } else {
        p5.image(wallImg, (this.x + mapX) * tileSize, (this.y + mapY) * tileSize, tileSize, tileSize);
      }
    }

    on(x, y, p5, tileSize){
      return p5.dist(this.x, this.y, x, y) <= tileSize;
    }

    /**
     * used for selecting the image to be used based on properties of the tile
     * also used for updating the image being shown currently
     * */
    selectImage(){
        this.image = this.imageStart;
        var counter = 0;
        for(const dir in this.directions){
          if (this.directions[dir] === "wall"){
            counter++;
            switch(dir){
              case "up":
                this.rotate += 0;
                break;
              case "right":
                this.rotate += 90;
                break;
              case "down":
                this.rotate += 180;
                break;
              case "left":
                this.rotate += -90;
                break;
              default:
                break;
            }
          }
        }
      if (counter === 1){
        this.image += "U.png";
      }
      else if (counter === 2){
        if(this.directions.up === "wall" && this.directions.down === "wall"){
          this.rotate = 0;
          this.image += "UD.png";
        } else if(this.directions.left === "wall" && this.directions.right === "wall"){
          this.rotate = 90;
          this.image += "UD.png";
        }
        else {
          if(this.directions.left === "wall" && this.directions.down === "wall"){
            this.rotate = -270;
          }
          this.rotate = (this.rotate / 2) - 45;
          this.image += "UR.png";
        }
      }
      else if (counter === 3){
        this.rotate = (360 - this.rotate);
        this.image += "URL.png";
      }
      else if (counter === 4){
        this.rotate = 0;
        this.image += "URDL.png";
      }
      else {
        this.rotate = 0;
        this.image += ".png";
      }
    }
}

export default Tile;
