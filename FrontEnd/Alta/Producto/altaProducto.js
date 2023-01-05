const table = document.querySelector("#table");
const tableHead = document.querySelector("#thead");
const tableBody = document.querySelector("#tbody");
const nameInput = document.querySelector("#name");
const priceInput = document.querySelector("#price");
const addBtn = document.querySelector("#add-btn");
const listInput = document.querySelector("#list-input");
const searchBtn = document.querySelector("#search-btn");
const productListLink = "http://localhost:8080/asset/products";
const addProductLink = "http://localhost:8080/asset/new";

function cleanInputs() {
    nameInput.value = "";
    priceInput.value = "";
}

async function addProduct() {
    const data = {
        name: nameInput.value,
        price: priceInput.value,
        type: 1,
        extra_charges: 0
    }
    const response = await fetch(addProductLink, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(res => res.json())
        .then(data => console.log(data));
        
    refreshTable("./headers.json", productListLink);
    cleanInputs()
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
        for(let i = 0; i < (dataObjectArray.length) - 2; i++) {
            
            const cellElement = document.createElement("td")

            cellElement.textContent = dataObjectArray[i][1];
            rowElement.appendChild(cellElement);
        }
        tableBody.appendChild(rowElement);
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

addBtn.addEventListener("click", () => {
    if(confirm("Seguro que desea agregar este producto?") == true) {
        addProduct();
    }
})

searchBtn.addEventListener("click", () => {
    search();
})

