export const bookHTML = (title, authorName, bookCover, publishYear, rating, index, href, contains) => {
    const btn = contains ? "<button id='add-book-button' class='button is-primary is-outlined disabled'>&#10004; Saved</button>" : "<button id='add-book-button' class='button is-info'>&plus;</button>"; 
    return `<a href="${href}"><div class="cell">
<div id="${index}" class="card">
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
      ${btn}
    </div>
  </div>
</div>
</div></a>`
}