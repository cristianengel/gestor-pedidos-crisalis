// Table
const table = document.querySelector("#table");
const tableHead = document.querySelector("#thead");
const tableBody = document.querySelector("#tbody");

// Add Button
const addBtn = document.querySelector("#add-btn");

// Divs
const personDiv = document.querySelector("#personDiv");
const businessDiv = document.querySelector("#businessDiv");

// Top Buttons
const personBtn = document.querySelector("#personBtn");
const businessBtn = document.querySelector("#businessBtn");

// Person Inputs
const nameInput = document.querySelector("#name");
const lastnameInput = document.querySelector("#lastname");
const dniInput = document.querySelector("#dni");
const addressInput = document.querySelector("#address");
const phoneNumberInput = document.querySelector("#phoneNumber");
const emailInput = document.querySelector("#email");

// Owner Inputs
const ownerNameInput = document.querySelector("#ownerName");
const ownerDniInput = document.querySelector("#ownerDni");
const ownerLastnameInput = document.querySelector("#ownerLastname");
const ownerAddressInput = document.querySelector("#ownerAddress");
const ownerPhoneNumberInput = document.querySelector("#ownerPhoneNumber");
const ownerEmailInput = document.querySelector("#ownerEmail");

// Business Inputs
const cuitInput = document.querySelector("#cuit");
const businessNameInput = document.querySelector("#businessName");
const businessStartDateInput = document.querySelector("#businessStartDate");

// Search
const searchBtn = document.querySelector("#search-btn");
const listInput = document.querySelector("#list-input");

let isBusiness;

const clientListLink = "http://localhost:8080/client/list";
const addClientLink = "http://localhost:8080/client/new";

function cleanInputs() {
    nameInput.value = "";
    lastnameInput.value = "";
    dniInput.value = "";
    addressInput.value = "";
    phoneNumberInput.value = "";
    emailInput.value = "";
    cuitInput.value = "";
    businessNameInput.value = "";
    businessStartDateInput.value = "";
    ownerNameInput.value = "";
    ownerDniInput.value = "";
    ownerLastnameInput.value = "";
    ownerAddressInput.value = "";
    ownerPhoneNumberInput.value = "";
    ownerEmailInput.value = "";
}

async function search() {
    refreshTable("./headers.json", `http://localhost:8080/client/get_by_identification?identification=${listInput.value}`)
}


async function saveClient() {
    console.log("Guardado")
    let data;
    if(isBusiness == true) {
        data = {
            is_business: true,
            identification_number: cuitInput.value,
            name: ownerNameInput.value,
            lastname: ownerLastnameInput.value,
            address: ownerAddressInput.value,
            phone_number: ownerPhoneNumberInput.value,
            email: ownerEmailInput.value,
            business_name: businessNameInput.value.toUpperCase(),
            business_start_date: businessStartDateInput.value,
            owner_id: ownerDniInput.value
        }
    } else {
        data = {
            is_business: false,
            identification_number: dniInput.value,
            name: nameInput.value,
            lastname: lastnameInput.value,
            address: addressInput.value,
            phone_number: phoneNumberInput.value,
            email: emailInput.value,
            business_name: null,
            business_start_date: null,
            owner_id: null
        }
    }
    await fetch(addClientLink, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(res => res.json());

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
    for (let i = 0, row; row = table.rows[i]; i++) {
        //iterate through rows
        //rows would be accessed using the "row" variable assigned in the for loop
        if(i % 2 == 0 && i > 0) {
            row.style.backgroundColor = "#EEEEEE"
        }
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

// Initial Load
refreshTable("./headers.json", clientListLink)

personBtn.addEventListener("click", () => {
    businessDiv.style.display = "none";
    personDiv.style.display = "flex";
    personDiv.style.flexDirection = "column";
    personDiv.style.animationName = "fade-in";
    personDiv.style.animationDuration = "1s";
    isBusiness = false;
})

businessBtn.addEventListener("click", () => {
    personDiv.style.display = "none";
    businessDiv.style.display = "flex";
    businessDiv.style.flexDirection = "column";
    businessDiv.style.animationName = "fade-in";
    businessDiv.style.animationDuration = "1s";
    isBusiness = true;
})

addBtn.addEventListener("click", () => {
    if(!isBusiness) {
        if(nameInput.value == "" ||
         lastnameInput.value == "" ||
          dniInput.value == "" ||
           addressInput.value == "" ||
            phoneNumberInput.value == "" ||
             emailInput.value == "") {
                console.log("No guardado (Persona)")
                return;
             }
    } else {
        if(cuitInput.value == "" ||
        businessNameInput.value == "" ||
         businessStartDateInput.value == "" ||
          ownerNameInput.value == "" ||
           ownerLastnameInput.value == "" ||
           ownerDniInput.value == "" ||
            ownerAddressInput.value == "" ||
            ownerPhoneNumberInput.value == "" ||
            ownerEmailInput.value == "") {
                console.log("No guardado (Empresa)")
                return;
            }
    }

    saveClient();
})

searchBtn.addEventListener("click", () => {
    if(listInput.value == "") {
        refreshTable("./headers.json", clientListLink);
        return;
    }
    search();
})