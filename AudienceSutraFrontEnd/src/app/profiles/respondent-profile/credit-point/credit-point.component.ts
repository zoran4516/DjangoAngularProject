import { Component, OnInit } from '@angular/core';
import { Http } from "@angular/http";

@Component({
  selector: 'app-credit-point',
  templateUrl: './credit-point.component.html',
  styleUrls: ['./credit-point.component.scss']
})
export class CreditPointComponent implements OnInit {

  respondent: any;

  constructor(private http: Http) { }

  ngOnInit() {
    this.http.get('/survey/api/respondent/credit/').subscribe(res => {
      this.respondent = res.json();
    });
  }

}
