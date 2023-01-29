const table = document.querySelector("#table");
const tableHead = document.querySelector("#thead");
const tableBody = document.querySelector("#tbody");
const taxesTable = document.querySelector("#taxes-table");
const taxesTableHead = document.querySelector("#taxes-thead");
const taxesTableBody = document.querySelector("#taxes-tbody");
const nameInput = document.querySelector("#name");
const priceInput = document.querySelector("#price");
const extraChargesInput = document.querySelector("#extra-charges");
const addBtn = document.querySelector("#add-btn");
const listInput = document.querySelector("#list-input");
const searchBtn = document.querySelector("#search-btn");
let taxesList = [];
const serviceLinkList = "http://localhost:8080/asset/services";
let addServiceLink = "http://localhost:8080/asset/new?taxesId=";
const taxListLink = "http://localhost:8080/tax/list"

function cleanInputs() {
    nameInput.value = "";
    priceInput.value = "";
    extraChargesInput.value = "";
    taxesList = []
    refreshTaxesTable("./taxes-headers.json", taxListLink)
    addProductLink = "http://localhost:8080/asset/new?taxesId="
}

async function addService() {
    const data = {
        name: nameInput.value,
        price: priceInput.value,
        type: 2,
        extra_charges: extraChargesInput.value,
        taxes: []
    }
    for(let i of taxesList) {
        addServiceLink = addServiceLink + `${i},`
    }
    addServiceLink = addServiceLink.slice(0,-1);
    const response = await fetch(addServiceLink, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(res => res.json())
        .then(data => console.log(data));
        
    refreshTable("./headers.json", serviceLinkList);
    cleanInputs()
}

async function search() {
    refreshTable("./headers.json", `http://localhost:8080/asset/search_service?name=${listInput.value}`)
}

async function fetchDataFromDB(url) {
    const response = await fetch(url)
    let data = await response.json();
    data = JSON.stringify(data);
    data = JSON.parse(data);
    return data;
}

function loadBody(data) {
    for(let dataObject of data) {
        const rowElement = document.createElement("tr");
        console.log(dataObject)
        let dataObjectArray = Object.entries(dataObject);
        for(let i = 0; i < dataObjectArray.length; i++) {
            if(i == 3) continue;
            const cellElement = document.createElement("td")
            if(i == 5) {
                let taxesArray = []
                for(let j of dataObjectArray[i][1]) {
                    let dataTaxesArray = Object.entries(j)
                    taxesArray.push(dataTaxesArray[1][1])
                }
                cellElement.textContent = taxesArray;
                rowElement.appendChild(cellElement);
                continue;
            }
            cellElement.textContent = dataObjectArray[i][1];
            rowElement.appendChild(cellElement);
        }
        tableBody.appendChild(rowElement);
    }
    for (let i = 0, row; row = table.rows[i]; i++) {
        if(i % 2 == 0 && i > 0) {
            row.style.backgroundColor = "#EEEEEE"
        }
        for (let j = 0, col; col = row.cells[j]; j++) {
            if(col.innerHTML == "") {
                col.innerHTML = "-"
            }
        }  
    }
}

function loadTaxesBody(data) {
    for(let dataObject of data) {
        const rowElement = document.createElement("tr");
        let dataObjectArray = Object.entries(dataObject);
        for(let i = 1; i < dataObjectArray.length; i++) {
            
            const cellElement = document.createElement("td")

            cellElement.textContent = dataObjectArray[i][1];
            if(i == 2) {
                cellElement.textContent = dataObjectArray[i][1] + "%";
            }
            rowElement.appendChild(cellElement);
        }
        const check = document.createElement("INPUT");
        check.setAttribute("type", "checkbox");
        check.setAttribute("class", "checkbox");
        rowElement.appendChild(check);

        check.addEventListener("change", () => {
            if(check.checked) {
                taxesList.push(dataObjectArray[0][1]);
            } else {
                const index = taxesList.indexOf(dataObjectArray[0][1]);
                taxesList.splice(index, 1);
            }
        })

        taxesTableBody.appendChild(rowElement);
    }
    for (let i = 0, row; row = taxesTable.rows[i]; i++) {
        if(i % 2 == 0 && i > 0) {
            row.style.backgroundColor = "#EEEEEE"
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

async function refreshTaxesTable(urlHeaders, urlBody) {
    // Headers
    const headersResponse = await fetch(urlHeaders);
    const { headers } = await headersResponse.json();

    // Clear the headers
    taxesTableHead.innerHTML = "<tr></tr>";

    // Populate Headers
    for (const headerText of headers) {
        const headerElement = document.createElement("th");

        headerElement.textContent = headerText;
        taxesTableHead.querySelector("tr").appendChild(headerElement); 
    }

    // Body
    taxesTableBody.innerHTML = "";
    fetchDataFromDB(urlBody).then(data => {
        loadTaxesBody(data);
    });
}

// Initial Load
refreshTable("./headers.json", serviceLinkList)
refreshTaxesTable("./taxes-headers.json", taxListLink)


addBtn.addEventListener("click", () => {
    if(nameInput.value == "" || priceInput.value == "") {
        alert("Hay campos faltantes.");
        return;
    }
    addService(); 
})

window.addEventListener("keydown", function(event) {
    if(event.key == "Enter") {
        if(nameInput.value == "" || priceInput.value == "") {
            alert("Hay campos faltantes.");
            return;
        }
        addService(); 
    }
})

listInput.addEventListener("keyup", () => {
    search();
})