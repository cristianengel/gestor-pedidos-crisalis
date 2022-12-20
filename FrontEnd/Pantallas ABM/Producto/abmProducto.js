const homeButton = document.querySelector("#home-btn");
const altaButton = document.querySelector("#alta-btn");

homeButton.addEventListener("click", () => {
    open("../../Homepage/homepage.html", "_self");
})

altaButton.addEventListener("click", () => {
    open("../../Alta/Producto/alta-producto.html", "_self");
})