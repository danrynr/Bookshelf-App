document.addEventListener('DOMContentLoaded', function() {
    const submitForm = document.getElementById("form");
    const filter = document.getElementById("search-books");

    submitForm.addEventListener("submit", function(event) {
        event.preventDefault();
        addBook();
    })

    filter.addEventListener("submit", function(event) {
        event.preventDefault();
        filterBook();
    })

    if (isStorageExist()) {
        loadDataFromStorage();
    }
});

document.addEventListener("ondatasaved", () => {
    console.log("Data has been saved.");
});

document.addEventListener("ondataloaded", () => {
    console.log("Data has been refreshed.")
    refreshDataFromBooks();
})