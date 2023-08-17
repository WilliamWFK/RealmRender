/**
 * Map will represent the current dungeon map.
 * The dungeon map will be a 2D array of tiles.
 * There are different rooms and hallways.
 * and each tile will have a type with various items possiblys
 *
 */

var Map = function() {
    this.tiles = [];
    this.width = 0;
    this.height = 0;
};
