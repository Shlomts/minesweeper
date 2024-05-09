'use strict'


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


function renderSmiley(mode) {

    var elSmiley = document.querySelector(`.smiley`)

    switch (mode) {
        case `lose`:
            elSmiley.innerHTML = `🤮`
            break;
        case `win`:
            elSmiley.innerHTML = `😍`
            break;
        default:
            elSmiley.innerHTML = `😁`
            break;
    }
}


function renderLives() {

    var elLives = document.querySelector(`.lives`)
    var strHearts = ``

    for (var i = 1; i <= 3; i++) {
        strHearts += i <= gGame.lives ? `❤️` : `🖤`
    }

    elLives.innerHTML = strHearts
}




function renderHints() {

    var elHints = document.querySelector(`.hints`)
    var strHints = ``

    for (var i = 1; i <= 3; i++) {
        strHints += i <= gGame.hints ? `💡` : `💥`
    }

    elHints.innerHTML = strHints
}



function renderFlagsCounter() {

    const numStr = gGame.markedCount >= 0 ? String(gGame.markedCount).padStart(3, `0`) : String(gGame.markedCount)
    const elCounter = document.querySelector(`.flags`)
    elCounter.innerHTML = `🚩 : ${numStr}`

}


function renderTimer() {

    const timer = document.querySelector(`.timer`)
    timer.innerHTML = `⏰ : ${String(gGame.secsPassed).padStart(3, `0`)}`
}