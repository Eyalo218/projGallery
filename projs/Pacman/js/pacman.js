var gPacman;
var PACMAN = '<img src="img/pacman.png"/>';
var PACMANLEFT = '<img src="img/pacman1.png"/>';
var PACMANDOWN = '<img src="img/pacman2.png"/>';
var PACMANUP = '<img src="img/pacman3.png"/>';
var PACMANEAT = '<img src="img/pacmaneat.png"/>';

function createPacman(board) {
  gPacman = {
    location: {
      i: 3,
      j: 5
    },
    isSuper: false
  };
  board[gPacman.location.i][gPacman.location.j] = PACMAN;
}

function movePacman(eventKeyboard) {
  // console.log('eventKeyboard:', eventKeyboard);

  if (gState.isGameDone) return;

  var nextLocation = {
    i: gPacman.location.i,
    j: gPacman.location.j
  };

  switch (eventKeyboard.code) {

    case 'ArrowUp':
      //console.log('Arrow Up!');
      nextLocation.i--;
      break;
    case 'ArrowDown':
      //console.log('Arrow Down!');
      nextLocation.i++;
      break;
    case 'ArrowLeft':
      //console.log('Arrow Left!');
      nextLocation.j--;
      break;
    case 'ArrowRight':
      //console.log('Arrow Right!');
      nextLocation.j++;
      break;

  }

  var nextCell = gBoard[nextLocation.i][nextLocation.j];
  // console.log('Heading: row:', newLocation.i , ' col: ', newLocation.j );
  // console.log('Whats there:', gBoard[newLocation.i][newLocation.j]);

  // hitting a wall, not moving anywhere
  if (nextCell === WALL) return;

  // hitting FOOD
  if (nextCell === FOOD) {
    updateScore(1);
    gState.food--;

  }
  if (nextCell === SUPER) {
    gPacman.isSuper = true;
    gGhosts.forEach(toggleGhostHealth);
    setTimeout(function () {
      gPacman.isSuper = false;
      gGhosts.forEach(toggleGhostHealth);
    }, 5000);
    gState.food--;
  }

  if (checkWin()) {
    clearInterval(gIntervalGhosts);
    gState.isGameDone = true;
    var elButton = document.querySelector('button');
    elButton.style.display= "inherit"
    alert('You Won');
  }
  // TODO: add support for power-food

  
  // update the model to reflect movement
  gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;
  
  // render updated model to the DOM
  renderCell(gPacman.location, EMPTY);
  
  // Update the pacman MODEL to new location
  if (gPacman.location.j < nextLocation.j) {
    gPacman.location = nextLocation;
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;
    // render updated model to the DOM
    renderCell(gPacman.location, PACMAN);
  } else if (gPacman.location.j > nextLocation.j) {
    gPacman.location = nextLocation;
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;
    // render updated model to the DOM
    renderCell(gPacman.location, PACMANLEFT);
  } else if (gPacman.location.i < nextLocation.i) {
    gPacman.location = nextLocation;
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;
    // render updated model to the DOM
    renderCell(gPacman.location, PACMANDOWN);
  } else if (gPacman.location.i > nextLocation.i) {
    gPacman.location = nextLocation;
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;
    // render updated model to the DOM
    renderCell(gPacman.location, PACMANUP);
  }
  
  var isGameOver = checkEngage(nextCell, GHOST);
  if (isGameOver) return;
  
}