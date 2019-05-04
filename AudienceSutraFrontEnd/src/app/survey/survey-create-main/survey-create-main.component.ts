/*
 * Main idea:
 * 1. Determine whether this survey is custom or not. From URL if it is custom then no questions are shown
 * 2. In case if it is not custom, then grab pre-built questions from templates.ts and recover it.
 * 3. Recover will convert JSON to FormBuilder type of JSON
 * 4. Once it is done then use this.survey variable to record each event
 *
 * Each type of questions have it's own component, survey-checkbox, survey-date etc. When user clicks any button
 * to add question, then we update survey JSON and let that component get shown on the page.
 *
 * For example I have added comments for survey-short to show what is happening and it is common for others as well
 */

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { Http } from '@angular/http';
import { forEach } from "@angular/router/src/utils/collection";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { templates } from "./templates";
import { IntroService } from '../../services/intro/intro.service';
import { Location } from '@angular/common';
import { HostListener } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-survey-create-main',
  templateUrl: './survey-create-main.component.html',
  styleUrls: ['./survey-create-main.component.css', './survey-create-main.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SurveyCreateMainComponent implements OnInit {

  // @HostListener('window:unload', ['$event'])
  // unloadHandler(event) {
  //   console.log('unloadHandler');
  // }

  // @HostListener('window:beforeunload', ['$event'])
  // beforeUnloadHander(event) {
  //   console.log("1");
  //   console.log(event);
  //   return false;
  // }

  // @HostListener("window:beforeunload", ["$event"]) unloadHandler(event: Event) {
  //   console.log("Processing beforeunload...");
  //   // debugger;
  //   // Do more processing...
  //   event.returnValue = false;
  // }

  // @HostListener('refresh') onload() {
  //   console.log("Processing beforeunload11111111111111");
  //   window.alert('Host Element Clicked');
  // }

  // @HostListener('mouseover') onMouseOver() {
  //   // this.ChangeBgColor('red');
  //   console.log("Processing beforeunload11111111111111");
  // }



  // @HostListener("window:beforeunload", ["$event"]) unloadHandler(event: Event) {
  //   console.log("Processing beforeunload...");
  //   // Do more processing...
  //   event.returnValue = false;
  // }

  // @HostListener('window:beforeunload', ['$event'])
  // public beforeunloadHandler($event) {
  //   $event.returnValue = "Are you sure?";
  // }


  survey: any;
  surveyQuestions: any;
  surveyTabs: any;
  surveyId: number = 0;
  questionId: number = 0;
  main = true;
  is_admin = false;
  activeTab = 0;
  userId: number = 0;
  template = 'custom';
  public disableButton: number = 0;

  userName: String;
  userDesignation: String;
  img_src: String;
  public q_data: any = [];
  updateFlag: boolean = false;
  message: string = "Survey successfully created!";
  status: string = 'create';
  is_super: boolean = false;
  cost:number=0;
  head_id:number=0;
  constructor(private fb: FormBuilder,
    private http: Http, private router: Router,
    private introService: IntroService,
    private location: Location,
    private route: ActivatedRoute) {
    // Get userId and templates
    // this.userId = this.route.snapshot.params['id'];
    this.route.params.subscribe((params: Params) => {
      // this.userId = params['id'];
      this.template = params['template'];
      this.cost = params['cost']
      this.head_id= params['head']
      if (params['id'] != "" && params['id'] != null && params['id'] != undefined && params['id'] != 0) {
        this.updateFlag = true;
        this.surveyId = params['id'];
        this.message = "Survey successfully updated!";
        this.counter = 2;
      }
      else {
        this.message = "Survey successfully created!";
      }
    });

    // Custom templates have only one sample question of short type
    if (this.template == 'custom') {
      this.survey = this.fb.group({
        creator: new FormControl(this.userId),
        name: new FormControl(''),
        description: new FormControl(''),
        // isPublished: 'False',
        needLoggedUser: 'False',
        displayByQuestion: 'False',
        surveyQuestions: this.fb.array(
          [this.buildTextQuestion('short')],
        ),
        tabs: this.fb.array([this.buildTab()])
      });
    }
    if (this.template == 'update') {
      this.survey = this.fb.group({
        creator: new FormControl(this.userId),
        name: new FormControl(''),
        description: new FormControl(''),
        // isPublished: 'False',
        needLoggedUser: 'False',
        displayByQuestion: 'False',
        surveyQuestions: this.fb.array(
          [],
        ),
        tabs: this.fb.array([])
      });
    }
  }

  // ===================================================================================
  getQuestion() {
    this.introService.getSurveyQuestion(this.surveyId).subscribe(res => {
      this.status = res.status;
      this.recoverSurvey(res);
    }, error => {
      // console.log(error);
    });
  }

  // ===================================================================================

  ngOnInit() {

    // if (this.updateFlag == true) {
    //   this.getQuestion();
    // }

    // logedIn user details
    this.getDetails();

    // console.log(this.userId);
    // Templates present on URL are checked and then those particular survey question
    // are picked up from templates.ts
    if (this.template == 'brand') {
      this.recoverSurvey(templates.brand);
    } else if (this.template == 'communication') {
      this.recoverSurvey(templates.communication)
    } else if (this.template == 'product') {
      this.recoverSurvey(templates.product)
    } else if (this.template == 'competition') {
      this.recoverSurvey(templates.competition)
    } else if (this.template == 'update') {
      this.getQuestion();
    }

    // auto Save
    this.onChanges();
  }

  // logedIn user details
  getDetails() {
    this.introService.getLogedInUserData().subscribe(res => {
      this.userName = res.first_name;
      this.userDesignation = res.designation;
      this.img_src = res.profile_pic;
      this.is_super = res.super_user;
      this.is_admin = res.super_user;
    }, error => {
      // console.log(error);
    });
  }

  // Default set up of survey so that more questions can be added
  initializeEmptySurvey() {
    this.survey = this.fb.group({
      creator: new FormControl(this.userId),
      name: new FormControl(''),
      description: new FormControl(''),
      // isPublished: 'False',
      needLoggedUser: 'False',
      displayByQuestion: 'False',
      surveyQuestions: this.fb.array(
        [],
      ),
      tabs: this.fb.array([])
    })
  }

  // In case if we have JSON of the given survey, then it will convert JSON to Form builder so that
  // further response can be tracked by us
  recoverSurvey(data) {
    this.initializeEmptySurvey();
    this.survey.controls.creator = new FormControl(data.creator);
    this.survey.controls.name = new FormControl(data.name);
    this.survey.controls.description = new FormControl(data.description);
    // this.survey.controls.isPublished = new FormControl(data.isPublished);
    this.survey.controls.needLoggedUser = new FormControl(data.needLoggedUser);
    this.survey.controls.displayByQuestion = new FormControl(data.displayByQuestion);
    const subQuestionsArray: any = this.survey.get('surveyQuestions') as FormArray;
    const tabs: any = this.survey.get('tabs') as FormArray;

    for (let i = 0; i < data.surveyQuestions.length; i++) {
      let ld = data.surveyQuestions[i];
      if (data.surveyQuestions[i].setType == 'textSet') {
        subQuestionsArray.push(this.buildTextQuestion(ld.type, ld.text, ld.required, ld.admin_question, ld.placeholder, ld.max,
          ld.min, ld.tab, ld.dependentQuestion, ld.dependentOption, ld.temp_id));
      } else if (data.surveyQuestions[i].setType == 'timeSet') {
        subQuestionsArray.push(this.buildTimeQuestion(ld.text, ld.required, ld.admin_question, ld.tab, ld.dependentQuestion, ld.dependentOption, ld.temp_id));
      } else if (data.surveyQuestions[i].setType == 'dateSet') {
        subQuestionsArray.push(this.buildDateQuestion(ld.text, ld.required, ld.admin_question, ld.tab, ld.dependentQuestion, ld.dependentOption, ld.temp_id));
      } else if (data.surveyQuestions[i].setType == 'optionSet') {
        // subQuestionsArray.push(this.buildOptionQuestion(ld.type, ld.text, this.buildChoices(ld.choices),
        //   this.buildChoices(ld.tabNames), ld.required, ld.tab, ld.dependentQuestion, ld.dependentOption, ld.temp_id));
        subQuestionsArray.push(this.buildOptionQuestion(ld.type, ld.text, this.buildChoices(ld.choices),
          this.buildChoices(ld.tabNames), ld.required, ld.admin_question, ld.tab, ld.dependentQuestion, ld.dependentOption, ld.temp_id, ld.placeholder, ld.max, ld.min));
      }
    }
    // console.log("------------------------------");
    // console.log(subQuestionsArray);
    if (data.tabs) {
      for (let i = 0; i < data.tabs.length; i++) {
        let temp = new FormGroup({
          questions: this.fb.array([]),
          end: new FormControl(false)
        });
        let questionsArray: any = temp.get('questions') as FormArray;

        // console.log(temp);
        if (temp.get('end').value == true) {
          temp.get('end').patchValue(true);
        }
        // console.log(temp);

        for (let j = 0; j < data.tabs[i].questions.length; j++) {
          let ld = data.tabs[i].questions[j];
          if (ld.setType == 'textSet') {
            questionsArray.push(this.buildTextQuestion(ld.type, ld.text, ld.required, ld.admin_question, ld.placeholder, ld.max,
              ld.min, ld.tab, ld.dependentQuestion, ld.dependentOption));
          } else if (ld.setType == 'timeSet') {
            questionsArray.push(this.buildTimeQuestion(ld.text, ld.required, ld.admin_question, ld.tab, ld.dependentQuestion, ld.dependentOption));
          } else if (ld.setType == 'dateSet') {
            questionsArray.push(this.buildDateQuestion(ld.text, ld.required, ld.admin_question, ld.tab, ld.dependentQuestion, ld.dependentOption));
          } else if (ld.setType == 'optionSet') {
            questionsArray.push(this.buildOptionQuestion(ld.type, ld.text, this.buildChoices(ld.choices),
              this.buildChoices(ld.tabNames), ld.required, ld.admin_question, ld.tab, ld.dependentQuestion, ld.dependentOption, ld.id));
          }
        }
        tabs.push(temp);
      }
    }
  }

  getCircularReplacer = () => {
    const seen = new WeakSet;
    return (key, value) => {
      if (typeof value === 'object' && value !== null) {
        if (seen.has(value)) {
          return;
        }
        seen.add(value);
      }
      return value;
    };
  };

  // Add tab with 1 question by default
  buildTab() {
    return new FormGroup({
      questions: this.fb.array([
        this.buildTextQuestion('para'),
      ]),
      end: new FormControl(false),
    });
  }

  // Add single choice to particular question
  buildChoices(choices) {
    const temp = [];
    for (let i = 0; i < choices.length; i++) {
      temp.push(new FormControl(choices[i]));
    }
    return temp;
  }

  // Short, long answer type questions which comprises of text have this structure returned
  buildTextQuestion(type: string, text = '', required = 'true', admin_question = false, placeholder = '', max = '200', min = '0',
    tab = '', dependentQuestion = '', dependentOption = '', id = '') {

    return new FormGroup({
      'type': new FormControl(type),
      'name': new FormControl(''),
      'text': new FormControl(text),
      'required': new FormControl(required),
      'admin_question': new FormControl(admin_question),
      'placeholder': new FormControl(placeholder),
      'max': new FormControl(max),
      'min': new FormControl(min),
      'tag': new FormControl(type),
      'setType': new FormControl('textSet'),
      'tab': new FormControl(tab),
      'dependentQuestion': new FormControl(dependentQuestion),
      'dependentOption': new FormControl(dependentOption),
      'id': new FormControl(id),
    });
  }

  // Time base questions with format
  buildTimeQuestion(text = '', required = 'true', admin_question = false, tab = '', dependentQuestion = '', dependentOption = '', id = '') {
    return new FormGroup({
      'type': new FormControl('time'),
      'name': new FormControl(''),
      'text': new FormControl(text),
      'required': new FormControl(required),
      'admin_question': new FormControl(admin_question),
      'timeType': new FormControl('true'),
      'tag': new FormControl('Time'),
      'setType': new FormControl('timeSet'),
      'tab': new FormControl(tab),
      'dependentQuestion': new FormControl(dependentQuestion),
      'dependentOption': new FormControl(dependentOption),
      'id': new FormControl(id),
    });
  }

  // Option based questions like radio, dropdown, multichoice
  buildOptionQuestion(type: string, text = '', choices = [new FormControl('')],
    tabNames = [new FormControl('')], required = 'true', admin_question = false, tab = '', dependentQuestion = '', dependentOption = '', id = '', placeholder = '', max = '200', min = '0') {
    return new FormGroup({
      'type': new FormControl(type),
      'text': new FormControl(text),
      'choices': new FormArray(choices),
      'tabNames': new FormArray(tabNames),
      'required': new FormControl(required),
      'admin_question': new FormControl(admin_question),
      'tag': new FormControl(type),
      'setType': new FormControl('optionSet'),
      'survey': new FormControl('null'),
      'order': new FormControl('1'),
      'tab': new FormControl(tab),
      'dependentQuestion': new FormControl(dependentQuestion),
      'dependentOption': new FormControl(dependentOption),
      'id': new FormControl(id),

      'placeholder': new FormControl(placeholder),
      'max': new FormControl(max),
      'min': new FormControl(min),
    });
  }

  // Date type of question
  buildDateQuestion(text = '', required = 'true', admin_question = false, tab = '', dependentQuestion = '', dependentOption = '', id = '') {
    return new FormGroup({
      'type': new FormControl('date'),
      'name': new FormControl(''),
      'text': new FormControl(text),
      'required': new FormControl(required),
      'admin_question': new FormControl(admin_question),
      'tag': new FormControl('Date Picker'),
      'setType': new FormControl('dateSet'),
      'tab': new FormControl(tab),
      'dependentQuestion': new FormControl(dependentQuestion),
      'dependentOption': new FormControl(dependentOption),
      'id': new FormControl(id),
    });
  }

  // Saving the survey and sending it to backend
  OsaveSurveyOld() {
    // debugger;

    // console.log(this.survey.value);
    // console.log(this.survey.value.surveyQuestions);

    this.surveyQuestions = this.survey.value.surveyQuestions;
    this.surveyTabs = this.survey.value.tabs;
    delete this.survey.surveyQuestions;
    delete this.survey.surveyTabs;
    this.survey.creator = this.userId;
    // console.log(this.survey.creator);
    // console.log(this.survey.value)
    //need to change
    console.log(this.survey.value);
    this.http.post('/survey/api/survey/', this.survey.value, this.introService.options).subscribe(
      (response) => {
        // debugger
        console.log("1");
        // client/37/profile
        // console.log('\nResponse is: ' + response.json().id);
        this.surveyId = response.json().id;

        this.surveyQuestions.forEach(question => {
          // debugger
          console.log("each");
          question.survey = this.surveyId;
          question.tabs = -1;
          //  console.log(question.choices);
          if (question.choices) {
            question.choices = question.choices.join('@@@');
          }
          if (question.type === 'number') {
            question.type = 'integer';
          }
          if (question.tabNames) {
            question.tabNames = question.tabNames.join();
          }
          // this.http.post('http://127.0.0.1:8000/api/question/', question).subscribe(
          //   (res) => {
          //     console.log('\nResponse is: ' + res.json().id);
          //     if (question.type === 'integer') {
          //       question.type = 'number';
          //     }
          //   },
          //   (error) => console.log(error)
          // );
        });
        //need to change
        console.log(this.surveyQuestions);
        this.http.post('/survey/api/question_submit/', this.surveyQuestions, this.introService.options).subscribe(
          (res) => {
            // debugger;
            console.log("2");
            // console.log('\nSaved: ' + res);
            this.router.navigate(['/client/profile']);
          },
          (error) => console.log(error)
        );
        let tabNumber = -1;
        this.surveyTabs.forEach(tabs => {
          console.log("tabs_each");
          tabNumber++;
          tabs.questions.forEach(question => {
            console.log("tab_each_question");
            question.survey = this.surveyId;
            question.tabs = tabNumber;
            if (question.choices) {
              question.choices = question.choices.join('@@@');
            }
            if (question.type === 'number') {
              question.type = 'integer';
            }
            if (question.tabNames) {
              question.tabNames = question.tabNames.join();
            }
            // this.http.post('http://127.0.0.1:8000/api/question/', question).subscribe(
            //   (res) => {
            //     console.log('\nResponse is: ' + res.json().id);
            //     if (question.type === 'integer') {
            //       question.type = 'number';
            //     }
            //   },
            //   (error) => console.log(error)
            // );
          });
        });
        //need to change
        // console.log(this.surveyTabs);
        // this.http.post('/survey/api/tabs_submit/', this.surveyTabs, this.introService.options).subscribe(
        //   (res) => {
        //     // debugger;
        //     // client/37/profile
        //     console.log("3");
        //     // console.log('\nSaved: ' + res);
        //     // this.router.navigate(['/client/' + this.userId + '/profile']);
        //     this.router.navigate(['/client/profile']);
        //   },
        //   (error) => console.log(error)
        // );
      },
      (error) => console.log(error)
    );
  }

  NsaveSurveyNew() {
    this.surveyQuestions = this.survey.value.surveyQuestions;
    this.surveyTabs = this.survey.value.tabs;
    delete this.survey.surveyQuestions;
    delete this.survey.surveyTabs;
    this.survey.creator = this.userId;

    this.introService.createSurvey(this.survey.value).subscribe(response => {
      this.surveyId = response.id;

      this.surveyQuestions.forEach(question => {
        question.survey = this.surveyId;
        question.tabs = -1;
        //  console.log(question.choices);
        if (question.choices) {
          question.choices = question.choices.join('@@@');
        }
        if (question.type === 'number') {
          question.type = 'integer';
        }
        if (question.tabNames) {
          question.tabNames = question.tabNames.join();
        }
      });

      this.introService.submitQuestion(this.surveyQuestions).subscribe(res => { }, error => {
        console.log(error);
      });

      let tabNumber = -1;
      this.surveyTabs.forEach(tabs => {
        tabNumber++;
        tabs.questions.forEach(question => {
          question.survey = this.surveyId;
          question.tabs = tabNumber;
          if (question.choices) {
            question.choices = question.choices.join('@@@');
          }
          if (question.type === 'number') {
            question.type = 'integer';
          }
          if (question.tabNames) {
            question.tabNames = question.tabNames.join();
          }
        });
      });

      this.introService.surveyTabs(this.surveyTabs).subscribe(res => {
        this.router.navigate(['/client/profile']);
      }, error => {
        console.log(error);
      });
    }, error => {
      console.log(error);
    });
  }

  // Activate any particular tab on that session
  getTab(i) {
    this.main = false;
    this.activeTab = i;
    // console.log(i);
  }

  // If main button is clicked, can be improved
  getMain() {
    this.main = true
  }

  goBack(): void {
    this.location.back();
  }

  // ============================================================
  costEstimation(){  
    this.router.navigate(['/client/estimate/custom/' + this.surveyId]);
  }
  counter: number = 0;
  tabChange(event, flag) {
    if (flag == true) {
      this.survey.value["name"] = event.target.value;
      // this.saveSurvey(true, 'no', 'status', '');
    }
    else {
      this.survey.value["description"] = event.target.value;
    }
  }
  public tostFlag: boolean = false;
  saveSurvey(flag, msg, status, tab) {
    this.disableButton++;
    if (this.disableButton === 1) {
      this.surveyQuestions = this.survey.value.surveyQuestions;
      this.surveyTabs = this.survey.value.tabs;
      delete this.survey.surveyQuestions;
      delete this.survey.surveyTabs;
      this.survey.creator = this.userId;
      this.survey.value["surveyId"] = this.surveyId;
      this.survey.value["template"] = this.template;
      this.survey.value["cost"] = this.cost;
      this.survey.value['head'] = this.head_id;
      
      if (status == 'Draft') {
        if (confirm("Are you sure, you want to withdraw this survey?")) {
          this.survey.value["status"] = "Draft";
        }
        else {
          this.disableButton = 0;
          return false;
        }
      }
      else if (msg == 'admin' && status == 'Pending Approval') {
        this.survey.value["status"] = "Approved";
      }
      else if (status == 'Pending Approval') {
        this.survey.value["status"] = "Pending Approval";

        if (this.surveyQuestions.length < 1) {
          this.message = "Atleast One question needed!";
          this.disableButton = 0;
          this.toster();
          return false;
        }
      }

      else if (status == 'approve') {
        if (confirm("Are you ready to take the survey live – reach out to our prospective respondents?")) {

        }
        else {
          this.disableButton = 0;
          return false;
        }
      }
      else {
        delete this.survey.value["status"];
      }

      // console.log(this.survey.value);
      $(".set-account-modal").show();
      this.http.post('/survey/api/survey/', this.survey.value, this.introService.options)
        .subscribe(response => {
          this.disableButton = 0;
          this.counter += 1;

          // if(response.json()["error"]){
          //   return false;
          // }

          // console.log("1");
          this.surveyId = response.json().id;

          this.surveyQuestions.forEach(question => {
            question.survey = this.surveyId;
            question.tabs = -1;
            //  console.log(question.choices);
            if (question.choices) {
              if (typeof question.choices == "string") {
                // 
              }
              else {
                let uniqueArray = question.choices.filter(function (item, pos) {
                  return question.choices.indexOf(item) == pos;
                })
                if (uniqueArray.indexOf("@@@") == -1)
                  question.choices = uniqueArray.join('@@@');
              }
            }

            if (question.type === 'number') {
              question.type = 'integer';
            }
            if (question.tabNames) {
              if (question.tabNames.indexOf(",") == -1)
                question.tabNames = question.tabNames.join();
            }
          });
          this.http.post('/survey/api/question_submit/', this.surveyQuestions, this.introService.options)
            .subscribe(res => {
              $(".set-account-modal").hide();

              this.disableButton = 0;
              if (res.json()["msg"] == "empty") {
                // console.log("empty");
                // return false;
              }
              else {
                let data = res.json();
                for (var i = 0; i < data.length; i++) {
                  const arrayControl = this.survey.get('surveyQuestions') as FormArray;
                  const c = arrayControl.controls[i].get('id') as FormControl;
                  c.setValue(data[i].id);
                }
                // this.survey.value.surveyQuestions.forEach(question => {
                //   var data = res.json().filter(x => x.text.toLowerCase() == question.text.toLowerCase());
                //   if (data!=null && data!=undefined && data.length>0)
                //     question['id'] = data[0]['id'];
                // });

                // this.router.navigate(['/client/profile']);

                // this.snackBar.open("saved successfully!", "OK", {
                //   duration: 500,
                // });

                // if (flag == true && msg == 'yes') {
                //   if (this.message == "Survey name is already exists!")
                //     this.message = "Survey successfully created!";
                //   this.toster();

                //   setTimeout(() => {
                //     this.router.navigate(['/client/profile']);
                //   }, 1200);
                // }
                // else if (flag == true && msg == 'no') {
                //   if (this.message == "Survey name is already exists!")
                //     this.message = "Survey successfully updated!";
                //   this.toster();
                // }
                // else {
                //   setTimeout(() => {
                //     this.message = "Survey successfully updated!";
                //   }, 2000);
                // }
              }
              if (flag == true && msg == 'yes') {
                if (this.counter == 1)
                  this.message = "Survey successfully created!";
                else
                  this.message = "Survey successfully updated!";
                this.toster();

                setTimeout(() => {
                  this.router.navigate(['/client/profile/' + tab]);
                  // this.location.back();
                }, 1000);
              }
              else if (flag == true && msg == 'no') {
                if (this.counter == 1)
                  this.message = "Survey successfully created!";
                else
                  this.message = "Survey successfully updated!";
                this.toster();
              }
              else if (flag == true && msg == 'admin') {
                if (this.counter == 1)
                  this.message = "Survey successfully approved!";
                else
                  this.message = "Survey successfully approved!";
                this.toster();
                setTimeout(() => {
                  this.router.navigate(['/super/survey/list/' + tab]);
                  // this.location.back();
                }, 1000);
              }
              else if (flag == false && msg == 'yes') {
                if (this.counter == 1)
                  this.message = "Survey successfully created!";
                else
                  this.message = "Survey successfully updated!";
                this.toster();

                setTimeout(() => {
                  this.router.navigate(['/super/survey/list/' + tab]);
                  // this.location.back();
                }, 1000);
              }
              else {
                setTimeout(() => {
                  this.message = "Survey successfully updated!";
                }, 2000);
              }
            }, error => {
              $(".set-account-modal").hide();
              // console.log(error);
              this.disableButton = 0;

              if (error.status === 409) {
                // console.log(JSON.parse(error._body).error);
                if (typeof JSON.parse(error._body).error == "object")
                  this.message = JSON.parse(error._body).error[0];
                else
                  this.message = JSON.parse(error._body).error;
                this.toster();
              }

            });
        }, error => {
          $(".set-account-modal").hide();
          this.disableButton = 0;
          if (error.status === 409) {
            this.message = "Survey name is already exists!";
            this.toster();
          }
          if (error.status === 400) {
            this.disableButton = 0;
            this.message = "Survey description field may not be blank.!";
            this.toster();
          }
          // console.log(error)
        });
    }
  }

  myChange(item) {
    console.log(item);
    // item["id"] = 
  }

  index: number = 0;
  onChanges(): void {
    // this.survey.valueChanges.subscribe(term => {
    //   this.index = 0;
    //   setTimeout(() => {
    //     this.index++;
    //     if (this.index === 1) {
    //       this.saveSurvey();
    //     }
    //   }, 20000);
    // });

    // this.survey.get('surveyQuestions').valueChanges.subscribe(val => {
    //   this.index = 0;
    //   setTimeout(() => {
    //     this.index++;
    //     if (this.index === 1) {
    //       this.saveSurvey(false, 'no');
    //     }
    //   }, 20000);
    // });
  }

  toster() {
    // Get the snackbar DIV
    var x = document.getElementById("snackbar");
    // Add the "show" class to DIV
    x.className = "show";
    // After 3 seconds, remove the show class from DIV
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 2000);
  }

  deleteSurvey() {
    if (confirm("Are you sure, you want to remove this survey?")) {

      this.introService.deleteSurvey(this.surveyId).subscribe(res => {
        this.message = "Survey successfully removed!";
        this.toster();

        setTimeout(() => {
          this.location.back();
        }, 1000);
      }, error => {
        // console.log(error);
      });
    }
  }

}
