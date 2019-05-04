import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute, Params } from '@angular/router';
import { IntroService } from '../../services/intro/intro.service';


@Component({
  selector: 'app-respondent-profile',
  templateUrl: './admin-respondent-profile.component.html',
  styleUrls: ['./admin-respondent-profile.component.scss']
})
export class AdminRespondentProfileComponent implements OnInit {
  profile: any;
  user_id: number;
  questions: any;
  constructor(private http: Http,
    private introService: IntroService,
    private route: ActivatedRoute) {
    this.profile = [];
    this.user_id = this.route.snapshot.params['user_id'];
    this.route.params.subscribe((params: Params) => {
      this.user_id = params['user_id'];
    });
  }
  ngOnInit() {

    this.getQuestion();

  
  }

  getQuestion() {
    this.http.get('/survey/api/client/search/profile/' + this.user_id + '/').subscribe(res => {
      this.profile = res.json();
    }, error => {
      console.log(error);
    });
    // this.introService.getSurveyQuestion(this.surveyId).subscribe(res => {
    //   this.survey = res;
    // }, error => {
    //   console.log(error);
    // });
  }

}
