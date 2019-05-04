import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Http } from '@angular/http';
import { IntroService } from '../../services/intro/intro.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-active-survey',
  templateUrl: './active-survey.component.html',
  styleUrls: ['./active-survey.component.scss', './active-survey.component.css']
})
export class ActiveSurveyComponent implements OnInit {
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
    // this.http.get('/survey/api/client_active_survey/' + this.userId + '/').subscribe(
    //   (response) => {
    //     // debugger;
    //     this.surveys = response.json();
    //     // console.log(this.surveys);
    //   },
    //   (error) => console.log(error)
    // );

    $('.empty-survey-list').hide();
    $('.content-survey-list').hide();
    $('.draft-survey-list').hide()
    $('.pending-approval-survey-list').hide()
    $('.button-text-create, .create-new-survey').click(function () {
      $('.content').addClass('fadeOut')
      setTimeout(function () {
        $('.content').hide()
      }, 200)
      $('.content-survey-list').show()
    })

    $('.home-floating-icons').click(function () {
      $(this).parent().hide()
      $('.content').removeClass('fadeOut')
      $('.content').css('display', 'block')
    })

    $(function () {
      $(document).tooltip({
        position: {
          my: "center bottom-20",
          at: "center top",
          using: function (position, feedback) {
            $(this).css(position);
            $("<div>")
              .addClass("arrow")
              .addClass(feedback.vertical)
              .addClass(feedback.horizontal)
              .appendTo(this);
          }
        }
      });
    });

    $('.button-text-draft, .draft-survey').click(function () {
      $('.content').addClass('fadeOut')
      setTimeout(function () {
        $('.content').hide()
      }, 200)
      $('.draft-survey-list').show()
    })

    $('.button-text-pending-approval, .pending-approval').click(function () {
      $('.content').addClass('fadeOut')
      setTimeout(function () {
        $('.content').hide()
      }, 200)
      $('.pending-approval-survey-list').show()
    })

    $('.button-text-pending-payment, .pending-payment').click(function () {
      $('.content').addClass('fadeOut')
      setTimeout(function () {
        $('.content').hide()
      }, 200)
      $('.empty-survey-list').show()
    })

    $('.button-text-active-survey, .active-survey').click(function () {
      $('.content').addClass('fadeOut')
      setTimeout(function () {
        $('.content').hide()
      }, 200)
      $('.empty-survey-list').show()
    })

    $('.button-text-inactive-survey, .inactive-survey').click(function () {
      $('.content').addClass('fadeOut')
      setTimeout(function () {
        $('.content').hide()
      }, 200)
      $('.empty-survey-list').show()
    })
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
