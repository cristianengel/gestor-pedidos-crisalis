const homeButton = document.querySelector("#home-btn");
const altaButton = document.querySelector("#alta-btn");
const bajaButton = document.querySelector("#baja-btn");
const modificacionButton = document.querySelector("#modificacion-btn");

homeButton.addEventListener("click", () => {
    open("../../Homepage/homepage.html", "_self");
})

altaButton.addEventListener("click", () => {
    open("../../Alta/Producto/alta-producto.html", "_self");
})

bajaButton.addEventListener("click", () => {
    open("../../Baja/Producto/baja-producto.html", "_self");
})

modificacionButton.addEventListener("click", () => {
    open("../../Modificacion/Producto/modificacion-producto.html", "_self");
})
