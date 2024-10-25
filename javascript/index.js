import FetchWrapper from "./fetch-wrapper.js";
import { bookHTML } from "./bookHTML.js";
import isLoadingToggle from "./helpers.js";

const userName = document.querySelector("#user-name");
const searchBookForm = document.querySelector("#search-book-form");
const bookName = document.querySelector("#book-name");
const bookSection = document.querySelector("#book-section");
const bookSeactionGrid = document.querySelector("#book-section .grid");
const searchResults = document.querySelector("#search-results");
const searchResultsNumber = document.querySelector("#search-results-number");

const API = new FetchWrapper("https://openlibrary.org/search.json");

userName.innerHTML = `${localStorage.getItem("userName") || ""} &#128512;`;

searchBookForm.addEventListener("submit", async event => {
  event.preventDefault();
  isLoadingToggle("search-button");
  bookSeactionGrid.innerHTML = "";
  const bookTitleFormated = bookName.value.trim().split(/\s+/).join("+");
  const data = await API.get(`?title=${bookTitleFormated}`);
  console.log(data.docs);

  if (data.docs.length === 0) {
    bookSection.insertAdjacentHTML("beforeend", "No Books Were Found");
  }

  bookSection.style.display = "initial";
  searchResults.innerHTML = `"${bookName.value.trim()}"`;
  searchResultsNumber.innerHTML = `${data.docs.length}`;
  isLoadingToggle("search-button");

  const bookCoversList = new Array();

  //renderização dos livros
  let index = 0;
  data.docs.forEach(element => {
    const title = element.title ?? "Untitled";
    const authorName = Array.isArray(element.author_name) ? element.author_name[0] : "Unknown Author";
    const bookCover = element.cover_edition_key ? `https://covers.openlibrary.org/b/olid/${element.cover_edition_key}-L.jpg` : "pictures/NA.png";
    bookCoversList.push(bookCover);
    const publishYear = element.first_publish_year ?? "N/A";
    const rating = element.ratings_average?.toString().substring(0, 3) ?? "N/A";
    const href = "bookDetails.html";
    
    const contains = false;
    bookSeactionGrid.insertAdjacentHTML("beforeend", bookHTML(title, authorName, bookCover, publishYear, rating, index, href, contains));
    index++;
  });

  const cards = document.querySelectorAll(".card");
  cards.forEach(card => {
    card.addEventListener("click", event => {
      console.log(event.currentTarget.id);
      const index = event.currentTarget.id;

      sessionStorage.setItem("selectedBook", JSON.stringify(data.docs[index]));
      sessionStorage.setItem("selectedBookCover", bookCoversList[index]);

      window.location.href = "bookDetails.html";
    });
  });



  const addButtons = document.querySelectorAll("#add-book-button");
  addButtons.forEach(button => {
    button.addEventListener("click", event => {
      event.stopPropagation();
      event.preventDefault();
      let currentBook = data.docs[event.currentTarget.closest(".card").id];
      console.log(currentBook);
      
      const savedBooks = JSON.parse(localStorage.getItem("savedBooks")) || [];
      savedBooks.push(currentBook);
      event.currentTarget.classList.remove("is-primary");
      event.currentTarget.classList.add("button", "is-primary", "is-outlined", "disabled");
      event.currentTarget.innerHTML = "&#10004; Saved";
      localStorage.setItem("savedBooks", JSON.stringify(savedBooks));
    });
  });

});


