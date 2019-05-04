import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-list-responses',
  templateUrl: './list-responses.component.html',
  styleUrls: ['./list-responses.component.css']
})
export class ListResponsesComponent implements OnInit {
  surveyId: number;
  responses: any;
  constructor(private http: Http,
              private route: ActivatedRoute) {
    this.surveyId = this.route.snapshot.params['surveyId'];
    this.route.params.subscribe((params: Params) => {
      this.surveyId = params['surveyId'];
    });
  }
  ngOnInit() {
    //need to change
    this.http.get('/api/survey_responses/' + this.surveyId.toString() + '/').subscribe(
      (response) => {
        this.responses = response.json();
        console.log(this.responses);
      },
      (error) => console.log(error)
    );
  }
}
