import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http';

@Component({
  selector: 'app-survey-list-respondent',
  templateUrl: './survey-list-respondent.component.html',
  styleUrls: ['./survey-list-respondent.component.css']
})
export class SurveyListRespondentComponent implements OnInit {
  surveys: any;
  constructor(private http: Http) { }
  ngOnInit() {
    //need to change
    this.http.get('/api/client_survey/0/').subscribe(
      (response) => {
        this.surveys = response.json();
        // console.log(this.surveys);
      },
      (error) => console.log(error)
    );
  }
}
