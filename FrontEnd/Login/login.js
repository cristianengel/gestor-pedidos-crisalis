// Variables y constantes del documento
let usernameInput = document.querySelector("#username");
let passwordInput = document.querySelector("#password");
let mostrarBtn = document.querySelector("#mostrar-btn");
let loginBtn = document.querySelector("#login-btn");
let emailLink = document.querySelector("#email-link");
// Logueo
function login() {
    mostrarBtn.style.display = "none";
    passwordInput.type = "password";
    const link = `http://localhost:8080/user/login?username=${usernameInput.value}&password=${passwordInput.value}`;
    const xhr = new XMLHttpRequest();
    xhr.open('GET', link);

    xhr.onload = () => {
        console.log(xhr.response)
        console.log(xhr.status)
        console.log(xhr.statusText)
        if(xhr.status == 200) {
            open("../Homepage/homepage.html", "_self")
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
mostrarBtn.addEventListener("click", () => {
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
    } else {
        passwordInput.type = "password";
    }
});
loginBtn.addEventListener("click", login);
emailLink.addEventListener("click", () => {
    navigator.clipboard.writeText("cristianengel1411@gmail.com");

    alert("Copied the text: " + "cristianengel1411@gmail.com");
})
