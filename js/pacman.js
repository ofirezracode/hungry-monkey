'use strict'

const PACMAN = '&#128018'
var gPacman
var gIsExitingPowerWhilePowered = false

function createPacman(board) {
  // initialize gPacman...
  gPacman = {
    location: {
      i: 6,
      j: 7,
    },
    isSuper: false,
    direction: 'left',
  }
  board[gPacman.location.i][gPacman.location.j] = PACMAN
}

function movePacman(ev) {
  if (!gGame.isOn) return
  // use getNextLocation(), nextCell

  const nextLocation = getNextLocation(ev)
  if (!nextLocation) return

  const nextCell = gBoard[nextLocation.i][nextLocation.j]

  // return if cannot move
  if (nextCell === WALL) return
  // hitting a ghost? call gameOver
  if (nextCell === GHOST) {
    if (!gPacman.isSuper) {
      gameOver('LOSS')
      return
    } else {
      removeGhost(nextLocation)
    }
  }
  if (nextCell === FOOD) {
    updateScore(1)
    checkVictory()
  }
  if (nextCell === CHERRY) {
    updateScore(10)
  }
  var leavingCellContent = EMPTY
  if (gIsExitingPowerWhilePowered) {
    leavingCellContent = POWER
    gIsExitingPowerWhilePowered = false
  }
  if (nextCell === POWER) {
    if (gPacman.isSuper) {
      gIsExitingPowerWhilePowered = true
    } else {
      gPacman.isSuper = true
      makeGhostsEatable()
      setTimeout(() => {
        gPacman.isSuper = false
        returnGhosts()
      }, 5000)
    }
  }

  // moving from current location:

  // update the model
  gBoard[gPacman.location.i][gPacman.location.j] = leavingCellContent
  // update the DOM
  renderCell(gPacman.location, leavingCellContent)
  removeOrientationClass(gPacman.location, leavingCellContent)

  // Move the pacman to new location:
  // update the model
  gPacman.location = nextLocation
  gBoard[gPacman.location.i][gPacman.location.j] = PACMAN
  // update the DOM
  renderPacmanCell(gPacman.location, PACMAN)
}

function getNextLocation(eventKeyboard) {
  var nextLocation = {
    i: gPacman.location.i,
    j: gPacman.location.j,
  }
  // figure out nextLocation
  // console.log('eventKeyboard.key', eventKeyboard.key)
  switch (eventKeyboard.key) {
    case 'ArrowUp':
      nextLocation.i--
      gPacman.direction = 'up'
      break
    case 'ArrowDown':
      nextLocation.i++
      gPacman.direction = 'down'
      break
    case 'ArrowLeft':
      nextLocation.j--
      gPacman.direction = 'left'
      break
    case 'ArrowRight':
      nextLocation.j++
      gPacman.direction = 'right'
      break
    default:
      return null
  }
  return nextLocation
}

function removeOrientationClass(location) {
  const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
  elCell.classList.remove('up')
  elCell.classList.remove('down')
  elCell.classList.remove('left')
  elCell.classList.remove('right')
}

function renderPacmanCell(location, value) {
  // Select the elCell and set the value
  const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
  elCell.classList.add(gPacman.direction)
  elCell.innerHTML = value
}
