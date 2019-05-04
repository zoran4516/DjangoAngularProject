import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute, Params } from '@angular/router';
import { IntroService } from '../../services/intro/intro.service';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SurveyComponent implements OnInit {
  survey: any;
  surveyId: number;
  questions: any;
  constructor(private http: Http,
    private introService: IntroService,
    private route: ActivatedRoute) {
    this.survey = [];
    this.surveyId = this.route.snapshot.params['surveyId'];
    this.route.params.subscribe((params: Params) => {
      this.surveyId = params['surveyId'];
    });
  }
  ngOnInit() {

    this.getQuestion();

    // this.http.get('/survey/api/survey/' + this.surveyId.toString() + '/').subscribe(
    //   (response) => {
    //     this.survey = response.json()[0];
    //     // console.log(this.survey);
    //   },
    //   (error) => console.log(error)
    // );
    // this.http.get('/survey/api/survey_question/' + this.surveyId.toString() + '/').subscribe(
    //   (response) => {
    //     this.questions = response.json();
    //   },
    //   (error) => console.log(error)
    // );
  }

  getQuestion() {
    this.introService.getSurveyQuestion(this.surveyId).subscribe(res => {
      this.survey = res;
    }, error => {
      console.log(error);
    });
  }

}
