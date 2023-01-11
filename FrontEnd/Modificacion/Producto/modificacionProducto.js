const table = document.querySelector("#table");
const tableHead = document.querySelector("#thead");
const tableBody = document.querySelector("#tbody");
const taxesTable = document.querySelector("#taxes-table");
const taxesTableHead = document.querySelector("#taxes-thead");
const taxesTableBody = document.querySelector("#taxes-tbody");
const searchBtn = document.querySelector("#search-btn");
const listInput = document.querySelector("#list-input");
const idInput = document.querySelector("#id-input");
const nameInput = document.querySelector("#name");
const priceInput = document.querySelector("#price");
const modifyBtn = document.querySelector("#modify-btn");
let taxesList = [];
const productListLink = "http://localhost:8080/asset/products";
const taxListLink = "http://localhost:8080/tax/list"

function cleanInputs() {
    idInput.value = "";
    nameInput.value = "";
    listInput.value = "";
    taxesList = []
    refreshTaxesTable("./taxes-headers.json", taxListLink)
}

async function search() {
    refreshTable("./headers.json", `http://localhost:8080/asset/search_product?name=${listInput.value}`)
}

async function modifyProduct() {
    const response = await fetch(`http://localhost:8080/asset/update_product?id=${idInput.value}&name=${nameInput.value}&price=${priceInput.value}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Content-Length": 0
        }
    })
        
    refreshTable("./headers.json", productListLink);
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
    for(let dataObject of data) {
        const rowElement = document.createElement("tr");
        let dataObjectArray = Object.entries(dataObject);
        for(let i = 0; i < dataObjectArray.length; i++) {
            if(i == 3 || i == 4) continue;
            
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
    for (let i = 1, row; row = table.rows[i]; i++) {
        row.addEventListener("click", () => {
            idInput.value = row.cells[0].innerHTML;
            nameInput.value = row.cells[1].innerHTML;
            priceInput.value = row.cells[2].innerHTML;

            for(let k = 1, taxRow; taxRow = taxesTable.rows[k]; k++) {
                // TODO
            }
        })

        for (let j = 0, col; col = row.cells[j]; j++) {
          if(col.innerHTML == "") {
            col.innerHTML = "-";
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
}

async function refreshTable(urlHeaders, urlBody) {
    
    let responseArray;
    
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
refreshTable("./headers.json", productListLink)
refreshTaxesTable("./taxes-headers.json", taxListLink)

modifyBtn.addEventListener("click", () => {
    if(confirm("Seguro que desea modificar este producto?") == true) {
        modifyProduct();
    }
})

listInput.addEventListener("keyup", () => {
    search();
})

