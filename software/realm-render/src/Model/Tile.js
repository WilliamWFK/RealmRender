class Tile {
    imageStart = "TilesImg/";
    image;
    rotate;
    constructor(x, y, type, theme) {
        this.x = x;
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
    }

    isWall() {
      // Check if all directions are "wall"
      return (this.type === "wall")
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
    draw(p5, tileSize, mapX, mapY, floorImg, wallImg, doorImg){
      if (this.type == "floor") {
        p5.image(floorImg, (this.x + mapX) * tileSize, (this.y + mapY) * tileSize, tileSize, tileSize);
      } else if(this.type == "door"){
        p5.image(doorImg, (this.x + mapX) * tileSize, (this.y + mapY) * tileSize, tileSize, tileSize);
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
      this.rotate = 0;
      this.image = this.imageStart;
      if (this.type === "wall"){
        this.image += "tileURDL.png";
      } else if (this.type === "door"){
        this.image += "door.png"
      } else {
        this.image += "tile.png"
      }//tile.png
    }
}

export default Tile;
