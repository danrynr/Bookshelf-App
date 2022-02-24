const UNCOMPLETED_BOOK_ID = "books";
const COMPLETED_BOOK_ID = "completed-books";
const BOOK_ID = "bookId";


function addBook() {
    const uncompletedBookList = document.getElementById(UNCOMPLETED_BOOK_ID);
    const completedBookList = document.getElementById(COMPLETED_BOOK_ID);

    const titleBook = document.getElementById("title").value;

    const bookAuthor = document.getElementById("author").value;

    const bookYear = document.getElementById("year").value;

    const readCheckbox = document.getElementById("inputBookIsCompleted").checked;

    const time = new Date();
    const bookId = time.getTime();


    if (readCheckbox === true) {
        const book = makeBook(titleBook, bookAuthor, bookYear, bookId, true);
        const bookObject = composeBookObject(titleBook, bookAuthor, bookYear, bookId, true);

        book[BOOK_ID] = bookObject.id;
        books.push(bookObject);

        completedBookList.append(book);
        this.updateDataToStorage();
    } else {
        const book = makeBook(titleBook, bookAuthor, bookYear, bookId, false);
        const bookObject = composeBookObject(titleBook, bookAuthor, bookYear, bookId, false);

        book[BOOK_ID] = bookObject.id;
        books.push(bookObject);

        uncompletedBookList.append(book);
        this.updateDataToStorage();
    }
    document.getElementById("form").reset();
}

function makeBook(data, bookAuthor, bookYear, bookId, isCompleted) {

    const bookTitle = document.createElement("h2");
    bookTitle.innerText = data;
    
    const author = document.createElement("p");
    author.innerText = bookAuthor;
    
    const year = document.createElement("i");
    year.innerText = bookYear;

    const bookIDs = document.createElement("h5");
    bookIDs.innerText = bookId;

    const bookContainer = document.createElement("div");
    bookContainer.classList.add("inner");
    bookContainer.append(bookTitle, author, year, bookIDs);

    const container = document.createElement("div");
    container.classList.add("item", "shadow");
    container.append(bookContainer);

    if (isCompleted) {
        container.append(
            createUndoButton(),
            createTrashButton()
        );
    } else {
        container.append(
            createCheckButton(),
            createTrashButton()
        );
    }

    return container;
}

function filterBook() {
    const filter = document.getElementById("search-query").value.toLowerCase();

    const uncompletedBookList = document.getElementById(UNCOMPLETED_BOOK_ID);
    const completedBookList = document.getElementById(COMPLETED_BOOK_ID);

    const uncompletedBookListItems = uncompletedBookList.querySelectorAll(".item");
    const completedBookListItems = completedBookList.querySelectorAll(".item");


    if (filter === "") {
        uncompletedBookListItems.forEach(function(book) {
            book.style.display = "";
        });

        completedBookListItems.forEach(function(book) {
            book.style.display = "";
        });

        return;
    }

    uncompletedBookListItems.forEach(function(book) {
        const bookTitle = book.querySelector(".inner > h2").innerText.toLowerCase();

        if (!bookTitle.includes(filter)) {
            book.style.display = "none";
        } else {
            book.style.display = "";
        }
    });

    completedBookListItems.forEach(function(book) {
        const bookTitle = book.querySelector(".inner > h2").innerText.toLowerCase();

        if (!bookTitle.includes(filter)) {
            book.style.display = "none";
        } else {
            book.style.display = "";
        }
    }); 
}


function createButton(buttonTypeClass, eventListener) {
    const button = document.createElement("button");
    button.classList.add(buttonTypeClass);
    button.addEventListener("click", function(event) {
        eventListener(event);
    });

    return button;
}



function addBookToCompleted(bookElement) {
    const completedBookList = document.getElementById(COMPLETED_BOOK_ID);

    const bookTitle = bookElement.querySelector(".inner > h2").innerText;

    const author = bookElement.querySelector(".inner > p").innerText;

    const year = bookElement.querySelector(".inner > i").innerText;

    const bookIDs = bookElement.querySelector(".inner > h5").innerText;

    const newBook = makeBook(bookTitle, author, year, bookIDs, true);
    const book = findBook(bookElement[BOOK_ID]);
    book.isCompleted = true;
    newBook[BOOK_ID] = book.id;

    completedBookList.append(newBook);
    bookElement.remove();

    updateDataToStorage();
}

function removeBookFromBookshelf(bookElement) {
    const bookPosition = findBookIndex(bookElement[BOOK_ID]);
    books.splice(bookPosition, 1);

    bookElement.remove();
    updateDataToStorage();
}

function undoBookFromCompleted(bookElement) {
    const uncompletedBookList = document.getElementById(UNCOMPLETED_BOOK_ID);

    const bookTitle = bookElement.querySelector(".inner > h2").innerText;

    const author = bookElement.querySelector(".inner > p").innerText;

    const year = bookElement.querySelector(".inner > i").innerText;

    const bookIDs = bookElement.querySelector(".inner > h5").innerText;

    const newBook = makeBook(bookTitle, author, year,bookIDs, false);

    const book = findBook(bookElement[BOOK_ID]);
    book.isCompleted = false;
    newBook[BOOK_ID] = book.id;

    uncompletedBookList.append(newBook);
    bookElement.remove();

    updateDataToStorage();
}

function createCheckButton() {
    return createButton("check-button", function(event) {
        addBookToCompleted(event.target.parentElement);
    });
}

function createTrashButton() {
    return createButton("trash-button", function(event) {
        removeBookFromBookshelf(event.target.parentElement);
    });
}

function createUndoButton() {
    return createButton("undo-button", function(event) {
        undoBookFromCompleted(event.target.parentElement);
    });
}

const year = new Date()
const yyyy = year.getFullYear();
document.getElementById("year").setAttribute("max", yyyy);
document.getElementById("year").setAttribute("placeholder", yyyy - 22);