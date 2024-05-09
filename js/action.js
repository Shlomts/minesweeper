'use strict'

function onInit() {

    document.querySelector(`.game-over`).classList.add(`hidden`)
    
    
    gBoard = buildBoard(gLevel)

    gGame = {
        isOn: true,
        isHintMode: false,
        shownCount: 0,
        markedCount: gLevel.MINES,
        secsPassed: 0,
        lives: 3,
        hints: 3
    }

    renderBoard(gBoard)
    renderLives()
    renderSmiley()
    renderHints()
    renderFlagsCounter()
    renderTimer()
       
}


function updateLevel(size = 8, mines = 14) {
    
    gLevel.SIZE = size
    gLevel.MINES = mines
    gameOver()
    onInit()
}


function onCellClicked(i, j) {

    if (!gGame.shownCount) {
        setMines(gLevel, gBoard, i, j)

        gTimerInterval = setInterval(() => {
            gGame.secsPassed++
            renderTimer()
        }, 1000)
    }

    const cell = gBoard[i][j]
    const elCell = document.querySelector(`.cell-${i}-${j}`)

    if (!gGame.isOn) return
    if (cell.isMarked) return

    if (gGame.isHintMode) return showHint(i, j)

    cell.isShown = true
    gGame.shownCount++
    checkWin()

    if (!cell.minesAroundCount && !cell.isMine) {
        expandShown(i, j, gBoard)
    }

    if (cell.isMine) {

        gGame.lives--
        renderLives()


        if (!gGame.lives) {
            lostGame()
            return
        }

    } 

    renderBoard(gBoard)

}


function onCellMarked(i, j) {

    if(gBoard[i][j].isShown || !gGame.isOn) return

    if (gBoard[i][j].isMarked) {
        gBoard[i][j].isMarked = !gBoard[i][j].isMarked
        gGame.markedCount++
    } else {
        gBoard[i][j].isMarked = !gBoard[i][j].isMarked
        gGame.markedCount--
    }
    
    renderFlagsCounter()
    renderBoard(gBoard)
}



function onHint() {

    if(!gGame.hints) return
    if(gGame.isHintMode) return

    gGame.isHintMode = true
    gGame.hints--

    renderHints()

}

