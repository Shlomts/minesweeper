'use strict'

var gBoard 
var gLevel = {
    SIZE: 8,
    MINES: 14
}
var gGame
var gTimerInterval


function buildBoard(level) {

    const board = createMat(level.SIZE)

    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            board[i][j] = createCell()
        }
    }


    // board[0][1].isMine = true
    // board[3][3].isMine = true

    // setMines(level, board)
    // setMinesNegsCount(board)

    console.log(board)
    return board
}


function createCell() {
    
    const CELL = {
        minesAroundCount: 0,
        isShown: false,
        isMine: false,
        isMarked: false
    }
       
    return CELL
}


function setMines(level, board, cellI, cellJ) {

    for (var i = 0; i < level.MINES; i++) {
        const cell = findRandomEmptyCell(board, cellI, cellJ)
        board[cell.i][cell.j].isMine = true
    }

    setMinesNegsCount(board)

}


function setMinesNegsCount(board) {
   
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {

            const cellCoors = {i, j}
            const cellObj = board[i][j]

            cellObj.minesAroundCount = countMines(cellCoors, board)

        }
    }

}


function countMines(cell, board){

    var countMines = 0
    
    for (var i = cell.i - 1; i <= cell.i + 1; i++) {

        if (i < 0 || i > board.length - 1) continue

        for (var j = cell.j - 1; j <= cell.j + 1; j++) {

            if (j < 0 || j > board[i].length - 1) continue
            if (i === cell.i && j === cell.j) continue
            if (board[i][j].isMine){
                countMines++ 
            } 

        }
        
    }

    return countMines
}


function expandShown(cellI, cellJ, board) {

    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i > board.length - 1) continue
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (j < 0 || j > board[i].length - 1) continue
            if (i === cellI && j === cellJ) continue
            if (board[i][j].isShown) continue

            board[i][j].isShown = true
            gGame.shownCount++

            checkWin()

            if (!board[i][j].minesAroundCount) expandShown(i, j, board)

        }
        
    }
}  


function showHint(cellI, cellJ) {

    var shownCells = []

    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i > gBoard.length - 1) continue
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (j < 0 || j > gBoard[i].length - 1) continue
            if (gBoard[i][j].isShown) continue

            gBoard[i][j].isShown = true
            shownCells.push(gBoard[i][j])

        }        
    }

    renderBoard(gBoard)

    setTimeout(()=> {
        gGame.isHintMode = false

        for (var i = 0; i < shownCells.length; i++) {
            shownCells[i].isShown = false
        }
        renderBoard(gBoard)
    }, 1000
    )
}


function checkWin() {

    const unminedCells = Math.pow(gLevel.SIZE, 2) - gLevel.MINES

    if (gGame.shownCount === unminedCells) {
        renderBoard(gBoard)
        renderSmiley(`win`)
        gameOver(true)
    } 
}


function lostGame() {

    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            if (gBoard[i][j].isMine) gBoard[i][j].isShown = true
        }
    }

    renderBoard(gBoard)

    gameOver(false)
}


function gameOver(isWin) {  

    clearInterval(gTimerInterval)

    gGame.isOn = false
    const elMsg = document.querySelector(`.game-over h3`)

    if(isWin) {
        elMsg.innerText = `W I N N E R !`
    } else {
        elMsg.innerText = `L-O-S-E-R`
    }

    document.querySelector(`.game-over`).classList.remove(`hidden`)
    
}