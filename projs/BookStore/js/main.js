'use strict'
$(document).ready(init());
function renderBooks() {
    var strHTML = '';
    var books = loadFromStorage()
    for (var i = 0; i < books.length; i++) {
        var book = books[i];
        strHTML += `<tr><td>${book.id}</td>`;
        strHTML += `<td><img class="bookImg" src='imgs/${book.id}.jpg'/></td>`;
        strHTML += `<td>${book.name}</td>`;
        strHTML += `<td>&#8362;${book.price}</td>`;
        strHTML += renderButtons(book.id);
        strHTML += '</tr>\n';
    }
    $('tbody').html(strHTML);
}

function openAddModal() {
    var addModalHTML = renderAddModal();
    $('.modal-title').text('Add New Book!');
    $('.modal-body').html(addModalHTML);
}

function openReadModal(id) {
    var book = getBookById(id);
    $('.readModalTitle').text(`Review This Book!`)
    var readModalHTML = renderReadModal(book);
    
    $('.readModal').html(readModalHTML);
}

function openUpdateModal(id) {
    var book = getBookById(id);
    var updateModalHTML = renderUpdateModal(id, book.price, book.releaseDate);
    $('.modal-title').text(`Update book: ${book.name}`);
    $('.modal-body').html(updateModalHTML);
}

function init() {
    setShop();
    renderBooks();
}



function deleteButtonClicked(bookId) {
    deleteBook(bookId);
    renderBooks();
}

function updateButtonClicked() {
    updateBook();
    renderBooks();
}

function sortTable(sortBy){
    sortBooksByProperty(sortBy.getAttribute("value"))
    renderBooks(); 
}