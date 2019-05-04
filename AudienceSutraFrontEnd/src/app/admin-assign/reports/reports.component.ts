import { Component, OnInit } from '@angular/core';
import { IntroService } from '../../services/intro/intro.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  public survey_list = [];
  constructor(private introService: IntroService) { }

  ngOnInit() {
    this.get_assigned_surveys()
  }

  get_assigned_surveys() {
    this.introService.getAssignedSurveyReport().subscribe(res => {
      this.survey_list = res
    }, error => {
      console.log(error);
    });
  }

}
