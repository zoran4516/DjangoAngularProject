// =====================================================
var public_data = [];
function bind_state_wise_respondent(survey) {
    console.log(survey)
    var data = [
        {
            "hc-key": "in-py",
            "value": 0
        },
        {
            "hc-key": "in-ld",
            "value": 0
        },
        {
            "hc-key": "in-wb",
            "value": 0
        },
        {
            "hc-key": "in-or",
            "value": 0
        },
        {
            "hc-key": "in-br",
            "value": 0
        },
        {
            "hc-key": "in-sk",
            "value": 0
        },
        {
            "hc-key": "in-ct",
            "value": 0
        },
        {
            "hc-key": "in-tn",
            "value": 0
        },
        {
            "hc-key": "in-mp",
            "value": 0
        },
        {
            "hc-key": "in-2984",
            "value": 0
        },
        {
            "hc-key": "in-ga",
            "value": 0
        },
        {
            "hc-key": "in-nl",
            "value": 0
        },
        {
            "hc-key": "in-mn",
            "value": 0
        },
        {
            "hc-key": "in-ar",
            "value": 0
        },
        {
            "hc-key": "in-mz",
            "value": 0
        },
        {
            "hc-key": "in-tr",
            "value": 0
        },
        {
            "hc-key": "in-3464",
            "value": 0
        },
        {
            "hc-key": "in-dl",
            "value": 0
        },
        {
            "hc-key": "in-hr",
            "value": 0
        },
        {
            "hc-key": "in-ch",
            "value": 0
        },
        {
            "hc-key": "in-hp",
            "value": 0
        },
        {
            "hc-key": "in-jk",
            "value": 0
        },
        {
            "hc-key": "in-kl",
            "value": 0
        },
        {
            "hc-key": "in-ka",
            "value": 0
        },
        {
            "hc-key": "in-dn",
            "value": 0
        },
        {
            "hc-key": "in-mh",
            "value": 0
        },
        {
            "hc-key": "in-as",
            "value": 0
        },
        {
            "hc-key": "in-ap",
            "value": 0
        },
        {
            "hc-key": "in-ml",
            "value": 0
        },
        {
            "hc-key": "in-pb",
            "value": 0
        },
        {
            "hc-key": "in-rj",
            "value": 0
        },
        {
            "hc-key": "in-up",
            "value": 0
        },
        {
            "hc-key": "in-ut",
            "value": 0
        },
        {
            "hc-key": "in-jh",
            "value": 0
        }
    ]
    $.ajax({
        type:'get',
        url:'/survey/state-wise-respondent/'+survey,
        success: function(res) {
             $.each(data, function(index, value) {
                 $.each(res["state"], function(i, v) {
                     if(value["hc-key"] == v["state"]) {
                         value["value"] = v["count"]
                     }
                 });
                 public_data.push(value)
             });

            // States wise VIZ
            data_map = {

                title: {
                    text: 'Visualization of respondents in this survey for different states.'
                },

                subtitle: {
                    text: ' '
                },

                colorAxis: {
                    min: 0,
                    minColor: '#ffffff',
                    maxColor: colors[0],
                  },
                plotOptions:{
                    series:{
                        point:{
                            events:{
                                click: function(){
                                    // alert(this.name);
                                    $(chart.find("path")).each(function(){
                                        if($(this)[0].attributes.fill.value === '#3c1b51'){
                                            $(this)[0].attributes.fill.value = oldFill;
                                            // console.log(Chart)
                                        }
                                    });
                                    oldFill = this.color;
                                    this.color = "#";
                                    change_data_on_state();
                                }
                            }
                        }
                    }
                },
                mapNavigation: {
                    enabled: true,
                    buttonOptions: {
                        verticalAlign: 'bottom'
                    }
                 },

                series: [{
                    animation: true,
                    data: public_data,
                    mapData: Highcharts.maps['countries/in/in-all'],
                    joinBy: 'hc-key',
                    name: 'Number of survey filled',
                    allowPointSelect: true,
                        cursor: 'pointer',
                        states: {
                            select: {
                                color: '#3c1b51',
                                borderColor: '#c7c7c7',
                                dashStyle: 'shortdot'
                            },
                            hover: {
                                color: colors[1]
                            }
                        },
                    dataLabels: {
                        enabled: true,
                        format: '{point.name}'
                    },
                    cursor: 'pointer',
                    events: {
                        click: function (e) {
                            e.point.zoomTo();
                            // console.log('randomize data')
                        }
                    }
                }, {
                    type: "mappoint",
                    name: "Respondents",
                    color: '#FF0000',
                    data: [{
                        name: 'Chennai',
                        x: 3354,
                        y: -828
                    },{
                        name: 'Sahil',
                        lat:28.6,
                        lon:77.2,
                    }]
                }],
                exporting : exporting,
            }
            var chart = $('.india-map-container').highcharts('Map', data_map);

            // Gender wise VIZ
            data_gender = res["gender"]
            chart_gender('pie', data_gender)
            data_age = res["age"]
            chart_age('pie', data_age)
        }, error: function(err){
            // throw new Error('Failed to load options: test.')
            console.log(err);
        }
    });
}

// bind_state_wise_respondent()
// =====================================================


let data_map;

var global_chart_data;

var popOverStatus = false;

$('.content').css('padding-top', ''+($('nav').height()+20)+'px')
// console.log(''+$('nav').height()+'')
$('.vized-data').hide()
$('.viz-survey').hide()


$(".view-id").click(function(){
    var survey = $(this).attr("data-id")
	bind_state_wise_respondent(survey)
	// console.log("1")

	$('.change-tag').addClass('fadeOut')
	$('.survey-list-wrap').addClass('fadeOut')
	setTimeout(()=> {
		// console.log("2")
		// console.log('gggggg')
		$('.change-tag').hide()
		$('.survey-list-wrap').hide()
		$('.change-tag').removeClass('fadeOut')
		$('.survey-list-wrap').removeClass('fadeOut')
	}, 1000)

	$('.change-tag').addClass('fadeOut')
	$('.survey-list-wrap').addClass('fadeOut')
	$('.vized-data').show()
	$('.viz-survey').show()
})

//$('.view-id').click(()=> {
//    debugger
//    var survey = $(this).attr("data-id")
//	bind_state_wise_respondent(survey)
//
//	$('.change-tag').addClass('fadeOut')
//	$('.survey-list-wrap').addClass('fadeOut')
//	setTimeout(()=>{
//		// console.log('gggggg')
//		$('.change-tag').hide()
//		$('.survey-list-wrap').hide()
//		$('.change-tag').removeClass('fadeOut')
//		$('.survey-list-wrap').removeClass('fadeOut')
//	},1000)
//	$('.change-tag').addClass('fadeOut')
//	$('.survey-list-wrap').addClass('fadeOut')
//	$('.vized-data').show()
//	$('.viz-survey').show()
//});

