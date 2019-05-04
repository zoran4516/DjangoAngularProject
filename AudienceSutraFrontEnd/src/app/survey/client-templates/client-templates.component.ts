/*
 * Client side templates questionare where client take a survey to determine the target audience
 * Currently we use Brand, Communication, Product, Competition and last one Custom
 *
 * Main idea behind this:
 * 1. Have one JSON already created inside client-questions.ts based on there template name
 * 2. Once client enters the given URL /client/1/templates/<template-name> he will see that partiular questions
 *
 * How to show questions:
 * 1. We need to show one question at a time with back button feature so have one empty array
 * 2. With empty array push 1 question at a time to new array and let new array be visible to your page
 * 3. With each update new questions will be visible and as soon as we click next then it will validate
 * 4. Validations is done on 2 types:
 *    a. Whether the given question is answered or not, if not then disable next button
 *    b. Before showing the next question, cross check whether that question has dependent question feature
 *    c. If dependent question satisfies then show else move ahead with next question
 * 5. If no more question left, then change status of complete to true, and let user submit it
 *
 * How to go previous:
 * 1. With next question, we will disable previous questions. So we simply need to take care of one variable called
 * tempCount which tells what question number is active.
 *
 */

import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Http} from "@angular/http";
import {ActivatedRoute, Params} from "@angular/router";
import {templates} from "./client-questions";

@Component({
  selector: 'app-client-templates',
  templateUrl: './client-templates.component.html',
  styleUrls: ['./client-templates.component.css']
})
export class ClientTemplatesComponent implements OnInit {

  initialSurvey: any;
  questions: any;
  userId: number;
  questionCount = -1;   // How many questions we reached
  tempCount = -1;       // Active question at that time
  questionArray = [];   // Questions visible on Screen
  complete = false;     // Whether the survey is completed or not
  template = '';        // Which template used in URL

  constructor(private fb: FormBuilder, private http: Http, private route: ActivatedRoute) {
    this.userId = this.route.snapshot.params['id'];
    this.route.params.subscribe((params: Params) => {
      this.userId = params['id'];
      this.template = params['template'];
    });
  }

  ngOnInit() {
    console.log('Yes');
    if (this.template == 'brand') {
      this.questions = templates.brand;
    } else if(this.template == 'communication') {
      this.questions = templates.communication;
    } else if (this.template == 'product') {
      this.questions = templates.product;
    } else if (this.template == 'competition') {
      this.questions = templates.competition;
    } else if (this.template == 'custom') {
      this.questions = templates.custom;
    }
    this.initialSurvey = this.generateForms(this.questions);
  }

  generateForms(data) {

    // ** NOT IN USE **

    // this.initialSurvey = this.fb.group({
    //   'age': this.fb.array([]),
    //   'gender': this.fb.array([]),
    //   'nccs': this.fb.array([]),
    //   'details': [''],
    //   'report': [''],
    //   'reportBrand': [''],
    //   'reportAssociated': [''],
    //   'reportCategory': [''],
    //   'reportNewCategory': [''],
    //   'reportNew': [''],
    //   'reportNew2': [''],
    //   'reportConcerns': this.fb.array([]),
    // });

    // ** NOT IN USE **

    const temp = {};
    for (let i = 0; i < data.length; i++) {
      if (data[i].type == 'checkbox') {
        temp[data[i].key] = this.fb.array([]);
      } else {
        temp[data[i].key] = [''];
      }
    }

    return this.fb.group(temp);
  }

  pushChanges(id, value) {
    let count = 0;
    for (let i = 0; i < this.questions.length; i++) {
      if (id === this.questions[i].id) {
        count = i;
        break;
      }
    }

    console.log(this.questions[count]);
    this.questions[count].subQuestions = [];

    for (let i = 0; i < value; i++) {
      let st: string = this.questions[count].subText + (i + 1);
      let control = new FormControl('');
      console.log(this.initialSurvey.controls[this.questions[count].subKey]);
      this.initialSurvey.controls[this.questions[count].subKey].addControl(st, control);
      this.questions[count].subQuestions.push({
        'id': i + 1,
        'text': this.questions[count].subText + ' ' + (i + 1),
        'key': this.questions[count].subText + (i + 1),
        'choices': this.questions[count].subChoices,
      });
    }
  }

