
var gQuestsTree;
var gCurrQuest;
var gPrevQuest = null;
var gLastRes = null;

function setGame(){
    gQuestsTree =  loadFromStorage()
    if (!gQuestsTree){
        gQuestsTree = createQuest('Male?');
        gQuestsTree.yes = createQuest('Gandhi');
        gQuestsTree.no = createQuest('Rita');
        gCurrQuest = gQuestsTree;
    }
    gCurrQuest = gQuestsTree;
}
  
function getQuests(){
    return gQuestsTree;
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

function getCurrentQuest(){
    return gCurrQuest;
}

function createQuest(txt) {
    return {
        txt: txt,
        yes: null,
        no: null
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

// to put in utils
function saveToStorage(value) {
    localStorage.setItem('quests', JSON.stringify(value));
}

function loadFromStorage() {
    return JSON.parse(localStorage.getItem('quests'));
}
