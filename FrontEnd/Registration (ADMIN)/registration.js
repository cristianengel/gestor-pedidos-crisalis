let nameInput = document.querySelector("#name")
let lastnameInput = document.querySelector("#lastname")
let usernameInput = document.querySelector("#username");
let passwordInput = document.querySelector("#password");
let mostrarBtn = document.querySelector("#mostrar-btn");
let registerBtn = document.querySelector("#register-btn");
let emailLink = document.querySelector("#email-link");

// Registración
function register() {
    mostrarBtn.style.display = "none";
    passwordInput.type = "password";

    if(confirm("Confirmar registro?") == false) {
        return
    }
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

    alert("Usuario Registrado")
    open("../Login/login.html", "_self")
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
emailLink.addEventListener("click", () => {
    navigator.clipboard.writeText("cristianengel1411@gmail.com");

    alert("Copied the text: " + "cristianengel1411@gmail.com");
})