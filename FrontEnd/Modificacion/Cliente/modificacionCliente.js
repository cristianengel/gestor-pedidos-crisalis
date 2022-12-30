// Home Button
const homeButton = document.querySelector("#home-btn");

// Table
const table = document.querySelector("#table");
const tableHead = document.querySelector("#thead");
const tableBody = document.querySelector("#tbody");

// Add Button
const modifyBtn = document.querySelector("#modify-btn");

// Divs
const personDiv = document.querySelector("#personDiv");
const businessDiv = document.querySelector("#businessDiv");

// Top Buttons
const personBtn = document.querySelector("#personBtn");
const businessBtn = document.querySelector("#businessBtn");

// Person Inputs
const nameInput = document.querySelector("#name");
const lastnameInput = document.querySelector("#lastname");
const addressInput = document.querySelector("#address");
const phoneNumberInput = document.querySelector("#phoneNumber");
const emailInput = document.querySelector("#email");

// Owner Inputs
const ownerNameInput = document.querySelector("#ownerName");
const ownerLastnameInput = document.querySelector("#ownerLastname");
const ownerAddressInput = document.querySelector("#ownerAddress");
const ownerPhoneNumberInput = document.querySelector("#ownerPhoneNumber");
const ownerEmailInput = document.querySelector("#ownerEmail");

// Business Inputs
const businessNameInput = document.querySelector("#businessName");
const businessStartDateInput = document.querySelector("#businessStartDate");

// Search
const searchBtn = document.querySelector("#search-btn");
const listInput = document.querySelector("#list-input");

let isBusiness;
const identificationInput = document.querySelector("#identification-input");
const loadBtn = document.querySelector("#load-btn");

const clientListLink = "http://localhost:8080/client/list";
const updateClientLink = "http://localhost:8080/client/update";

function cleanInputs() {
    identificationInput.value = "";
    nameInput.value = "";
    lastnameInput.value = "";
    addressInput.value = "";
    phoneNumberInput.value = "";
    emailInput.value = "";
    businessNameInput.value = "";
    businessStartDateInput.value = "";
    ownerNameInput.value = "";
    ownerLastnameInput.value = "";
    ownerAddressInput.value = "";
    ownerPhoneNumberInput.value = "";
    ownerEmailInput.value = "";
}

async function loadData() {
    let clientData = await fetchDataFromDB(`http://localhost:8080/client/get_client_data?identification=${identificationInput.value}`)
    if(clientData[0] == false) {
        businessDiv.style.display = "none";
        personDiv.style.display = "flex";
        personDiv.style.flexDirection = "column";
        personDiv.style.animationName = "fade-in";
        personDiv.style.animationDuration = "1s";
        isBusiness = false;

        nameInput.value = clientData[1];
        lastnameInput.value = clientData[2];
        addressInput.value = clientData[3];
        phoneNumberInput.value = clientData[4];
        emailInput.value = clientData[5];
    } else {
        personDiv.style.display = "none";
        businessDiv.style.display = "flex";
        businessDiv.style.flexDirection = "column";
        businessDiv.style.animationName = "fade-in";
        businessDiv.style.animationDuration = "1s";
        isBusiness = true;

        businessNameInput.value = clientData[6];
        businessStartDateInput.value = clientData[7];
        ownerNameInput.value = clientData[1];
        ownerLastnameInput.value = clientData[2];
        ownerAddressInput.value = clientData[3];
        ownerPhoneNumberInput.value = clientData[4];
        ownerEmailInput.value = clientData[5];
    }
}

async function search() {
    refreshTable("./headers.json", `http://localhost:8080/client/get_by_identification?identification=${listInput.value}`)
}


async function modifyClient() {
    console.log("Modificado")
    if(isBusiness == true) {
        let link = `http://localhost:8080/client/update?isBusiness=true&identification=${identificationInput.value}&name=${ownerNameInput.value}&lastname=${ownerLastnameInput.value}&address=${ownerAddressInput.value}&phoneNumber=${ownerPhoneNumberInput.value}&email=${ownerEmailInput.value}&businessName=${businessNameInput.value}&businessStartDate=${businessStartDateInput.value}`;
        const response = await fetch(link, {
            method: 'POST'
        })
    } else {
        let link = `http://localhost:8080/client/update?isBusiness=false&identification=${identificationInput.value}&name=${nameInput.value}&lastname=${lastnameInput.value}&address=${addressInput.value}&phoneNumber=${phoneNumberInput.value}&email=${emailInput.value}&businessName=&businessStartDate=`;
        const response = await fetch(link, {
            method: 'POST'
        })
    }

    refreshTable("./headers.json", clientListLink);
    cleanInputs()
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
            identificationInput.value = row.cells[1].innerHTML;
            loadData();
        })

        for (let j = 0, col; col = row.cells[j]; j++) {
          if(col.innerHTML == "false") {
            col.innerHTML = "No";
          } else if (col.innerHTML == "true") {
            col.innerHTML = "Sí";
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

// Initial Load
window.onload = () => {
    refreshTable("./headers.json", clientListLink)
}

homeButton.addEventListener("click", () => {
    open("../../Homepage/homepage.html", "_self");
})

modifyBtn.addEventListener("click", () => {
    if(!isBusiness) {
        if(nameInput.value == "" ||
         lastnameInput.value == "" ||
           addressInput.value == "" ||
            phoneNumberInput.value == "" ||
             emailInput.value == "") {
                console.log("No guardado (Persona)")
                return;
             }
    } else {
        if(businessNameInput.value == "" ||
         businessStartDateInput.value == "" ||
          ownerNameInput.value == "" ||
           ownerLastnameInput.value == "" ||
            ownerAddressInput.value == "" ||
            ownerPhoneNumberInput.value == "" ||
            ownerEmailInput.value == "") {
                console.log("No guardado (Empresa)")
                return;
            }
    }
    if(confirm("Está seguro que desea modificar los datos?") == true) {
        modifyClient();
    }
})

searchBtn.addEventListener("click", () => {
    if(listInput.value == "") {
        refreshTable("./headers.json", clientListLink);
        return;
    }
    search();
})

loadBtn.addEventListener("click", () => {
    if(identificationInput.value == "") return;
    loadData();
})