// Variables y constantes del documento
let usernameInput = document.querySelector("#username");
let passwordInput = document.querySelector("#password");
let mostrarBtn = document.querySelector("#mostrar-btn");
let loginBtn = document.querySelector("#login-btn");

function login() {
    mostrarBtn.style.display = "none";
    passwordInput.type = "password";
    const link = `http://localhost:8080/user/login?username=${usernameInput.value}&password=${passwordInput.value}`;
    const xhr = new XMLHttpRequest();
    xhr.open('GET', link);

    xhr.onload = () => {
        console.log(xhr.status);
        if(xhr.status == 200) {
            open("../Homepage/homepage.html", "_self");
        }
        if(xhr.status == 400) {
            alert("Hay datos faltantes.")
        }
        if(xhr.status == 401) {
            alert("No se pudo iniciar sesión.")
        }
    }

    xhr.send(); 
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