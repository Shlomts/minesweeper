'use strict'

var gBoard 
var gLevel = {
    SIZE: 8,
    MINES: 14
}
var gGame



function onInit() {

    gBoard = buildBoard(gLevel)
    renderBoard(gBoard)

    gGame = {
        isOn: true,
        shownCount: 0,
        markedCount: 0,
        secsPassed: 0
    }
       

}


function updateLevel(size = 8, mines = 14) {
    
    gLevel.SIZE = size
    gLevel.MINES = mines

    onInit()
}

function buildBoard(level) {

    const board = createMat(level.SIZE)


    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            board[i][j] = createCell()
        }
    }


    // board[0][1].isMine = true
    // board[3][3].isMine = true

    setMines(level, board)
    setMinesNegsCount(board)

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



function renderBoard(board) {

    var strHTML = '<table><tbody>'

    for (var i = 0; i < board.length; i++) {
		strHTML += '<tr>'
		for (var j = 0; j < board[0].length; j++) {
            strHTML += renderCell(i, j)

		}

		strHTML += '</tr>'
	}

	strHTML += '</tbody></table>'

    const elBoard = document.querySelector(".board-container")
    elBoard.innerHTML = strHTML

}


function renderCell(i, j) {

    const cell = gBoard[i][j]
    var className = `cell cell-${i}-${j}`
    if(!cell.isShown)className += ` closed`
    const elCell = document.querySelector(`.cell-${cell.i}-${j}`)

    return `<td class="${className}" onclick = "onCellClicked(${i}, ${j})" 
    oncontextmenu="javascript:onCellMarked(${i} ,${j}); return false">${getElCellContent(cell, elCell)}</td>`
}


function getElCellContent(cell) {
    if (cell.isMarked) return `<img src="img/flag.png" alt="flag">`

    if (!cell.isShown) return ` ` 
    if (cell.isMine) return `<img src="img/bomb.png" alt="bomb">`
    if(cell.minesAroundCount) return cell.minesAroundCount
    return ` `

}


function setMines(level, board) {

    for (var i = 0; i < level.MINES; i++) {
        const cell = findRandomEmptyCell(board)
        board[cell.i][cell.j].isMine = true
    }

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


function onCellClicked(i, j) {

    if (!gGame.isOn) return

    const cell = gBoard[i][j]
    const elCell = document.querySelector(`.cell-${i}-${j}`)

    if (cell.isMine) {
        lostGame()
        return
    } 

    if (cell.isMarked) return
    cell.isShown = true

    renderBoard(gBoard)

}


function onCellMarked(i, j) {

    if(gBoard[i][j].isShown || !gGame.isOn) return

    gBoard[i][j].isMarked = !gBoard[i][j].isMarked
    renderBoard(gBoard)

}


function lostGame() {

    gGame.isOn = false

    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            if (gBoard[i][j].isMine) gBoard[i][j].isShown = true
        }
    }

    renderBoard(gBoard)

    alert(`YOU LOST`)

}


function checkGameOver() {

    


}


function expandShown(board, elCell, i, j) {

}    