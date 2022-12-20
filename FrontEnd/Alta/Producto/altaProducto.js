const homeButton = document.querySelector("#home-btn")
const table = document.querySelector("#table")

async function fetchDataFromDB(url) {
    const response = await fetch(url)
    let data = await response.json();
    data = JSON.stringify(data);
    data = JSON.parse(data);
    return data;
}

async function loadIntoTable(urlHeaders, urlBody, table) {
    const tableHead = document.querySelector("#thead");
    const tableBody = document.querySelector("#tbody");
    let responseArray;
    
    // Headers
    const headersResponse = await fetch(urlHeaders);
    const { headers } = await headersResponse.json();
    console.log(headers)

    // Clear the headers
    tableHead.innerHTML = "<tr></tr>"

    // Populate Headers
    for (const headerText of headers) {
        const headerElement = document.createElement("th");

        headerElement.textContent = headerText;
        tableHead.querySelector("tr").appendChild(headerElement); 
    }

    // Body
    fetchDataFromDB(urlBody).then(data => {
        console.log(data);
        responseArray = data;
    });

    // Clear the body
    tableHead.innerHTML = "";
    
    // Populate Body
}

loadIntoTable("./headers.json", "http://localhost:8080/good/list", table)


homeButton.addEventListener("click", () => {
    open("../../Homepage/homepage.html", "_self");
})

