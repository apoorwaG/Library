function Book(title, author, numPages, readStatus) {
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.readStatus = readStatus;

}

Book.prototype.info = function() {
    if(this.readStatus === true) {
        return `${this.title} by ${this.author}, ${this.numPages} pages, read the book`
    }
    return `${this.title} by ${this.author}, ${this.numPages} pages, not read yet`
}

Book.prototype.changeStatus = function() {
    if(this.readStatus === false) this.readStatus = true;
    else this.readStatus = false;
}


let myLibrary = [];
const book1 = new Book("Man's Search For Meaning", "Viktor E. Frankl", 165, false);
const book2 = new Book("Just Mercy", "Bryan Stevenson", 200, true);
const book3 = new Book("Dune", "Frank Herberta", 465, false);
const book4 = new Book("Dune", "Frank Herbertb", 465, false);
const book5 = new Book("Dune", "Frank Herbertc", 465, false);
const book6 = new Book("Dune", "Frank Herbertd", 465, false);

function addBookToLibrary() {

    myLibrary.push(book1, book2, book3, book4, book5, book6);
    const bookSection = document.querySelector(".books");
    for(let i = 0; i < myLibrary.length; i++){
        const book = document.createElement("div");
        book.classList.add("book");
        book.setAttribute('style', `height: 300px; width: 200px; border: 2px solid black; border-radius: 2px; padding: 10px;`);
        book.textContent = myLibrary[i].info();

        const deleteButton = document.createElement("button")
        deleteButton.classList.add("remove")
        deleteButton.setAttribute("book-index", `${i}`);
        deleteButton.textContent = "Remove";
        book.appendChild(deleteButton);

        const statusButton = document.createElement("button");
        statusButton.classList.add("status");
        statusButton.setAttribute("book-index", `${i}`);
        statusButton.textContent = myLibrary[i].readStatus === true? "Read" : "Unread";
        if(myLibrary[i].readStatus === true) statusButton.classList.add('read');
        else statusButton.classList.add('unread');
        statusButton.addEventListener('click', toggleReadStatus);
        book.appendChild(statusButton);


        bookSection.appendChild(book);

    }

}

function removeBook(event) {
    const bookSection = document.querySelector(".books");
    const bookIndex = +event.target.getAttribute("book-index");
    const book = event.target.parentNode;
    // myLibrary.splice(bookIndex, 1);
    delete myLibrary[bookIndex];
    bookSection.removeChild(book);
}

function toggleReadStatus(event) {
    const bookIndex = +event.target.getAttribute("book-index");
    if(event.target.textContent === "Unread"){
        event.target.classList.remove("unread");
        event.target.classList.add("read");
        event.target.textContent = "Read"
    } else{
        event.target.classList.remove("read");
        event.target.classList.add("unread");
        event.target.textContent = "Unread";
    }

    myLibrary[bookIndex].changeStatus();

}


addBookToLibrary();

const removeButtons = document.querySelectorAll("button.remove");
removeButtons.forEach(button => button.addEventListener('click', removeBook));