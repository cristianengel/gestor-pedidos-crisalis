let usernameInput = document.querySelector("#username");
let deleteBtn = document.querySelector("#delete-btn");
let goToLoginBtn = document.querySelector("#go-to-login-btn");

// Registración
function deleteUser() {
    if (confirm(`Seguro que desea eliminar al usuario ${usernameInput.value}?`) == false) {
        return
    }
    // Resto del código
    const link = `http://localhost:8080/user/delete?username=${usernameInput.value}`
    fetch(link, {
        method: 'POST',
    })
    alert("Usuario Eliminado");
}

deleteBtn.addEventListener("click", () => {
    if (usernameInput.value == "") {
        alert("Hay datos faltantes.")
        return;
    }
    deleteUser()
});

goToLoginBtn.addEventListener("click", () => {
    open("../Login/login.html", "_self");
});