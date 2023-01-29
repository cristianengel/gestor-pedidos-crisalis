// Variables y constantes del documento
let usernameInput = document.querySelector("#username");
let passwordInput = document.querySelector("#password");
let mostrarBtn = document.querySelector("#mostrar-btn");
let loginBtn = document.querySelector("#login-btn");
let registerBtn = document.querySelector("#register-btn");

async function login() {
    mostrarBtn.style.display = "none";
    passwordInput.type = "password";
    const link = `http://localhost:8080/user/login?username=${usernameInput.value}&password=${passwordInput.value}`;
    const response = await fetch(link, {
        method: "GET"
    })
    const status = response.status;

    if(status == "200") {
        open("../Home/home.html", "_self");
    }
    if(status == "400") {
        alert("Hay datos faltantes.")
    }
    if(status == "401") {
        alert("No se pudo iniciar sesión.")
    }
}

// Event Listeners
usernameInput.addEventListener("focus", () => {
    mostrarBtn.style.display = "none";
    passwordInput.type = "password";
});
passwordInput.addEventListener("focus", () => {
    mostrarBtn.style.display = "flex";
});
loginBtn.addEventListener("click", login);

mostrarBtn.addEventListener("click", () => {
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
    } else {
        passwordInput.type = "password";
    }
});

registerBtn.addEventListener("click", () => {
    open("../Registration (ADMIN)/registration.html", "_self");
})

window.addEventListener("keydown", function(event) {
    if(event.key == "Enter") {
        login()
    }
})