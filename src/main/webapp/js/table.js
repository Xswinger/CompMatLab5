let table = document.getElementById("values-table").getElementsByTagName('tbody')[0]
let approximateTable = document.getElementById("approximate-table").getElementsByTagName('tbody')[0]
let addButton = document.getElementById("addButton")
let deleteButton = document.getElementById("deleteButton")
let addApproximate = document.getElementById("addApproximate")
let deleteApproximate = document.getElementById("deleteApproximate")
let tableDataX = []
let tableDataY = []
let approximate = []

$('#file_input').change(function() {
    let selectedFile = this.files[0]

    document.getElementById("name-file").textContent = selectedFile.name

    const reader = new FileReader()
    reader.readAsText(selectedFile)

    let valid = true;

    reader.onload = function (event) {
        let csvData = event.target.result
        let rowData = csvData.split('\n')

        for (let row = 0; row < rowData.length; row++) {

            let pairData = rowData[row].split(',')

            if (pairData[0].trim() === "" || isNaN(pairData[0])) {
                valid = false
                break
            } else {
                tableDataX[row] = pairData[0]
            }

            if (pairData[1].trim() === "" || isNaN(pairData[1])) {
                valid = false
                break
            } else {
                tableDataY[row] = pairData[1]
            }

            if (typeof pairData[2] != "undefined" && (pairData[2].trim() === "" || isNaN(pairData[2]))) {
                valid = false
                break
            } else {
                approximate[row] = pairData[2]
            }
        }

        let errorMessage = document.getElementById("error-file")

        if (valid && checkStep()) {
            if (tableDataX.length !== new Set(tableDataX).size) {
                errorMessage.innerText = "Невалидный файл"
            } else {
                errorMessage.innerText = ""
                finalSendData()
            }
        } else {
            errorMessage.innerText = "Невалидный файл"
        }
    }
})

function clearTable() {
    for (let i = 0; i < table.rows.length; i++) {

        let firstCell = table.rows.item(i).cells[0].children.item(0)
        let secondCell = table.rows.item(i).cells[1].children.item(0)

        firstCell.value = ""
        firstCell.className = "input"

        secondCell.value = ""
        secondCell.className = "input"
    }

    for (let i = 0; i < approximateTable.rows.length; i++) {

        let firstCell = approximateTable.rows.item(i).cells[0].children.item(0)

        firstCell.value = ""
        firstCell.className = "input"
    }
    sendButton.disabled = true
}

function addRow() {
    if (table.rows.length <= 9) {

        let row = table.insertRow(-1)
        let xCell = row.insertCell(0)
        let yCell = row.insertCell(1)

        let firstButton = document.createElement("input")
        firstButton.className = "input"
        firstButton.type = "text"

        let secondButton = document.createElement("input")
        secondButton.className = "input"
        secondButton.type = "text"

        xCell.appendChild(firstButton)
        yCell.appendChild(secondButton)

        if (table.rows.length === 10) {
            addButton.disabled = true
        }

        if (table.rows.length > 4) {
            deleteButton.disabled = false
        }

    } else {
        addButton.disabled = true
    }
}

function addApproximateTableRow() {
    if (approximateTable.rows.length <= 9) {

        let row = approximateTable.insertRow(-1)
        let xCell = row.insertCell(0)

        let firstButton = document.createElement("input")
        firstButton.className = "input"
        firstButton.type = "text"

        xCell.appendChild(firstButton)

        if (approximateTable.rows.length === 10) {
            addApproximate.disabled = true
        }

        if (approximateTable.rows.length > 1) {
            deleteApproximate.disabled = false
        }

    } else {
        addApproximate.disabled = true
    }
}

function deleteRow() {
    if (table.rows.length < 5) {

        deleteButton.disabled = true

    } else {
        table.deleteRow(-1)

        if (table.rows.length === 4) {
            deleteButton.disabled = true
        }

        if (table.rows.length < 10) {
            addButton.disabled = false
        }
    }
}

function deleteApproximateTableRow() {
    if (approximateTable.rows.length < 2) {

        deleteApproximate.disabled = true

    } else {
        approximateTable.deleteRow(-1)

        if (approximateTable.rows.length === 1) {
            deleteApproximate.disabled = true
        }

        if (approximateTable.rows.length < 10) {
            addApproximate.disabled = false
        }
    }
}