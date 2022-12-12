let nameInput = document.querySelector("#name")
let lastnameInput = document.querySelector("#lastname")
let usernameInput = document.querySelector("#username");
let passwordInput = document.querySelector("#password");
let mostrarBtn = document.querySelector("#mostrar-btn");
let registerBtn = document.querySelector("#register-btn");

// Registración
function register() {
    mostrarBtn.style.display = "none";
    passwordInput.type = "password";
    // Resto del código
    const link = 'http://localhost:8080/user/registration'
    const data = {
        name: nameInput.value,
        lastname: lastnameInput.value,
        username: usernameInput.value,
        password: passwordInput.value
    };
    fetch(link, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*"
        }
    })
        .then(res => res.json())
        .then(data => console.log(data));
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
registerBtn.addEventListener("click", register);