$('#back-to-list').click(()=>{
	setTimeout(()=>{
        $('.vized-data').hide();
        $('.viz-survey').hide();
	},1000);

	$('.change-tag').show();
    $('.survey-list-wrap').show();
    $('.change-tag').removeClass('fadeOut');
    $('.survey-list-wrap').removeClass('fadeOut');


});

$('.chartToggle').hover(function(e){
    var wrapChartButton = $( this.nextElementSibling );

    // console.log(wrapChartButton, this);
    wrapChartButton.css('display', 'inline-flex')
    setTimeout(function () {
        wrapChartButton.find('.chart-type-select').addClass('animateChartOptions');
    },10)
}, function(){
    var wrapChartButton = $( this.nextElementSibling );
    // console.log(this)
    wrapChartButton.css('display', 'no')
    wrapChartButton.find('.chart-type-select').removeClass('animateChartOptions');
})

$('.wrapChartButton').hover(function(){
    $(this)
    .css('visibility', 'visible')
    .find('.chart-type-select').addClass('animateChartOptions');

}, function(){
    $(this)
    .css('visibility', 'hidden')
    .find('.chart-type-select').removeClass('animateChartOptions')

})

// global colors for charts and map
// var  colors= ['#fc427b', '#2a0e3c', '#182C61', '#DDDF00', '#F97F51', '#1B9CFC', '#CAD3C8', '#9AECDB', '#EAB543']
// var colors= ['#db2f94', '#c136d2', '#5aa7df', '#4d78ed', '#8874e6', '#ce4775', '#ce4775', '#1B9CFC', '#786fa6']
// var colors = ['#699ed4', '#9c90a1', '#3881da', '#808fab', '#62a2af', '#f3a683', '#f8a5c2', '#ff4d4d', '#cd84f1']
var colors = ['#db3d71', '#ce42d6', '#e39328', '#986ef8', '#b90000', '#dd5e36', '#ad14680', '#00cec9', '#b2bec3']

Highcharts.setOptions({
    // colors: ['#fc427b', '#2a0e3c', '#182C61', '#DDDF00', '#F97F51', '#1B9CFC', '#CAD3C8', '#9AECDB', '#EAB543']
    colors: colors,
});



// end colors


    // custom exporting
    let exporting = {
        menuItemDefinitions: {
            // Custom definition
            label: {
                onclick: function () {
                    global_chart_data = this.userOptions;
                    $('.all-content-wrap').fadeOut(1000).hide()
                    $('.wrap-full-chart').show().addClass('fadeIn')
                    if (global_chart_data.chart.type === 'map') {
                        var chart = $('.wrap-full-chart').highcharts('Map', global_chart_data);
                    } else {
                        // console.log(global_chart_data)
                        var chart = $('.wrap-full-chart').highcharts('Chart', global_chart_data)
                    }
                    // if(chart && chart.renderTo && ( chart.renderTo.requestFullScreen || chart.renderTo.webkitRequestFullScreen) ) {
                    //     if(chart.renderTo.requestFullScreen) {
                    //         chart.renderTo.requestFullScreen();
                    //         console.log(chart.renderTo)
                    //         $(chart.renderTo).addClass('fullScreen')
                    //         $('nav, .nav').css('display', 'none')
                    //         document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
                    //     }
                    //     else if(chart.renderTo.webkitRequestFullScreen) {
                    //         chart.renderTo.webkitRequestFullScreen();
                    //         $(chart.renderTo).addClass('fullScreen')
                    //         $('nav, .nav').css('display', 'none')
                    //         document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
                    //     }
                    // }
                    // else {
                    //     //full screen support not available
                    // }
                },
                text: 'Full Screen'
            }
        },
        buttons: {
            contextButton: {
                menuItems: ['downloadPNG', 'downloadJPEG', 'separator', 'label']
            }
        }
    }

// end custom exporting

// full width

// end full width function



    // Prepare demo data
    var data = [{
        "hc-key": "in-py",
            "value": 0
        }, {
            "hc-key": "in-ld",
                "value": 1
        }, {
            "hc-key": "in-wb",
                "value": 2
        }, {
            "hc-key": "in-or",
                "value": 3
        }, {
            "hc-key": "in-br",
                "value": 4
        }, {
            "hc-key": "in-sk",
                "value": 5
        }, {
            "hc-key": "in-ct",
                "value": 6
        }, {
            "hc-key": "in-tn",
                "value": 7
        }, {
            "hc-key": "in-mp",
                "value": 8
        }, {
            "hc-key": "in-2984",
                "value": 9
        }, {
            "hc-key": "in-ga",
                "value": 10
        }, {
            "hc-key": "in-nl",
                "value": 11
        }, {
            "hc-key": "in-mn",
                "value": 12
        }, {
            "hc-key": "in-ar",
                "value": 13
        }, {
            "hc-key": "in-mz",
                "value": 14
        }, {
            "hc-key": "in-tr",
                "value": 15
        }, {
            "hc-key": "in-3464",
                "value": 16
        }, {
            "hc-key": "in-dl",
                "value": 17
        }, {
            "hc-key": "in-hr",
                "value": 18
        }, {
            "hc-key": "in-ch",
                "value": 19
        }, {
            "hc-key": "in-hp",
                "value": 20
        }, {
            "hc-key": "in-jk",
                "value": 21
        }, {
            "hc-key": "in-kl",
                "value": 22
        }, {
            "hc-key": "in-ka",
                "value": 23
        }, {
            "hc-key": "in-dn",
                "value": 24
        }, {
            "hc-key": "in-mh",
                "value": 25
        }, {
            "hc-key": "in-as",
                "value": 26
        }, {
            "hc-key": "in-ap",
                "value": 27
        }, {
            "hc-key": "in-ml",
                "value": 28
        }, {
            "hc-key": "in-pb",
                "value": 29
        }, {
            "hc-key": "in-rj",
                "value": 30
        }, {
            "hc-key": "in-up",
                "value": 31
        }, {
            "hc-key": "in-ut",
                "value": 32
        }, {
            "hc-key": "in-jh",
                "value": 33
        }];

    data_map = {

        title: {
            text: 'Visualization of respondents in this survey for different states.'
        },

        subtitle: {
            text: ' '
        },

        colorAxis: {
            min: 0,
            minColor: '#ffffff',
            maxColor: colors[0],
          },
		plotOptions:{
        	series:{
            	point:{
                	events:{
                    	click: function(){
                        	// alert(this.name);
                            $(chart.find("path")).each(function(){
                            	if($(this)[0].attributes.fill.value === '#3c1b51'){
                                	$(this)[0].attributes.fill.value = oldFill;
                                    // console.log(Chart)
                                }
                            });
                            oldFill = this.color;
                            this.color = "#";
                            change_data_on_state();
                        }
                    }
                }
            }
        },
        mapNavigation: {
            enabled: true,
            buttonOptions: {
                verticalAlign: 'bottom'
            }
         },

        series: [{
            animation: true,
            data: data,
            mapData: Highcharts.maps['countries/in/in-all'],
            joinBy: 'hc-key',
            name: 'Number of survey filled',
            allowPointSelect: true,
                cursor: 'pointer',
                states: {
                    select: {
                        color: '#3c1b51',
                        borderColor: '#c7c7c7',
                        dashStyle: 'shortdot'
                    },
                    hover: {
	                    color: colors[1]
	                }
                },
            dataLabels: {
                enabled: true,
                format: '{point.name}'
            },
            cursor: 'pointer',
            events: {
                click: function (e) {
                    e.point.zoomTo();
                    // console.log('randomize data')
                }
            }
        }, {
            type: "mappoint",
            name: "Respondents",
            color: '#FF0000',
            data: [{
                name: 'Chennai',
                x: 3354,
                y: -828
            },{
            	name: 'Sahil',
            	lat:28.6,
            	lon:77.2,
            }]
        }],
        exporting : exporting,
    }
    // Initiate the chart
    // console.log(data_map.series[0].data)
   // console.log(chart)




