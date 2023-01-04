const homeButton = document.querySelector("#home-btn");
const altaButton = document.querySelector("#alta-btn");
const bajaButton = document.querySelector("#baja-btn");
const modifyButton = document.querySelector("#modificacion-btn");

homeButton.addEventListener("click", () => {
    open("../../Home/home.html", "_self");
})

altaButton.addEventListener("click", () => {
    open("../../Alta/Servicio/alta-servicio.html", "_self");
})

bajaButton.addEventListener("click", () => {
    open("../../Baja/Servicio/baja-servicio.html", "_self");
})

modifyButton.addEventListener("click", () => {
    open("../../Modificacion/Servicio/modificacion-servicio.html", "_self");
})