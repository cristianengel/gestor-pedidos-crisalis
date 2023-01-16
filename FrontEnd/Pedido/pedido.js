const nameInput = document.querySelector("#name-input");
const lastnameInput = document.querySelector("#lastname-input");
const dniInput = document.querySelector("#dni-input");
const addressInput = document.querySelector("#address-input");
const phoneNumberInput = document.querySelector("#phone-number-input");
const emailInput = document.querySelector("#email-input");
const confirmBtnPerson = document.querySelector("#confirm-btn-person");
const confirmBtnBusiness = document.querySelector("#confirm-btn-business");
const cancelBtn = document.querySelector("#cancel-btn");
const cancelBtnPerson = document.querySelector("#cancel-btn-person");
const cancelBtnBusiness = document.querySelector("#cancel-btn-business");
const backBtnPerson = document.querySelector("#back-btn-person");
const backBtnBusiness = document.querySelector("#back-btn-business");
const newClientBackground = document.querySelector(".new-client-background");
const createNewBtn = document.querySelector("#create-new-btn");
const clientTypeDiv = document.querySelector(".client-type-div");
const newClientDiv = document.querySelector(".new-client-attributes");
const newPersonDiv = document.querySelector("#new-person-attributes");
const newBusinessDiv = document.querySelector("#new-business-attributes");
const personBtn = document.querySelector("#person-btn");
const businessBtn = document.querySelector("#business-btn"); 
const table = document.querySelector("#table");
const tableBody = document.querySelector("#tbody");
const tableHead = document.querySelector("#thead");
const listInput = document.querySelector("#list-input");
const searchBtn = document.querySelector("#search-btn");
const clientListLink = "http://localhost:8080/client/list";

async function search() {
    refreshTable("./headers.json", `http://localhost:8080/client/get_by_identification?identification=${listInput.value}`)
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
        //iterate through rows
        row.addEventListener("click", () => {
            return;
        })
        //rows would be accessed using the "row" variable assigned in the for loop
        for (let j = 0, col; col = row.cells[j]; j++) {
          //iterate through columns
          //columns would be accessed using the "col" variable assigned in the for loop
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

searchBtn.addEventListener("click", () => {
    if(listInput.value == "") {
        refreshTable("./headers.json", clientListLink);
        return;
    }
    search();
})

confirmBtnPerson.addEventListener("click", () => {
    newClientBackground.style.display = "none";
    newPersonDiv.style.display = "none"
    clientTypeDiv.style.display = "none"
})

cancelBtn.addEventListener("click", () => {
    newClientBackground.style.display = "none";
    newPersonDiv.style.display = "none"
    clientTypeDiv.style.display = "none"
})

cancelBtnPerson.addEventListener("click", () => {
    newClientBackground.style.display = "none";
    newPersonDiv.style.display = "none"
    newBusinessDiv.style.display = "none"
    clientTypeDiv.style.display = "none"
})

cancelBtnBusiness.addEventListener("click", () => {
    newClientBackground.style.display = "none";
    newBusinessDiv.style.display = "none"
    newPersonDiv.style.display = "none"
    clientTypeDiv.style.display = "none"
})

createNewBtn.addEventListener("click", () => {
    newClientBackground.style.display = "flex";
    clientTypeDiv.style.display = "inline";
})

backBtnPerson.addEventListener("click", () => {
    clientTypeDiv.style.display = "inline";
    newPersonDiv.style.display = "none";
})

backBtnBusiness.addEventListener("click", () => {
    clientTypeDiv.style.display = "inline";
    newBusinessDiv.style.display = "none";
})

personBtn.addEventListener("click", () => {
    clientTypeDiv.style.display = "none";
    newPersonDiv.style.display = "flex";
    newBusinessDiv.style.display = "none";
})

businessBtn.addEventListener("click", () => {
    clientTypeDiv.style.display = "none";
    newPersonDiv.style.display = "none";
    newBusinessDiv.style.display = "flex";
})