import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Http } from "@angular/http";
import { FormGroup, FormBuilder } from '@angular/forms';
import { IntroService } from '../../services/intro/intro.service';

@Component({
  selector: 'app-survey-list',
  templateUrl: './survey-list.component.html',
  styleUrls: ['./survey-list.component.scss']
})
export class SurveyListComponent implements OnInit {

  userId: number = 0;
  constructor(private http: Http, private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private introService: IntroService) {
    // this.userId = this.route.snapshot.params['id'];
    if(this.route.snapshot.params['flag'])
      this.tabValue = this.route.snapshot.params['flag'];
  }

  approvalSurveys: any = [];
  paymentSurveys: any = [];
  activeSurveys: any = [];
  public homeForm: FormGroup = null;
  changeStatus: string = "";
  tabValue:any = '';
  openPage(pageName, elmnt, color) {

    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].style.backgroundColor = "";
    }
    document.getElementById(pageName).style.display = "block";
    elmnt.style.backgroundColor = color;

  }
  ngOnInit() {
    // Get the element with id="defaultOpen" and click on it
    if(this.tabValue == '' )
      document.getElementById("defaultOpen").click();
    else if( this.tabValue == 'Pending Approval')
      document.getElementById("approvalOpen").click();
    else if( this.tabValue == 'Pending Payment')
    document.getElementById("paymentOpen").click();
    else if( this.tabValue == 'Past')
    document.getElementById("past").click();

    this.createFormObject();
    //need to change
    this.http.get('/survey/api/client_survey/' + this.userId + '/').subscribe(
      (response) => {
        //this.surveys = response.json();
        // console.log(this.surveys);
        for (var i = 0; i < response.json().length; i++) {
          if (response.json()[i].status == "Draft") {
            continue;
          }
          else if (response.json()[i].status == "Pending Approval") {
            this.approvalSurveys.push(response.json()[i]);
          }
          else if (response.json()[i].status == "Approved") {
            this.paymentSurveys.push(response.json()[i]);
          }
          else if (response.json()[i].status == "Active" || response.json()[i].status == "Paid") {
            this.activeSurveys.push(response.json()[i]);
            
          }
        }
        
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

  activeStatus(survey,status) {
    let formData = {};
    // if (survey.status == 'Draft')
    //   formData = { 'status': 'Active', 'id': survey.id, 'is_status': true }
    // else if (survey.status == 'Active')
    //   formData = { 'status': 'Inactive', 'id': survey.id, 'is_status': true }
    // else
    //   return false;

    formData = { 'status': status, 'id': survey.id, 'is_status': true }

    this.introService.saveSurveyImage(formData).subscribe(res => {
      survey.status = res.status;
      var survey_index = this.activeSurveys.indexOf(survey);
      if (survey_index > -1 && survey.status == 'Inactive') {
        this.activeSurveys.splice(survey_index, 1);
      }

    }, error => {
      // console.log(error);
    });
  }


  inactiveConfirmation(survey) {
    if (confirm("Are you sure to make Inactive this survey?")) {
      console.log("Implement delete functionality here");
      this.activeStatus(survey,'Inactive')
    }
  }
  activeConfirmation(survey) {
    if (confirm("Are you sure to make this survey live?")) {
      // console.log("Implement delete functionality here");
      this.activeStatus(survey,'Active')
    }
  }

}
