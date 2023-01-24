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
const orderBottomBar = document.querySelector("#order-bottom-bar");
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
const serviceListDiv = document.querySelector(".service-list-div");
const productTable = document.querySelector("#product-table");
const productTableHead = document.querySelector("#product-thead");
const productTableBody = document.querySelector("#product-tbody");
const serviceTable = document.querySelector("#service-table");
const serviceTableHead = document.querySelector("#service-thead");
const serviceTableBody = document.querySelector("#service-tbody");
const listInput = document.querySelector("#list-input");
const searchBtn = document.querySelector("#search-btn");
const quantityInput = document.querySelector("#quantity-input");
const loadOrderBtn = document.querySelector("#load-order-btn");
const backBtnProduct = document.querySelector("#back-btn-product");
const backBtnService = document.querySelector("#back-btn-service");
const placeholderText = document.querySelector("#placeholder-text");
let confirm = false;
let newClientData = {};
let isClientSelected = false;

const clientListLink = "http://localhost:8080/client/list";
const addClientLink = "http://localhost:8080/client/new";
const productListLink = "http://localhost:8080/asset/products";
const serviceListLink = "http://localhost:8080/asset/services";

async function search() {
    refreshTable("./headers.json", `http://localhost:8080/client/get_by_identification?identification=${listInput.value}`)
}

function getToday() {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();

    today = yyyy + "-" + mm + "-" + dd

    return today;
}