var data_gender = []

var data_age = []

var data_nccs = []

function chart_gender(chartType, dataGender){
		$(".gender-container").highcharts({
        chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: chartType
    },
    // colors: ['#3c1b51', '#FF60B3', '#c7c7c7'],
    title: {
        text: 'Gender based respondents visualization.'
    },
    tooltip: {
        pointFormat: 'Count:{point.y}'
    },
    xAxis: {
		categories: ['Male', 'Female', 'Others']
	},
	yAxis: {
		min: 0,
		max: 100,
		title: {
			text: 'No. of respondents for different gender.'
		}
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
            },
        },
    },
    series: [{
        name: 'Gender',
        colorByPoint: (chartType=== 'line'||chartType=== 'area' )? false : true,
        data: dataGender,
        showInLegend: true
    }]
    });
}

function chart_age(chartType, dataAge) {
	$(".age-container").highcharts({
        chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: chartType,
    },
    // colors: ['#3c1b51', '#FF60B3', '#c7c7c7'],
    title: {
        text: 'Age based respondents visualization.'
    },
    tooltip: {
        pointFormat: 'Count:{point.y}'
    },
    xAxis: {
		categories: ['10-17','18-25', '26-40', '41-80']
	},
	yAxis: {
		min: 0,
		max: 100,
		title: {
			text: 'No. of respondents for different age categories.'
		}
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
            },
        },
    },
    series: [{
        name: 'Age',
        colorByPoint: (chartType=== 'line'||chartType=== 'area' )? false : true,
        data: dataAge,
        showInLegend: true
    }]
    });
}

function chart_nccs(chartType, dataAge) {
    $(".nccs-container").highcharts({
        chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: chartType,
    },
    // colors: ['#3c1b51', '#FF60B3', '#c7c7c7'],
    title: {
        text: 'NCCS based Visualization'
    },
    tooltip: {
        pointFormat: 'percentage:{point.y}%'
    },
    xAxis: {
        categories: ['A','B', 'C', 'D', 'E', 'F']
    },
    yAxis: {
        min: 0,
        max: 100,
        title: {
            text: 'NCCS (New consumer classification system basis education & product ownership at home)'
        }
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
            },
        },
    },
    series: [{
        name: 'nccs',
        colorByPoint: (chartType=== 'line'||chartType=== 'area' )? false : true,
        data: dataAge,
        showInLegend: true
    }]
    });
}

$('.chart_type').click((e)=>{
	// console.log(e.target.id)
	chart_age(e.target.id,data_age);
	chart_gender(e.target.id,data_gender);
    chart_nccs(e.target.id,data_nccs);
})

function change_data_on_state(){
	var dataGender = [
		{
			name: "Male",
			y: Math.floor(Math.random() * 101)
		},
		{
			name: "Female",
			y: Math.floor(Math.random() * 101)
		},
		{
			name: "Others",
			y: Math.floor(Math.random() * 101)
		}
	]
	var dataAge = [
        {
            name: "10-17",
            y: Math.floor(Math.random() * 101)
        },
		{
			name: "18-25",
			y: Math.floor(Math.random() * 101)
		},
		{
			name: "26-40",
			y: Math.floor(Math.random() * 101)
		},
		{
			name: "41-80",
			y: Math.floor(Math.random() * 101)
		}
	]
    var dataNccs = [
        {
            name: "A",
            y: Math.floor(Math.random() * 101)
        },
        {
            name: "B",
            y: Math.floor(Math.random() * 101)
        },
        {
            name: "C",
            y: Math.floor(Math.random() * 101)
        },
        {
            name: "D",
            y: Math.floor(Math.random() * 101)
        },
        {
            name: "E",
            y: Math.floor(Math.random() * 101)
        },
        {
            name: "F",
            y: Math.floor(Math.random() * 101)
        }
    ]
	//data_age = dataAge
	// data_gender = dataGender
    data_nccs = dataNccs
	// chart_gender('pie', dataGender)
    //chart_age('pie', dataAge)
	chart_nccs('pie', dataNccs)
}

change_data_on_state();

//map appends



   var chart = $('.india-map-container').highcharts('Map', data_map);



/////// Questions starts////////
$(function () {
  $(".as_qs2").highcharts({
        chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie',
        options3d: {
            enabled: true,
            alpha: 45
        }
    },
    // colors: ['#3c1b51', '#FF60B3', '#c7c7c7'],
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
            },
            innerSize: 100,
            depth: 45
        }
    },
    series: [{
        name: 'Age',
        colorByPoint: true,
        data: [{
            name: '10-17',
            y: 35
        },{
            name: '18-25',
            y: 40
        }, {
            name: '26-40',
            y: 35
        }, {
            name: '41-80',
            y: 25
        }],

        showInLegend: true
    }]
    });
});

// $('.qs-label').val('Q2. Lorem ipsum ipojdu muium juyhm mhdhjufu...');
// $('#edit-icon').click((e)=>{
//     console.log('clicked')
//     console.log($(e.target).parent().siblings() )
//     var currentText = $(this).parent().siblings()
// 	checkQuesStatus(currentText)
// })

function edit(ele){
    // console.log($(ele).parent().siblings());
    var currentText = $(ele).parent().siblings()
    checkQuesStatus(currentText[0]);
    // if () {}
    // console.log($(currentText[0]).prop('readonly'))
}

$('.qs-label').keypress(function(e) {
    if(e.which == 13) {
		checkQuesStatus(e.target)
    }
});

