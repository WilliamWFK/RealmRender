class Tile {
    imageStart = "TilesImg/";
    image;
    rotate;
    constructor(x, y, z, theme, contents) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.theme = theme;       // Thematic type of tile
        this.contents = contents; // What's on the tile
        this.type = "floor"   //type of tile floor, wall, door etc
        this.selectImage();
    }

    isWall() {
      // Check if all directions are "wall"
      return (this.type === "wall")
    }
    
    setType(newType){
      this.type = newType; 
      this.selectImage();
    }

    /**
     * used for selecting the image to be used based on properties of the tile
     * also used for updating the image being shown currently
     * */
    selectImage(){
      this.rotate = 0;
      console.log(this.theme);
      this.image = this.imageStart + this.theme + "/";
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