const deleteButton = document.querySelector("#delete-btn");
const identificationInput = document.querySelector("#identification-input");
const searchBtn = document.querySelector("#search-btn");
const listInput = document.querySelector("#list-input");

// Table
const table = document.querySelector("#table");
const tableHead = document.querySelector("#thead");
const tableBody = document.querySelector("#tbody");
const clientListLink = "http://localhost:8080/client/list";

async function search() {
    refreshTable("./headers.json", `http://localhost:8080/client/get_by_identification?identification=${listInput.value}`)
}

async function deleteClient() {
    const response = await fetch(`http://localhost:8080/client/delete?identification=${identificationInput.value}`, {
        method: "POST",
        headers: {
            "Content-Length": 0
        }
    })
}

async function fetchDataFromDB(url) {
    const response = await fetch(url)
    let data = await response.json();
    data = JSON.stringify(data);
    data = JSON.parse(data);
    return data;
}

function loadBody(data) {
    for (let dataObject of data) {
        const rowElement = document.createElement("tr");
        let dataObjectArray = Object.entries(dataObject);

        for(let i of dataObjectArray) {
            let cellElement = document.createElement("td");
            cellElement.textContent = i[1];
            rowElement.appendChild(cellElement);
        }
        tableBody.appendChild(rowElement)
    }
    for (let i = 1, row; row = table.rows[i]; i++) {
        //iterate through rows
        row.addEventListener("click", () => {
            identificationInput.value = row.cells[1].innerHTML;
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

refreshTable("./headers.json", clientListLink)

deleteButton.addEventListener("click", () => {
    if(identificationInput.value == "") return;
    if(confirm(`Seguro que desea eliminar el cliente ${identificationInput.value}?`) == true) {
        deleteClient()
        refreshTable("./headers.json", clientListLink)
    }
})

searchBtn.addEventListener("click", () => {
    if(listInput.value == "") {
        refreshTable("./headers.json", clientListLink);
        return;
    }
    search();
})