function checkQuesStatus(currentText){
    let editColorChange = $(currentText).siblings().find('#edit-icon')
    if ($(currentText).prop('readonly')) {
        $(currentText).prop('readonly', false)
        $(currentText).focus();
        $(currentText).css('color', '#FF60B3')
        $(editColorChange).css('color', '#FF60B3')
    }else{
        $(currentText).prop('readonly', true)
        $(currentText).css('color', '#3c1b51')
        $(editColorChange).css('color', '#3c1b51')
    }
}


// let allAnswersVis = {
//     chart: {
//         type: 'column'
//     },
//     title: {
//         text: 'All answers Visualization.'
//     },
//     subtitle: {
//         text: ''
//     },
//     xAxis: {
//         categories: [
//             'Question 1',
//             'Question 2',
//             'Question 3',
//             'Question 4',
//             'Question 5',
//             'Question 6',
//             'Question 7',
//             'Question 8',
//             'Question 9',
//             'Question 10',
//             'Question 11',
//         ],
//         crosshair: true
//     },
//     yAxis: {
//         min: 0,
//         title: {
//             text: 'Total no. of selects for each option.'
//         }
//     },
//     tooltip: {
//         headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
//         pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
//             '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
//         footerFormat: '</table>',
//         shared: true,
//         useHTML: true
//     },
//     plotOptions: {
//         column: {
//             pointPadding: 0.2,
//             borderWidth: 0
//         }
//     },
//     series: [{
//         name: 'Option A',
//         data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6]

//     }, {
//         name: 'Option B',
//         data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6]

//     }, {
//         name: 'Option C',
//         data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3]

//     }, {
//         name: 'Option D',
//         data: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4, 47.6, 39.1, 46.8]

//     }]
// }

// $(function() {
//     $(".allAnswersVis").Highcharts(allAnswersVis);
// })


// Highcharts.chart('allAnswersVis', {
//     chart: {
//         type: 'column'
//     },
//     title: {
//         text: 'All answers Visualization.'
//     },
//     subtitle: {
//         text: ''
//     },
//     // colors:[red, blue, green, orange],
//     xAxis: {
//         categories: [
//             'Question 1',
//             'Question 2',
//             'Question 3',
//             'Question 4',
//             'Question 5',
//             'Question 6',
//             'Question 7',
//             'Question 8',
//             'Question 9',
//             'Question 10',
//             'Question 11',
//         ],
//         // crosshair: true
//     },
//     yAxis: {
//         min: 0,
//         title: {
//             text: 'Total no. of selects for each option.'
//         }
//     },
//     tooltip: {
//         headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
//         pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
//             '<td style="padding:0"><b>{point.y:.1f} users</b></td></tr>',
//         footerFormat: '</table>',
//         shared: true,
//         useHTML: true
//     },
//     plotOptions: {
//         column: {
//             pointPadding: 0.2,
//             borderWidth: 0
//         }
//     },
//     series: [{
//         name: 'Option A',
//         data: [49, 71, 106, 129, null, 176, 135, 148, null, 194, 95]

//     }, {
//         name: 'Option B',
//         data: [83, 78, 98, 93, 106, 84, null, 104, 91, 83, null]

//     }, {
//         name: 'Option C',
//         data: [48, null, 39, 41, 47, 48, 59, 59, null, 65, 59]

//     }, {
//         name: 'Option D',
//         data: [42, null, 34, 39, null, 75, null, 60, 47, 39, 46]

//     }]
// });


// $('.highcharts-color-0').attr('class', 'allAnswersVis-rect-3')


//Question 1
// render Gauge Yes No

function renderIcons() {

    // Move icon
    if (!this.series[0].icon) {
        this.series[0].icon = this.renderer.path(['M', -8, 0, 'L', 8, 0, 'M', 0, -8, 'L', 8, 0, 0, 8])
            .attr({
                'stroke': '#303030',
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
                'stroke-width': 2,
                'zIndex': 10
            })
            .add(this.series[2].group);
    }
    this.series[0].icon.translate(
        this.chartWidth / 2 - 10,
        this.plotHeight / 2 - this.series[0].points[0].shapeArgs.innerR -
            (this.series[0].points[0].shapeArgs.r - this.series[0].points[0].shapeArgs.innerR) / 2
    );

    // Exercise icon
    if (!this.series[1].icon) {
        this.series[1].icon = this.renderer.path(
            ['M', -8, 0, 'L', 8, 0, 'M', 0, -8, 'L', 8, 0, 0, 8,
                'M', 8, -8, 'L', 16, 0, 8, 8]
            )
            .attr({
                'stroke': '#ffffff',
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
                'stroke-width': 2,
                'zIndex': 10
            })
            .add(this.series[2].group);
    }
    this.series[1].icon.translate(
        this.chartWidth / 2 - 10,
        this.plotHeight / 2 - this.series[1].points[0].shapeArgs.innerR -
            (this.series[1].points[0].shapeArgs.r - this.series[1].points[0].shapeArgs.innerR) / 2
    );

    // Stand icon
    if (!this.series[2].icon) {
        this.series[2].icon = this.renderer.path(['M', 0, 8, 'L', 0, -8, 'M', -8, 0, 'L', 0, -8, 8, 0])
            .attr({
                'stroke': '#303030',
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
                'stroke-width': 2,
                'zIndex': 10
            })
            .add(this.series[2].group);
    }

    this.series[2].icon.translate(
        this.chartWidth / 2 - 10,
        this.plotHeight / 2 - this.series[2].points[0].shapeArgs.innerR -
            (this.series[2].points[0].shapeArgs.r - this.series[2].points[0].shapeArgs.innerR) / 2
    );
}

// end render gauge yes no

var yesNoDataDonut = {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: 0,
        plotShadow: false
    },
    title: {
        text: 'Yes or No',
        align: 'center',
        verticalAlign: 'middle',
        y: 40
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
        pie: {
            dataLabels: {
                enabled: true,
                distance: -50,
                style: {
                    fontWeight: 'bold',
                    color: 'white'
                }
            },
            startAngle: -90,
            endAngle: 90,
            center: ['50%', '75%']
        }
    },
    series: [{
        type: 'pie',
        name: 'Saying respondents',
        innerSize: '50%',
        data: [
            ['Yes', 58.9],
            ['No', 13.29]
        ]
    }]
}

