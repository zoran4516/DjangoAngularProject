import { Component, OnInit } from '@angular/core';
import { Http } from "@angular/http";

@Component({
  selector: 'app-respondent',
  templateUrl: './respondent.component.html',
  styleUrls: ['./respondent.component.scss']
})
export class RespondentComponent implements OnInit {
  panelOpenState = false;
  clients: any;

  constructor(private http: Http) { }

  ngOnInit() {
    this.http.get('/survey/api/client/survey/').subscribe(res => {
      this.clients = res.json();
      // console.log(this.clients);
    }, error => {
      console.log(error);
    });
  }

}
