let sendButton = document.getElementById("sendButton")
let sendManualButton = document.getElementById("sendManualButton")
let XYTable = document.getElementById("XY-table").getElementsByTagName('tbody')[0]
let coefficients = document.getElementById("coefficients").getElementsByTagName('tbody')[0]
let correlation = document.getElementById("correlation")
let best_function = document.getElementById("best-function")
let functionsName = ["Лагранж", "Гаусс"]

let filledTable = false
let filledAppTable = false
let selectedRadio

table.onchange = function () {

    filledTable = true

    for (let i = 0; i < table.rows.length; i++) {

        let firstCell = table.rows.item(i).cells[0].children.item(0)
        let secondCell = table.rows.item(i).cells[1].children.item(0)

        let firstValue = firstCell.value.replace(',','.')
        let secondValue = secondCell.value.replace(',','.')

        if (firstValue.trim() === "" || isNaN(firstValue)) {
            firstCell.className = "input is-danger"
            filledTable = false
        } else {
            firstCell.className = "input"
        }
        if (secondValue.trim() === "" || isNaN(secondValue)) {
            secondCell.className = "input is-danger"
            filledTable = false
        } else {
            secondCell.className = "input"
        }
    }

    sendButton.disabled = !filledTable;

}

approximateTable.onchange = function () {

    filledAppTable = true

    for (let i = 0; i < approximateTable.rows.length; i++) {

        let firstCell = approximateTable.rows.item(i).cells[0].children.item(0)

        let firstValue = firstCell.value.replace(',','.')

        if (firstValue.trim() === "" || isNaN(firstValue)) {
            firstCell.className = "input is-danger"
            filledAppTable = false
        } else {
            firstCell.className = "input"
        }
    }

    sendButton.disabled = !(filledTable * filledAppTable)

    checkManual()


}

function sendData() {

    tableDataX = []
    tableDataY = []
    approximate = []

    for (let row = 0; row < table.rows.length; row++) {
        tableDataX[row] = table.rows.item(row).cells[0].children.item(0).value
        tableDataY[row] = table.rows.item(row).cells[1].children.item(0).value
    }

    for (let row = 0; row < approximateTable.rows.length; row++) {
        approximate[row] = approximateTable.rows.item(row).cells[0].children.item(0).value
    }

    if (checkStep()) {
        finalSendData()
    } else {
        alert("Не равноотстоящие значения")
    }
}

function sendManualData() {
    tableDataX = []
    tableDataY = []
    approximate = []

    let left_border = document.getElementById("left-border")
    let right_border = document.getElementById("right-border")
    let ele = document.getElementsByName('function')
    let point_count = document.getElementById("point-count")

    let left_border_value = Number(left_border.value)
    let right_border_value = Number(right_border.value)
    let point_count_value = Number(point_count.value)

    let step = (right_border_value - left_border_value) / point_count_value

    for (let i = 0; i < point_count_value; i++) {
        tableDataX[i] = left_border_value + step * i
    }

    for (let i = 0; i < tableDataX.length; i++) {
        if (selectedRadio === 0) {
            tableDataY[i] = firstFunction(tableDataX[i])
        } else {
            tableDataY[i] = secondFunction(tableDataX[i])
        }
    }

    for (let row = 0; row < approximateTable.rows.length; row++) {
        approximate[row] = approximateTable.rows.item(row).cells[0].children.item(0).value
    }

    finalSendData()
}

function firstFunction(value) {
    return Math.sin(value)
}

function secondFunction(value) {
    return (3 * Math.pow(value,2) - 5 * value)
}

function finalSendData() {
    console.log(tableDataX)
    console.log(tableDataY)
    console.log(approximate)
    $.ajax({
        type: "POST",
        url: "./handler",
        data: {
            xData: tableDataX,
            yData: tableDataY,
            approximate: approximate
        },
        success: function (response) {
            let gsonData = JSON.parse(response);

            console.log(gsonData)

            OutputData(gsonData)
        }
    })
}

function OutputData(gsonData) {
    XYTable.innerHTML = ""
    coefficients.innerHTML = ""

    addGraphic(gsonData, approximate, functionsName)

    for (let i = 0; i < gsonData.approximateGauss.length; i++) {

        let row = coefficients.insertRow(-1)
        let x = row.insertCell(0)
        let laGrangeCell = row.insertCell(1)
        let gaussCell = row.insertCell(2)

        let xValue = document.createElement("span")
        xValue.innerText = approximate[i]

        let laGrangeValue = document.createElement("span")
        laGrangeValue.innerHTML = `${gsonData.approximateLaGrange[i]}`

        let gaussValue = document.createElement("span")
        gaussValue.innerHTML = `${gsonData.approximateGauss[i]}`

        x.appendChild(xValue)
        laGrangeCell.appendChild(laGrangeValue)
        gaussCell.appendChild(gaussValue)
    }

    for (let i = 0; i < tableDataX.length; i++) {
        let XYrow = XYTable.insertRow(-1)
        let XYx = XYrow.insertCell(0)
        let XYy = XYrow.insertCell(1)

        for (let j = 1; j < gsonData.desired[i].length; j++) {

            let wer = XYrow.insertCell(j+1)

            let polValue = document.createElement("span")
            polValue.innerText = gsonData.desired[j][i]

            wer.appendChild(polValue)

        }

        let xValue = document.createElement("span")
        xValue.innerText = tableDataX[i]

        let yValue = document.createElement("span")
        yValue.innerText = tableDataY[i]

        XYx.appendChild(xValue)
        XYy.appendChild(yValue)
    }
}

function checkStep() {

    let step = Number(tableDataX[1] - tableDataX[0])
    let valid = true;

    for (let i = 2; i < tableDataX.length; i++) {
        let first = Number(tableDataX[i])
        let second = Number(tableDataX[i-1])
        let third = Number((first - second).toFixed(2))
        if (third !== step) {
            valid = false
        }
    }

    return valid
}

function checkManual() {
    let left_border = document.getElementById("left-border")
    let right_border = document.getElementById("right-border")
    let ele = document.getElementsByName('function')
    let point_count = document.getElementById("point-count")

    let validRadio = false

    for (i = 0; i < ele.length; i++) {
        if (ele[i].checked) {
            validRadio = true
            selectedRadio = i
        }
    }

    if (Number(left_border.value) < Number(right_border.value) && validRadio && Number(point_count.value) >= 1 && filledAppTable) {
        left_border.className = "input"
        right_border.className = "input"
        point_count.className = "input"
        sendManualButton.disabled = false
    } else {
        left_border.className = "input is-danger"
        right_border.className = "input is-danger"
        point_count.className = "input is-danger"
        sendManualButton.disabled = true
    }
}