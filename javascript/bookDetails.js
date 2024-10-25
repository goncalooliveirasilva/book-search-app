const bookDetails = (bookObject, bookCoverURL) => {
        return `<div id="book-details">
        <div class="columns">
          <div class="column">
            <img src="${bookCoverURL}" />
          </div>
          <div class="column">
            <div class="content">
              <h1 class="title">${bookObject.title ?? "Untitled"}</h1>
              <p class="subtitle is-4">${Array.isArray(bookObject.author_name) ? bookObject.author_name[0] : "Unknown Author"}</p>
              <hr style="height: 5px;" />
              <p class="subtitle is-5 is-spaced">${bookObject.number_of_pages_median} pages &#8226; first pub ${bookObject.first_publish_year
              }</p>
              <p class="title is-5 is-spaced">Average rating: <span>${bookObject.ratings_average?.toString().substring(0, 3)} &#11088; </span></p>
              <p class="subtitle is-5">Main characters: <span>${Array.isArray(bookObject.person) ? bookObject.person.map(p => `${p}`).join(", ") : "N/A"}</p></span></p>
              <h5>Subject: ${bookObject.subject ? bookObject.subject.map(s => `<span style="margin-right: 10px; margin-top: 10px" class="tag">${s}</span>`).join("") : "N/A"}</h5>

            </div>
          </div>
        </div>
      </div>`
}

document.addEventListener("DOMContentLoaded", () => {
    const bookObject = sessionStorage.getItem("selectedBook");
    const bookCoverURL = sessionStorage.getItem("selectedBookCover");

    if (bookObject && bookCoverURL) {
        document.querySelector("#main-container").insertAdjacentHTML("beforeend", bookDetails(JSON.parse(bookObject), bookCoverURL));
        console.log(JSON.parse(bookObject))
    } else {
        document.querySelector("#main-container").insertAdjacentHTML("beforeend", "<p>Book details not available</p>");
    }
});