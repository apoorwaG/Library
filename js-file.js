function Book(title, author, numPages, readStatus) {
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.readStatus = readStatus;

}

Book.prototype.info = function() {
    return `${this.title} by ${this.author}, ${this.numPages} pages`;
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

const books = [book1, book2, book3, book4, book5, book6]
books.forEach(addBookToLibrary);

function addBookToLibrary(newBook) {
    
    myLibrary.push(newBook);
    const bookSection = document.querySelector(".books");

    const book = document.createElement("div");
    book.classList.add("book");
    book.textContent = newBook.info();

    const bookButtons = document.createElement("div");

    const deleteButton = document.createElement("button")
    deleteButton.classList.add("remove")
    deleteButton.setAttribute("book-index", `${myLibrary.length - 1}`);
    deleteButton.textContent = "Remove";
    deleteButton.addEventListener('click', removeBook);
    bookButtons.appendChild(deleteButton);

    const statusButton = document.createElement("button");
    statusButton.classList.add("status");
    statusButton.setAttribute("book-index", `${myLibrary.length - 1}`);
    statusButton.textContent = newBook.readStatus === true? "Read" : "Unread";
    if(newBook.readStatus === true) statusButton.classList.add('read');
    else statusButton.classList.add('unread');
    statusButton.addEventListener('click', toggleReadStatus);
    bookButtons.appendChild(statusButton);

    book.appendChild(bookButtons);

    bookSection.appendChild(book);

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
    console.log(myLibrary);
}

function toggleForm(event) {
    const addForm = document.querySelector(".add_form");
    if(addForm.style.display === "none"){
        addForm.style.display = "flex";
    }
    else{
        addForm.style.display = "none";
    }
}

function addBook(event) {
    const form = (event.target.parentNode).parentNode;
    console.log(form);
    const bookName = form.querySelector('#bookName').value;
    const authorName = form.querySelector("#authorName").value;
    const numPages = form.querySelector("#numPages").value;
    if(bookName === "" || authorName === "") {
        alert("Fields cannot be left empty!");
        return;
    }
    if(+numPages < 1 || +numPages > 5000) {
        alert("Number of pages must be between 1 and 5000.");
        return
    }
    const newBook = new Book(bookName, authorName, +numPages, false);
    addBookToLibrary(newBook);
    toggleForm(event);

}

const newButton = document.querySelector("button.newBook");
newButton.addEventListener('click', toggleForm);
const cancelButton = document.querySelector("button.cancel");
cancelButton.addEventListener('click', toggleForm);


const addEntry = document.querySelector('.addEntry');
addEntry.addEventListener('click', addBook);