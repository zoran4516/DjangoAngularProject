import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { c } from "@angular/core/src/render3";
import { IntroService } from '../../services/intro/intro.service';
import * as $ from 'jquery';

// Quick Random Scenario:
// User comes, clicks on back, he get's his preserved input, he selects another tab but previous tabs are
// Still there.


@Component({
  selector: 'app-respond-to-survey',
  templateUrl: './respond-to-survey.component.html',
  styleUrls: ['./respond-to-survey.component.css', './respond-to-survey.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RespondToSurveyComponent implements OnInit {
  userName: String;
  userDesi: String;
  img_src: String;
  message: string = "your Survey successfully! submited.";
  surveyFlag: boolean = false;
  statusFlag: boolean = false;
  surveyDetail: any = {};
  checkboxModel: any = '';
  question: any = '';
  count = -1;

  tabs: any;

  survey: any;
  randomText = '';
  surveyId: number;
  questions: any;
  surveyResponseJSON: any;
  responseId: number;
  userId: number = 0;
  totalQuestion: number;
  questionNumber = 0;
  main = true;
  tabNumber = -1;
  tabCount = -1;
  complete = false;
  countStore = 0;
  tabCountStack = [];
  tabNumberStack = [];
  tempRandomText = '';

  serialQuestions = {
    '0': [],
    '1': [],
    '2': [],
    '3': [],
    '4': [],
    '-1': [],
  };
  // previousQuestionStack = [];
  // answerStack = [];
  // oldRandomText= '';

  constructor(private http: Http,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private introService: IntroService) {
    this.survey = [];
    this.surveyId = this.route.snapshot.params['surveyId'];
    this.route.params.subscribe((params: Params) => {
      this.surveyId = params['surveyId'];
    });
    // this.userId = this.route.snapshot.params['id'];
    // this.route.params.subscribe((params: Params) => {
    //   this.userId = params['id'];
    // });
    this.surveyResponseJSON = [];
    // console.log(this.userId);
  }

  getDetails() {
    this.introService.getLogedInUserData().subscribe(res => {
      this.userName = res.name;
      this.userDesi = res.role;
    }, error => {
      console.log(error);
    });
  }

  getSurveyStatue() {
    this.http.get('/survey/api/response/survey/status/' + this.surveyId + '/').subscribe(res => {
      if (res.json()["msg"] == "complete") {
        this.surveyFlag = true;
        this.message = "you have already submit this survey!.";
        this.toster();
      }
    });
  }

  // Fetching survey questions from backend
  ngOnInit() {
    // debugger;
    this.getSurveyStatue();

    this.getDetails();

    this.http.get('/survey/api/survey/' + this.surveyId.toString() + '/').subscribe(
      (response) => {
        // debugger;
        this.surveyDetail = response.json()[0];
        this.survey = response.json()[0];
        // console.log(this.survey);
      },
      (error) => console.log(error)
    );
    this.http.get('/survey/api/get_all_survey_tabs/' + this.surveyId.toString() + '/').subscribe(
      (response) => {
        // debugger;
        this.tabs = response.json();
        // console.log(this.tabs);
      },
      (error) => console.log(error)
    );
    this.http.get('/survey/api/survey_question/' + this.surveyId.toString() + '/').subscribe(
      (response) => {
        // debugger;
        response.json().sort((a, b) => {
          if (a.id < b.id) return -1;
          else if (a.id > b.id) return 1;
          else return 0;
        });
        for (let i = 0; i < response.json().length; i++) {
          let id = response.json()[i].id;

          // let sqk = Object.keys(this.serialQuestions);
          let sqkTabs = response.json()[i].tabs;
          let sqkId = response.json()[i].id;
          // if (sqk.indexOf(sqkTabs) == -1) {
          //   this.serialQuestions[sqkTabs] = [sqkId]
          // }
          this.serialQuestions[sqkTabs].push(sqkId);

          // console.log(response.json());
          // console.log(this.serialQuestions);

          if (response.json()[i].type === 'short') {
            this.surveyResponseJSON.push({
              'question': id,
              'response': '',
              'body': '',
            });
          } else if (response.json()[i].type === 'para') {
            this.surveyResponseJSON.push({
              'question': id,
              'response': '',
              'body': '',
            });
          } else if (response.json()[i].type === 'integer') {
            this.surveyResponseJSON.push({
              'question': id,
              'response': '',
              'body': '',
            });
          } else if (response.json()[i].type === 'checkbox') {
            this.surveyResponseJSON.push({
              'question': id,
              'response': '',
              'body': '',
            });
          } else if (response.json()[i].type === 'radio') {
            this.surveyResponseJSON.push({
              'question': id,
              'response': '',
              'body': '',
            });
          } else if (response.json()[i].type === 'dropbox') {
            this.surveyResponseJSON.push({
              'question': id,
              'response': '',
              'body': '',
            });
          } else if (response.json()[i].type === 'date') {
            this.surveyResponseJSON.push({
              'question': id,
              'response': '',
              'body': '',
            });
          } else if (response.json()[i].type === 'time') {
            this.surveyResponseJSON.push({
              'question': id,
              'response': '',
              'body': '',
            });
          }
          // console.log(i);
        }
        this.surveyResponseJSON = this.surveyResponseJSON
        this.updateQuestionsJson(response.json());
        // console.log(this.questions);
        // console.log('finished');
        // console.log(this.surveyResponseJSON);
      },
      (error) => console.log(error)
    );
  }

  // On key change, update the short type question response
  updateShort(id, value) {
    for (let i = 0; i < this.surveyResponseJSON.length; i++) {
      if (this.surveyResponseJSON[i]['question'] === id) {
        this.surveyResponseJSON[i]['body'] = value;
        break;
      }
    }
  }

  // On key change, update the para type question response
  updatePara(id, value) {
    for (let i = 0; i < this.surveyResponseJSON.length; i++) {
      if (this.surveyResponseJSON[i]['question'] === id) {
        this.surveyResponseJSON[i]['body'] = value;
        break;
      }
    }
  }

  // On key change, update the number type question response
  updateNumber(id, value) {
    for (let i = 0; i < this.surveyResponseJSON.length; i++) {
      if (this.surveyResponseJSON[i]['question'] === id) {
        this.surveyResponseJSON[i]['body'] = value;
        break;
      }
    }
  }
  isChecked(choice, id) {
    let flag = false;
    let choices = [];
    for (let i = 0; i < this.surveyResponseJSON.length; i++) {
      if (this.surveyResponseJSON[i]['question'] === id) {
        choices = this.surveyResponseJSON[i]['body'].split('@@@');
        break;
      }
    }
    for (let j = 0; j < choices.length; j++) {
      if (choices[j] == choice) {
        flag = true;
        break;
      }
    }


    return flag;
  }

  // On key change, update the checkbox type question response
  updateCheckbox(id, value, j) {
    // console.log(value);
    let choices = '';
    for (let i = 0; i < this.surveyResponseJSON.length; i++) {
      if (this.main == true) {
        // if (this.questions[i]['question'] === id) {
        // if (this.surveyResponseJSON[i]['question'] === id) {
        if (this.questions[i]['id'] === id) {
          choices = this.questions[i]['choices'].split('@@@')[j];
          break;
        }
      } else {
        // console.log(this.tabNumber);
        // console.log(this.survey.tabs[this.tabNumber].questions);
        if (this.survey.tabs[this.tabNumber].questions[i].id === id) {
          choices = this.survey.tabs[this.tabNumber].questions[i]['choices'].split('@@@')[j];
          break;
        }
      }
    }
    if (value === true) {
      for (let i = 0; i < this.surveyResponseJSON.length; i++) {
        if (this.surveyResponseJSON[i]['question'] === id) {
          if (this.surveyResponseJSON[i]['body'] === '') {
            this.surveyResponseJSON[i]['body'] = this.surveyResponseJSON[i]['body'] + choices;
          } else {
            this.surveyResponseJSON[i]['body'] = this.surveyResponseJSON[i]['body'] + '@@@' + choices;
          }
          this.randomText = this.surveyResponseJSON[i]['body'];
          break;
        }
      }
    } else {
      for (let i = 0; i < this.surveyResponseJSON.length; i++) {
        if (this.surveyResponseJSON[i]['question'] === id) {
          if (this.surveyResponseJSON[i]['body'].length == 1) {
            this.surveyResponseJSON[i]['body'] = choices;
          }
          this.surveyResponseJSON[i]['body'] = this.surveyResponseJSON[i]['body'].replace(choices + '@@@', '');
          this.surveyResponseJSON[i]['body'] = this.surveyResponseJSON[i]['body'].replace('@@@' + choices, '');
          this.surveyResponseJSON[i]['body'] = this.surveyResponseJSON[i]['body'].replace(choices, '');
          this.surveyResponseJSON[i]['body'] = this.surveyResponseJSON[i]['body'].replace('@@@@@@', '');
          this.randomText = this.surveyResponseJSON[i]['body'];
          break;
        }
      }
    }
  }

  // On key change, update the radio type question response
  updateRadio(id, value) {
    for (let i = 0; i < this.surveyResponseJSON.length; i++) {
      if (this.surveyResponseJSON[i]['question'] === id) {
        this.surveyResponseJSON[i]['body'] = value;
        break;
      }
    }
  }

  // On key change, update the dropbox type question response
  updateDropbox(id, value) {
    for (let i = 0; i < this.surveyResponseJSON.length; i++) {
      if (this.surveyResponseJSON[i]['question'] === id) {
        this.surveyResponseJSON[i]['body'] = value;
        break;
      }
    }
  }

  // On key change, update the date type question response
  updateDate(id, value) {
    for (let i = 0; i < this.surveyResponseJSON.length; i++) {
      if (this.surveyResponseJSON[i]['question'] === id) {
        this.surveyResponseJSON[i]['body'] = value;
        break;
      }
    }
  }

  // On key change, update the time type question response
  updateTime(id, value) {
    for (let i = 0; i < this.surveyResponseJSON.length; i++) {
      if (this.surveyResponseJSON[i]['question'] === id) {
        this.surveyResponseJSON[i]['body'] = value;
        break;
      }
    }
  }

  // Fetch overall response JSON and send it back to the server
  submitResponse() {
    var endDate = new Date();
    var seconds = (endDate.getTime() - this.startDate.getTime()) / 1000;
    $(".set-account-modal").show();
    this.http.post('/survey/api/response/', { 'survey': this.surveyId, 'user': this.userId, 'totalTime': seconds, 'totalLength': this.surveyResponseJSON.length }, this.introService.options).subscribe(
      (response) => {
        // debugger;
        // console.log('\nResponse is: ' + response.json().id);
        this.surveyFlag = true;
        this.statusFlag = true;

        this.responseId = response.json().id;
        this.surveyResponseJSON.forEach((answer) => {
          answer.response = this.responseId;

          // ============time duration
          // var endDate = new Date();
          // var seconds = (endDate.getTime() - this.startDate.getTime()) / 1000;
          // answer["totalTime"] = seconds;
          // answer["totalLength"]= this.surveyResponseJSON.length;
          // =============

          this.http.post('/survey/api/answer/', answer, this.introService.options).subscribe(
            (res) => {
              // debugger;
              // console.log('\nResponse is: ' + res.json().id);
              // console.log("done");
            }, (error) => {
              // console.log(error)
              $(".set-account-modal").hide();
            });
        });

        setTimeout(() => {
          this.message = "your Survey successfully! submited.";
          this.toster();
          $(".set-account-modal").hide();
          // this.router.navigate(['/respondent/profile']);
        }, 1000);

      }, (error) => {
        console.log(error);
        $(".set-account-modal").hide();
      });

  }

  // Get response by id
  getResponseById(id) {
    // console.log('id =', id);
    for (let i = 0; i < this.surveyResponseJSON.length; i++) {
      if (this.surveyResponseJSON[i].question == id) {
        // console.log(this.surveyResponseJSON[i]);
        return this.surveyResponseJSON[i];
      }
    }
    return false;
  }

  // TODO: Add messages between Questions Support if possible
  // TODO: Changing type of question should maintain the text and choices
  // TODO: Show dependent option only if we have radio or dropbox type of questions
  startDate: any;
  nextQuestion() {

    // ** NOT TO USE THIS, only if we need to add back button **
    // this.previousQuestionStack.push({
    //   'questionData': this.question,
    //   'count': this.count,
    //   'tabCount': this.tabCount,
    //   'tabNumber': this.tabNumber,
    //   'main': this.main,
    //   'complete': this.complete,
    //   'countStore': this.countStore,
    //   'tabCountStack': this.tabCountStack,
    //   'tabNumberStack': this.tabNumberStack,
    //   'randomText': this.randomText,
    // });

    // if (this.answerStack.length > 0 && this.oldRandomText == this.randomText) {
    //   this.randomText = this.answerStack.pop();
    //   this.oldRandomText = this.randomText;
    // } else {
    //   this.randomText = '';
    // }

    // debugger;
    this.randomText = '';

    this.questionNumber += 1;
    if (this.count >= 0) {
      // When question is responded do what ?

      // Check if we need to jump from main?
      if (this.main == true && this.checkTabsValidity(this.questions[this.count], this.getResponseById(this.question.id))) {
        this.tabCount += 1;
        this.count = this.tabCount;
        this.question = this.survey.tabs[this.tabNumber].questions[this.tabCount];
        return;
      }
      else if (this.main == false && this.checkTabsValidity(this.survey.tabs[this.tabNumber].questions[this.tabCount],
        this.getResponse(this.survey.tabs[this.tabNumber].questions[this.tabCount].id))) {
        // Multiple Tab Situation
        this.tabCount += 1;
        this.count = this.tabCount;
        this.question = this.survey.tabs[this.tabNumber].questions[this.tabCount];
      }
      else {
        // No, then before moving ahead check if this is the end ?

        // Check for tab first
        // console.log(this.main, this.tabCount);
        if (this.main == false && this.tabCount == this.survey.tabs[this.tabNumber].questions.length - 1) {
          // Do we need to complete ?
          if (this.survey.tabs[this.tabNumber].end == true) {
            this.complete = true;
            return
          } else {
            // Is this inception ?
            if (this.tabNumberStack.length > 0) {
              // Yes, then come back
              this.tabNumber = this.tabNumberStack.pop();
              this.tabCount = this.tabCountStack.pop();
            } else {
              // No movie shit, get back to main
              this.main = true;
              this.count = this.countStore;
              if (this.main == true && this.count == this.totalQuestion - 1) {
                this.complete = true;
                return
              }
            }
          }
        } else {
          // Check for main now
          // console.log(this.count, this.totalQuestion - 1)
          if (this.main == true && this.count == this.totalQuestion - 1) {
            this.complete = true;
            return
          }
        }
      }


      // No end ? Now Move ahead / Tab found = Move ahead
      // Is it tab ?
      if (!this.main) {
        this.tabCount += 1;
        this.count = this.tabCount;

        this.question = this.survey.tabs[this.tabNumber].questions[this.count];
        // Is dependent criteria is true or not ?
        let status = !this.checkDependentValidity(this.question, 'tabs');
        while (status && this.tabCount < this.survey.tabs[this.tabNumber].questions.length) {
          this.tabCount += 1;
          this.question = this.survey.tabs[this.tabNumber].questions[this.count];
          status = !this.checkDependentValidity(this.question, 'tabs');
        }

        // Did we reach the end because of dependent criteria fail ?
        if (this.tabCount == this.survey.tabs[this.tabNumber].questions.length) {
          this.complete = true;
          return
        }
      }
      else {
        this.count += 1;

        // Is dependent criteria is true or not ?
        this.question = this.questions[this.count];
        // console.log(this.question);
        let status = !this.checkDependentValidity(this.question, 'main');
        while (status && this.count < this.totalQuestion - 1) {
          this.count += 1;
          this.question = this.questions[this.count];
          status = !this.checkDependentValidity(this.question, 'main');
        }

        // Is this the end because of dependent criteria fail ?
        if (this.count == this.totalQuestion) {
          this.complete = true;
          return
        }
      }

    }
    else {
      // First question, come come
      this.count += 1;
      this.question = this.questions[this.count];

      // =================================
      this.startDate = new Date();
      // =================================
    }
  }

  // Is there any tab associated with that particular option
  checkTabsValidity(data, response) {
    // debugger;
    // console.log('checking tab');
    // console.log(data.tabNames);
    if ((data.tabNames != '' && data.tabNames != undefined && data.tabNames != null) && (data.type == 'radio' || data.type == 'dropbox')) {

      // Bug fix by backend
      const temp = data.tabNames.split(',');
      let count = 0;
      for (let i = 0; i < temp.length; i++) {
        if (temp[i] != '') {
          count = 1;
        }
      }

      if (count == 0) {
        return false;
      }
      // Need to remove that code, above one

      // console.log(data.tabNames.split(',')[data.choices.split('@@@').indexOf(response.body)], response);
      if (data.tabNames.split(',')[data.choices.split('@@@').indexOf(response.body)] != '') {

        if (this.main == true) {
          this.countStore = this.count;
        }
        this.main = false;
        if (this.tabCount != -1) {
          this.tabCountStack.push(this.tabCount);
        }
        if (this.tabNumber != -1) {
          this.tabNumberStack.push(this.tabNumber);
        }
        this.tabCount = -1;
        this.tabNumber = parseInt(data.tabNames.split(',')[data.choices.split('@@@').indexOf(response.body)]);
        this.tabNumber -= 1;
        // this.updateResponse(this.tabNumber);
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  // TODO: Check the order of tabs when we submit (I think 0011 getting 1100, for me only) not high priority
  // Check whether the dependent question criteria is satisfied or not
  checkDependentValidity(data, type) {
    // debugger;
    // if ((data.dependentQuestion == '' || data.dependentQuestion == undefined) && data.dependentOption == '') {
    if (data.dependentQuestion == '' || data.dependentQuestion == undefined || data.dependentOption == null) {
      // console.log('this');
      return true;
    }
    else {
      const dependentOptionChoices = data.dependentOption.split('@@@');

      if (type == 'main') {
        // console.log(this.serialQuestions[-1][data.dependentQuestion - 1]);
        // console.log(this.serialQuestions[-1]);
        // console.log(data.dependentQuestion - 1);
        // this.getResponseById(this.serialQuestions[-1][data.dependentQuestion - 1]).body

        // if (dependentOptionChoices.indexOf(this.getResponseById(this.serialQuestions[-1][data.dependentQuestion - 1]).body) != -1 || this.getResponseById(this.serialQuestions[-1][data.dependentQuestion - 1]).body == '') {
        if (dependentOptionChoices.indexOf(this.getResponseById(this.questions[this.count - 1]["id"]).body) != -1 || this.getResponseById(this.questions[this.count - 1]["id"]).body == '') {
          // console.log('that');
          return true;
        } else {
          // console.log('them');
          return false;
        }
      }
      else {
        const surveyResponseTabs = this.getResponse(data.id);
        // console.log(surveyResponseTabs);
        if (dependentOptionChoices.indexOf(this.getResponseById(this.serialQuestions[this.tabNumber][data.dependentQuestion - 1]).body) != -1 || this.getResponseById(this.serialQuestions[this.tabNumber][data.dependentQuestion - 1]).body == '') {
          // console.log('that');
          return true;
        } else {
          // console.log('them');
          return false;
        }
      }
    }
  }

  // ** NOT TO USE **
  finish() { }

  // previousQuestion() {
  //   // this.questionNumber += 1;
  //   // this.count -= 1;
  //   // let temp = this.questions[this.count];
  //   // if (this.count >= 0) {
  //   //   let status = !this.checkDependentValidity(temp);
  //   //   while (status && this.count > 0) {
  //   //     this.count -= 1;
  //   //     temp = this.questions[this.count];
  //   //     status = !this.checkDependentValidity(this.question);
  //   //   }
  //   //   this.question = temp;
  //   // }
  //   this.answerStack.push(this.randomText);
  //
  //   const previousData = this.previousQuestionStack.pop();
  //   this.questionNumber -= 1;
  //   this.question = previousData.questionData;
  //   this.count = previousData.count;
  //   this.tabCount = previousData.tabCount;
  //   this.tabNumber = previousData.tabNumber;
  //   this.main = previousData.main;
  //   this.complete = previousData.complete;
  //   this.countStore = previousData.countStore;
  //   this.tabCountStack = previousData.tabCountStack;
  //   this.tabNumberStack = previousData.tabNumberStack;
  //   this.randomText = previousData.randomText;
  //   this.oldRandomText = previousData.randomText;
  //
  //   console.log(this.question);
  // }

  updateResponse(j) {
    for (let i = 0; i < this.survey.tabs[j].questions.length; i++) {
      let id = this.survey.tabs[j].questions[i].id;
      if (this.survey.tabs[j].questions[i].type === 'short') {
        this.surveyResponseJSON.push({
          'question': id,
          'response': '',
          'body': '',
        });
      } else if (this.survey.tabs[j].questions[i].type === 'para') {
        this.surveyResponseJSON.push({
          'question': id,
          'response': '',
          'body': '',
        });
      } else if (this.survey.tabs[j].questions[i].type === 'integer') {
        this.surveyResponseJSON.push({
          'question': id,
          'response': '',
          'body': '',
        });
      } else if (this.survey.tabs[j].questions[i].type === 'checkbox') {
        this.surveyResponseJSON.push({
          'question': id,
          'response': '',
          'body': '',
        });
      } else if (this.survey.tabs[j].questions[i].type === 'radio') {
        this.surveyResponseJSON.push({
          'question': id,
          'response': '',
          'body': '',
        });
      } else if (this.survey.tabs[j].questions[i].type === 'dropbox') {
        this.surveyResponseJSON.push({
          'question': id,
          'response': '',
          'body': '',
        });
      } else if (this.survey.tabs[j].questions[i].type === 'date') {
        this.surveyResponseJSON.push({
          'question': id,
          'response': '',
          'body': '',
        });
      } else if (this.survey.tabs[j].questions[i].type === 'time') {
        this.surveyResponseJSON.push({
          'question': id,
          'response': '',
          'body': '',
        });
      }
    }
  }

  getResponse(id) {
    for (let i = 0; i < this.surveyResponseJSON.length; i++) {
      if (this.surveyResponseJSON[i].question == id) {
        return this.surveyResponseJSON[i];
      }
    }
  }

  updateQuestionsJson(data) {
    const temp = {
      "name": "Sample Name",
      "description": "Sample Description",
      "isPublished": "False",
      "needLoggedUser": "False",
      "displayByQuestion": "False",
      "surveyQuestions": [],
      "tabs": []
    };

    for (let i = 0; i < data.length; i++) {
      if (data[i].tabs === -1) {
        temp.surveyQuestions.push(data[i]);
      } else {
        while (temp.tabs[data[i].tabs] == undefined) {
          temp.tabs.push({
            "questions": [], end: false
          });
        }

        for (let j = 0; j < this.tabs.length; j++) {
          // console.log(data[i].tabs);
          if (this.tabs[j].number == data[i].tabs) {
            temp.tabs[data[i].tabs].end = (this.tabs[j].end != 'False')
            break;
          }
        }
        temp.tabs[data[i].tabs].questions.push(data[i]);
      }
    }
    this.survey = temp;
    this.questions = this.survey.surveyQuestions;

    this.totalQuestion = this.survey.surveyQuestions.length;
  }

  toster() {
    // Get the snackbar DIV
    var x = document.getElementById("snackbar");
    // Add the "show" class to DIV
    x.className = "show";
    // After 3 seconds, remove the show class from DIV
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 2000);
  }

}
