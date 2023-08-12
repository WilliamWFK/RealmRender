class Tile {
    constructor(x, y, z, type, contents, image) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.type = type;       // Thematic type of tile
        this.contents = contents; // What's on the tile
        this.directions = { //to tell whats edges are made of
            up: "wall",
            right: "empty",
            down: "wall",
            left: "empty"
        };
        this.image = image;
    }
}

export default Tile;