import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Http } from '@angular/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as $ from 'jquery';
import { IntroService } from '../../services/intro/intro.service';

@Component({
  selector: 'app-survey-quote',
  templateUrl: './survey-quote.component.html',
  styleUrls: ['./survey-quote.component.css', './survey-quote.component.scss']
})
export class SurveyQuoteComponent implements OnInit {

  initialSurvey: any;
  questions: any = [];
  userId: number = 0;
  questionCount = -1;
  tempCount = -1;       // Active question at that time
  questionArray = [];
  complete = false;
  type = '';
  costOfSurvey = 0;
  head = 0;
  ageCount = 0;
  editFlag: boolean = false;
  textCost = 'Amount';
  finalCostFlag = false;
  constructor(private fb: FormBuilder,
    private http: Http,
    private route: ActivatedRoute,
    private introService: IntroService,
    private router: Router) {
    this.type = (this.route.snapshot.params['type'])
    if (this.route.snapshot.params['head'])
      this.head = this.route.snapshot.params['head'];
  }

  ngOnInit() {
    this.introService.getSurveyQuote(this.head).subscribe(res => {
      //debugger
      this.costOfSurvey = res.totalCost;
      res = res["data"];
      this.questions = res;
      this.editFlag = true;
      if (this.head != 0) {
        // console.log(this.questionArray)
        this.questionArray = res;
        this.questionCount = res.length;
        for (let i = 0; i < res.length; i++) {
          // debugger
          var ans = "";
          if (res[i].options_type == 'Single Line Text') {
            this.questionArray[i].answer = res[i].choices
          }
          else {
            let ageTemp = 0;
            for (let j = 0; j < this.questionArray[i].choices.length; j++) {

              if (this.questionArray[i].choices[j].selected == true)
                if (this.questionArray[i].options_type == 'Multiple Choice') {
                  if (ans != "") {
                    ans = ans + '@@@' + this.questionArray[i].choices[j].option_detail;
                    ageTemp += 1;
                  }
                  else {
                    ans = this.questionArray[i].choices[j].option_detail;
                    ageTemp += 1;
                  }
                  this.questionArray[i].answer = ans;
                  this.ageCount += 1
                  if(ageTemp == 1)
                    this.ageCost = 500
                  else if(ageTemp == 2)
                    this.ageCost = 300
                  else if(ageTemp == 3)
                  this.ageCost = 250
                  else if(ageTemp == 4)
                    this.ageCost = 200
                  else if(ageTemp == 5)
                  this.ageCost = 150
                  else if(ageTemp == 6)
                    this.ageCost = 100
                  else if(ageTemp == 7)
                    this.ageCost = 75
                  else
                    this.ageCost = 50
                }
                else
                  this.questionArray[i].answer = this.questionArray[i].choices[j].option_detail;
            }
          }
          // console.log(this.questionArray)
        }
        this.tempCount = res.length;
        this.checkValidity();
        //console.log(this.questionArray)
      }
      else
        this.questions = res;
    }, error => {
      console.log(error);
    });

  }
  nextQuestion(start) {
    if (!start && this.questionArray.length > 0) {
      // if(this.tempCount == 0){
      //   this.costOfSurvey = parseFloat(this.questions[0].answer)
      // }
      if (this.questionArray[this.tempCount]["is_required"] == true && this.questionArray[this.tempCount]["answer"] == undefined || this.questionArray[this.tempCount]["answer"] == '') {
        return;
      }
      else {
        for (let i = 0; i < this.questionArray[this.tempCount].choices.length; i++) {
          let ans = this.questionArray[this.tempCount].answer;
          let choice = this.questionArray[this.tempCount].choices[i].option_detail;
          if (ans == choice) {
            this.costOfSurvey = this.costOfSurvey + (this.questionArray[this.tempCount].choices[i].estimated_value * parseFloat(this.questions[0].answer))
          }

        }
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
      this.finalCostFlag = true;
      // this.costOfSurvey = this.costOfSurvey  * parseFloat(this.questions[0].answer)
      this.textCost = 'TotalCost';

    } else {
      let nextQuestion = this.questions[this.questionCount];

      // while (nextQuestion.dependent !== undefined) {
      //   if (nextQuestion.dependentValue.indexOf(this.initialSurvey.controls[nextQuestion.dependent].value) !== -1) {
      //     break;
      //   } else {
      //     this.questionCount += 1;
      //     nextQuestion = this.questions[this.questionCount];
      //   }
      // }
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
    if (this.finalCostFlag) {
      //this.costOfSurvey = this.costOfSurvey  / this.questions[0].answer
      this.finalCostFlag = false;
      this.textCost = 'Amount';
    }

    for (let i = 0; i < this.questionArray[this.tempCount].choices.length; i++) {
      let ans = this.questionArray[this.tempCount].answer;
      let choice = this.questionArray[this.tempCount].choices[i].option_detail;
      if (ans == choice) {
        this.costOfSurvey = this.costOfSurvey - (this.questionArray[this.tempCount].choices[i].estimated_value * parseFloat(this.questions[0].answer))

      }

    }
    this.complete = false;
    setTimeout(() => {
      let elem: Element = document.getElementById("question-" + (this.tempCount));
      elem.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }

  submit() {
    //let finalCost = this.costOfSurvey  * this.questions[0].answer
    this.questions[0]['cost'] = this.costOfSurvey
    this.introService.getSurveyCost(this.questions).subscribe(res => {
      if (this.head == 0) {
        this.router.navigate(['/client/createSurvey/' + this.type + '/' + this.costOfSurvey + '/' + res.head]);
      }
      else {
        this.router.navigate(['/client/updateSurvey/update/' + this.costOfSurvey + '/' + this.head]);
      }
      //this.router.navigate(['/client/createSurvey/' + this.type + '/' + finalCost + '/' + res.head]);
    })

    // // $(".set-account-modal").show();
    // this.introService.getSurveyCost(this.questions).subscribe(res => {
    //   // $(".set-account-modal").hide();
    //   if (confirm("Cost of survey will be "+ '₹' + res.cost + ", want to create survey?")) {
    //     this.router.navigate(['/client/createSurvey/'+ this.type + '/' + res.cost]);        
    //   }
    //   else{
    //     this.router.navigate(['/client/profile']);
    //   }

    // }, error => {
    //   // $(".set-account-modal").hide();
    //   console.log(error);
    // });

  }

  // ..........................
  ageCost = 0;
  updateCheckbox(event, choice) {
    if (this.questionArray[this.tempCount]["answer"] == undefined)
      this.questionArray[this.tempCount]["answer"] = "";
    if (event.target.checked) {
      this.ageCount += 1;
      if (this.ageCount == 1) {
        this.costOfSurvey = this.costOfSurvey - this.ageCost + 500;
        this.ageCost = 500;
      }
      else if (this.ageCount == 2) {
        this.costOfSurvey = (this.costOfSurvey / this.questions[0].answer) - this.ageCost + 300;
        this.ageCost = 300;
      }
      else if (this.ageCount == 3) {
        this.costOfSurvey = (this.costOfSurvey / this.questions[0].answer) - this.ageCost + 250;
        this.ageCost = 250;
      }
      else if (this.ageCount == 4) {
        this.costOfSurvey = (this.costOfSurvey / this.questions[0].answer) - this.ageCost + 200;
        this.ageCost = 200;
      }
      else if (this.ageCount == 5) {
        this.costOfSurvey = (this.costOfSurvey / this.questions[0].answer) - this.ageCost + 150;
        this.ageCost = 150;
      }
      else if (this.ageCount == 6) {
        this.costOfSurvey = (this.costOfSurvey / this.questions[0].answer) - this.ageCost + 100;
        this.ageCost = 100;
      }
      else if (this.ageCount == 7) {
        this.costOfSurvey = (this.costOfSurvey / this.questions[0].answer) - this.ageCost + 75;
        this.ageCost = 75;
      }
      else if (this.ageCount == 8) {
        this.costOfSurvey = (this.costOfSurvey / this.questions[0].answer) - this.ageCost + 50;
        this.ageCost = 50;
      }
      else if (this.ageCount == 9) {
        this.costOfSurvey = (this.costOfSurvey / this.questions[0].answer) - this.ageCost + 50;
        this.ageCost = 50;
      }
      else {
        this.costOfSurvey = (this.costOfSurvey / this.questions[0].answer) - this.ageCost;
        this.ageCost = 0;
      }
      this.costOfSurvey = this.costOfSurvey * this.questions[0].answer
      if (this.questionArray[this.tempCount].answer == "")
        this.questionArray[this.tempCount].answer = choice.option_detail;
      else {
        this.questionArray[this.tempCount].answer = this.questionArray[this.tempCount].answer + '@@@' + choice.option_detail;
      }
    }
    else {
      if (this.questionArray[this.tempCount].answer != "") {
        var choices;
        if (this.ageCount > 1) {
          choices = this.questionArray[this.tempCount].answer.split("@@@");
        }
        else {
          choices = this.questionArray[this.tempCount].answer;
        }
        var index = choices.indexOf(choice.option_detail);
        if (index > -1) {
          this.costOfSurvey = this.costOfSurvey / this.questions[0].answer;
          this.ageCount -= 1;
          if (this.ageCount == 1) {
            this.costOfSurvey = this.costOfSurvey - this.ageCost + 500;
            this.ageCost = 500;
          }
          else if (this.ageCount == 2) {
            this.costOfSurvey = this.costOfSurvey - this.ageCost + 300;
            this.ageCost = 300;
          }
          else if (this.ageCount == 3) {
            this.costOfSurvey = this.costOfSurvey - this.ageCost + 250;
            this.ageCost = 250;
          }
          else if (this.ageCount == 4) {
            this.costOfSurvey = this.costOfSurvey - this.ageCost + 200;
            this.ageCost = 200;
          }
          else if (this.ageCount == 5) {
            this.costOfSurvey = this.costOfSurvey - this.ageCost + 150;
            this.ageCost = 150;
          }
          else if (this.ageCount == 6) {
            this.costOfSurvey = this.costOfSurvey - this.ageCost + 100;
            this.ageCost = 100;
          }
          else if (this.ageCount == 7) {
            this.costOfSurvey = this.costOfSurvey - this.ageCost + 75;
            this.ageCost = 75;
          }
          else if (this.ageCount == 8) {
            this.costOfSurvey = this.costOfSurvey - this.ageCost + 50;
            this.ageCost = 50;
          }
          else if (this.ageCount == 9) {
            this.costOfSurvey = this.costOfSurvey - this.ageCost + 50;
            this.ageCost = 50;
          }
          else {
            this.costOfSurvey = this.costOfSurvey - this.ageCost;
            this.ageCost = 0;
          }
          this.costOfSurvey = this.costOfSurvey * this.questions[0].answer;
          choices.splice(index, 1);
          
          // choices.join('@@@');
          if (choices != "" && choices.length > 1)
            choices = choices.join('@@@');
          this.questionArray[this.tempCount].answer = choices;
        }
      }
    }

  }


}
