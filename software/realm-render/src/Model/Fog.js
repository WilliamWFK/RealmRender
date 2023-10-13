class Fog {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.img = "";
        this.opacity = 255;
    }

    draw(p5, tileSize, mapX, mapY){
        p5.image(this.img, (this.x + mapX) * tileSize, (this.y + mapY) * tileSize, tileSize, tileSize);
    }

    setImage(image){
        this.img = image;
    }
}
export default Fog;
