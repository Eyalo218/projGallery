function renderButtons(id) {
    return `<td>
    <button class="btn btn-primary" onClick="openReadModal(${id})" data-toggle="modal" data-target="#readModal">Read</button>
    <button class="btn btn-warning" data-toggle="modal" data-target="#exampleModal"
    onClick="openUpdateModal(${id})" value="${id}">Update</button>
    <button class="btn btn-danger" onClick="deleteButtonClicked(${id})">Delete</button>
    </td>`
}

function renderAddModal() {
    return `<form onsubmit="addBook(event)">
        <div class="form-group">
            <label for="Name">Book Name</label>
            <input type="text" class="bookName" id="Name" aria-describedby="bookName" placeholder="Enter book name">
        </div>
        <div class="form-group">
            <label for="price">price</label>
            <input type="text" class="bookPrice" id="price" placeholder="0">
        </div>
        <div class="form-group">
            <label for="releaseDate">releaseDate</label>
            <input type="text" class="bookRelease" id="releaseDate" placeholder="1990">
        </div>
        
        <button type="submit" class="btn btn-primary">Submit</button>
</form>`
}

function renderUpdateModal(id, price, releaseDate) {
    return `<form onsubmit="updateBook(event,${id})">
        <div class="form-group">
            <label for="price">price</label>
            <input type="text" class="bookPrice" id="price" placeholder="${price}">
        </div>
        <div class="form-group">
            <label for="releaseDate">releaseDate</label>
            <input type="text" class="bookRelease" id="releaseDate" placeholder="${releaseDate}">
        </div>
        
        <button type="submit" class="btn btn-primary">Submit</button>
</form>`
}

function renderReadModal(book) {
    return `<div class="readContent">
        <h2>${book.name}</h2>
        <h5>Book Id: ${book.id}</h5>
        <h5>Book Price: ${book.price}</h5>
        <h5>Book Released: ${book.releaseDate}</h5>
        <img src="imgs/${book.id}.jpg"/>
        </div>
        <div class="likes">
        <button class="btn btn-success like" onClick="addLike(${book.id})">&#x1f44d;</button>
        <h5>Likes: ${book.likes}</h5>
        <button class="btn btn-danger unlike" onClick="removeLike(${book.id})">&#x1f44e;</button>
        </div>`
}

function saveToStorage(value) {
    localStorage.setItem('books', JSON.stringify(value));
}

function loadFromStorage() {
    return JSON.parse(localStorage.getItem('books'));
}
