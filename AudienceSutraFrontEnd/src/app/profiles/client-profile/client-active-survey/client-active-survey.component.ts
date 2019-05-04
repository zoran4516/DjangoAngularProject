import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Http } from '@angular/http';
import { IntroService } from '../../../services/intro/intro.service';

@Component({
  selector: 'app-client-active-survey',
  templateUrl: './client-active-survey.component.html',
  styleUrls: ['./client-active-survey.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ClientActiveSurveyComponent implements OnInit {
  surveys: any;
  userId: number = 0;
  constructor(private http: Http,
    private introService: IntroService,
    private route: ActivatedRoute) {
    // this.userId = this.route.snapshot.params['id'];
    // this.route.params.subscribe((params: Params) => {
    //   this.userId = params['id'];
    // });
  }
  ngOnInit() {
    // this.http.get('/survey/api/client_survey/' + this.userId + '/').subscribe(
    //   (response) => {
    //     this.surveys = response.json();
    //     // console.log(this.surveys);
    //   },
    //   (error) => console.log(error)
    // );

    this.introService.getClientSurvey(this.userId).subscribe(res => {
      this.surveys = res;
    }, error => {
      console.log(error);
    });
  }
}

