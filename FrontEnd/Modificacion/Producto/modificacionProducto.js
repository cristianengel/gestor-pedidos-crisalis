const homeButton = document.querySelector("#home-btn");
const table = document.querySelector("#table");
const tableHead = document.querySelector("#thead");
const tableBody = document.querySelector("#tbody");
const searchBtn = document.querySelector("#search-btn");
const listInput = document.querySelector("#list-input");
const idInput = document.querySelector("#id-input");
const nameInput = document.querySelector("#name");
const priceInput = document.querySelector("#price");
const modifyBtn = document.querySelector("#modify-btn");
const productListLink = "http://localhost:8080/good/list";

function cleanInputs() {
    idInput.value = "";
    nameInput.value = "";
    priceInput.value = "";
    listInput.value = "";
}

async function search() {
    refreshTable("./headers.json", `http://localhost:8080/good/search?name=${listInput.value}`)
}

async function modifyProduct() {
    const response = await fetch(`http://localhost:8080/good/update?id=${idInput.value}&name=${nameInput.value}&price=${priceInput.value}`, {
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
        for(let i = 0; i < (dataObjectArray.length) - 2; i++) {
            
            const cellElement = document.createElement("td")

            cellElement.textContent = dataObjectArray[i][1];
            rowElement.appendChild(cellElement);
        }
        tableBody.appendChild(rowElement);
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

// Initial Load
refreshTable("./headers.json", productListLink)

modifyBtn.addEventListener("click", () => {
    if(confirm("Seguro que desea modificar este producto?") == true) {
        modifyProduct();
    }
})

homeButton.addEventListener("click", () => {
    open("../../Homepage/homepage.html", "_self");
})

searchBtn.addEventListener("click", () => {
    search();
})

