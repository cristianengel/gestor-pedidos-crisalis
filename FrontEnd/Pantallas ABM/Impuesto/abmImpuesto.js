const homeButton = document.querySelector("#home-btn");
const addBtn = document.querySelector("#add-btn");
const removeBtn = document.querySelector("#remove-btn");
const modifyBtn = document.querySelector("#modify-btn");

homeButton.addEventListener("click", () => {
    open("../../Home/home.html", "_self");
})

addBtn.addEventListener("click", () => {
    open("../../Alta/Impuesto/alta-impuesto.html", "_self");
})

removeBtn.addEventListener("click", () => {
    open("../../Baja/Impuesto/baja-impuesto.html", "_self");
})

modifyBtn.addEventListener("click", () => {
    open("../../Modificacion/Impuesto/modificacion-impuesto.html", "_self");
})