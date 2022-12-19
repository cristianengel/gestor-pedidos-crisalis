let nameInput = document.querySelector("#name")
let lastnameInput = document.querySelector("#lastname")
let usernameInput = document.querySelector("#username");
let passwordInput = document.querySelector("#password");
let mostrarBtn = document.querySelector("#mostrar-btn");
let registerBtn = document.querySelector("#register-btn");
let goToLoginBtn = document.querySelector("#go-to-login-btn");

// Registración
function register() {
    mostrarBtn.style.display = "none";
    passwordInput.type = "password";

    if (confirm("Confirmar registro?") == false) {
        return
    }
    const link = 'http://localhost:8080/user/registration'
    const data = {
        name: nameInput.value,
        lastname: lastnameInput.value,
        username: usernameInput.value,
        password: passwordInput.value
    };
    const response = fetch(link, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(data => console.log(data))

    alert("Usuario Registrado");
    console.log(response)
}

function hideMostrarBtn() {
    mostrarBtn.style.display = "none";
    passwordInput.type = "password";
}

// Event Listeners
nameInput.addEventListener("focus", hideMostrarBtn)
lastnameInput.addEventListener("focus", hideMostrarBtn)
usernameInput.addEventListener("focus", hideMostrarBtn);
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
registerBtn.addEventListener("click", () => {
    if (nameInput.value == "" || lastnameInput.value == "" || usernameInput.value == "" || passwordInput.value == "") {
        alert("Hay datos faltantes.");
        return;
    }
    register();
});
goToLoginBtn.addEventListener("click", () => {
    open("../Login/login.html", "_self");
});