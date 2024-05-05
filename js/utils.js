'use strict'

function createMat(SIZE) {
    const mat = []
    for (var i = 0; i < SIZE; i++) {
        const row = []
        for (var j = 0; j < SIZE; j++) {
            row.push('')
        }
        mat.push(row)
    }
    return mat
}


// function findRandomEmptyCell() {
//     var emptyCells = []

//     for (var i = 1; i < gBoard.length - 1; i++) {
//         for (var j = 1; j < gBoard[i].length - 1; j++) {
//             const cell = gBoard[i][j]
//             if (cell === EMPTY) emptyCells.push({ i, j })
//         }
//     }

//     if (emptyCells.length === 0) return null

//     const randomCellIdx = getRandomIntInclusive(0, emptyCells.length)
//     return emptyCells[randomCellIdx]
// }


// function getRandomIntInclusive(min, max) {
//     return Math.floor(Math.random() * (max - min + 1)) + min
// }