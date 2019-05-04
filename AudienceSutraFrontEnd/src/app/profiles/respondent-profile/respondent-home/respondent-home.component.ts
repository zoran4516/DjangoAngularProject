import { Component, OnInit } from '@angular/core';
import { Http } from "@angular/http";
import { IntroService } from '../../../services/intro/intro.service';

@Component({
  selector: 'app-respondent-home',
  templateUrl: './respondent-home.component.html',
  styleUrls: ['./respondent-home.component.scss']
})
export class RespondentHomeComponent implements OnInit {

  userId: number = 0;
  surveys: any;
  profile_survey: any;
  constructor(private http: Http,
    private introService: IntroService) { }

  ngOnInit() {
    this.getActiveSurvey();
  }

  getActiveSurvey() {
    //need to change
    this.http.get('/survey/api/respondent_active_survey/' + this.userId + '/').subscribe(response => {
      this.surveys = response.json()['active_survey'];
      this.profile_survey = response.json()['profile_survey'];
    }, error => {
      console.log(error);
    });
  }

}
