
const savedBookHTML = (title, authorName, bookCover, publishYear, rating, href, isbn) => {
    return `<div class="grid is-col-min-9"><a href="${href}"><div class="cell">
<div class="card">
  <div class="card-image">
    <figure class="image is-2by3">
      <img
        src="${bookCover}"
        alt="Placeholder image"
      />
    </figure>
  </div>
  <div class="card-content">
    <div class="media">
      <div class="media-content">
        <p class="title is-4">${title}</p>
        <p class="subtitle is-6">${authorName}</p>
      </div>
    </div>

    <div class="content">
      <p> &#9734; ${rating} &#8226; Pub. Year: ${publishYear}</p>
      <button class="remove-saved-book button is-danger">&minus;</button>
    </div>
  </div>
</div>
</div></a>
<p style="display: none;" id="book-isbn">${isbn}</p></div>`;
}

const savedBooks = JSON.parse(localStorage.getItem("savedBooks")) || [];
const savedBooksDisplay = document.querySelector("#saved-books-display");
const removeAllBooks = document.querySelector("#remove-all-saved-books");
const noBooksMessageDiv = document.querySelector("#no-books-message");
const removeSavedBookBtns = document.querySelectorAll(".remove-saved-book");


if (savedBooks.length === 0) {
  noBooksMessageDiv.innerHTML = "No books were saved";
} else {
  console.log(savedBooks);
  savedBooks.forEach(book => {
      console.log(book);
      const title = book.title ?? "Untitled";
      const bookCover = book.cover_edition_key ? `https://covers.openlibrary.org/b/olid/${book.cover_edition_key}-L.jpg` : "pictures/NA.png";
      const authorName = Array.isArray(book.author_name) ? book.author_name[0] : "Unknown Author";
      const publishYear = book.first_publish_year ?? "N/A";
      const rating = book.ratings_average?.toString().substring(0, 3) ?? "N/A";
      const href = "bookDetails.html";
      const isbn = book.isbn[0];
      savedBooksDisplay.innerHTML = savedBookHTML(title, authorName, bookCover, publishYear, rating, href, isbn);
  });

}

removeAllBooks.addEventListener("click", event => {
  event.preventDefault();
  console.log(JSON.parse(localStorage.getItem("savedBooks")));
  localStorage.removeItem("savedBooks");
  console.log(JSON.parse(localStorage.getItem("savedBooks")));
});

removeSavedBookBtns.forEach(button => {
  button.addEventListener("click", event => {
    event.preventDefault();
    event.stopPropagation();
    const savedBooks = JSON.parse(localStorage.getItem("savedBooks"));
    const bookISBN = event.currentTarget.closest(".card").querySelector("#isbn").textContent;
    savedBooks = savedBooks.filter(book => book.isbn[0] !== bookISBN);
    localStorage.setItem("savedBooks", JSON.stringify(savedBooks));
    event.currentTarget.closest(".card").remove();
  })
})