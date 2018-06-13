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
    $('.gameQuest>h2').text(gCurrQuest.txt)  // TODO: select the <h2> inside gameQuest and update its text by the currQuest text
}

function userResponse(res) {

    // If this node has no children
    if (isChildless(gCurrQuest)) {
        if (res === 'yes') {
            $('.genieTalk').text('Woohoo! I knew im gonna be right ')
            $('.gameQuest').hide();
            restartGame();
        } else {
            $('.genieTalk').text('Hmm, Please teach me who it was')
            $('.gameQuest').hide();
            $('.gameNewQuest').show();
        }
    } else {
        gPrevQuest = gCurrQuest;
        gCurrQuest= gCurrQuest[res];
        gLastRes=res;
        renderQuest();
    }
}

function addGuess() {
    gPrevQuest[gLastRes] = createQuest($('#newQuest').val());
    gPrevQuest[gLastRes].yes = createQuest($('#newGuess').val());
    gPrevQuest[gLastRes].no = gCurrQuest;
    // TODO: create 2 new Quests based on the inputs' values
    // TODO: connect the 2 Quests to the quetsions tree
    saveToStorage(getQuests());
    restartGame();
}

function createQuest(txt) {
    return {
        txt: txt,
        yes: null,
        no: null
    }
    
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