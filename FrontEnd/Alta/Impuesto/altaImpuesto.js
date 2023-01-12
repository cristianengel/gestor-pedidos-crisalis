const table = document.querySelector("#table");
const tableHead = document.querySelector("#thead");
const tableBody = document.querySelector("#tbody");
const nameInput = document.querySelector("#name");
const percentageInput = document.querySelector("#percentage");
const addBtn = document.querySelector("#add-btn");
const listInput = document.querySelector("#list-input");
const productListLink = "http://localhost:8080/tax/list";
const addProductLink = "http://localhost:8080/tax/new";

function cleanInputs() {
    nameInput.value = "";
    percentageInput.value = "";
}

async function addProduct() {
    const data = {
        name: nameInput.value,
        percentage: percentageInput.value,
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
    refreshTable("./headers.json", `http://localhost:8080/tax/search?name=${listInput.value}`)
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
            const cellElement = document.createElement("td");
            if(i < 2) {
                cellElement.textContent = dataObjectArray[i][1];
            } else {
                cellElement.textContent = dataObjectArray[i][1] + "%";
            }
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
    if(nameInput.value == "" || percentageInput.value == "") return;
    if(confirm("Seguro que desea agregar este producto?") == true) {
        addProduct();
    }
})

listInput.addEventListener("keyup", () => {
    search();
})

