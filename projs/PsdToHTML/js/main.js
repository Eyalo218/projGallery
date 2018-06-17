function toggleMenu(ev) {
    ev.stopPropagation();
    var elMenu = document.querySelector('.main-menu');
    var elButton = document.querySelector('.menu-toggle');
    console.log(elButton);
    elMenu.classList.toggle('open');
    elButton.classList.toggle('hidden');
}

function onBodyClick(ev){
    var elMenu = document.querySelector('.main-menu');
    if (elMenu.classList.contains('open')) toggleMenu(ev);
    return;
}


// Get the modal
var modal = document.querySelector('.modal');

// Get the button that opens the modal
var btn = document.querySelector('.post-button');
// Get the <span> element that closes the modal
var span = document.querySelector('.close')

// When the user clicks on the button, open the modal 
function openModal() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}