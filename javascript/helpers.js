export default (elementID) => {
    document.querySelector(`#${elementID}`).classList.toggle("is-loading");
}
