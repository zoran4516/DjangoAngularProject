import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-survey-list',
  templateUrl: './survey-list-client.component.html',
  styleUrls: ['./survey-list-client.component.css']
})
export class SurveyListClientComponent implements OnInit {
  surveys: any;
  userId: number;
  constructor(private http: Http, private route: ActivatedRoute) {
    this.userId = this.route.snapshot.params['id'];
    this.route.params.subscribe((params: Params) => {
      this.userId = params['id'];
    });
  }
  ngOnInit() {
    //need to change
    this.http.get('/api/client_survey/' + this.userId + '/').subscribe(
      (response) => {
        this.surveys = response.json();
        console.log(this.surveys);
      },
      (error) => console.log(error)
    );
  }

}
