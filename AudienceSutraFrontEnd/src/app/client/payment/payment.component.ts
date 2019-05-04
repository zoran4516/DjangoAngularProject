import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DomSanitizer,SafeUrl } from '@angular/platform-browser';
import { Pipe, PipeTransform} from '@angular/core';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
@Pipe({ name: 'safe' })
export class PaymentComponent implements OnInit {
  surveyId: number = 116;
  url = '';
  constructor(private route: ActivatedRoute,private router: Router,
    private sanitizer: DomSanitizer) { 
    this.surveyId = this.route.snapshot.params['surveyId']
    this.url = "/survey/api/pay/"+this.surveyId+"/"
    
  }

  ngOnInit() {
    $(document).ready(function () {
      $(".iframe-container").css("height", window.innerHeight - 120 + "px");
      window.onresize = function () {
        $(".iframe-container").css("height", window.innerHeight - 120 + "px");
      };
    });

  }
public getSantizeUrl(url : string) {
  debugger;
  if(!url) return null;
    return this.sanitizer.bypassSecurityTrustUrl(url);
}

}
