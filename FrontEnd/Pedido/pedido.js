const nameInput = document.querySelector("#name-input");
const lastnameInput = document.querySelector("#lastname-input");
const dniInput = document.querySelector("#dni-input");
const addressInput = document.querySelector("#address-input");
const phoneNumberInput = document.querySelector("#phone-number-input");
const emailInput = document.querySelector("#email-input");
const cuitInput = document.querySelector("#cuit-input");
const businessNameInput = document.querySelector("#business-name-input");
const businessStartDateInput = document.querySelector("#date-input");
const ownerNameInput = document.querySelector("#owner-name-input");
const ownerLastnameInput = document.querySelector("#owner-lastname-input");
const ownerDniInput = document.querySelector("#owner-dni-input");
const ownerAddressInput = document.querySelector("#owner-address-input");
const ownerPhoneNumberInput = document.querySelector("#owner-phone-number-input");
const ownerEmailInput = document.querySelector("#owner-email-input");
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
const clientTable = document.querySelector("#client-table");
const clientTableBody = document.querySelector("#client-tbody");
const clientTableHead = document.querySelector("#client-thead");
const clientBottomBar = document.querySelector("#client-bottom-bar");
const detailTable = document.querySelector("#detail-table");
const detailTableBody = document.querySelector("#detail-tbody");
const detailTableHead = document.querySelector("#detail-thead");
const addDetailBtn = document.querySelector("#add-detail-btn");
const assetFormDiv = document.querySelector(".asset-form");
const assetTypeDiv = document.querySelector(".asset-type-div");
const productBtn = document.querySelector("#product-btn");
const serviceBtn = document.querySelector("#service-btn");
const backBtnAssetType = document.querySelector("#back-btn-asset-type");
const productListDiv = document.querySelector(".product-list-div");
const productTable = document.querySelector("#product-table");
const productTableHead = document.querySelector("#product-thead");
const productTableBody = document.querySelector("#product-tbody");
const listInput = document.querySelector("#list-input");
const searchBtn = document.querySelector("#search-btn");
let newClientData = {};
let isClientSelected = false;

const clientListLink = "http://localhost:8080/client/list";
const addClientLink = "http://localhost:8080/client/new";
const productListLink = "http://localhost:8080/asset/products";

async function search() {
    refreshTable("./headers.json", `http://localhost:8080/client/get_by_identification?identification=${listInput.value}`)
}

function cleanInputs() {
    newClientData = {};
    isClientSelected = false;
    clientBottomBar.value = "";
    listInput.value = "";
}

async function fetchDataFromDB(url) {
    const response = await fetch(url)
    let data = await response.json();
    data = JSON.stringify(data);
    data = JSON.parse(data);
    return data;
}

function nullInputsPerson() {
    if(nameInput.value == "" ||
     lastnameInput.value == "" ||
      dniInput.value == "" ||
       addressInput.value == "" ||
       phoneNumberInput == "" ||
       emailInput == "") return true;
    return false;
}

function nullInputsBusiness() {
    if(cuitInput.value == "" ||
        businessNameInput.value == "" ||
        businessStartDateInput.value == "" ||
        ownerNameInput.value == "" ||
        ownerLastnameInput.value == "" ||
        ownerDniInput.value == "" ||
        ownerAddressInput.value == "" ||
        ownerPhoneNumberInput == "" ||
        ownerEmailInput == "") return true;
    return false;
}

