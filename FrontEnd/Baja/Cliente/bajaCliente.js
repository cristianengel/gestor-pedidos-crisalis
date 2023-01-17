const deleteButton = document.querySelector("#delete-btn");
const identificationInput = document.querySelector("#identification-input");
const searchBtn = document.querySelector("#search-btn");
const listInput = document.querySelector("#list-input");
const idText = document.querySelector("#id-text");
const nameText = document.querySelector("#name-text");
const masterContainer = document.querySelector(".delete-master-container");
const deleteCenterContainer = document.querySelector(".delete-center-container");
const confirmBtn = document.querySelector("#confirm-btn");
const cancelBtn = document.querySelector("#cancel-btn");

// Table
const table = document.querySelector("#table");
const tableHead = document.querySelector("#thead");
const tableBody = document.querySelector("#tbody");
const clientListLink = "http://localhost:8080/client/list";

async function search() {
    refreshTable("./headers.json", `http://localhost:8080/client/get_by_identification?identification=${listInput.value}`)
}

async function deleteClient() {
    const response = await fetch(`http://localhost:8080/client/delete?identification=${identificationInput.value}`, {
        method: "POST",
        headers: {
            "Content-Length": 0
        }
    })
    refreshTable("./headers.json", clientListLink)
}

async function fetchDataFromDB(url) {
    const response = await fetch(url)
    let data = await response.json();
    data = JSON.stringify(data);
    data = JSON.parse(data);
    return data;
}

function loadBody(data) {
    for (let dataObject of data) {
        const rowElement = document.createElement("tr");
        let dataObjectArray = Object.entries(dataObject);

        for(let i of dataObjectArray) {
            let cellElement = document.createElement("td");
            cellElement.textContent = i[1];
            rowElement.appendChild(cellElement);
        }
        tableBody.appendChild(rowElement)
    }
    for (let i = 1, row; row = table.rows[i]; i++) {
        row.addEventListener("click", () => {
            masterContainer.style.display = "block";
            masterContainer.style.animationName = "fade-in";
            masterContainer.style.animationDuration = ".5s";
            deleteCenterContainer.style.display = "block";
            deleteCenterContainer.style.animationName = "scaleUp";
            deleteCenterContainer.style.animationDuration = ".3s";
            elementToDelete = row.cells[0].innerHTML;
            idText.textContent = `ID: ${row.cells[0].innerHTML}`;
            nameText.textContent = `Nombre: ${row.cells[1].innerHTML}`;
        })
        if(i % 2 == 0 && i > 0) {
            row.style.backgroundColor = "#EEEEEE"
        }
        for (let j = 0, col; col = row.cells[j]; j++) {
            if(col.innerHTML == "false") {
                col.innerHTML = "Persona";
            } else if (col.innerHTML == "true") {
                col.innerHTML = "Empresa";
            } else if (col.innerHTML == "") {
                col.innerHTML = "-";
            }
        }  
    }
}

async function refreshTable(urlHeaders, urlBody) {
    // Headers
    const headersResponse = await fetch(urlHeaders);
    const { headers } = await headersResponse.json();

    // Clear the headers
    tableHead.innerHTML = "<tr></tr>";

    // Populate Headers
    for (const headerText of headers) {
        const headerElement = document.createElement("th");

        headerElement.textContent = headerText;
        tableHead.querySelector("tr").appendChild(headerElement);
    }

    // Body
    tableBody.innerHTML = "";
    fetchDataFromDB(urlBody).then(data => {
        loadBody(data);
    });
}

refreshTable("./headers.json", clientListLink)

confirmBtn.addEventListener("click", () => {
    deleteClient();
    masterContainer.style.display = "none";
    deleteCenterContainer.style.display = "none";
    refreshTable("./headers.json", clientListLink);
})

cancelBtn.addEventListener("click", () => {
    masterContainer.style.display = "none";
    deleteCenterContainer.style.display = "none";
})

searchBtn.addEventListener("click", () => {
    if(listInput.value == "") {
        refreshTable("./headers.json", clientListLink);
        return;
    }
    search();
})