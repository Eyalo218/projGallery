'use strict'

var gBoard;
var gLevel = { SIZE: 4, MINES: 2 };

var gEasyBestTime = localStorage.getItem('easyBestTime');
var gMediumBestTime = localStorage.getItem('mediumBestTime');
var gHardBestTime = localStorage.getItem('hardBestTime');

var gState = {
    isGameOn: false,
    markedCount: 0,
    flagCount: 0,
    gameInterval: null,
    time: 0
}

var BOMB_IMG = '<img src="imgs/bomb.png"/>';
var FLAG_IMG = '<img src="imgs/flag.png"/>';
var NORMALSMILEY = 'imgs/normal.bmp';
var DEADSMILEY = 'imgs/died.bmp';
var WINNINGSMILEY = 'imgs/finish.bmp';

function initGame() {
    var elSmiley = document.querySelector('.smiley');
    elSmiley.src = NORMALSMILEY;
    var elFlag = document.querySelector('.flagCounter');
    elFlag.innerText = 'flags left:' + (gLevel.MINES - gState.flagCount)
    gState.isGameOn = false;
    gState.markedCount = 0;
    gState.flagCount = 0;
    gBoard = buildBoard();
    renderBoard(gBoard);
    resetTimer();
}

function resetTimer() {
    var str = "0:00:00";
    var elTimer = document.querySelector('.timer');
    clearInterval(gState.gameInterval);
    elTimer.innerText;
}

function startTimer() {
    gState.time = 0;
    gState.gameInterval = setInterval(function () {
        gState.time++;
        var sec = gState.time % 60;
        var min = (gState.time - sec) / 60 % 60;
        var hour = (gState.time - sec - min * 60) / 3600;
        var str = hour + ':' + ("0" + min).slice(-2) + ':' + ("0" + sec).slice(-2);
        var elTimer = document.querySelector('.timer');
        elTimer.innerText = str;
    }, 1000);
}

function buildBoard() {
    //creating the matrix
    var board = new Array(gLevel.SIZE);
    for (let i = 0; i < gLevel.SIZE; i++) {
        board[i] = new Array(gLevel.SIZE);
    }
    //init all the matrix with objects
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board.length; j++) {
            board[i][j] = {
                bombsAroundCount: 0,
                isShown: false,
                isBomb: false,
                isMarked: false,
            }
        }
    }
    return board;
}

function setMinesNegsCount() {
    for (let i = 0; i < gBoard.length; i++) {
        for (let j = 0; j < gBoard.length; j++) {
            var sum = countMines(i, j);
            gBoard[i][j].bombsAroundCount = sum;
        }
    }
}
//check all the neighbours if they are mines and return the sum of bomb neighbours
function countMines(coordX, coordY) {
    var len = gBoard.length;
    var sum = 0;
    for (let i = coordX - 1; i <= coordX + 1; i++) {
        for (let j = coordY - 1; j <= coordY + 1; j++) {
            if (j < 0 || j >= len || i < 0 || i >= len || (coordX === i && coordY === j)) continue;
            if (gBoard[i][j].isBomb) sum++;
        }
    }
    return sum;
}

// Render the board to an HTML table - took it from the ball game;
function renderBoard(board) {
    var elBoard = document.querySelector('.board');
    var strHTML = '';
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>\n';
        for (var j = 0; j < board[0].length; j++) {
            var currCell = board[i][j];

            var cellClass = getClassName({ i: i, j: j })

            if (currCell.isBomb) cellClass += ' bomb';
            //else if (currCell.is === WALL) cellClass += ' wall';  -- might use it on flags

            strHTML += '\t<td class="cell ' + cellClass + '"  onmousedown="cellClicked(this, event)" >\n';
            strHTML += '\t</td>\n';
        }
        strHTML += '</tr>\n';
    }
    elBoard.innerHTML = strHTML;
}

//get the class name of the td on specific location using i and j
function getClassName(location) {
    var cellClass = 'cell-' + location.i + '-' + location.j;
    return cellClass;
}

//check and deal with player click and its Event. 
//NOTICE: i missed the part of using right click and used CTRL click instead
function cellClicked(elCell, event) {
    var coords = getCellCoord(elCell.className);
    var currCell = gBoard[coords.i][coords.j];
    // CR  : the ! operator is a friend but make things more complicated . 
    if (!event.ctrlKey) {
        if (!currCell.isMarked) {
            if (!gState.isGameOn) {
                currCell.isShown = true;
                startGame();
            }
            if (currCell.isBomb) {
                gameLost(elCell);
            }
            else {
                elCell.innerText = currCell.bombsAroundCount;
                currCell.isShown = true;
                if (currCell.bombsAroundCount === 0) {
                    currCell.isShown = false;
                    expandShown(coords.i, coords.j);
                }
            }
        }
    } else {
        cellMarked(elCell);
    }

}
function gameLost(cell) {
    clearInterval(gState.gameInterval)
    cell.innerHTML = BOMB_IMG;
    var elSmiley = document.querySelector('.smiley');
    elSmiley.src = DEADSMILEY;
    playAgain(false);
}

