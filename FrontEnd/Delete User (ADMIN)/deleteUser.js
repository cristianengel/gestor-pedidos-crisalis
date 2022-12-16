let usernameInput = document.querySelector("#username");
let registerBtn = document.querySelector("#delete-btn");
let emailLink = document.querySelector("#email-link");

// Registración
function register() {
    mostrarBtn.style.display = "none";
    passwordInput.type = "password";

    if (confirm("Confirmar registro?") == false) {
        return
    }
    // Resto del código
    const link = `http://localhost:8080/user/delete?username=${usernameInput.value}`
    fetch(link, {
        method: 'POST',
    })
    alert("Usuario Registrado");
    open("../Login/login.html", "_self");
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
        alert("Hay datos faltantes.")
        return;
    }
    register()
});
emailLink.addEventListener("click", () => {
    navigator.clipboard.writeText("cristianengel1411@gmail.com");

    alert("Copied the text: " + "cristianengel1411@gmail.com");
})