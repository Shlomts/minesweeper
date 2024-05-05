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


function findRandomEmptyCell(board) {
    var emptyCells = []

    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            const cell = board[i][j]
            if (!cell.isMine) emptyCells.push({ i, j })
        }
    }

    if (emptyCells.length === 0) return null

    const randomCellIdx = getRandomInt(0, emptyCells.length)
    return emptyCells[randomCellIdx]
}


function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min
}