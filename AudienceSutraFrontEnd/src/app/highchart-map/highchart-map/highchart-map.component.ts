import { Component, OnInit } from '@angular/core';
//import { MapData, Colors, MapOptions } from '../MapData';
import * as $ from 'jquery';
declare var require: any;

// require("http://code.highcharts.com/highcharts.js");
// require("http://code.highcharts.com/maps/modules/map.js");
// require("https://code.highcharts.com/highcharts-more.js");
// require("https://code.highcharts.com/modules/solid-gauge.js");
// require("https://code.highcharts.com/modules/data.js");
// require("https://code.highcharts.com/modules/variable-pie.js");
// require("https://code.highcharts.com/modules/wordcloud.js");
// require("https://code.highcharts.com/modules/heatmap.js");
// require("https://code.highcharts.com/modules/treemap.js");
// require("https://code.highcharts.com/modules/funnel.js");
// require("https://code.highcharts.com/highcharts-3d.js");
// require("http://code.highcharts.com/maps/modules/exporting.js");
// require("http://code.highcharts.com/mapdata/countries/in/in-all.js");


@Component({
  selector: 'app-highchart-map',
  templateUrl: './highchart-map.component.html',
  styleUrls: ['./highchart-map.component.css']
})
export class HighchartMapComponent implements OnInit {
  options: Object;
  constructor() { 
    //this.options = MapOptions;
  }

  ngOnInit() {
    $(document).ready(function(){
      //alert('ok');
      //$(".map-chart").highcharts('Map', this.options);
    });
  }

}
