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
    isFloor(){
      return (this.type === "floor")
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
      } else if (this.type === "object"){
        this.contents = "object";
        this.image = this.image + "objects/";
        let rand = Math.floor(Math.random()*100) +1;
        if(rand <= 30) this.image += "blackjar.png";
        else if(rand <= 60) this.image += "crate.png";
        else if(rand <= 80) this.image += "vase.png";
        else if(rand <= 90) this.image += "brokenbarrel.png";
        else this.image += "vial.png";
      } else if (this.type === "chest"){
        this.contents = "chest";
        this.image = this.image + "chests/";
        let rand = Math.floor(Math.random()*100) +1;
        if(rand <=50) this.image += "chest.png";
        else this.image += "chest1.png";
      }  
      else {
        this.image += "tile.png"
      }//tile.png
    }
}

export default Tile;