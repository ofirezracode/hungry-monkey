'use strict'

/*******************************/
/*Matrix methods*/
/*******************************/

function createMat(ROWS, COLS) {
  const mat = []
  for (var i = 0; i < ROWS; i++) {
    const row = []
    for (var j = 0; j < COLS; j++) {
      row.push('')
    }
    mat.push(row)
  }
  return mat
}

function getAmountOfNeighboursContaining(BOARD, ROW, COL, ITEM) {
  var amount = 0
  for (var i = ROW - 1; i <= ROW + 1; i++) {
    if (i < 0 || i > BOARD.length - 1) continue
    for (var j = COL - 1; j <= COL + 1; j++) {
      if (j < 0 || j > BOARD[i].length - 1 || (i === ROW && j === COL)) continue
      if (BOARD[i][j] === ITEM) amount++
    }
  }
  return amount
}
function getAmountOfCellsContaining(BOARD, ITEM) {
  var amount = 0
  for (var i = 0; i < BOARD.length; i++) {
    for (var j = 0; j < BOARD[i].length; j++) {
      if (BOARD[i][j] === ITEM) amount++
    }
  }
  return amount
}

/*******************************/
/*Random*/
/*******************************/

function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min) + min)
}

function getRandomColor() {
  var letters = '0123456789ABCDEF'
  var color = '#'
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

function getRandomOrderNumbersArray(MAX) {
  const nums = getArrayWithAscNums(MAX)
  var res = []
  for (var i = 0; i < MAX; i++) {
    res[i] = drawNum(nums)
  }
  return res
}

function getArrayWithAscNums(max) {
  var numbers = []
  for (var i = 0; i < max; i++) {
    numbers[i] = i + 1
  }
  return numbers
}

/*******************************/
/*Misc*/
/*******************************/

function drawNum(nums) {
  return nums.splice(getRandomInt(0, nums.length), 1)[0]
}