async function newClient(isBusiness) {
    if(!isBusiness) {
        newClientData = {
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
        clientBottomBar.value = dniInput.value;
        isClientSelected = true;
    } else {
        newClientData = {
            is_business: true,
            identification_number: cuitInput.value,
            name: ownerNameInput.value,
            lastname: ownerLastnameInput.value,
            address: ownerAddressInput.value,
            phone_number: ownerPhoneNumberInput.value,
            email: ownerEmailInput.value,
            business_name: businessNameInput.value,
            business_start_date: businessStartDateInput.value,
            owner_id: ownerDniInput.value
        }
        clientBottomBar.value = cuitInput.value;
        isClientSelected = true;
    }
    await fetch(addClientLink, {
        method: "POST",
        body: JSON.stringify(newClientData),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(res => res.json())
        .then(data => console.log(data))
    refreshTable("./headers.json", clientListLink)
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
        clientTableBody.appendChild(rowElement)
    }
    for (let i = 1, row; row = clientTable.rows[i]; i++) {
        //iterate through rows
        row.addEventListener("click", () => {
            clientBottomBar.value = row.cells[1].innerHTML;
        })
        if(i % 2 == 0 && i > 0) {
            row.style.backgroundColor = "#EEEEEE"
        }
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

function loadAssetsBody(data) {
    for (let dataObject of data) {
        const rowElement = document.createElement("tr");
        let dataObjectArray = Object.entries(dataObject);
        for(let i of dataObjectArray) {
            if(dataObjectArray.indexOf(i) == 3 || dataObjectArray.indexOf(i) == 4) continue;
            let cellElement = document.createElement("td");
            if(dataObjectArray.indexOf(i) == 5) {
                let taxesArray = []
                for(let j of dataObjectArray[dataObjectArray.indexOf(i)][1]) {
                    let dataTaxesArray = Object.entries(j)
                    taxesArray.push(dataTaxesArray[1][1])
                }
                cellElement.textContent = taxesArray;
                rowElement.appendChild(cellElement);
                continue;
            }
            cellElement.textContent = i[1];
            rowElement.appendChild(cellElement);
        }
        productTableBody.appendChild(rowElement)
    }
    for (let i = 1, row; row = productTable.rows[i]; i++) {
        //iterate through rows
        row.addEventListener("click", () => {
            //TODO
        })
        if(i % 2 == 0 && i > 0) {
            row.style.backgroundColor = "#EEEEEE"
        }
        //rows would be accessed using the "row" variable assigned in the for loop
        for (let j = 0, col; col = row.cells[j]; j++) {
          //iterate through columns
          //columns would be accessed using the "col" variable assigned in the for loop
          if (col.innerHTML == "") {
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
    clientTableHead.innerHTML = "<tr></tr>";

    // Populate Headers
    for (const headerText of headers) {
        const headerElement = document.createElement("th");

        headerElement.textContent = headerText;
        clientTableHead.querySelector("tr").appendChild(headerElement);
    }

    // Body
    clientTableBody.innerHTML = "";
    fetchDataFromDB(urlBody).then(data => {
        loadBody(data);
    });
}

async function refreshAssetsTable(urlHeaders, urlBody) {
    // Headers
    const headersResponse = await fetch(urlHeaders);
    const { headers } = await headersResponse.json();

    // Clear the headers
    productTableHead.innerHTML = "<tr></tr>";

    // Populate Headers
    for (const headerText of headers) {
        const headerElement = document.createElement("th");

        headerElement.textContent = headerText;
        productTableHead.querySelector("tr").appendChild(headerElement);
    }

    // Body
    productTableBody.innerHTML = "";
    fetchDataFromDB(urlBody).then(data => {
        loadAssetsBody(data);
    });
}

refreshTable("./headers.json", clientListLink)

searchBtn.addEventListener("click", () => {
    if(listInput.value == "") {
        refreshTable("./headers.json", clientListLink);
        clientBottomBar.value = "";
        return;
    }
    search();
})

confirmBtnPerson.addEventListener("click", () => {
    newClientBackground.style.display = "none";
    newPersonDiv.style.display = "none"
    clientTypeDiv.style.display = "none"
    if(nullInputsPerson()){
        alert("Faltan Datos");
        return;
    }
    newClient(false);
})

confirmBtnBusiness.addEventListener("click", () => {
    newClientBackground.style.display = "none";
    newBusinessDiv.style.display = "none"
    clientTypeDiv.style.display = "none"
    if(nullInputsBusiness()){
        alert("Faltan Datos");
        return;
    }
    newClient(true);
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

addDetailBtn.addEventListener("click", () => {
    assetFormDiv.style.display = "flex";
    assetTypeDiv.style.display = "inline";
})

backBtnAssetType.addEventListener("click", () => {
    assetFormDiv.style.display = "none";
    assetTypeDiv.style.display = "none";
})

productBtn.addEventListener("click", () => {
    assetTypeDiv.style.display = "none";
    productListDiv.style.display = "inline";
    refreshAssetsTable("./product-headers.json", productListLink)
})

serviceBtn.addEventListener("click", () => {

})