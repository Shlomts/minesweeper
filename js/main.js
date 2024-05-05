'use strict'

var SIZE = 4

const MINE = `*`
const FLAG = `#`
const EMPTY = ` `

var gBoard 
var gLevel
var gGame



function onInit() {
    
    gBoard = buildBoard(SIZE)

    renderBoard(gBoard)

}

function buildBoard(SIZE) {

    const board = createMat(SIZE)


    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            board[i][j] = createCell()
        }
    }


    board[0][1].isMine = true
    board[3][3].isMine = true

    debugger
    setMinesNegsCount(board)

    console.log(board)
    return board
}


function createCell() {
    
    const CELL = {
        minesAroundCount: 0,
        isShown: false,
        isMine: false,
        isMarked: true
    }
       
    return CELL
}



function renderBoard(board) {

    var strHTML = '<table><tbody>'

    for (var i = 0; i < board.length; i++) {
		strHTML += '<tr>'
		for (var j = 0; j < board[0].length; j++) {
			const cell = board[i][j]
            const className = `cell cell-${i}-${j}`
            const elCell = document.querySelector(`.cell-${i}-${j}`)
            
            strHTML += `<td class="${className}" onclick = "onCellClick(elCell, i, j)">${renderCell(cell)}</td>`
		}

		strHTML += '</tr>'
	}

	strHTML += '</tbody></table>'

    const elBoard = document.querySelector(".board-container")
    elBoard.innerHTML = strHTML


}


function renderCell(cell) {

    if(cell.isMine) return MINE
    if(cell.minesAroundCount) return cell.minesAroundCount
    return EMPTY

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


function onCellClicked(elCell, i, j) {

    console.log(`hi`)

}


function onCellMarked(elCell) {

}

function checkGameOver() {

}


function expandShown(board, elCell, i, j) {

}    