var yesNoDataColumn = {
    chart: {
        type: 'column'
    },
    title: {
        text: 'Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum.'
    },
    subtitle: {
        text: ''
    },
    xAxis: {
        type: 'category',
        labels: {
            rotation: -45,
            style: {
                fontSize: '',
                fontFamily: ''
            }
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Respondents Answers.'
        }
    },
    legend: {
        enabled: false
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    series: [{
        name: 'Saying Respondents',
        data: [
            ['Yes', 100],
            ['No', 250]
        ],
        dataLabels: {
            enabled: true,
            format: '{point.y:.1f}<br>', // one decimal
            y: 10, // 10 pixels down from the top
            style: {
                fontSize: '',
                fontFamily: ''
            }
        }
    }]
};

var yesNoDataGauge = {

    chart: {
        type: 'solidgauge',
        height: 'auto',
        events: {
            render: renderIcons
        }
    },

    title: {
        text: 'Yes No',
        style: {
            fontSize: '14px'
        }
    },

    tooltip: {
        borderWidth: 0,
        backgroundColor: 'none',
        shadow: false,
        style: {
            fontSize: '16px'
        },
        pointFormat: '{series.name}<br><span style="font-size:2em; color: {point.color}; font-weight: bold">{point.y}%</span>',
        positioner: function (labelWidth) {
            return {
                x: (this.chart.chartWidth - labelWidth) / 2,
                y: (this.chart.plotHeight / 2) + 15
            };
        }
    },

    pane: {
        startAngle: 0,
        endAngle: 360,
        background: [{ // Track for Move
            outerRadius: '112%',
            innerRadius: '88%',
            backgroundColor: Highcharts.Color(Highcharts.getOptions().colors[0])
                .setOpacity(0.3)
                .get(),
            borderWidth: 0
        }, { // Track for Exercise
            outerRadius: '87%',
            innerRadius: '63%',
            backgroundColor: Highcharts.Color(Highcharts.getOptions().colors[1])
                .setOpacity(0.3)
                .get(),
            borderWidth: 0
        }]
    },

    yAxis: {
        min: 0,
        max: 100,
        lineWidth: 0,
        tickPositions: []
    },

    plotOptions: {
        solidgauge: {
            dataLabels: {
                enabled: false
            },
            linecap: 'round',
            stickyTracking: false,
            rounded: true
        }
    },

    series: [{
        name: 'Yes',
        data: [{
            color: Highcharts.getOptions().colors[0],
            radius: '112%',
            innerRadius: '88%',
            y: 65
        }]
    }, {
        name: 'No',
        data: [{
            color: Highcharts.getOptions().colors[1],
            radius: '87%',
            innerRadius: '63%',
            y: 35
        }]
}]
}

var yesNoDataStacked = {
    chart: {
        type: 'column'
    },
    title: {
        text: 'Stacked column chart'
    },
    xAxis: {
        categories: ['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas', 'Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas', 'Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas', 'Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas', 'Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas', 'Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas', 'Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas',]
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Total fruit consumption'
        },
        stackLabels: {
            enabled: true,
            style: {
                fontWeight: 'bold',
                color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
            }
        }
    },
    legend: {
        align: 'right',
        x: -30,
        verticalAlign: 'top',
        y: 25,
        floating: true,
        backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
        borderColor: '#CCC',
        borderWidth: 1,
        shadow: false
    },
    tooltip: {
        headerFormat: '<b>{point.x}</b><br/>',
        pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
    },
    plotOptions: {
        column: {
            stacking: 'normal',
            dataLabels: {
                enabled: true,
                color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
            }
        }
    },
    series: [{
        name: 'Yes',
        data: [50, 30, 40, 70, 20, 50, 30, 40, 70, 20, 50, 30, 40, 70, 20, 50, 30, 40, 70, 20, 50, 30, 40, 70, 20, 50, 30, 40, 70, 20, 50, 30, 40, 70, 20, ]
    }, {
        name: 'No',
        data: [20, 20, 30, 20, 10, 20, 20, 30, 20, 10, 20, 20, 30, 20, 10, 20, 20, 30, 20, 10, 20, 20, 30, 20, 10, 20, 20, 30, 20, 10, 20, 20, 30, 20, 10, ]
    }],
    exporting: exporting
}
// yes to data ends
var anyOfManyDataStacked = {
    chart: {
        type: 'column'
    },
    title: {
        text: 'Stacked column chart'
    },
    xAxis: {
        categories: ['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas', 'Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas', 'Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas', 'Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas', 'Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas', 'Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas', 'Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas',]
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Total fruit consumption'
        },
        stackLabels: {
            enabled: true,
            style: {
                fontWeight: 'bold',
                color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
            }
        }
    },
    legend: {
        align: 'right',
        x: -30,
        verticalAlign: 'top',
        y: 25,
        floating: true,
        backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
        borderColor: '#CCC',
        borderWidth: 1,
        shadow: false
    },
    tooltip: {
        headerFormat: '<b>{point.x}</b><br/>',
        pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
    },
    plotOptions: {
        column: {
            stacking: 'normal',
            dataLabels: {
                enabled: true,
                color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
            }
        }
    },
    series: [{
        name: 'John',
        data: [5, 3, 4, 7, 2, 5, 3, 4, 7, 2, 5, 3, 4, 7, 2, 5, 3, 4, 7, 2, 5, 3, 4, 7, 2, 5, 3, 4, 7, 2, 5, 3, 4, 7, 2, ]
    }, {
        name: 'Jane',
        data: [2, 2, 3, 2, 1, 2, 2, 3, 2, 1, 2, 2, 3, 2, 1, 2, 2, 3, 2, 1, 2, 2, 3, 2, 1, 2, 2, 3, 2, 1, 2, 2, 3, 2, 1, ]
    }, {
        name: 'Joe',
        data: [3, 4, 4, 2, 5, 3, 4, 4, 2, 5, 3, 4, 4, 2, 5, 3, 4, 4, 2, 5, 3, 4, 4, 2, 5, 3, 4, 4, 2, 5, 3, 4, 4, 2, 5, ]
    },
    {
        name: 'John',
        data: [5, 3, 4, 7, 2, 5, 3, 4, 7, 2, 5, 3, 4, 7, 2, 5, 3, 4, 7, 2, 5, 3, 4, 7, 2, 5, 3, 4, 7, 2, 5, 3, 4, 7, 2, ]
    }, {
        name: 'Jane',
        data: [2, 2, 3, 2, 1, 2, 2, 3, 2, 1, 2, 2, 3, 2, 1, 2, 2, 3, 2, 1, 2, 2, 3, 2, 1, 2, 2, 3, 2, 1, 2, 2, 3, 2, 1, ]
    }, {
        name: 'Joe',
        data: [3, 4, 4, 2, 5, 3, 4, 4, 2, 5, 3, 4, 4, 2, 5, 3, 4, 4, 2, 5, 3, 4, 4, 2, 5, 3, 4, 4, 2, 5, 3, 4, 4, 2, 5, ]
    }],
    exporting: exporting
}
Highcharts.chart('ques_1', yesNoDataDonut);

  $( function() {
    $( document ).tooltip({
      position: {
        my: "center bottom-20",
        at: "center top",
        using: function( position, feedback ) {
          $( this ).css( position );
          $( "<div>" )
            .addClass( "arrow" )
            .addClass( feedback.vertical )
            .addClass( feedback.horizontal )
            .appendTo( this );
        }
      }
    });
  } );