  pushChanges2(id, value) {
    let count = 0;
    for (let i = 0; i < this.questions.length; i++) {
      if (id === this.questions[i].id) {
        count = i;
        break;
      }
    }

    for (let i = 0; i < value; i++) {
      let st: string = this.questions[count].subText1 + (i + 1);
      let wt: string = this.questions[count].subText2 + (i + 1);
      let control = new FormControl('');
      let group = new FormGroup({});
      group.addControl(st, control);
      group.addControl(wt, control);
      this.initialSurvey.controls[this.questions[count].subKey].addControl(st, control);
      this.initialSurvey.controls[this.questions[count].subKey].addControl(wt, control);
      this.questions[count].subQuestions.push({
        'id': i + 1,
        'text1': this.questions[count].subText1 + ' ' + (i + 1),
        'key1': this.questions[count].subText1 + (i + 1),
        'text2': this.questions[count].subText2 + ' ' + (i + 1),
        'key2': this.questions[count].subText2 + (i + 1),
        'choices1': this.questions[count].subChoices1,
        'choices2': this.questions[count].subChoices2,
      });
    }
    console.log(this.initialSurvey);
    console.log(this.questions[count]);
  }

  // On next question increase the question count and push new question to question Array
  // Note: tempCount is used to denote active question in the given survey
  //       questionCount shows how many question user has entered or went to till now
  nextQuestion() {
    if ((this.tempCount + 1) < this.questionArray.length) {
      this.tempCount += 1;
      setTimeout(() => {
        let elem:Element = document.getElementById("question-" + (this.tempCount));
        if (elem) {
          elem.scrollIntoView({behavior: 'smooth'});
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
    } else {
      let nextQuestion = this.questions[this.questionCount];

      while (nextQuestion.dependent !== undefined) {
        if (nextQuestion.dependentValue.indexOf(this.initialSurvey.controls[nextQuestion.dependent].value) !== -1) {
          break;
        } else {
          this.questionCount += 1;
          nextQuestion = this.questions[this.questionCount];
        }
      }
      this.questionArray.push(nextQuestion);
    }

      setTimeout(() => {
        let elem:Element = document.getElementById("question-" + (this.tempCount));
        if (elem) {
          elem.scrollIntoView({behavior: 'smooth'});
          let inputElem = document.getElementById("input-" + (this.tempCount));
          if (inputElem) {
            inputElem.focus();
          }
        }
      }, 100);
  }

  // Check whether we need to go to the next question or not, it will be true only if any option or text is entered
  checkValidity() {


    // ** NOT IN USE **
    // if (this.initialSurvey.controls[this.questions[this.tempCount].key].value == '') {
    //   return true;
    // } else {
    //   if (this.questionArray[this.tempCount].type === 'checkbox') {
    //     for (let i = 0; i < this.initialSurvey.controls[this.questions[this.tempCount].key].controls.length; i++) {
    //       if (this.initialSurvey.controls[this.questions[this.tempCount].key].controls[i].value === '') {
    //         return true;
    //       }
    //     }
    //   }
    // }
    // return false;
    // ** NOT IN USE **

    // Double equality is important for string and array empty condition
      return this.initialSurvey.controls[this.questionArray[this.tempCount].key].value == '';
  }

  submit() {
    if (this.template === 'brand') {
      console.log(this.initialSurvey.value);
      //need to change
      this.http.post('/api/survey_template_brand/',
        {'creator': this.userId,
          'age': this.initialSurvey.value.age.join(),
          'gender': this.initialSurvey.value.gender.join(),
          'nccs': this.initialSurvey.value.nccs.join(),
          'details': this.initialSurvey.value.details,
          'report': this.initialSurvey.value.report,
          'brand': this.initialSurvey.value.reportBrand,
          'associated': this.initialSurvey.value.reportAssociated,
          'category': this.initialSurvey.value.reportCategory,
          'newcategory': this.initialSurvey.value.reportNewCategory,
          'new': this.initialSurvey.value.reportNew,
          'new2': this.initialSurvey.value.reportNew2,
          'concerns': this.initialSurvey.value.reportConcerns.join(),
        }).subscribe(
        (response) => {
          console.log('\nResponse is: ' + response.json().id);
        },
        (error) => console.log(error)
      );
    } else if (this.template === 'communication') {
      //need to change
      this.http.post('/api/survey_template_communication/',
        {'creator': this.userId,
          'age': this.initialSurvey.value.age.join(),
          'gender': this.initialSurvey.value.gender.join(),
          'nccs': this.initialSurvey.value.nccs.join(),
          'details': this.initialSurvey.value.details,
          'report': this.initialSurvey.value.report,
          'c6': this.initialSurvey.value.c6,
          'c7': this.initialSurvey.value.c7,
          'c8': this.initialSurvey.value.c8,
          'c9': this.initialSurvey.value.c9,
          'c10': this.initialSurvey.value.c10,
          'c11': this.initialSurvey.value.c11.join(),
        }).subscribe(
        (response) => {
          console.log('\nResponse is: ' + response.json().id);
        },
        (error) => console.log(error)
      );
    } else if (this.template === 'product') {
      //need to change
      this.http.post('/api/survey_template_product/',
        {'creator': this.userId,
          'age': this.initialSurvey.value.age.join(),
          'gender': this.initialSurvey.value.gender.join(),
          'nccs': this.initialSurvey.value.nccs.join(),
          'details': this.initialSurvey.value.details,
          'report': this.initialSurvey.value.report,
          'c6': this.initialSurvey.value.c6,
          'c7': this.initialSurvey.value.c7,
          'c8': this.initialSurvey.value.c8,
          'c9': this.initialSurvey.value.c9,
          'c10': this.initialSurvey.value.c10,
        }).subscribe(
        (response) => {
          console.log('\nResponse is: ' + response.json().id);
        },
        (error) => console.log(error)
      );
    } else if (this.template === 'competition') {
      //need to change
      this.http.post('/api/survey_template_competition/',
        {'creator': this.userId,
          'age': this.initialSurvey.value.age.join(),
          'gender': this.initialSurvey.value.gender.join(),
          'nccs': this.initialSurvey.value.nccs.join(),
          'details': this.initialSurvey.value.details,
          'report': this.initialSurvey.value.report,
          'c6': this.initialSurvey.value.c6,
          'c7': this.initialSurvey.value.c7,
          'c8': this.initialSurvey.value.c8,
          'c9': this.initialSurvey.value.c9.join(),
          'c10': this.initialSurvey.value.c10,
        }).subscribe(
        (response) => {
          console.log('\nResponse is: ' + response.json().id);
        },
        (error) => console.log(error)
      );
    } else if (this.template === 'custom') {
      //need to change
      this.http.post('/api/survey_template_custom/',
        {'creator': this.userId,
          'age': this.initialSurvey.value.age.join(),
          'gender': this.initialSurvey.value.gender.join(),
          'nccs': this.initialSurvey.value.nccs.join(),
          'details': this.initialSurvey.value.details,
        }).subscribe(
        (response) => {
          console.log('\nResponse is: ' + response.json().id);
        },
        (error) => console.log(error)
      );
    }
  }

  previousQuestion() {
    this.tempCount -= 1;
    this.complete = false;
    setTimeout(() => {
      let elem:Element = document.getElementById("question-" + (this.tempCount));
      elem.scrollIntoView({ behavior: 'smooth'});
    }, 100);
  }

  checkbox(val, key) {
    const arrayControl: any = this.initialSurvey.get(key) as FormArray;
    let found = -1;

    for (let i = 0; i < arrayControl.controls.length; i++) {
      console.log(i, arrayControl.controls[i], arrayControl.controls[i].value)
      if (arrayControl.controls[i].value == val) {
        found = i;
        break
      }
    }

    if (found == -1) {
      arrayControl.push(new FormControl(val));
    } else {
      arrayControl.removeAt(found);
    }
  }

}
