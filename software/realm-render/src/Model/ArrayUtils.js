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