// Variables y constantes del documento
let usernameInput = document.querySelector("#username")
let passwordInput = document.querySelector("#password")
let mostrarBtn = document.querySelector("#mostrar-btn")
let loginBtn = document.querySelector("#login-btn")

// Muestra el botón de "mostrar contraseña"
function showMostrarBtn() {
    mostrarBtn.style.display = "flex"
}

// Oculta el botón de "mostrar contraseña"
function hideMostrarBtn() {
    mostrarBtn.style.display = "none"
    passwordInput.type = "password"
}

// Hace visible la contraseña, se llama a 
// la función con el botón de "mostrar contraseña"
function togglePasswordVision() {
    if(passwordInput.type === "password") {
        passwordInput.type = "text"
    } else {
        passwordInput.type = "password"
    }
}

// Logueo
function login() {
    mostrarBtn.style.display = "none"
    passwordInput.type = "password"
    // Resto del código
    fetch('http://localhost:8080/api/v1/gestor_pedidos', {
        mode: "no-cors",
        method: 'POST',
        body: {
            "nombre": "Cristian",
            "apellido": "Engel",
            "username": usernameInput.innerHTML,
            "password": passwordInput.innerHTML
        }
    })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(error => console.log("ERROR"))
}

// Event Listeners
usernameInput.addEventListener("focus", hideMostrarBtn)
passwordInput.addEventListener("focus", showMostrarBtn)
mostrarBtn.addEventListener("click", togglePasswordVision)
loginBtn.addEventListener("click", login)