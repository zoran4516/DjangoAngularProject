import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-my-details',
  templateUrl: './my-details.component.html',
  styleUrls: ['./my-details.component.scss']
})
export class MyDetailsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $(document).ready(function(){
      $(".iframe-container").css("height", window.innerHeight-120+"px");
      window.onresize=function(){
        $(".iframe-container").css("height", window.innerHeight-120+"px");
      };

    });
  }

}
