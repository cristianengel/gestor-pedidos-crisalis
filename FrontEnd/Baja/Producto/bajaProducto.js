const homeButton = document.querySelector("#home-btn");
const tableHead = document.querySelector("#thead");
const tableBody = document.querySelector("#tbody");
const idInput = document.querySelector("#id-input");
const deleteBtn = document.querySelector("#delete-btn");
const productListLink = "http://localhost:8080/good/list";

function cleanInputs() {
    idInput.value = "";
}

function deleteProduct() {
    const deleteProductLink = `http://localhost:8080/good/delete?id=${idInput.value}`;
    fetch(deleteProductLink, {
        method: "POST",
        headers: {
            "Content-Length": 0
        }
    })
    cleanInputs();
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
    for (let i = 0, row; row = table.rows[i]; i++) {
        //iterate through rows
        row.addEventListener("click", () => {
            idInput.value = row.cells[0].innerHTML;
        })
        //rows would be accessed using the "row" variable assigned in the for loop
        for (let j = 0, col; col = row.cells[j]; j++) {
          //iterate through columns
          //columns would be accessed using the "col" variable assigned in the for loop
          if(col.innerHTML == "false") {
            col.innerHTML = "No";
          } else if (col.innerHTML == "true") {
            col.innerHTML = "Sí";
          } else if (col.innerHTML == "") {
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

homeButton.addEventListener("click", () => {
    open("../../Homepage/homepage.html", "_self");
})