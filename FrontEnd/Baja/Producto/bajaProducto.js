const homeButton = document.querySelector("#home-btn");
const table = document.querySelector("#table");
const tableHead = document.querySelector("#thead");
const tableBody = document.querySelector("#tbody");
const nameInput = document.querySelector("#name");
const deleteBtn = document.querySelector("#delete-btn");
const productListLink = "http://localhost:8080/good/list";
const deleteProductLink = `http://localhost:8080/good/delete?name=${nameInput.value}`;

function cleanInputs() {
    nameInput.value = "";
    priceInput.value = "";
}

async function deleteProduct() {
    const response = await fetch(deleteProductLink, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(res => res.json())
        .then(data => console.log(data));
        
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
    console.log(data);
    for(let dataObject of data) {
        const rowElement = document.createElement("tr");
        let dataObjectArray = Object.entries(dataObject);
        console.log(dataObjectArray)
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

deleteBtn.addEventListener("click", () => {
    if(confirm("Seguro que desea agregar este producto?") == true) {
        deleteProduct();
    }
})

homeButton.addEventListener("click", () => {
    open("../../Homepage/homepage.html", "_self");
})

