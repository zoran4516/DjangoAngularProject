$(function () {
  $("#as_gender").highcharts({
        chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    colors: ['#2e58ab', '#5678bc', '#d5ddee'],
    title: {
        text: ' '
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                style: {
                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                }
            }
        }
    },
    series: [{
        name: 'Gender',
        colorByPoint: true,
        data: [{
            name: 'Male',
            y: 40,
            sliced: true,
            selected: true
        }, {
            name: 'Female',
            y: 35
        }, {
            name: 'Others',
            y: 25
        }],

        showInLegend: true
    }]
    });
});

$(function () {
  $("#as_age").highcharts({
        chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    colors: ['#2e58ab', '#5678bc', '#d5ddee'],
    title: {
        text: ' '
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                style: {
                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                }
            }
        }
    },
    series: [{
        name: 'Age',
        colorByPoint: true,
        data: [{
            name: '18-25',
            y: 40,
            sliced: true,
            selected: true
        }, {
            name: '26-40',
            y: 35
        }, {
            name: '41-50',
            y: 25
        }],
        
        showInLegend: true
    }]
    });
});

$(function () {
  $("#as_qs1").highcharts({
        chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    colors: ['#2e58ab', '#5678bc', '#d5ddee'],
    title: {
        text: ' '
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                style: {
                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                }
            }
        }
    },
    series: [{
        name: 'Age',
        colorByPoint: true,
        data: [{
            name: '18-25',
            y: 40,
            sliced: true,
            selected: true
        }, {
            name: '26-40',
            y: 35
        }, {
            name: '41-50',
            y: 25
        }],
        
        showInLegend: true
    }]
    });
});

$(function () {
        $('#as_qs2').highcharts({
            chart: {
                type: 'bar'
            },
    colors: ['#2e58ab', '#5678bc', '#d5ddee'],
            title: {
                text: 'Lorem Ipsum X Axis'
            },
            xAxis: {
                categories: ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5']
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Lorem Ipsum Y Axis'
                }
            },
            legend: {
                reversed: true
            },
                series: [{
                name: 'Name 1',
                data: [5, 3, 4, 7, 2],
            },
            {
                name: 'Name 2',
                data: [5, 3, 4, 7, 2],
            },
            {
                name: 'Name 3',
                data: [5, 3, 4, 7, 2],
            }
            ]
        });
});