function cleanInputs() {
    newClientData = {};
    isClientSelected = false;
    clientBottomBar.value = "";
    listInput.value = "";
    quantityInput.value = 1;
    loadOrderBtn.style.backgroundColor = "#3D5AFE"
    loadOrderBtn.innerHTML = "Cargar Pedido";
    confirm = false;
    orderBottomBar.value = "";
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

async function newOrder() {
    let detailList = [];
    let responseData;
    
    for (let i = 1, row; row = detailTable.rows[i]; i++) {

        let data = {
            priceSell: parseFloat(row.cells[5].innerHTML),
            quantity: parseInt(row.cells[4].innerHTML)
        }
        console.log(data)
        await fetch(`http://localhost:8080/order_detail/new?assetId=${parseInt(row.cells[0].innerHTML)}`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then(data => responseData = data);
        
        let responseDataArray = Object.entries(responseData);
        detailList.push(responseDataArray[0][1]);
        console.log(responseDataArray[0][1])
        console.log(responseDataArray)
    }
    console.log(detailList);

    let data = {
        date: getToday(),
        total: orderBottomBar.value
    }

    await fetch(`http://localhost:8080/order/new?orderDetailsId=${detailList}&clientId=${clientBottomBar.value}`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => res.json())
    .then(data => responseData = data);
    console.log(clientBottomBar.value)
}

function loadDetailIntoTable(detail) {
    const rowElement = document.createElement("tr");

    let cellElement = document.createElement("td")
    cellElement.textContent = detail.id
    rowElement.appendChild(cellElement)

    let cellElement2 = document.createElement("td")
    cellElement2.textContent = detail.name
    rowElement.appendChild(cellElement2)

    let cellElement3 = document.createElement("td")
    cellElement3.textContent = detail.basePrice
    rowElement.appendChild(cellElement3)

    let cellElement4 = document.createElement("td")
    cellElement4.textContent = detail.extraCharges
    rowElement.appendChild(cellElement4)

    let cellElement5 = document.createElement("td")
    cellElement5.textContent = detail.quantity
    rowElement.appendChild(cellElement5)

    let cellElement6 = document.createElement("td")
    cellElement6.textContent = detail.totalPrice
    rowElement.appendChild(cellElement6)

    detailTableBody.appendChild(rowElement);

    for (let i = 1, row; row = detailTable.rows[i]; i++) {
        if(i % 2 == 0 && i > 0) {
            row.style.backgroundColor = "#EEEEEE"
        }
        for (let j = 0, col; col = row.cells[j]; j++) {
            if(col.innerHTML == "") {
                col.innerHTML = "-";
            }
        }
    }

    refreshTotal();
    placeholderText.style.display = "none"
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

function loadProductsBody(data) {
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
        row.addEventListener("click", async () => {
            let basePrice = parseInt(row.cells[2].innerHTML);
            let taxes = row.cells[3].innerHTML.split(",");
            let price = basePrice;
            let responseData;
            for(tax of taxes) {
                const response = await fetch(`http://localhost:8080/tax/get_by_name?name=${tax}`)
                    .then(res => res.json())
                    .then(data => responseData = data);
            
                let responseDataArray = Object.entries(responseData);

                let charge = price * (responseDataArray[2][1] / 100);
                price = price + charge;
            }
            let detail = {
                id: row.cells[0].innerHTML,
                name: row.cells[1].innerHTML,
                basePrice: price,
                extraCharges: null,
                quantity: quantityInput.value,
                totalPrice: parseFloat((price * quantityInput.value).toFixed(2))
            }
            loadDetailIntoTable(detail);
            productListDiv.style.display = "none";
            assetFormDiv.style.display = "none";
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

function loadServicesBody(data) {
    for (let dataObject of data) {
        console.log(dataObject)
        const rowElement = document.createElement("tr");
        let dataObjectArray = Object.entries(dataObject);
        for(let i of dataObjectArray) {
            if(dataObjectArray.indexOf(i) == 3) continue;
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
        serviceTableBody.appendChild(rowElement)
    }
    for (let i = 1, row; row = serviceTable.rows[i]; i++) {
        row.addEventListener("click", async () => {
            let basePrice = parseInt(row.cells[2].innerHTML);
            let taxes = row.cells[4].innerHTML.split(",");
            let extraCharges = row.cells[3].innerHTML;
            let price = basePrice;
            let responseData;
            for(tax of taxes) {
                const response = await fetch(`http://localhost:8080/tax/get_by_name?name=${tax}`)
                    .then(res => res.json())
                    .then(data => responseData = data);
            
                let responseDataArray = Object.entries(responseData);

                let charge = price * (responseDataArray[2][1] / 100);
                price = price + charge;
            }
            let detail = {
                id: row.cells[0].innerHTML,
                name: row.cells[1].innerHTML,
                basePrice: parseFloat(price.toFixed(2)),
                extraCharges: row.cells[3].innerHTML,
                quantity: 1,
                totalPrice: parseFloat(price.toFixed(2)) + parseFloat(extraCharges)
            }
            loadDetailIntoTable(detail);
            serviceListDiv.style.display = "none";
            assetFormDiv.style.display = "none";
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

async function refreshProductsTable(urlHeaders, urlBody) {
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
        loadProductsBody(data);
    });
}

async function refreshServicesTable(urlHeaders, urlBody) {
    // Headers
    const headersResponse = await fetch(urlHeaders);
    const { headers } = await headersResponse.json();

    // Clear the headers
    serviceTableHead.innerHTML = "<tr></tr>";

    // Populate Headers
    for (const headerText of headers) {
        const headerElement = document.createElement("th");

        headerElement.textContent = headerText;
        serviceTableHead.querySelector("tr").appendChild(headerElement);
    }

    // Body
    serviceTableBody.innerHTML = "";
    fetchDataFromDB(urlBody).then(data => {
        loadServicesBody(data);
    });
}

function refreshTotal() {
    let total = 0.0;
    for (let i = 1, row; row = detailTable.rows[i]; i++) {
        total = total + parseFloat(row.cells[5].innerHTML);
        total = parseFloat(total.toFixed(2));
    }
    orderBottomBar.value = total;
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
    if(nullInputsPerson()){
        alert("Hay datos faltantes");
        return;
    }
    newClientBackground.style.display = "none";
    newPersonDiv.style.display = "none"
    clientTypeDiv.style.display = "none"
    newClient(false);
})

confirmBtnBusiness.addEventListener("click", () => {
    if(nullInputsBusiness()){
        alert("Hay datos faltantes");
        return;
    }
    newClientBackground.style.display = "none";
    newBusinessDiv.style.display = "none"
    clientTypeDiv.style.display = "none"
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
    refreshProductsTable("./product-headers.json", productListLink)
    quantityInput.value = 1;
})

serviceBtn.addEventListener("click", () => {
    assetTypeDiv.style.display = "none";
    serviceListDiv.style.display = "inline";
    refreshServicesTable("./service-headers.json", serviceListLink)
})

loadOrderBtn.addEventListener("click", async () => {
    if(clientBottomBar.value == "") {
        alert("Seleccione un Cliente")
        return;
    }
    if(!confirm) {
        loadOrderBtn.style.backgroundColor = "#77DD77"
        loadOrderBtn.innerHTML = "Confirmar?";
        confirm = true;
    } else {
        await newOrder();
        alert("Pedido Agregado Satisfactoriamente")
        location.reload();
    }
})

backBtnProduct.addEventListener("click", () => {
    assetTypeDiv.style.display = "inline";
    productListDiv.style.display = "none";
})

backBtnService.addEventListener("click", () => {
    assetTypeDiv.style.display = "inline";
    serviceListDiv.style.display = "none";
})


