const CHERRY = '&#127826'
var gIntervalCherry

function createCherry(board) {
  const emptyCells = getEmptyCells()
  if (!emptyCells.length) return
  const randomIndex = getRandomInt(0, emptyCells.length)
  const chosenTargetCell = emptyCells[randomIndex]
  board[chosenTargetCell.i][chosenTargetCell.j] = CHERRY
  renderCell(chosenTargetCell, CHERRY)
}
function createCherries(board) {
  gIntervalCherry = setInterval(createCherry, 15000, board)
}

function getEmptyCells() {
  const emptyCells = []
  for (var i = 0; i < gBoard.length; i++) {
    for (var j = 0; j < gBoard[i].length; j++) {
      if (gBoard[i][j] !== ' ') continue
      emptyCells.push({ i: i, j: j })
    }
  }
  return emptyCells
}
