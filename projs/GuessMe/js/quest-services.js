
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



// to put in utils
function saveToStorage(value) {
    localStorage.setItem('quests', JSON.stringify(value));
}

function loadFromStorage() {
    return JSON.parse(localStorage.getItem('quests'));
}
