const userNameInput = document.querySelector("#user-name-input");
const userNameInputHelp = document.querySelector("#user-name-input-help");
const userDataForm = document.querySelector("#user-data-form");

const userName = localStorage.getItem("userName") || "";
userNameInput.value = userName;

userDataForm.addEventListener("submit", event => {
    event.preventDefault();
    const userName = userNameInput.value.trim();

    if (/\d/.test(userName)) {
        userNameInputHelp.textContent = "The name cannot contain numbers!";
        userNameInputHelp.style.color = "red";
    } else {
        userNameInputHelp.textContent = "";
        localStorage.setItem("userName", userName);
        alert("Name saved successfully!");
    }

});