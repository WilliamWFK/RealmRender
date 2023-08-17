/**
 * This will represent the current game state.
 * 
 * Our game will hold the current Dungeon Map, the current players, and the current monsters, and the fog of war state.
 * 
 * @class Game
 * @constructor
 */
class Game {
    constructor(width, height) {
        this.map = null;
        this.players = [];
        this.monsters = [];
        this.fog = [];
    }

    setMap(newMap){
        this.map = newMap
    }


}

/**
 * This will add a player to the game.
 * 
 * @method addPlayer
 * @param {Player} player The player to add to the game.
 * @return {void}
 */
Game.prototype.addPlayer = function(player) {
    this.players.push(player);
    return this;
}

/**
 * This will add a monster to the game.
 * 
 * @method addMonster
 * @param {Monster} monster The monster to add to the game.
 * @return {void}
 */
Game.prototype.addMonster = function(monster) {
    this.monsters.push(monster);
    return this;
}

export default Game