'use strict'

const GHOST = 'GHOST'
var gGhostsImgs = ['./assets/blue.webp', './assets/pink.png', './assets/orange.png', './assets/red.png']
var gGhosts
var gEatenGhosts
var gIntervalGhosts

function createGhost(board, i) {
  const ghost = {
    id: i,
    location: {
      i: 3,
      j: 3,
    },
    currCellContent: FOOD,
    img: gGhostsImgs[i],
    color: getRandomColor(),
  }
  gGhosts.push(ghost)
  board[ghost.location.i][ghost.location.j] = GHOST
}

function createGhosts(board) {
  // 3 ghosts and an interval
  gEatenGhosts = []
  gGhosts = []
  for (var i = 0; i < 3; i++) {
    createGhost(board, i)
  }
  gIntervalGhosts = setInterval(moveGhosts, 1000)
}

function moveGhosts() {
  // loop through ghosts
  for (var i = 0; i < gGhosts.length; i++) {
    var ghost = gGhosts[i]
    moveGhost(ghost)
  }
}

function moveGhost(ghost) {
  // figure out moveDiff, nextLocation, nextCell

  const moveDiff = getMoveDiff()

  const nextLocation = {
    i: ghost.location.i + moveDiff.i,
    j: ghost.location.j + moveDiff.j,
  }

  const nextCell = gBoard[nextLocation.i][nextLocation.j]

  // return if cannot move
  if (nextCell === WALL) return
  if (nextCell === GHOST) return
  // hitting a pacman? call gameOver
  if (nextCell === PACMAN) {
    gameOver('LOSS')
  }

  // moving from current location:
  // update the model (restore prev cell contents)
  gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent
  // update the DOM
  renderCell(ghost.location, ghost.currCellContent)

  // Move the ghost to new location:
  // update the model (save cell contents so we can restore later)
  ghost.location = nextLocation
  ghost.currCellContent = nextCell
  gBoard[ghost.location.i][ghost.location.j] = GHOST
  // update the DOM
  renderCell(ghost.location, getGhostHTML(ghost))
}

function removeGhost(ghostLocation) {
  //remove from model
  var ghost = null
  var index = -1
  for (var i = 0; i < gGhosts.length; i++) {
    if (gGhosts[i].location.i === ghostLocation.i && gGhosts[i].location.j === ghostLocation.j) {
      ghost = gGhosts[i]
      index = i
    }
  }

  gEatenGhosts.push(gGhosts.splice(index, 1)[0])

  //remove from dom
  renderCell(ghost.location, ghost.currCellContent)
}
function returnGhosts() {
  for (var i = 0; i < gEatenGhosts.length; i++) {
    gGhosts.push(gEatenGhosts[i])
  }
  makeGhostsNormal()
}
function makeGhostsEatable() {
  const ghosts = document.querySelectorAll('.ghost')
  for (var i = 0; i < ghosts.length; i++) {
    ghosts[i].src = './assets/eatable.png'
  }
}
function makeGhostsNormal() {
  const ghosts = document.querySelectorAll('.ghost')
  for (var i = 0; i < ghosts.length; i++) {
    for (var j = 0; j < gGhosts.length; j++) {
      if (+ghosts[i].dataset.ghostId === gGhosts[j].id) {
        renderCell(gGhosts[j].location, getGhostHTML(gGhosts[j]))
      }
    }
  }
}
function getMoveDiff() {
  const randNum = getRandomIntInclusive(1, 4)

  switch (randNum) {
    case 1:
      return { i: 0, j: 1 }
    case 2:
      return { i: 1, j: 0 }
    case 3:
      return { i: 0, j: -1 }
    case 4:
      return { i: -1, j: 0 }
  }
}

function getGhostHTML(ghost) {
  var color = ghost.img
  if (gPacman.isSuper) color = './assets/eatable.png'
  return `<img data-ghost-id="${ghost.id}" class="ghost" src="${color}"/>`
}
