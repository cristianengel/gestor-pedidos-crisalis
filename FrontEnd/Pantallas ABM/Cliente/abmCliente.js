const homeButton = document.querySelector("#home-btn");
const addBtn = document.querySelector("#add-btn");
const removeBtn = document.querySelector("#remove-btn");

homeButton.addEventListener("click", () => {
    open("../../Homepage/homepage.html", "_self");
})

addBtn.addEventListener("click", () => {
    open("../../Alta/Cliente/alta-cliente.html", "_self")
})

removeBtn.addEventListener("click", () => {
    open("../../Baja/Cliente/baja-cliente.html", "_self");
})