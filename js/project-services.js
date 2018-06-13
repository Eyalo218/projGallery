var gProj = [
    { id: 'minesweeper', name: 'Mine Sweeper', title: 'Better avoid the mines', 
    desc: 'Mine sweeper game with a gui and w/e', url: 'projs/MineSweeper/', 
    publishedAt: new Date(), labels: ['Matrixes', 'keyboard events']},
    { id: 'pacman', name: 'Pacman', title: 'Don\'t let the ghosts catch you!', 
    desc: 'pacman game with a gui and w/e', url: 'projs/Pacman/', 
    publishedAt: new Date(), labels: ['Matrixes', 'keyboard events','2D Real Time game']},
    { id: 'bookstore', name: 'Book Store', title: 'Best way to find your new favorite book', 
    desc: 'Website to manage book store', url: 'projs/BookStore/', 
    publishedAt: new Date(), labels: ['Bootstrap', 'Jquery','Modals']}
];

function addProject() {// will return to do that.
    gProj.push()
}

function getProjects(){
    return gProj;
}

function getProjectsLength(){
    return gProj.length;
}

function getProjById(id){
    for (let i = 0; i < gProj.length; i++) {
        if(gProj[i].id ===id) return gProj[i];
    }
}
