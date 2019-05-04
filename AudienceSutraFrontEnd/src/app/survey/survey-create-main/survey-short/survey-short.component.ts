import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from "@angular/forms";
import { IntroService } from '../../../services/intro/intro.service';

import * as $ from 'jquery';

@Component({
  selector: 'app-survey-short',
  templateUrl: './survey-short.component.html',
  styleUrls: ['../survey-create-main.component.css']
})
export class SurveyShortComponent implements OnInit, AfterViewInit {
  @Input() group: any;
  @Input() index: number;
  @Input() main: boolean;
  @Input() parentGroup: FormGroup;
  @Input() is_admin: boolean;

  another: any;
  choice = '';
  anotherTabs: any;
  choiceTab = '';

  constructor(private introService: IntroService) { }

  ngOnInit() {

    // On change or reinitialize, update the information regarding dependent questions
    if (this.group.get('dependentQuestion').value != '' && this.main == true) {
      this.updateSpecial(this.group.get('dependentQuestion').value);
    } else if (this.group.get('dependentQuestion').value != '' && this.main == false) {
      this.updateTabsSpecial(this.group.get('dependentQuestion').value);
    }
  }

  ngAfterViewInit() {

  }

  // Testing feature to show help
  showDependentHelp(index) {
    $("#dependent-intro-" + index).fadeToggle();
  }

  // Generate question number list for dependent question in main
  generateArray(n) {
    let arr = [];
    const arrayControl = this.parentGroup.get('surveyQuestions') as FormArray;
    for (let i = 1; i <= n; i++) {
      let item = arrayControl.get((i - 1).toString());
      if (item.get('tag').value == 'dropbox' || item.get('tag').value == 'radio') {
        arr.push({ 'index': i, 'question': item.value.text });
      }
    }

    if (this.choice != '') {
      this.updateSpecial(this.choice);
    }

    return arr;
  }

  // Dependent question update for main survey
  updateSpecial(n) {
    this.choice = n;
    n = parseInt(n, 10);
    n = n - 1;
    n = n.toString();
    const arrayControl = this.parentGroup.get('surveyQuestions') as FormArray;
    const item = arrayControl.get(n);
    if (item.get('setType').value == 'optionSet') {
      const options = item.get('choices') as FormArray;
      let temp = [];
      for (let i = 0; i < options.length; i++) {
        temp.push(options.controls[i].value);
      }
      this.another = temp;
    } else {
      this.another = [];
      // console.log('no')
    }
  }

  // Dependent question number list in Tabs
  generateTabsArray(n) {
    let arr = [];
    const arrayControl = this.parentGroup.get('questions') as FormArray;
    for (let i = 1; i <= n; i++) {
      let item = arrayControl.get((i - 1).toString());
      if (item.get('tag').value == 'dropbox' || item.get('tag').value == 'radio') {
        arr.push(i);
      }
    }

    if (this.choiceTab != '') {
      this.updateTabsSpecial(this.choiceTab);
    }

    return arr;
  }

  // Update value of the dependent question for tabs survey
  updateTabsSpecial(n) {
    if (n == '') {
      return
    }
    this.choiceTab = n;
    n = parseInt(n, 10);
    n = n - 1;
    n = n.toString();
    const arrayControl = this.parentGroup.get('questions') as FormArray;
    const item = arrayControl.get(n);
    if (item.get('setType').value == 'optionSet') {
      const options = item.get('choices') as FormArray;
      let temp = [];
      for (let i = 0; i < options.length; i++) {
        temp.push(options.controls[i].value);
      }
      this.anotherTabs = temp;
    } else {
      this.anotherTabs = [];
    }
  }


  // If dependent Question is selected, then show all the options available for that particular question
  // so that dependent options can be selected
  checkbox(val, key) {
    const arrayControl: any = this.group.get('dependentOption').value.split('@@@');
    let found = -1;

    for (let i = 0; i < arrayControl.length; i++) {
      // console.log(i, arrayControl[i]);
      if (arrayControl[i] == val) {
        found = i;
        break
      }
    }

    let temp = this.group.get('dependentOption').value;
    if (found == -1) {
      if (arrayControl.length == 1 && arrayControl[0] == '') {
        this.group.get('dependentOption').patchValue(val);
      } else {
        this.group.get('dependentOption').patchValue(temp + '@@@' + val);
      }
    } else {
      temp = temp.replace(val + '@@@', '');
      temp = temp.replace('@@@' + val, '');
      temp = temp.replace(val, '');
      temp = temp.replace('@@@@@@', '');
      this.group.get('dependentOption').patchValue(temp);
    }
  }

  // Given question is required or not
  checkboxStatus(count, val) {
    const arrayControl: any = this.group.get('dependentOption').value.split('@@@');
    if (arrayControl.indexOf(val) == -1) {
      return false;
    } else {
      return true;
    }
  }

  removeQuestion(item, index) {
    if (!confirm('Are you sure you want to remove this question?'))
      return;
    let question_id = item.get('surveyQuestions').value[index].id;
    this.introService.deleteQuestion(question_id).subscribe(res => {
      item.get('surveyQuestions').removeAt(index);
    }, error => {
      // tostar will be added
    });
  }

}
