import { Component, OnInit } from '@angular/core';
import { Http } from "@angular/http";
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { IntroService } from '../../../services/intro/intro.service';
import * as $ from 'jquery';
import { Title } from '@angular/platform-browser';
import { Location } from '@angular/common';

// declare var toastr;

@Component({
  selector: 'app-client-home',
  templateUrl: './client-home.component.html',
  styleUrls: ['./client-home.component.scss', './client-home.component.css']
})
export class ClientHomeComponent implements OnInit {
  userId: number = 0;
  tabValue: any = '';
  message = '';
  constructor(private http: Http, private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private introService: IntroService,
    private router: Router,
    private location: Location,
    private titleService: Title) {
    // this.userId = this.route.snapshot.params['id'];
    if (this.route.snapshot.params['flag'])
      this.tabValue = this.route.snapshot.params['flag'];
  }

  draftSurveys: any = [];
  approvalSurveys: any = [];
  paymentSurveys: any = [];
  activeSurveys: any = [];
  inActiveSurveys: any = [];
  public surveyForm: FormGroup = null;
  changeStatus: string = "";

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
    this.titleService.setTitle('AudienceSutra Client Profile');
    // comment code from hear...

    // Get the element with id="defaultOpen" and click on it
    if (this.tabValue == '' || this.tabValue == 'Draft')
      document.getElementById("draftOpen").click();
    else if (this.tabValue == 'Pending Approval')
      document.getElementById("approvalOpen").click();
    // else if(this.tabValue == '' || this.tabValue == 'Draft')
    //   document.getElementById("draftOpen").click();

    // toastr.info('Are you the 6 fingered man?')

    // comment code till hear...

    this.createFormObject();
    //need to change
    this.http.get('/survey/api/client_survey/' + this.userId + '/').subscribe(response => {
      // this.surveys = response.json();
      // console.log(response.json())

      for (var i = 0; i < response.json().length; i++) {
        if (response.json()[i].status == "Draft") {
          this.draftSurveys.push(response.json()[i]);
        }
        else if (response.json()[i].status == "Pending Approval") {
          this.approvalSurveys.push(response.json()[i]);
        }
        else if (response.json()[i].status == "Approved") {
          this.paymentSurveys.push(response.json()[i]);
        }
        else if (response.json()[i].status == "Active") {
          this.activeSurveys.push(response.json()[i]);
        }
        else if (response.json()[i].status == "Inactive") {
          this.inActiveSurveys.push(response.json()[i]);
        }
      }

      // console.log(this.surveys);
    }, error => {
      console.log(error)
    });

    // uncomment code from hear...

    // $('.empty-survey-list').hide();
    // $('.content-survey-list').hide();
    // $('.draft-survey-list').hide()
    // $('.pending-approval-survey-list').hide()
    // $('.pending-payment-survey-list').hide()
    // $('.active-survey-list').hide()
    // $('.past-survey-list').hide()
    // $('.button-text-create, .create-new-survey').click(function () {
    //   $('.content').addClass('fadeOut')
    //   setTimeout(function () {
    //     $('.content').hide()
    //   }, 200)
    //   $('.content-survey-list').show()
    // })

    // $('.home-floating-icons').click(function () {
    //   $(this).parent().hide()
    //   $('.content').removeClass('fadeOut')
    //   $('.content').css('display', 'block')
    // })

    // uncomment code till hear...

    // now not in use
    // $(function () {
    //   $(document).tooltip({
    //     position: {
    //       my: "center bottom-20",
    //       at: "center top",
    //       using: function (position, feedback) {
    //         $(this).css(position);
    //         $("<div>")
    //           .addClass("arrow")
    //           .addClass(feedback.vertical)
    //           .addClass(feedback.horizontal)
    //           .appendTo(this);
    //       }
    //     }
    //   });
    // });

