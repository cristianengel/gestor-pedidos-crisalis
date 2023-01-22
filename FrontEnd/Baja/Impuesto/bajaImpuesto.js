const tableHead = document.querySelector("#thead");
const tableBody = document.querySelector("#tbody");
const idInput = document.querySelector("#id-input");
const listInput = document.querySelector("#list-input");
const idText = document.querySelector("#id-text");
const nameText = document.querySelector("#name-text");
const masterContainer = document.querySelector(".delete-master-container");
const deleteCenterContainer = document.querySelector(".delete-center-container");
const confirmBtn = document.querySelector("#confirm-btn");
const cancelBtn = document.querySelector("#cancel-btn");
const taxListLink = "http://localhost:8080/tax/list";
let elementToDelete;


function deleteTax() {
    const deleteTaxLink = `http://localhost:8080/tax/delete?id=${elementToDelete}`;
    fetch(deleteTaxLink, {
        method: "POST",
        headers: {
            "Content-Length": 0
        }
    })
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
            const cellElement = document.createElement("td")
            if(i < 2) {
                cellElement.textContent = dataObjectArray[i][1];
            } else {
                cellElement.textContent = dataObjectArray[i][1] + "%";
            }
            rowElement.appendChild(cellElement);
        }
        tableBody.appendChild(rowElement);
    }
    for (let i = 1, row; row = table.rows[i]; i++) {
        //iterate through rows
        row.addEventListener("click", () => {
            masterContainer.style.display = "block";
            masterContainer.style.animationName = "fade-in";
            masterContainer.style.animationDuration = ".5s";
            deleteCenterContainer.style.display = "block";
            deleteCenterContainer.style.animationName = "scaleUp";
            deleteCenterContainer.style.animationDuration = ".3s";
            elementToDelete = row.cells[0].innerHTML;
            idText.textContent = `Nro. de Impuesto: ${row.cells[0].innerHTML}`;
            nameText.textContent = `Nombre: ${row.cells[1].innerHTML}`;
        })
        if(i % 2 == 0 && i > 0) {
            row.style.backgroundColor = "#EEEEEE"
        }
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
refreshTable("./headers.json", taxListLink)

confirmBtn.addEventListener("click", () => {
    deleteTax();
    masterContainer.style.display = "none";
    deleteCenterContainer.style.display = "none";
    refreshTable("./headers.json", taxListLink);
})

cancelBtn.addEventListener("click", () => {
    masterContainer.style.display = "none";
    deleteCenterContainer.style.display = "none";
})

listInput.addEventListener("keyup", () => {
    search();
})