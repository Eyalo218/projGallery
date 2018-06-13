'use strict';

var gBooks = []
var gId = gBooks.length;

function getBooks() {
    return gBooks;
}

function deleteBook(id) {
    for (let i = 0; i < gBooks.length; i++) {
        if (gBooks[i].id === id) {
            gBooks.splice(i, 1);
            saveToStorage(gBooks)
        }
    }
}
var OMFG;
function addBook(ev) {
    ev.preventDefault();
    var title = $('.bookName').val();
    var price = $('.bookPrice').val();
    var releaseDate = $('.bookRelease').val();
    gBooks.push({ id: gId, name: title, price: price, releaseDate: releaseDate, likes:0 })
    saveToStorage(gBooks);
    renderBooks();
    $('#exampleModal').modal('hide')
}

function getBookById(id) {
    var rightBook;
    gBooks.forEach(function (book) {
        if (book.id === id) {
            rightBook = book;
        }
    })
    return rightBook;
}

function updateBook(ev, id) {
    ev.preventDefault();
    var book = getBookById(id);
    book.price = $('.bookPrice').val();
    book.releaseDate = $('.bookRelease').val();
    saveToStorage(gBooks);
    renderBooks();
    $('#exampleModal').modal('hide')
}


function setId() {
    var maxId = 0
    gBooks.forEach(function (book) {
        if (book.id > maxId) maxId = book.id;
    })
    gId = maxId + 1;
}

function setShop() {
    gBooks = loadFromStorage();
    setId();
    if (gBooks.length === 0) {
        gBooks = [
            { id: 1, name: 'Harry Potter and the Philosopher\'s Stone', price: 90, releaseDate: 1990, likes: 0 },
            { id: 2, name: 'Lord of the Rings: Fellowship of the Ring', price: 100, releaseDate: 1990, likes: 0 },
            { id: 3, name: 'Spot\'t First Walk', price: 25, releaseDate: 1990, likes: 0 },
            { id: 4, name: 'Eragon', price: 30, releaseDate: 1990, likes: 0 },
            { id: 5, name: 'Name of the Wind', price: 110, releaseDate: 1990, likes: 0 }
        ]
        gId = 6;
    }
    saveToStorage(gBooks);
}

function sortBooksByProperty(property) {
    gBooks.sort(function (a, b) {
        return a[property] > b[property];
    })
    saveToStorage(gBooks);
}

function addLike(id){
    var book = getBookById(id);
    console.log(book);
    if (book.likes<10)book.likes++;
    openReadModal(id);
    saveToStorage(gBooks);
}
function removeLike(id){
    var book = getBookById(id);
    if (book.likes>0)book.likes--;
    openReadModal(id);
    saveToStorage(gBooks);
}