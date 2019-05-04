import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighchartMapComponent } from './highchart-map/highchart-map.component';
//import { ChartModule } from 'angular2-highcharts';
declare var require: any;
//const Highcharts = require('highcharts');


@NgModule({
  imports: [
    CommonModule,
    // ChartModule.forRoot(
    //   Highcharts,
    //   require('highcharts/modules/exporting'),
    //   //require('highcharts/highmaps')
    // )
  ],
  declarations: [HighchartMapComponent],
  exports:[HighchartMapComponent]
})
export class HighchartMapModule { }