Highcharts.chart('ques_1', yesNoDataDonut);

  $( function() {
    $( document ).tooltip({
      position: {
        my: "center bottom-20",
        at: "center top",
        using: function( position, feedback ) {
          $( this ).css( position );
          $( "<div>" )
            .addClass( "arrow" )
            .addClass( feedback.vertical )
            .addClass( feedback.horizontal )
            .appendTo( this );
        }
      }
    });
  } );






// Spider Web Chart

var SpyiderWebChart = {

    chart: {
        polar: true,
        type: 'column'
    },

    title: {
        text: '',
        x: -80
    },

    pane: {
        size: '80%'
    },

    xAxis: {
        categories: ['option 1', 'option 2','option 3', 'option 4'],
        tickmarkPlacement: 'on',
        lineWidth: 0
    },

    yAxis: {
        gridLineInterpolation: 'polygon',
        lineWidth: 0,
        min: 0
    },

    tooltip: {
        shared: true,
        pointFormat: '<span style="color:{series.color}">{series.name} {point.y:,.0f} respondents. <br/>'
    },

    legend: {
        align: 'right',
        verticalAlign: 'top',
        y: 70,
        layout: 'vertical'
    },

    series: [{
        name: 'selected by ',
        data: [43, 19, 60, 35],
        pointPlacement: 'on'
    }]

}

var anyOfManyColumn = {
    chart: {
        type: 'column'
    },
    title: {
        text: 'Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum.'
    },
    subtitle: {
        text: ''
    },
    xAxis: {
        type: 'category',
        labels: {
            rotation: -45,
            style: {
                fontSize: '',
                fontFamily: ''
            }
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Respondents Answers.'
        }
    },
    legend: {
        enabled: false
    },
    tooltip: {
        pointFormat: 'Population in 2017: <b>{point.y:.1f} millions</b>'
    },
    series: [{
        name: 'Population',
        data: [
            ['Option 1', 100],
            ['Option 2', 250],
            ['Option 3', 142],
            ['Option 4', 10],
            ['Option 5', 16]
        ],
        dataLabels: {
            enabled: true,
            format: '{point.y:.1f}<br>', // one decimal
            y: 10, // 10 pixels down from the top
            style: {
                fontSize: '',
                fontFamily: ''
            }
        }
    }]
}

var variablePieChart =  {
    chart: {
        type: 'variablepie'
    },
    title: {
        text: 'Countries compared by population density and total area.'
    },
    tooltip: {
        headerFormat: '',
        pointFormat: '<span style="color:{point.color}">\u25CF</span> <b> {point.name}</b><br/>' +
            'Area (square km): <b>{point.y}</b><br/>' +
            'Population density (people per square km): <b>{point.z}</b><br/>'
    },
    series: [{
        minPointSize: 10,
        innerSize: '20%',
        zMin: 0,
        name: 'countries',
        data: [{
            name: 'Spain',
            y: 505370,
            z: 92.9
        }, {
            name: 'France',
            y: 551500,
            z: 118.7
        }, {
            name: 'Poland',
            y: 312685,
            z: 124.6
        }, {
            name: 'Czech Republic',
            y: 78867,
            z: 137.5
        }, {
            name: 'Italy',
            y: 301340,
            z: 201.8
        }, {
            name: 'Switzerland',
            y: 41277,
            z: 214.5
        }, {
            name: 'Germany',
            y: 357022,
            z: 235.6
        }]
    }]
}

// Highcharts.chart('ques_2', variablePieChart);

// Spider Web Chart Ends



// Like TYpe Chart

var pieLikes = {
    chart: {
        type: 'pie'
    },
    title: {
        text: 'Liked-O-Meter for XYZ Product'
    },
    subtitle: {
        text: ''
    },
    plotOptions: {
        pie: {
            innerSize: 100,
            depth: 45
        }
    },
    series: [{
        name: 'Delivered amount',
        data: [
            ['Loved It', 50],
            ['Quiet Liked It', 75],
            ['Ok With It', 63],
            ["Don't Like It as Much", 32],
            ['Dont Liked It At All',10 ]
        ]
    }]
}

var likeGauge = {

    chart: {
        type: 'solidgauge',
        height: 'auto',
    },

    title: {
        text: 'Like-O-Meter',
        style: {
            fontSize: '14px'
        }
    },

    tooltip: {
        borderWidth: 0,
        backgroundColor: 'none',
        shadow: false,
        style: {
            fontSize: '1em'
        },
        pointFormat: '{series.name}<br><span style="font-size:2em; color: {point.color}; font-weight: bold">{point.y}%</span>',
        positioner: function (labelWidth) {
            return {
                x: (this.chart.chartWidth - labelWidth) / 2,
                y: (this.chart.plotHeight / 2) + 15
            };
        }
    },

    pane: {
        startAngle: 0,
        endAngle: 360,
        background: [{ // Track for Move
            outerRadius: '105%',
            innerRadius: '95%',
            backgroundColor: Highcharts.Color(Highcharts.getOptions().colors[0])
                .setOpacity(0.3)
                .get(),
            borderWidth: 0
        }, { // Track for Exercise
            outerRadius: '94%',
            innerRadius: '84%',
            backgroundColor: Highcharts.Color(Highcharts.getOptions().colors[1])
                .setOpacity(0.3)
                .get(),
            borderWidth: 0
        }, { // Track for Exercise
            outerRadius: '83%',
            innerRadius: '73%',
            backgroundColor: Highcharts.Color(Highcharts.getOptions().colors[2])
                .setOpacity(0.3)
                .get(),
            borderWidth: 0
        }, { // Track for Exercise
            outerRadius: '72%',
            innerRadius: '62%',
            backgroundColor: Highcharts.Color(Highcharts.getOptions().colors[3])
                .setOpacity(0.3)
                .get(),
            borderWidth: 0
        }, { // Track for Exercise
            outerRadius: '61%',
            innerRadius: '51%',
            backgroundColor: Highcharts.Color(Highcharts.getOptions().colors[4])
                .setOpacity(0.3)
                .get(),
            borderWidth: 0
        }]
    },

    yAxis: {
        min: 0,
        max: 100,
        lineWidth: 0,
        tickPositions: []
    },

    plotOptions: {
        solidgauge: {
            dataLabels: {
                enabled: false
            },
            linecap: 'round',
            stickyTracking: false,
            rounded: true
        }
    },

    series: [{
        name: 'Yes',
        data: [{
            color: Highcharts.getOptions().colors[0],
            radius: '105%',
            innerRadius: '95%',
            y: 65
        }]
    }, {
        name: 'No',
        data: [{
            color: Highcharts.getOptions().colors[1],
            radius: '94%',
            innerRadius: '84%',
            y: 40
        }]
    }, {
        name: 'Dont Like It As Much',
        data: [{
            color: Highcharts.getOptions().colors[2],
            radius: '83%',
            innerRadius: '73%',
            y: 35
        }]
    }, {
        name: 'Lorem Ipsum Lorem',
        data: [{
            color: Highcharts.getOptions().colors[3],
            radius: '72%',
            innerRadius: '62%',
            y: 90
        }]
    }, {
        name: 'NLorem Ipsumo',
        data: [{
            color: Highcharts.getOptions().colors[4],
            radius: '61%',
            innerRadius: '51%',
            y: 35
        }]
    }],
    exporting: exporting
}

