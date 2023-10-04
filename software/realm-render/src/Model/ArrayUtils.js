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
    const numRows = array.length;
    const numCols = array[0].length;
    const decoratedArray = [...array];

    for(let col = 1; col < numCols-1; col++){
        for (let row = 1; row < numRows-1; row++) {
            if(array[col][row] === "floor"){
                //check for adjacent walls
                //if adjacent walls, add decoration
                if(array[col][row+1] === "wall" || array[col][row-1] === "wall" || array[col+1][row] === "wall" || array[col-1][row] === "wall"){
                    let rand = Math.floor(Math.random()*100) +1;
                    if(rand <= 30) decoratedArray[col][row].setType("object");
                    else if(rand <= 40) decoratedArray[col][row].setType("chest");
                }

            }
        }
    }
    return decoratedArray;
}