import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Http } from '@angular/http';
import { IntroService } from '../../services/intro/intro.service';

@Component({
  selector: 'app-active-survey-list',
  templateUrl: './active-survey-list.component.html',
  styleUrls: ['./active-survey-list.component.scss']
})
export class ActiveSurveyListComponent implements OnInit {

  surveys: any;
  userId: number = 0;
  constructor(private http: Http,
    private route: ActivatedRoute,
    private introService: IntroService) {
    // this.userId = this.route.snapshot.params['id'];
    // this.route.params.subscribe((params: Params) => {
    //   this.userId = params['id'];
    // });
  }
  ngOnInit() {
    this.http.get('/survey/api/client_active_survey/' + this.userId + '/').subscribe(
      (response) => {
        // debugger;
        this.surveys = response.json();
        // console.log(this.surveys);
      },
      (error) => console.log(error)
    );
  }

  activeStatus(survey) {
    let formData = {};
    if (survey.status == 'Draft')
      formData = { 'status': 'Active', 'id': survey.id, 'is_status': true }
    else if (survey.status == 'Active')
      formData = { 'status': 'Inactive', 'id': survey.id, 'is_status': true }
    else
      return false;

    this.introService.saveSurveyImage(formData).subscribe(res => {
      survey.status = res.status;
      // var survey_index = this.surveys.indexOf(survey);
      // if (survey_index > -1) {
      //   this.surveys.splice(survey_index, 1);
      // }
    }, error => {
      // console.log(error);
    });
  }

}
