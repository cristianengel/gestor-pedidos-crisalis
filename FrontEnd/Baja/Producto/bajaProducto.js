const tableHead = document.querySelector("#thead");
const tableBody = document.querySelector("#tbody");
const idInput = document.querySelector("#id-input");
const deleteBtn = document.querySelector("#delete-btn");
const listInput = document.querySelector("#list-input");
const searchBtn = document.querySelector("#search-btn");
const productListLink = "http://localhost:8080/asset/products";

function cleanInputs() {
    idInput.value = "";
}

function deleteProduct() {
    const deleteProductLink = `http://localhost:8080/asset/delete_product?id=${idInput.value}`;
    fetch(deleteProductLink, {
        method: "POST",
        headers: {
            "Content-Length": 0
        }
    })
    cleanInputs();
}

async function search() {
    refreshTable("./headers.json", `http://localhost:8080/asset/search_product?name=${listInput.value}`)
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
        })
        for (let j = 0, col; col = row.cells[j]; j++) {
          if(col.innerHTML == "") {
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
refreshTable("./headers.json", productListLink)

deleteBtn.addEventListener("click", () => {
    if(confirm("Seguro que desea eliminar este producto?") == true) {
        deleteProduct();
        refreshTable("./headers.json", productListLink);
    }
})

listInput.addEventListener("keyup", () => {
    search();
})