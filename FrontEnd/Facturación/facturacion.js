const printBtn = document.querySelector("#print-btn");
const sheet = document.querySelector(".sheet");

printBtn.addEventListener("click", () => {
    printPageArea()
})

function printPageArea(){
    var printContent = sheet.innerHTML;
    var originalContent = document.body.innerHTML;
    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = originalContent;
}

