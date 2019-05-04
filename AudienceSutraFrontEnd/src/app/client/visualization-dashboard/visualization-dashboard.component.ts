import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-visualization-dashboard',
  templateUrl: './visualization-dashboard.component.html',
  styleUrls: ['./visualization-dashboard.component.scss']
})

export class VisualizationDashboardComponent implements OnInit {


  constructor() { }

  ngOnInit() {
    $(document).ready(function () {
      $(".iframe-container").css("height", window.innerHeight - 120 + "px");
      window.onresize = function () {
        $(".iframe-container").css("height", window.innerHeight - 120 + "px");
      };

    });
  }

}


