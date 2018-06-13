'use strict';


$(document).ready(init);

function init() {
    setGame();
}

function startGuessing() {
    $('.gameStart').hide();
    renderQuest();
    $('.genieTalk').text('And my be question is gonna be: ')
    $('.gameQuest').show();
}

function renderQuest() {
    $('.gameQuest>h2').text(getCurrentQuest().txt) ;
}



function restartGame() {
    $('.gameNewQuest').hide();
    $('.gameStart').show();
    gCurrQuest = gQuestsTree;
    gPrevQuest = null;
    gLastRes = null;
}

function isChildless(node) {
    return (node.yes === null && node.no === null)
}