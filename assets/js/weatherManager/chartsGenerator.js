
function createTempChart(containerId,xStart,temperatures){
    Highcharts.chart(containerId, {

        title: {
            text: 'Daily temperatures',
            align: 'left'
        },



        yAxis: {
            title: {
                text: 'Temperatures - °C'
            }
        },

        xAxis: {
            type: 'datetime',
            startOnTick:true
        },

        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
        },

        plotOptions: {
            series: {
                label: {
                    connectorAllowed: false
                },
                pointStart: xStart,
                pointInterval: 3 * 3600 * 1000
            }
        },

        series: [{
            name: 'Daily Temperatures',
            data: temperatures
        }],

        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        }

    });


}

function DisplayChart(id,xStart,data){
    let chartContainer = document.createElement('div');
    chartContainer.classList.add("d-none","tempChart");
    chartContainer.setAttribute("id",`tempChart${id}`);
    document.querySelector(".chartsWeather").appendChild(chartContainer);
    createTempChart(`tempChart${id}`,xStart,data);
}

export {DisplayChart}