var funnelData = {
    chart: {
        type: 'column'
    },
    title: {
        text: 'Stacked column chart'
    },
    xAxis: {
        categories: ['']
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Total fruit consumption'
        }
    },
    tooltip: {
        pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
        shared: true
    },
    plotOptions: {
        series: {
            minPointLength: 3,
            dataLabels: {
            align: 'center',
            enabled: true,
            format: '{y} %'
            }
        },
        column: {
            stacking: 'percent',
            showInLegend: true
        }
    },
    series: [{
        name: 'John',
        data: [4],
    }, {
        name: 'Jane',
        data: [2],
    }, {
        name: 'Joe',
        data: [2],
    }, {
        name: 'Apple',
        data: [0.5],
    }, {
        name: 'Grapes',
        data: [1.5],
    }]
}

// Highcharts.chart('ques_3', funnelData);
// Like Type Chart Ends


// column chart for divs
var barRank = {
    chart: {
        type: 'bar'
    },
    title: {
        text: 'Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum.'
    },
    subtitle: {
        text: ''
    },
    xAxis: {
        type: 'category',
        labels: {
            rotation: -45,
            style: {
                fontSize: '',
                fontFamily: ''
            }
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Respondents Answers.'
        }
    },
    legend: {
        enabled: false
    },
    tooltip: {
        pointFormat: 'Population in 2017: <b>{point.y:.1f} millions</b>'
    },
    series: [{
        name: 'Population',
        data: [
            ['Option 1', 250],
            ['Option 2', 142],
            ['Option 3', 100],
            ['Option 4', 19],
            ['Option 5', 16]
        ],
        dataLabels: {
            enabled: true,
            format: '{point.y:.1f}<br>', // one decimal
            y: 10, // 10 pixels down from the top
            style: {
                fontSize: '',
                fontFamily: ''
            }
        }
    }]
}
var columnRank = {
    chart: {
        type: 'column'
    },
    title: {
        text: 'Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum.'
    },
    subtitle: {
        text: ''
    },
    xAxis: {
        type: 'category',
        labels: {
            rotation: -45,
            style: {
                fontSize: '',
                fontFamily: ''
            }
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Respondents Answers.'
        }
    },
    legend: {
        enabled: false
    },
    tooltip: {
        pointFormat: 'Population in 2017: <b>{point.y:.1f} millions</b>'
    },
    series: [{
        name: 'Population',
        data: [
            ['Option 1', 250],
            ['Option 2', 142],
            ['Option 3', 100],
            ['Option 4', 19],
            ['Option 5', 16]
        ],
        dataLabels: {
            enabled: true,
            format: '{point.y:.1f}<br>', // one decimal
            y: 10, // 10 pixels down from the top
            style: {
                fontSize: '',
                fontFamily: ''
            }
        }
    }]
}

// Highcharts.chart('ques_4', barRank);
// closed column

// word cloud

    var text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean bibendum erat ac justo sollicitudin, quis lacinia ligula fringilla. Pellentesque hendrerit, nisi vitae posuere condimentum, lectus urna accumsan libero, rutrum commodo mi lacus pretium erat. Phasellus pretium ultrices mi sed semper. Praesent ut tristique magna. Donec nisl tellus, sagittis ut tempus sit amet, consectetur eget erat. Sed ornare gravida lacinia. Curabitur iaculis metus purus, eget pretium est laoreet ut. Quisque tristique augue ac eros malesuada, vitae facilisis mauris sollicitudin. Mauris ac molestie nulla, vitae facilisis quam. Curabitur placerat ornare sem, in mattis purus posuere eget. Praesent non condimentum odio. Nunc aliquet, odio nec auctor congue, sapien justo dictum massa, nec fermentum massa sapien non tellus. Praesent luctus eros et nunc pretium hendrerit. In consequat et eros nec interdum. Ut neque dui, maximus id elit ac, consequat pretium tellus. Nullam vel accumsan lorem.';
var lines = text.split(/[,\. ]+/g),
    data = Highcharts.reduce(lines, function (arr, word) {
        var obj = Highcharts.find(arr, function (obj) {
            return obj.name === word;
        });
        if (obj) {
            obj.weight += 1;
        } else {
            obj = {
                name: word,
                weight: 1
            };
            arr.push(obj);
        }
        return arr;
    }, []);

Highcharts.chart('ques_5', {
    series: [{
        type: 'wordcloud',
        data: data,
        name: 'Occurrences'
    }],
    title: {
        text: 'Wordcloud of Lorem Ipsum'
    }
});

// close word cloud


// ques 5
var treemap = {
    colorAxis: {
        minColor: '#FFFFFF',
        maxColor: Highcharts.getOptions().colors[0]
    },
    series: [{
        type: 'treemap',
        layoutAlgorithm: 'squarified',
        data: [{
            name: 'Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum',
            value: 6,
            colorValue: 1
        }, {
            name: 'Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum',
            value: 6,
            colorValue: 2
        }, {
            name: 'Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum',
            value: 4,
            colorValue: 3
        }, {
            name: 'Lorem Ipsum Lorem',
            value: 3,
            colorValue: 4
        }, {
            name: 'Lorem Ipsum Lorem',
            value: 2,
            colorValue: 2
        }, {
            name: 'Lorem Ipsum Lorem',
            value: 2,
            colorValue: 6
        }, {
            name: 'Lorem Ipsum Lorem',
            value: 8,
            colorValue: 7
        }, {
            name: 'Lorem Ipsum Lorem',
            value: 1,
            colorValue: 7
        }, {
            name: 'Lorem Ipsum Lorem',
            value: 3,
            colorValue: 7
        }, {
            name: 'Lorem Ipsum Lorem',
            value: 4,
            colorValue: 7
        }]
    }],
    title: {
        text: 'Highcharts Treemap'
    }
}

// Highcharts.chart('ques_6', treemap)
// end tree map



