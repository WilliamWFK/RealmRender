/**
 * Player model. Will be controllable with mouse input.
 * Currently unused in current build.
 */
class Player {
    constructor(id, x, y, img, playerStats) {
      this.id = id;
      this.x = x;
      this.y = y;
      this.img = img
      this.playerStats = playerStats;
    }

    draw(p5, tileSize, mapX, mapY) {
      p5.image(this.img, (this.x + mapX * tileSize) - tileSize / 2, (this.y + mapY * tileSize) - tileSize / 2, tileSize, tileSize);
    }

    on(x, y, p5, tileSize) {
      // return if x and y is on player including the circle radius
      return p5.dist(this.x, this.y, x, y) <= tileSize;
    }
    printStats(){
      this.playerStats.returnSheet();
    }
  }

  draw(p5, tileSize, mapX, mapY) {
    p5.image(this.img, (this.x + mapX * tileSize) - tileSize / 2, (this.y + mapY * tileSize) - tileSize / 2, tileSize, tileSize);
  }

  on(x, y, p5, tileSize) {
    // return if x and y is on player including the circle radius
    return p5.dist(this.x, this.y, x, y) <= tileSize / 2;
  }
}
export default Player;
