'use strict'

const WALL = '&#127795'
const FOOD = '&#129372'
const EMPTY = ' '
const POWER = '&#127820'

const gGame = {
  score: 0,
  isOn: false,
}
var gBoard
var gFoodCounter = 0

function init() {
  gFoodCounter = 0
  gBoard = buildBoard()
  createPacman(gBoard)
  createGhosts(gBoard)
  createCherries(gBoard)

  renderBoard()

  var elModal = document.querySelector('.modal')
  elModal.style.display = 'none'
  gGame.score = 0
  gGame.isOn = true
}

function renderBoard() {
  var strHTML = '<table><tbody>'
  for (var i = 0; i < gBoard.length; i++) {
    strHTML += '<tr>'
    for (var j = 0; j < gBoard[0].length; j++) {
      const cell = gBoard[i][j]
      const className = `cell cell-${i}-${j}`

      if (cell === GHOST) {
        strHTML += `<td class="${className}">${getGhostHTML(gGhosts[0])}</td>`
      } else {
        strHTML += `<td class="${className}">${cell}</td>`
      }
    }
    strHTML += '</tr>'
  }
  strHTML += '</tbody></table>'

  const elContainer = document.querySelector('.board-container')
  elContainer.innerHTML = strHTML
}

function renderModal(status) {
  var headerText = ''
  var btnText = ''
  if (status === 'VICTORY') {
    headerText = 'Victory!'
    btnText = 'Restart'
  } else {
    headerText = 'You lost! try again'
    btnText = 'Retry'
  }
  var elModal = document.querySelector('.modal')
  elModal.style.display = 'block'
  var elModalHeader = elModal.querySelector('.user-msg')
  var elModalBtn = elModal.querySelector('.restart-btn')
  elModalHeader.innerText = headerText
  elModalBtn.innerText = btnText
}

function buildBoard() {
  const size = 10
  const board = []

  for (var i = 0; i < size; i++) {
    board.push([])

    for (var j = 0; j < size; j++) {
      board[i][j] = FOOD
      if (i === 0 || i === size - 1 || j === 0 || j === size - 1 || (j === 3 && i > 4 && i < size - 2)) {
        board[i][j] = WALL
      } else if ((i === 1 && j === 1) || (i === size - 2 && j === size - 2) || (i === 1 && j === size - 2) || (i === size - 2 && j === 1)) {
        board[i][j] = POWER
      } else {
        gFoodCounter++
      }
    }
  }
  gFoodCounter--
  return board
}

function updateScore(diff) {
  // update model
  gGame.score += diff
  // update dom
  document.querySelector('h2 span').innerText = gGame.score
}

function checkVictory() {
  gFoodCounter--
  if (gFoodCounter === 0) {
    gameOver('VICTORY')
  }
}

function gameOver(status) {
  renderModal(status)
  gGame.isOn = false
  renderCell(gPacman.location, EMPTY)
  clearInterval(gIntervalGhosts)
  clearInterval(gIntervalCherry)
}
