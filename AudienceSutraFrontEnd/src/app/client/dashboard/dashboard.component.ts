import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Http } from "@angular/http";
import { FormGroup, FormBuilder } from '@angular/forms';
import { IntroService } from '../../services/intro/intro.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  userId: number = 0;
  constructor(private http: Http, private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private introService: IntroService) {
    // this.userId = this.route.snapshot.params['id'];
  }

  surveys: any;
  public homeForm: FormGroup = null;
  changeStatus: string = "";

  ngOnInit() {

    // toastr.info('Are you the 6 fingered man?')

    this.createFormObject();
    //need to change
    this.http.get('/survey/api/client_survey/' + this.userId + '/').subscribe(
      (response) => {
        this.surveys = response.json();
        // console.log(this.surveys);
      },
      (error) => console.log(error)
    );
  }

  createFormObject() {
    this.homeForm = this.formBuilder.group({
      survey_img: '',
      survey: ''
    });
  }

  openFileBrowser(event: any, index: number) {
    event.preventDefault();
    let element: HTMLElement = document.getElementById('surveyPhotoId_' + index) as HTMLElement;
    element.click();
  }

  private fileInstance = null;

  onFileChange(event: any, survey: any) {

    if (event.target.files && event.target.files.length > 0) {
      this.fileInstance = event.target.files[0];
      var reader = new FileReader();
      reader.onload = (event: any) => {
        survey.survey_img = event.target.result;

        this.submitForm(survey)
      }

      reader.readAsDataURL(event.target.files[0]);
    }
  }

  submitForm(survey) {
    let formData = new FormData();
    if (this.fileInstance)
      formData.append('survey_img', this.fileInstance);
    formData.append('survey', survey.id);
    this.introService.saveSurveyImage(formData).subscribe(res => {
      survey.survey_img = res.survey_img;
    }, error => {
      console.log(error);
    });
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