    // $('.contact').hide();
    // $(function () {
    //   $('.edit').hover(function () {
    //     $('.contact').show();
    //     $(this).show();
    //     $("<div>")
    //       .addClass("arrow")
    //       .appendTo(this);
    //   }, function () {
    //     $('.contact').hide();
    //   });
    // });
  }

  getUrl(url) {
    if (url == null)
      return "";
    else
      return "url('" + url + "')";
  }

  draftClick() {
    $('.content').addClass('fadeOut')
    setTimeout(function () {
      $('.content').hide()
    }, 200)
    if (this.draftSurveys.length > 0)
      $('.draft-survey-list').show()
    else
      $('.empty-survey-list').show()
  }

  approvalClick() {
    $('.content').addClass('fadeOut')
    setTimeout(function () {
      $('.content').hide()
    }, 200)
    if (this.approvalSurveys.length > 0)
      $('.pending-approval-survey-list').show()
    else
      $('.empty-survey-list').show()
  }

  paymentClick() {
    $('.content').addClass('fadeOut')
    setTimeout(function () {
      $('.content').hide()
    }, 200)
    if (this.paymentSurveys.length > 0)
      $('.pending-payment-survey-list').show()
    else
      $('.empty-survey-list').show()
  }

  activeClick() {
    $('.content').addClass('fadeOut')
    setTimeout(function () {
      $('.content').hide()
    }, 200)
    if (this.activeSurveys.length > 0)
      $('.active-survey-list').show()
    else
      $('.empty-survey-list').show()
  }

  pastClick() {
    $('.content').addClass('fadeOut')
    setTimeout(function () {
      $('.content').hide()
    }, 200)
    if (this.inActiveSurveys.length > 0)
      $('.past-survey-list').show()
    else
      $('.empty-survey-list').show()
  }

  // ===========================

  createFormObject() {
    this.surveyForm = this.formBuilder.group({
      survey_img: '',
      survey: ''
    });
  }

  openFileBrowser(event: any, index: number, name: string) {
    event.preventDefault();
    let element: HTMLElement = document.getElementById('surveyPhotoId_' + name + index) as HTMLElement;
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
  toster() {
    // Get the snackbar DIV
    var x = document.getElementById("snackbar");
    // Add the "show" class to DIV
    x.className = "show";
    // After 3 seconds, remove the show class from DIV
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 2000);
  }
  paySurvey(survey_id){
    this.introService.paySurvey(survey_id).subscribe(res => {
      this.message = "Payment Done!";
      this.toster();

      setTimeout(() => {
        this.location.back();
      }, 1000);
    }, error => {
      // console.log(error);
    });
  }
  activeStatus(survey) {
    let formData = {};
    // if (survey.status == 'Draft')
    //   formData = { 'status': 'Active', 'id': survey.id, 'is_status': true }
    // else if (survey.status == 'Active')
    //   formData = { 'status': 'Inactive', 'id': survey.id, 'is_status': true }
    // else
    //   return false;

    formData = { 'status': 'Inactive', 'id': survey.id, 'is_status': true }

    this.introService.saveSurveyImage(formData).subscribe(res => {
      survey.status = res.status;
      var survey_index = this.activeSurveys.indexOf(survey);
      if (survey_index > -1) {
        this.activeSurveys.splice(survey_index, 1);
      }
      this.inActiveSurveys.push(survey);
    }, error => {
      // console.log(error);
    });
  }

  inactiveConfirmation(survey) {
    if (confirm("Are you sure to make Inactive this survey?")) {
      console.log("Implement delete functionality here");
      this.activeStatus(survey)
    }
  }
  custom(){
    this.router.navigate(['/client/estimate/custom']);
  }
  competition(){
    this.router.navigate(['/client/estimate/competition']);
  }
  brand(){
    this.router.navigate(['/client/estimate/brand']);
  }
  communication(){
    this.router.navigate(['/client/estimate/communication']);
  }
  product(){
    this.router.navigate(['/client/estimate/product']);
  }

}
