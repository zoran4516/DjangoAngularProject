import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Http } from '@angular/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { IntroService } from '../../../services/intro/intro.service';

@Component({
  selector: 'app-respondent-survey',
  templateUrl: './respondent-survey.component.html',
  styleUrls: ['./respondent-survey.component.scss']
})
export class RespondentSurveyComponent implements OnInit {

  initialSurvey: any;
  questions: any = [];
  userId: number = 0;
  questionCount = -1;
  tempCount = -1;       // Active question at that time
  questionArray = [];
  complete = false;
  surveyId: number;
  survey: any;

  constructor(private fb: FormBuilder,
    private http: Http,
    private route: ActivatedRoute,
    private introService: IntroService,
    private router: Router) {
    this.surveyId = this.route.snapshot.params['surveyId'];
    this.route.params.subscribe((params: Params) => {
      this.surveyId = params['surveyId'];
    });
  }

  ngOnInit() {
    // this.introService.getQuestionDetail().subscribe(res => {
    //   this.questions = res;
    // }, error => {
    //   console.log(error);
    // });

    this.introService.getSurveyQuestion(this.surveyId).subscribe(res => {
      this.survey = res;
      this.questions = res.surveyQuestions;
    }, error => {
      console.log(error);
    });
  }

  nextQuestion(start) {
    if (!start && this.questionArray.length > 0) {
      if (this.questionArray[this.tempCount]["is_required"] == true && this.questionArray[this.tempCount]["answer"] == undefined || this.questionArray[this.tempCount]["answer"] == '') {
        return;
      }
    }
    if ((this.tempCount + 1) < this.questionArray.length) {
      this.tempCount += 1;
      setTimeout(() => {
        let elem: Element = document.getElementById("question-" + (this.tempCount));
        if (elem) {
          elem.scrollIntoView({ behavior: 'smooth' });
          let inputElem = document.getElementById("input-" + (this.tempCount));
          if (inputElem) {
            inputElem.focus();
          }
        }
      }, 100);
      return;
    }

    this.questionCount += 1;
    this.tempCount += 1;

    if (this.questions.length <= this.questionCount) {
      this.complete = true;
    }
    else {
      let nextQuestion = this.questions[this.questionCount];

      this.questionArray.push(nextQuestion);
    }

    setTimeout(() => {
      let elem: Element = document.getElementById("question-" + (this.tempCount));
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
        let inputElem = document.getElementById("input-" + (this.tempCount));
        if (inputElem) {
          inputElem.focus();
        }
      }
    }, 100);
  }

  // Check whether we need to go to the next question or not, it will be true only if any option or text is entered
  checkValidity() {
    return this.questions.length == this.tempCount;
  }

  previousQuestion() {
    this.tempCount -= 1;
    this.complete = false;
    setTimeout(() => {
      let elem: Element = document.getElementById("question-" + (this.tempCount));
      elem.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }

  submit() {
    this.introService.updateRespondentProfile(this.questions).subscribe(res => {
      this.router.navigate(['/respondent/profile']);
    }, error => {
      console.log(error);
    });
  }

}
