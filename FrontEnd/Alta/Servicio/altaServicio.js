const table = document.querySelector("#table");
const tableHead = document.querySelector("#thead");
const tableBody = document.querySelector("#tbody");
const nameInput = document.querySelector("#name");
const priceInput = document.querySelector("#price");
const extraChargesInput = document.querySelector("#extra-charges");
const addBtn = document.querySelector("#add-btn");
const listInput = document.querySelector("#list-input");
const searchBtn = document.querySelector("#search-btn");
const serviceLinkList = "http://localhost:8080/good/services";
const addServiceLink = "http://localhost:8080/good/new";

function cleanInputs() {
    nameInput.value = "";
    priceInput.value = "";
    extraChargesInput.value = "";
}

async function addService() {
    const data = {
        name: nameInput.value,
        price: priceInput.value,
        type: 2,
        extra_charges: extraChargesInput.value
    }
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
    refreshTable("./headers.json", `http://localhost:8080/good/search_service?name=${listInput.value}`)
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
            if(i == 3) continue;
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
refreshTable("./headers.json", serviceLinkList)

addBtn.addEventListener("click", () => {
    if(confirm("Seguro que desea agregar este servicio?") == true) {
        addService();
    }
})

searchBtn.addEventListener("click", () => {
    search();
})

