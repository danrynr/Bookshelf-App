const STORAGE_BOOK_KEY = "BOOKSHELF_APPS";

let books = [];

function isStorageExist() {
    if (typeof(Storage) === undefined) {
        alert("Your Browser does not support Web Storage");
        return false;
    }
    return true;
}

function saveData() {
    const parsed = JSON.stringify(books);
    localStorage.setItem(STORAGE_BOOK_KEY, parsed);
    document.dispatchEvent(new Event("ondatasaved"));
}

function loadDataFromStorage() {
    const serializeData = localStorage.getItem(STORAGE_BOOK_KEY);

    let data = JSON.parse(serializeData);
    
    if (data !== null) {
        books = data;
    }

    document.dispatchEvent(new Event("ondataloaded"));
}

function updateDataToStorage() {
    if (isStorageExist()) {
        saveData();
    }
}

function composeBookObject(bookTitle, author, year, id, isCompleted) {
    return { 
        id,
        bookTitle,
        author,
        year,
        isCompleted
    };
}

function findBook(bookId) {
    for (book of books) {
        if (book.id === bookId) {
            return book;
        }
    }

    return null;
}

function findBookIndex(bookId) {
    let index = 0;
    for (book of books) {
        if (book.id === bookId) {
            return index;
        }

        index++;
    }

    return -1;
}

function refreshDataFromBooks() {
    const listUncompleted = document.getElementById(UNCOMPLETED_BOOK_ID);
    const listCompleted = document.getElementById(COMPLETED_BOOK_ID);

    for (book of books) {
        const newBook = makeBook(book.bookTitle, book.author, book.year, book.id, book.isCompleted);
        newBook[BOOK_ID] = book.id;

        if (book.isCompleted) {
            listCompleted.append(newBook);
        } else {
            listUncompleted.append(newBook);
        }
    }
}