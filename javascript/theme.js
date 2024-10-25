document.addEventListener("DOMContentLoaded", () => {
    const button = document.querySelector("#toggle-mode");
    const buttonImage = document.querySelector("#toggle-mode img");
    const currentTheme = localStorage.getItem("theme") || "light";

    document.documentElement.setAttribute("data-theme", currentTheme);

    currentTheme === "dark" ? buttonImage.setAttribute("src", "icons/moon.png") : buttonImage.setAttribute("src", "icons/sun.png");
    
    button.addEventListener("click", () => {
        let theme = document.documentElement.getAttribute("data-theme");
        theme = theme === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
        theme === "dark" ? buttonImage.setAttribute("src", "icons/moon.png") : buttonImage.setAttribute("src", "icons/sun.png");
    })
})