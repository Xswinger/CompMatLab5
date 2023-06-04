let canvas = document.getElementById("canvas_background")
let chart

$(document).ready(function () {
    chart = new Chart(canvas, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Начальный график',
                data: [],
                backgroundColor: 'rgb(0,255,0)',
                borderColor: 'rgb(13,61,0)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: false
                    }
                }]
            }
        }
    })
})

function drawGraphic() {

    let uniqueXValues = tableDataX;
    let uniqueYValues = tableDataY;

    const data = {
        labels: uniqueXValues,
        datasets: [{
            label: 'Начальный график',
            data: uniqueYValues,
            backgroundColor: 'rgba(0,255,0)',
            borderColor: 'rgba(13,61,0)',
            borderWidth: 1
        }]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: false,
                    fontSize: 10,
                    max: Math.max(...uniqueYValues),
                    min: Math.min(...uniqueYValues)
                }
            }],
            xAxes: [{
                ticks: {
                    fontSize: 10,
                    max: Math.max(...uniqueXValues),
                    min: Math.min(...uniqueXValues)
                }
            }]
        },
        legend: {
            display: true,
            labels: {
                fontSize: 10,
            }
        }
    }

    chart.data = data;
    chart.options = options;

    chart.update();

}

function addGraphic(approximates, xTables, name) {

    let currentData = []

    currentData = currentData.concat(tableDataX)
    currentData = currentData.concat(xTables)

    currentData = currentData.sort()

    let currentDataYL = []
    let currentDataYG = []
    let currentDataY = []

    let j = 0
    let k = 0

    for (let i = 0; i < (currentData.length + approximate.length); i++) {
        if (currentData[i] !== approximate[j]) {
            currentDataYL[i] = null
            currentDataYG[i] = null
            if (typeof tableDataY[i] == "undefined") {
                currentDataY[i] = tableDataY[k]
            } else {
                currentDataY[i] = tableDataY[k]
            }
            k += 1
        } else {
            currentDataYL[i] = approximates.approximateLaGrange[j]
            currentDataYG[i] = approximates.approximateGauss[j]
            currentDataY[i] = null
            j += 1
        }
    }

    const datas = {
        labels: currentData,
        datasets: [{
            label: "Начальный",
            data: currentDataY,
            backgroundColor: 'rgba(175,0,39,0.8)',
            borderColor: 'rgb(255,237,34)',
            borderWidth: 1
        }, {
            label: name[0],
            data: currentDataYL,
            backgroundColor: 'rgb(0,255,0)',
            borderColor: 'rgb(255,237,34)',
            borderWidth: 1
        }, {
            label: name[1],
            data: currentDataYG,
            backgroundColor: 'rgb(245,99,255)',
            borderColor: 'rgb(255,237,34)',
            borderWidth: 1
        }]
    };

    chart.data = datas

    chart.update();

}