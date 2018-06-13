var GHOST = '<img src="img/ghost.png"/>';

var gIntervalGhosts;
var gGhosts;

function createGhost(board) {

    var ghost = {
        color: getRandomColor(),
        sickColor: 'whitesmoke',
        location: {
            i: 3,
            j: 3
        },
        currCellContent: FOOD
    };
    gGhosts.push(ghost);
    board[ghost.location.i][ghost.location.j] = GHOST;
}

function reviveGhost(){
    if(gBoard[3][3]===FOOD) createGhost(gBoard);
    else {
        createGhost(gBoard);
        gGhosts[gGhosts.length-1].currCellContent=EMPTY;
    }
    
}

function toggleGhostHealth(ghost) {
    var temp = ghost.color
    ghost.color = ghost.sickColor;
    ghost.sickColor = temp;
    var elCell = getElementFromCoord(ghost.location.i, ghost.location.j);
    elCell.style.backgroundColor = ghost.color;
    renderCell(ghost.location, getGhostHTML(ghost));
}



function createGhosts(board) {
    gGhosts = [];

    createGhost(board);
    createGhost(board);
    createGhost(board);

    gIntervalGhosts = setInterval(function moveGhosts() {

        // TODO, if there are less than 3 ghosts, create one

        gGhosts.forEach(function moveGhost(ghost) {

            var nextLocation = {
                i: ghost.location.i + getRandomIntInclusive(-1, 1),
                j: ghost.location.j + getRandomIntInclusive(-1, 1)
            }
            // console.log('nextLocation', nextLocation);

            if (board[nextLocation.i][nextLocation.j] === WALL) return;
            if (board[nextLocation.i][nextLocation.j] === GHOST) return;

            var isGameOver = checkEngage(board[nextLocation.i][nextLocation.j], PACMAN);
            if (isGameOver) {
            }


            // set back what we stepped on
            var elCell = getElementFromCoord(ghost.location.i, ghost.location.j);
            elCell.style.backgroundColor = "black";
            board[ghost.location.i][ghost.location.j] = ghost.currCellContent;
            renderCell(ghost.location, ghost.currCellContent);

            // move the ghost
            ghost.location = nextLocation;

            // keep the contnet of the cell we are going to
            ghost.currCellContent = board[ghost.location.i][ghost.location.j];

            // move the ghost model and update dom
            board[ghost.location.i][ghost.location.j] = GHOST;
            var elCell = getElementFromCoord(ghost.location.i, ghost.location.j);
            elCell.style.backgroundColor = ghost.color;
            renderCell(ghost.location, getGhostHTML(ghost));


        });

    }, 1000);

}

function getGhostHTML(ghost) {
    return `<span>${GHOST}</span>`
}




