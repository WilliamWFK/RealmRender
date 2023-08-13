class Tile {
    imageStart = "TilesImg/tile";
    image;
    constructor(x, y, z, type, contents) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.type = type;       // Thematic type of tile
        this.contents = contents; // What's on the tile
        this.directions = { //to tell whats edges are made of
            up: "wall",
            right: "wall",
            down: "wall",
            left: "wall"
        };
        this.selectImage();
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

    /**
     * used for selecting the image to be used based on properties of the tile
     * also used for updating the image being shown currently
     * */
    selectImage(){
        this.image = this.imageStart;
        for(const dir in this.directions){
            if (this.directions[dir] === "wall") {
                // Append the corresponding character to the image string based on direction
                switch (dir) {
                  case "up":
                    this.image += "U";
                    break;
                  case "down":
                    this.image += "D";
                    break;
                  case "left":
                    this.image += "L";
                    break;
                  case "right":
                    this.image += "R";
                    break;
                  default:
                    // Handle unexpected direction
                    break;
                }
            }
        }
        this.image += ".png"
    }
}

export default Tile;