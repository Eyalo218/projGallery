'use strict';
var WALL = '<img src="img/tombstone.png"/>';
var FOOD = '<img src="img/food1.png"/>';
var EMPTY = ' ';
var SUPER = '<img src="img/food2.png"/>';

var gBoard;
var gState = {
  score: 0,
  isGameDone: false,
  food: 0
};

function init() {
  gState.isGameDone = false;
  gState.score = 0;
  updateScore(0);
  gBoard = buildBoard();
  printMat(gBoard, '.boardContainer');
  console.table(gBoard);
}

function buildBoard() {
  var SIZE = 10;
  var board = [];
  for (var i = 0; i < SIZE; i++) {
    board.push([]);
    for (var j = 0; j < SIZE; j++) {
      board[i][j] = FOOD;
      gState.food++;


      if (i === 0 || i === SIZE - 1 ||
        j === 0 || j === SIZE - 1 ||
        (j == 3 && i > 4 && i < SIZE - 2)) {

        board[i][j] = WALL;
        gState.food--;
      }
    }
  }
  board[1][1] = SUPER;
  board[1][8] = SUPER;
  board[8][1] = SUPER;
  board[8][8] = SUPER;
  createPacman(board);
  createGhosts(board);
  return board;
}

function checkWin() {
  return gState.food === 1;// not zero because the first part  where we start.
}

// This function is called from both pacman and ghost to check engage
function checkEngage(cell, opponent) {
  if (cell === opponent) {
    // TODO: basic support for eating power-ball (which is not in the game yet)
    if (gPacman.isSuper) {
      killGhost();
      cell = EMPTY;
      console.log('Ghost is dead');
    } else {
      clearInterval(gIntervalGhosts);
      gState.isGameDone = true;
      //toDo - render a new picture of dead pacman;
      var elButton = document.querySelector('button');
      elButton.style.display= "inherit"
      alert('Game Over!');
      console.log('Game Over!');
      return true;
    }
  }
  return false;
}

function killGhost() {
  gGhosts.forEach(function (ghost, idx) {
    if (ghost.location.i === gPacman.location.i && ghost.location.j === gPacman.location.j) {
      if(ghost.currCellContent=== FOOD || ghost.currCellContent=== SUPER ) gState.food--;
      var elCell = getElementFromCoord(ghost.location.i, ghost.location.j);
      elCell.style.backgroundColor = 'black';
      renderCell(ghost.location, PACMANEAT);//need to add picture for eating ghost.
      gGhosts.splice(idx, 1);
      setTimeout(reviveGhost,3000);
    }
  })
}

// this function updates both the model and the dom for the score
function updateScore(value) {
  gState.score += value;
  document.querySelector('header > h3 > span').innerText = gState.score;
}



