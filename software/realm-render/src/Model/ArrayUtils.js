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
    const lefty = this.exits.left
    const righty = this.exits.right
    const uppy = this.exits.up
    const downy = this.exits.down

    this.exits.left = uppy
    this.exits.right = downy
    this.exits.up = righty
    this.exits.down = lefty


    return rotatedArray;
}
