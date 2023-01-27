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
const cancelBtn = document.querySelector("#cancel-btn");
const formContainer = document.querySelector(".form-container");
let taxesList = [];
const productListLink = "http://localhost:8080/asset/products";
const taxListLink = "http://localhost:8080/tax/list"

function cleanInputs() {
    idInput.value = "";
    nameInput.value = "";
    priceInput.value = "";
    listInput.value = "";
    taxesList = []
    formContainer.style.display = "none";
    refreshTaxesTable("./taxes-headers.json", taxListLink)
}

async function search() {
    refreshTable("./headers.json", `http://localhost:8080/asset/search_product?name=${listInput.value}`)
}

async function modifyProduct() {
    let link = `http://localhost:8080/asset/update_product?id=${idInput.value}&name=${nameInput.value}&price=${priceInput.value}&taxesId=`;
    for(let i of taxesList) {
        link = link + `${i},`
    }
    link = link.slice(0,-1);
    const response = await fetch(link, {
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
            
            const cellElement = document.createElement("td");

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
            taxesList = []
            for(let k = 1, taxRow; taxRow = taxesTable.rows[k]; k++) {
                document.querySelector(`#checkbox${taxRow.cells[0].innerHTML}`).checked = false;
            }

            for(let k = 1, taxRow; taxRow = taxesTable.rows[k]; k++) {
                if(row.cells[3].innerHTML.includes(taxRow.cells[1].innerHTML)) {
                    document.querySelector(`#checkbox${taxRow.cells[0].innerHTML}`).checked = true;
                    taxesList.push(taxRow.cells[0].innerHTML)
                    console.log(taxesList)
                } else {
                    const index = taxesList.indexOf(taxRow.cells[0].innerHTML);
                    if(index > -1) {
                        taxesList.splice(index, 1);
                    }
                }
            }
            formContainer.style.display = "flex";
        })
        if(i % 2 == 0 && i > 0) {
            row.style.backgroundColor = "#EEEEEE"
        }
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
        for(let i = 0; i < dataObjectArray.length; i++) {
            
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
        check.setAttribute("id", `checkbox${dataObjectArray[0][1]}`)
        rowElement.appendChild(check);

        check.addEventListener("change", () => {
            if(check.checked == true) {
                taxesList.push(dataObjectArray[0][1]);
                console.log("Agregado " + dataObjectArray[0][1])
            } else {
                const index = taxesList.indexOf(`${dataObjectArray[0][1]}`);
                if(index > -1) {
                    taxesList.splice(index, 1);
                    console.log("Eliminado " + dataObjectArray[0][1])
                }
            }
        })

        for (let i = 1, row; row = taxesTable.rows[i]; i++) {
            if(i % 2 == 0 && i > 0) {
                row.style.backgroundColor = "#EEEEEE"
            }
        }

        taxesTableBody.appendChild(rowElement);
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
refreshTaxesTable("./taxes-headers.json", taxListLink)
refreshTable("./headers.json", productListLink)


modifyBtn.addEventListener("click", () => {
    modifyProduct();
})

cancelBtn.addEventListener("click", () => {
    cleanInputs();
})

listInput.addEventListener("keyup", () => {
    search();
})

