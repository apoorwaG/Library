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
const book3 = new Book("Dune", "Frank Herbert", 465, false);

const books = [book1, book2, book3]
books.forEach(addBookToLibrary);

// index is the position of the book in the array
function addDeleteButton(bookButtons, index) {
    const deleteButton = document.createElement("button")
    deleteButton.classList.add("remove")
    deleteButton.setAttribute("data-book-index", `${index}`);
    deleteButton.textContent = "Remove";
    deleteButton.addEventListener('click', removeBook);
    bookButtons.appendChild(deleteButton);

    return bookButtons;
}

// index is the position of the book in the array
function addStatusButton(bookButtons, index, newBook) {
    const statusButton = document.createElement("button");
    statusButton.classList.add("status");
    statusButton.setAttribute("data-book-index", `${index}`);
    statusButton.textContent = newBook.readStatus === true? "Read" : "Unread";
    if(newBook.readStatus === true) statusButton.classList.add('read');
    else statusButton.classList.add('unread');
    statusButton.addEventListener('click', toggleReadStatus);
    bookButtons.appendChild(statusButton);

    return bookButtons;

}

function addBookToLibrary(newBook) {
    
    myLibrary.push(newBook);
    const bookSection = document.querySelector(".books");

    const book = document.createElement("div");
    book.classList.add("book");
    book.textContent = newBook.info();

    let bookButtons = document.createElement("div");
    bookButtons.classList.add("bookButtons");

    bookButtons = addDeleteButton(bookButtons, myLibrary.length - 1);
    bookButtons = addStatusButton(bookButtons, myLibrary.length - 1, newBook);

    book.appendChild(bookButtons);

    // book.addEventListener('mouseover', visitBook, {capture:true});
    // book.addEventListener('mouseleave', leaveBook, {capture:true});

    bookSection.appendChild(book);

}

function visitBook(event) {
    event.target.style.background = "rgba(68, 170, 253, 0.911)";
    event.stopPropagation();
}

function leaveBook(event) {
    event.target.style.background = "";
    event.stopPropagation();
}


function removeBook(event) {
    const bookSection = document.querySelector(".books");
    const bookIndex = +event.target.getAttribute("data-book-index");
    const book = (event.target.parentNode).parentNode;
    delete myLibrary[bookIndex];
    bookSection.removeChild(book);
}

function toggleReadStatus(event) {
    const bookIndex = +event.target.getAttribute("data-book-index");
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