function startGame() {
    gState.isGameOn = true;
    startTimer();
    setMines();
    setMinesNegsCount();
}

// CR: the do while is not good choice, always. use the simple while loop instead and keep it simple. 
function setMines() {
    for (let i = 0; i < gLevel.MINES; i++) {
        do {
            var coordX = getRandomInt(0, gLevel.SIZE);
            var coordY = getRandomInt(0, gLevel.SIZE);
            var currCell = gBoard[coordX][coordY];
        } while (currCell.isBomb || currCell.isShown)
        currCell.isBomb = true;
    }
}

function setLevel() {
    var radios = document.querySelectorAll('.radioClass')
    for (var i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            var level = radios[i].id;
            if (level === 'easyLevel') {
                gLevel.MINES = 2;
                gLevel.SIZE = 4;
            }
            else if (level === 'mediumLevel') {
                gLevel.MINES = 5;
                gLevel.SIZE = 6;
            }
            else {
                gLevel.MINES = 15;
                gLevel.SIZE = 8;
            }
            // only one radio can be logically checked, break prevent it to check the rest.
            break;
        }
    }
    initGame();
}

function cellMarked(elCell) {
    var coords = getCellCoord(elCell.className);
    var currCell = gBoard[coords.i][coords.j];
    if (!currCell.isShown) {
        if (!currCell.isMarked && gState.flagCount < gLevel.MINES) {
            if (currCell.isBomb) {
                gState.markedCount++;
                checkGameOver();
            }
            elCell.innerHTML = FLAG_IMG;
            gState.flagCount++;  
        } else if (currCell.isMarked) {
            if (currCell.isBomb) {
                gState.markedCount--;
            }
            gState.flagCount--;
            elCell.innerHTML = '';
        }
        currCell.isMarked = !currCell.isMarked;
        var elFlag = document.querySelector('.flagCounter');
        elFlag.innerText = 'flags left:' + (gLevel.MINES - gState.flagCount)
    }
}

function checkGameOver() {
    if (gState.markedCount === gLevel.MINES) {
        clearInterval(gState.gameInterval);
        var elSmiley = document.querySelector('.smiley');
        elSmiley.src = WINNINGSMILEY;
        if (gLevel.SIZE === 4) {
            if (gState.time < gEasyBestTime || gEasyBestTime === null) {
                localStorage.setItem('easyBestTime', gState.time);
            }
        } else if (gLevel.SIZE === 6) {
            if (gState.time < gMediumBestTime || gMediumBestTime === null) {
                localStorage.setItem('mediumBestTime', gState.time);
            }
        } else {
            if (gState.time < gHardBestTime || gHardBestTime === null) {
                localStorage.setItem('hardBestTime', gState.time);
            }
        }
        playAgain(true);
    }
}

// CR: this function is really annoying
function playAgain(hasWon) {
    var isContinue;
    if (hasWon) isContinue = confirm('You won! do you wanna play again?');
    else isContinue = confirm('you lost but do you wanna play again?');
    if (isContinue) initGame();
}

//expand all the tokens that are next to a '0' token. 
//used recursion because there might be another 0 next to the initial and so on..
function expandShown(xIdx, yIdx) {
    /* 
        CR: var currCell = gBoard[xIdx][yIdx]
        if (currCell.isMarked || currCell.isShown) return
        more easy and clean
    */
    if (!gBoard[xIdx][yIdx].isMarked) {
        var elCell = getElementFromCoord(xIdx, yIdx);
        // CR: The conversion to string is not necessary 
        elCell.innerText = gBoard[xIdx][yIdx].bombsAroundCount + '';
        if (gBoard[xIdx][yIdx].bombsAroundCount !== 0) {
            gBoard[xIdx][yIdx].isShown = true;
            return;
        }
        if (gBoard[xIdx][yIdx].bombsAroundCount === 0 && !gBoard[xIdx][yIdx].isShown) {
            gBoard[xIdx][yIdx].isShown = true;
            var len = gLevel.SIZE;
            for (let i = xIdx - 1; i <= xIdx + 1; i++) {
                for (let j = yIdx - 1; j <= yIdx + 1; j++) {
                    if (j < 0 || j >= len || i < 0
                        || i >= len) continue;
                    if (!gBoard[i, j].isShown) expandShown(i, j);
                }
            }
        } else return;
    } return;
}

function getElementFromCoord(i, j) {
    var coords = { i: i, j: j };
    var classFinder = getClassName(coords);
    var elCell = document.querySelector('.' + classFinder);
    return elCell;
}

function getCellCoord(strCellId) {
    var coord = {};
    coord.i = +strCellId.substring(10, strCellId.lastIndexOf('-'));
    coord.j = +strCellId.substring(strCellId.lastIndexOf('-') + 1);
    return coord;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}