const tableHead = document.querySelector("#thead");
const tableBody = document.querySelector("#tbody");
const idInput = document.querySelector("#id-input");
const deleteBtn = document.querySelector("#delete-btn");
const listInput = document.querySelector("#list-input");
const idText = document.querySelector("#id-text");
const nameText = document.querySelector("#name-text");
const masterContainer = document.querySelector(".delete-master-container");
const deleteCenterContainer = document.querySelector(".delete-center-container");
const confirmBtn = document.querySelector("#confirm-btn");
const cancelBtn = document.querySelector("#cancel-btn");
let elementToDelete;
const serviceLinkList = "http://localhost:8080/asset/services";

function deleteService() {
    const deleteServiceLink = `http://localhost:8080/asset/delete_service?id=${elementToDelete}`;
    fetch(deleteServiceLink, {
        method: "POST",
        headers: {
            "Content-Length": 0
        }
    })
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
            masterContainer.style.display = "block";
            masterContainer.style.animationName = "fade-in";
            masterContainer.style.animationDuration = ".5s";
            deleteCenterContainer.style.display = "block";
            deleteCenterContainer.style.animationName = "slide-from-bottom-center";
            deleteCenterContainer.style.animationDuration = ".3s";
            elementToDelete = row.cells[0].innerHTML;
            idText.textContent = `Nro. de Servicio: ${row.cells[0].innerHTML}`;
            nameText.textContent = `Nombre: ${row.cells[1].innerHTML}`;
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

listInput.addEventListener("keyup", () => {
    search();
})

confirmBtn.addEventListener("click", () => {
    deleteService();
    masterContainer.style.display = "none";
    deleteCenterContainer.style.display = "none";
    refreshTable("./headers.json", serviceLinkList);
})

cancelBtn.addEventListener("click", () => {
    masterContainer.style.display = "none";
    deleteCenterContainer.style.display = "none";
})