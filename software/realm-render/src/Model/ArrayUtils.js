export function rotate2DArray(array) {
    const numRows = array.length;
    const numCols = array[0].length;
    const rotatedArray = new Array(numCols);

    for (let col = 0; col < numCols; col++) {
        rotatedArray[col] = new Array(numRows);
        for (let row = 0; row < numRows; row++) {
            rotatedArray[col][row] = array[numRows - 1 - row][col];
        }
    }

    return rotatedArray;
}

//Function to decorate floor tiles with objects
export function decorateFloorTiles(array) {
    console.log("decorating floor tiles");
    const numRows = array.length;
    const numCols = array[0].length;
    const decoratedArray = [...array];

    for(let col = 1; col < numCols-1; col++){
        for (let row = 1; row < numRows-1; row++) {
            if(array[col][row].isFloor()){
                //check for adjacent walls
                //if adjacent walls, add decoration
                if(array[col][row+1].isWall() || array[col][row-1].isWall() || array[col+1][row].isWall() || array[col-1][row].isWall()){
                    let rand = Math.floor(Math.random()*100) +1;
                    if(rand <= 30){
                        console.log("put objects here");
                        decoratedArray[col][row].setType("object");
                    } 
                    else if(rand <= 34) {
                        console.log("put chest here");
                        decoratedArray[col][row].setType("chest")};
                }
                if(!array[col][row+1].isWall() && !array[col][row-1].isWall() && !array[col+1][row].isWall() && !array[col-1][row].isWall()){
                    let rand = Math.floor(Math.random()*100) +1;
                    if(rand <= 3){
                        console.log("put objects here");
                        decoratedArray[col][row].setType("BigObject");
                    } 
                }
            }
        }
    }
    return decoratedArray;
}