// ques_7
var anyofManyPerformance = {
    data: {
        table: 'freq',
        startRow: 1,
        endRow: 17,
        endColumn: 7
    },

    chart: {
        polar: true,
        type: 'column'
    },

    title: {
        text: 'Wind rose'
    },

    subtitle: {
        text: ''
    },

    pane: {
        size: '85%'
    },

    // legend: {
    //     align: 'right',
    //     verticalAlign: 'top',
    //     y: 100,
    //     layout: 'vertical'
    // },

    xAxis: {
        tickmarkPlacement: 'on'
    },

    yAxis: {
        min: 0,
        endOnTick: false,
        showLastLabel: true,
        title: {
            text: 'Frequency (%)'
        },
        labels: {
            formatter: function () {
                return this.value + '%';
            },
        },
        reversedStacks: false
    },

    tooltip: {
        valueSuffix: '%'
    },

    plotOptions: {
        series: {
            stacking: 'normal',
            shadow: false,
            groupPadding: 0,
            pointPlacement: 'on'
        },
        column: {
            showInLegend: false,
        }

    }
}

Highcharts.chart('ques_7', anyofManyPerformance)
// end ques_7

// heat map

// function randomArrHeatMap() {
//      var arr1 = [];
//     for(i = 0; i<6; i++){
//          for(j=0; j<9; j++){
//              arr1.push([i,j,Math.round(Math.random() *101)])
//          }
//     }
//     console.log(arr1)
//     return(arr1)
// }

// Highcharts.chart('heatmapNccs', {

//     chart: {
//         type: 'heatmap',
//         marginTop: 40,
//         marginBottom: 80,
//         plotBorderWidth: 1
//     },


//     title: {
//         text: 'NCCS (New consumer classification system basis education &amp; product ownership at home)'
//     },

//     xAxis: {
//         categories: ['A', 'B', 'C', 'D', 'E', 'F']
//     },

//     yAxis: {
//         categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
//         title: null
//     },

//     colorAxis: {
//         min: 0,
//         minColor: '#FFFFFF',
//         maxColor: Highcharts.getOptions().colors[0]
//     },

//     legend: {
//         align: 'right',
//         layout: 'vertical',
//         margin: 0,
//         verticalAlign: 'top',
//         y: 25,
//         symbolHeight: 280
//     },

//     tooltip: {
//         formatter: function () {
//             return '<b>' + this.series.xAxis.categories[this.point.x] + '</b> sold <br><b>' +
//                 this.point.value + '</b> items on <br><b>' + this.series.yAxis.categories[this.point.y] + '</b>';
//         }
//     },

//     series: [{
//         name: 'Sales per employee',
//         borderWidth: 1,
//         data: randomArrHeatMap(),
//         dataLabels: {
//             enabled: true,
//             color: '#000000'
//         }
//     }]

// });

// heat map ends



// function SemiCircleDonut(ele) {
//     plotChart(ele)
// }

// function ColumnChart(ele) {
//     plotChart(ele)
// }

// function GaugeChart(ele){
//     plotChart(ele)
// }

// function StateStackedChart(ele) {
//     plotChart(ele)
// }

// function StateStackedChart(ele) {
//     plotChart(ele)
// }

$(window).keyup(function(e) {
     if (e.keyCode === 27) { // escape key maps to keycode `27`
        // console.log('esc press')
        // closeFullscreen()

    }
});

function closeFullscreen() {
    // console.log('closeFullscreen')
    if (document.exitFullscreen) {
    document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
    $('.india-map-container').removeClass('fullScreen')
        $('nav, .nav').css('display', 'black')
        // console.log('class removeClass')
    } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
    }
}

$(document).bind('fullscreenchange webkitfullscreenchange mozfullscreenchange msfullscreenchange', function (e) {
    var fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullscreenElement || document.msFullscreenElement;

    if (!fullscreenElement) {
        // console.log('Leaving full-screen mode...');
    } else {
        // console.log('Entering full-screen mode...');
    }
});



function plotChart(ele) {
    var data = $(ele)[0].id
    data = window[data]
    var x = $(ele).parent().parent().siblings()
    var renderDivId = x[1].id
    // console.log(data)
    Highcharts.chart(renderDivId, data);
}



// pop over
    function popOver(ele) {
        if (popOverStatus) {
            $('.popOver').remove();
            popOverStatus = false
            // console.log(popOverStatus)
        } else {
            // console.log(ele)
            var pos = $(ele).position()
            var x = $(ele).height()
            var x = $(ele).height()
            // console.log(pos.top+ x+10+ '....'+ pos.left)
            $('body').append('<div class="popOver">\
               <p class="popOver-text" onclick="colorTheme(1)">Default</p>\
               <p class="popOver-text" onclick="colorTheme(2)">Color 1</p>\
               <p class="popOver-text" onclick="colorTheme(3)">Color 2</p>\
               <p class="popOver-text" onclick="colorTheme(4)">Color 3</p>\
            </div>\
            ')
            $('.popOver').css({
                'position': 'absolute',
                'background':'white',
                'height': 'auto',
                'width' : $('.chart_color').width()+'px',
                'top' : pos.top+ x+30+'px',
                'left' : pos.left+5+'px'
            })
            popOverStatus = true
            // console.log(popOverStatus)
        }
    }

function colorTheme(themeValue) {
    // console.log(themeValue)
    if (themeValue==1) {
        Highcharts.setOptions({
            colors: ['#fc427b', '#2a0e3c', '#182C61', '#DDDF00', '#F97F51', '#1B9CFC', '#CAD3C8', '#9AECDB', '#EAB543']
        });
        var chart = $('.india-map-container').highcharts('Map', data_map);

    }
    if (themeValue==2) {
        Highcharts.setOptions({
            colors: ['blue', '#2a0e3c', '#182C61', '#DDDF00', '#F97F51', '#1B9CFC', '#CAD3C8', '#9AECDB', '#EAB543']
        });
        var chart = $('.india-map-container').highcharts('Map', data_map);


    }
    if (themeValue==3) {
        Highcharts.setOptions({
            colors: ['green', '#2a0e3c', '#182C61', '#DDDF00', '#F97F51', '#1B9CFC', '#CAD3C8', '#9AECDB', '#EAB543']
        });
        var chart = $('.india-map-container').highcharts('Map', data_map);


    }
    if (themeValue==4) {
        Highcharts.setOptions({
            colors: ['red', '#2a0e3c', '#182C61', '#DDDF00', '#F97F51', '#1B9CFC', '#CAD3C8', '#9AECDB', '#EAB543']
        });
        var chart = $('.india-map-container').highcharts('Map', data_map);


    }
}
// end pop over

$('body').click(function(evt){
    if(evt.target.className == "popOver"){
        // console.log('first ......')
        $('.popOver').remove()
        return;
    }
    if($(evt.target).closest('.popOver').length){
        // console.log('second....')
        $('.popOver').remove()
        popOverStatus = false
        return;
    }
});
