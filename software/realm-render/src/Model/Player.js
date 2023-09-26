/**
 * Player model. Will be controllable with mouse input.
 */
class Player {
    constructor(x, y, color, name, id) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.name = name;
        this.id = id;
    }

    getX(){
        return this.x;
    }

    getY(){
        return this.y;
    }

    setX(x){
        this.x = x;
    }

    setY(y){
        this.y = y;
    }
}
export default Player;