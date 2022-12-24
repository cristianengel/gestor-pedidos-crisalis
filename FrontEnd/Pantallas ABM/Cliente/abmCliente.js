const homeButton = document.querySelector("#home-btn");
const addBtn = document.querySelector("#add-btn");

homeButton.addEventListener("click", () => {
    open("../../Homepage/homepage.html", "_self");
})

addBtn.addEventListener("click", () => {
    open("../../Alta/Cliente/alta-cliente.html", "_self")
})

