import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { ChartModule } from 'angular2-highcharts';
declare var require: any;

@NgModule({
  imports: [
    CommonModule,
    ChartModule.forRoot(
      require('highcharts'), 
      require('highcharts/modules/exporting')
      )
  ],
  declarations: [PieChartComponent],
  exports: [PieChartComponent]
})
export class PiechartModule { }
