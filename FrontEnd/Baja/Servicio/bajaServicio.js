const tableHead = document.querySelector("#thead");
const tableBody = document.querySelector("#tbody");
const idInput = document.querySelector("#id-input");
const deleteBtn = document.querySelector("#delete-btn");
const listInput = document.querySelector("#list-input");
const searchBtn = document.querySelector("#search-btn");
const serviceLinkList = "http://localhost:8080/asset/services";

function cleanInputs() {
    idInput.value = "";
}

function deleteService() {
    const deleteServiceLink = `http://localhost:8080/asset/delete_service?id=${idInput.value}`;
    fetch(deleteServiceLink, {
        method: "POST",
        headers: {
            "Content-Length": 0
        }
    })
    cleanInputs();
}

async function search() {
    refreshTable("./headers.json", `http://localhost:8080/asset/search_service?name=${listInput.value}`)
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
    for (let i = 1, row; row = table.rows[i]; i++) {
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
refreshTable("./headers.json", serviceLinkList)

deleteBtn.addEventListener("click", () => {
    if(confirm("Seguro que desea eliminar este servicio?") == true) {
        deleteService();
        refreshTable("./headers.json", serviceLinkList);
    }
})

searchBtn.addEventListener("click", () => {
    search();
})