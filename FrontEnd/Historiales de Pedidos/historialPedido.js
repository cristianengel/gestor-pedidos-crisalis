const table = document.querySelector("#table");
const tableHead = document.querySelector("#thead");
const tableBody = document.querySelector("#tbody");
const detailTable = document.querySelector("#detail-table");
const detailTableHead = document.querySelector("#detail-thead");
const detailTableBody = document.querySelector("#detail-tbody");
const listInput = document.querySelector("#list-input");
const allOrdersList = `http://localhost:8080/order/list`;
const searchCriterion = document.querySelector("#search-criterion");
const searchId = document.querySelector("#search-id");
const searchDate = document.querySelector("#search-date");
const searchIdBtn = document.querySelector("#search-id-btn");
const searchDateBtn = document.querySelector("#search-date-btn");
const clientSearchDiv = document.querySelector(".client-search-div");
const dateSearchDiv = document.querySelector(".date-search-div");
const orderDetailsBackground = document.querySelector(".order-details-background");
const orderDetailsDiv = document.querySelector(".order-details");
const checkoutClient = document.querySelector("#checkout-client");
const checkoutDate = document.querySelector("#checkout-date");
const checkoutTotal = document.querySelector("#checkout-total");
const checkoutId = document.querySelector("#checkout-id");
const idInput = document.querySelector("#id-input");
const clientInput = document.querySelector("#client-input");
const sheet = document.querySelector(".sheet");
const dateInput = document.querySelector("#date-input");
const backBtn = document.querySelector("#back-btn");
const productsDeletedText = document.querySelector("#products-deleted-text");
const totalText = document.querySelector("#total-text");
const printBtn = document.querySelector("#print-btn");

function cloneData() {
    const clone = detailTable.cloneNode(true);
    orderDetailsDiv.appendChild(clone)
}

function printPageArea(){
    checkoutId.innerHTML = idInput.value;
    checkoutClient.innerHTML = clientInput.value;
    checkoutDate.innerHTML = dateInput.value;
    checkoutTotal.innerHTML = totalText.innerHTML;

    let printContent = sheet.innerHTML;
    let originalContent = document.body.innerHTML;
    
    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = originalContent;
}

async function searchByClient() {
    refreshTable("./headers.json", `http://localhost:8080/order/get_by_client?identification=${searchId.value}`)
}

async function searchByDate() {
    console.log(searchDate.value)
    refreshTable("./headers.json", `http://localhost:8080/order/get_by_date?date=${searchDate.value}`)
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
        for (let i = 0; i < dataObjectArray.length; i++) {
            if (i == 2) continue;
            const cellElement = document.createElement("td")
            if (i == 1) {
                let clientId = dataObjectArray[i][1].identificationNumber;
                cellElement.textContent = clientId;
                rowElement.appendChild(cellElement);
                continue;
            }
            cellElement.textContent = dataObjectArray[i][1];
            rowElement.appendChild(cellElement);
        }
        tableBody.appendChild(rowElement);
    }
    for (let i = 1, row; row = table.rows[i]; i++) {
        if (i % 2 == 0) {
            row.style.backgroundColor = "#EEEEEE"
        }
        row.addEventListener("click", async () => {
            refreshDetailTable("./detail-headers.json", `http://localhost:8080/order_detail/single_order_list?orderId=${row.cells[0].innerHTML}`, row.cells[3].innerHTML)
            orderDetailsBackground.style.display = "flex";
            idInput.value = row.cells[0].innerHTML;
            clientInput.value = row.cells[1].innerHTML;
            dateInput.value = row.cells[2].innerHTML;
        })
        for (let j = 0, col; col = row.cells[j]; j++) {
            if (col.innerHTML == "") {
                col.innerHTML = "-";
            }
        }
        totalText.innerHTML = row.cells[3].innerHTML;
    }
}

function loadDetailBody(data, total) {
    let detailsTotal = 0;
    productsDeletedText.innerHTML = "";
    for (let dataObject of data) {
        const rowElement = document.createElement("tr");
        let dataObjectArray = Object.entries(dataObject);
        for (let i = 0; i < dataObjectArray.length; i++) {
            const cellElement = document.createElement("td")
            if(i == 1) {
                cellElement.textContent = dataObjectArray[i][1].name;
                rowElement.appendChild(cellElement);
                continue;
            }
            cellElement.textContent = dataObjectArray[i][1];
            rowElement.appendChild(cellElement);
        }
        detailTableBody.appendChild(rowElement);
    }
    for (let i = 1, row; row = detailTable.rows[i]; i++) {
        detailsTotal = detailsTotal + parseFloat(row.cells[2].innerHTML);
        if (i % 2 == 0) {
            row.style.backgroundColor = "#EEEEEE"
        }
        for (let j = 0, col; col = row.cells[j]; j++) {
            if (col.innerHTML == "") {
                col.innerHTML = "-";
            }
        }
    }
    if (detailsTotal != total) {
        productsDeletedText.innerHTML = "*Algunos productos fueron excluídos del detalle"
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

async function refreshDetailTable(urlHeaders, urlBody, total) {
    // Headers
    const headersResponse = await fetch(urlHeaders);
    const { headers } = await headersResponse.json();

    // Clear the headers
    detailTableHead.innerHTML = "<tr></tr>";

    // Populate Headers
    for (const headerText of headers) {
        const headerElement = document.createElement("th");

        headerElement.textContent = headerText;
        detailTableHead.querySelector("tr").appendChild(headerElement);
    }

    // Body
    detailTableBody.innerHTML = "";
    fetchDataFromDB(urlBody).then(data => {
        loadDetailBody(data, total);
    });
}

refreshTable("./headers.json", allOrdersList);

searchCriterion.addEventListener("change", () => {
    if (searchCriterion.value == "client") {
        clientSearchDiv.style.display = "inline";
        dateSearchDiv.style.display = "none";
    }
    if (searchCriterion.value == "date") {
        dateSearchDiv.style.display = "inline";
        clientSearchDiv.style.display = "none";
    }
}) 
    
backBtn.addEventListener("click", () => {
    orderDetailsBackground.style.display = "none";
})

searchIdBtn.addEventListener("click", () => {
    searchByClient()
})

searchDateBtn.addEventListener("click", () => {
    searchByDate()
})

printBtn.addEventListener("click", () => {
    cloneData();
    printPageArea();
    window.location.reload();
})

