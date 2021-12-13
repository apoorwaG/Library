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


let myLibrary = [];
const book1 = new Book("Man's Search For Meaning", "Viktor E. Frankl", 165, false);
const book2 = new Book("Just Mercy", "Bryan Stevenson", 200, true);
const book3 = new Book("Dune", "Frank Herbert", 465, false);
const book4 = new Book("Dune", "Frank Herbert", 465, false);
const book5 = new Book("Dune", "Frank Herbert", 465, false);
const book6 = new Book("Dune", "Frank Herbert", 465, false);

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

        bookSection.appendChild(book);
    }

}

function removeBook(event) {
    console.log(event.target);
    const bookSection = document.querySelector(".books");
    const bookIndex = +event.target.getAttribute("book-index");
    console.log(bookIndex);
    const book = event.target.parentNode;
    myLibrary.splice(bookIndex, 1);
    console.log(myLibrary);
    bookSection.removeChild(book);
    
}


addBookToLibrary();

const removeButtons = document.querySelectorAll("button.remove");
removeButtons.forEach(button => button.addEventListener('click', removeBook));