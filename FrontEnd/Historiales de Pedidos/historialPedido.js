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
const orderDetailsBackground = document.querySelector(".order-details-background");
const idInput = document.querySelector("#id-input");
const backBtn = document.querySelector("#back-btn");

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
            refreshDetailTable("./detail-headers.json", `http://localhost:8080/order_detail/single_order_list?orderId=${row.cells[0].innerHTML}`)
            orderDetailsBackground.style.display = "flex";
            idInput.value = row.cells[0].innerHTML;
        })
        for (let j = 0, col; col = row.cells[j]; j++) {
            if (col.innerHTML == "") {
                col.innerHTML = "-";
            }
        }
    }
}

function loadDetailBody(data) {
    for (let dataObject of data) {
        const rowElement = document.createElement("tr");
        let dataObjectArray = Object.entries(dataObject);
        for (let i = 0; i < dataObjectArray.length; i++) {
            const cellElement = document.createElement("td")
            cellElement.textContent = dataObjectArray[i][1];
            rowElement.appendChild(cellElement);
        }
        detailTableBody.appendChild(rowElement);
    }
    for (let i = 1, row; row = detailTable.rows[i]; i++) {
        if (i % 2 == 0) {
            row.style.backgroundColor = "#EEEEEE"
        }
        row.addEventListener("click", async () => {
            // TODO
        })
        for (let j = 0, col; col = row.cells[j]; j++) {
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

async function refreshDetailTable(urlHeaders, urlBody) {
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
        loadDetailBody(data);
    });
}

refreshTable("./headers.json", allOrdersList);

searchCriterion.addEventListener("change", () => {
    if (searchCriterion.value == "client") {
        searchId.style.display = "inline"
        searchDate.style.display = "none"
    }
    if (searchCriterion.value == "date") {
        searchDate.style.display = "inline"
        searchId.style.display = "none"
    }
}) 
    
backBtn.addEventListener("click", () => {
    orderDetailsBackground.style.display = "none";
})