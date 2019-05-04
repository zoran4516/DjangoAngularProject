import { Component, OnInit } from '@angular/core';
import { PieChartOptions } from '../PieChartData';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {
  options: Object;
  constructor() { 
    this.options = PieChartOptions;
  }

  ngOnInit() {
  }

}
