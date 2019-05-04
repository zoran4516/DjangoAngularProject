import { Component, OnInit } from '@angular/core';
import { Http } from "@angular/http";
import { ActivatedRoute, Params } from "@angular/router";
import { IntroService } from '../../services/intro/intro.service';

@Component({
  selector: 'app-assign-survey',
  templateUrl: './assign-survey.component.html',
  styleUrls: ['./assign-survey.component.scss']
})
export class AssignSurveyComponent implements OnInit {
  clients: any;
  dataFlag: boolean = false;
  surveyId: number;
  users: any = [];
  survey: any;
  searchCriteria: any;
  searchValue: ''
  addUsers: any = [];
  removeUsers: any = [];
  public gender_list = [];
  public states = [];
  public cities = [];
  public state_selected = "";
  public city_selected = "";
  public gender_selected = "";
  public age_selected = "";
  public age_list = [
    { id: "15_19", name: "15 years to 19 years", selected: false },
    { id: "20_24", name: "20 years to 24 years", selected: false },
    { id: "30_34", name: "30 years to 34 years", selected: false },
    { id: "25_29", name: "25 years to 29 years", selected: false },
    { id: "35_39", name: "35 years to 39 years", selected: false },
    { id: "40_44", name: "40 years to 44 years", selected: false },
    { id: "45_49", name: "45 years to 49 years", selected: false },
    { id: "50_54", name: "50 years to 54 years", selected: false },
    { id: "55_100", name: "55+ years", selected: false }
  ]
  message: string = "Respondent, Survey Assigned or Removed successfully!";

  constructor(private http: Http,
    private introService: IntroService,
    private route: ActivatedRoute) {
    this.surveyId = this.route.snapshot.params['surveyId'];
    this.route.params.subscribe((params: Params) => {
      this.surveyId = params['surveyId'];
    });
  }

  ngOnInit() {
    this.http.get('/survey/api/assign/survey/' + this.surveyId + '/').subscribe(res => {
      this.survey = res.json();

      // for (let i = 0; i < this.survey.length; i++) {
      //   if (this.survey[i]["assign"] == true)
      //     this.addUsers.push(this.survey[i]['user_id'])
      // }
    });

    this.http.get('/survey/api/client/search/criteria' + this.surveyId + '/').subscribe(res => {
      this.searchCriteria = res.json();
    });

    this.bind_ans_on_dropdown()
  }

  bind_ans_on_dropdown() {
    this.introService.getAnswerBasedList().subscribe(res => {
      this.gender_list = res.gender
      this.states = res.states
      this.cities = res.cities
    }, error => {
      console.log(error);
    });
  }

  searchRespondent() {
    let searchData = {
      "survey": this.surveyId,
      "gender": this.gender_selected,
      "state": this.state_selected,
      "city": this.city_selected,
      "age": this.age_selected
    }
    this.introService.SearchRespondentForAssignSurvey(searchData).subscribe(res => {
      this.clients = res
      this.dataFlag = true;
    }, error => {
      console.log(error);
    });
  }

  submit(searchValue) {

    if (searchValue == "") {
      this.dataFlag = false;
      this.message = "Please enter search data...";
      this.toster();
      return false;
    }
    else {
      this.http.get('/survey/api/client/search/survey/' + this.surveyId + '/?search=' + searchValue).subscribe(res => {
        this.clients = res.json();

        if (this.clients.length > 0) {
          this.dataFlag = true;
        }
        else {
          this.dataFlag = false;
          this.message = "data not available.";
          this.toster();
        }
      }, error => {
        console.log(error);
      });
    }
  }

  changeCheckbox(value) {
    //debugger;
    if (value.target.checked) {
      // this.users.push(value.target.value)

      var index = this.removeUsers.indexOf(value.target.value);
      if (index !== -1) this.removeUsers.splice(index, 1);

      this.addUsers.push(value.target.value);
    }
    else {
      var index = this.addUsers.indexOf(value.target.value);
      if (index !== -1) this.addUsers.splice(index, 1);

      this.removeUsers.push(value.target.value);
    }
    // console.log({ "survey": this.surveyId, "users": this.users });
  }

  assignSubmit() {
    var data = { "survey": this.surveyId, "users": { "add": this.addUsers, "remove": this.removeUsers } };
    console.log(this.removeUsers);

    this.http.post('/survey/api/respondent/assign/survey/', data, this.introService.options).subscribe(res => {
      //debugger;
      console.log(this.removeUsers);
      for (let i = 0; i < this.clients.length; i++) {
        for (let j = 0; j < this.removeUsers.length; j++) {
          if (this.clients[i].user_id == this.removeUsers[j]) {
            this.clients[i].status = '';
            this.clients[i].assign_date = '';
          }
        }
      }
      this.http.get('/survey/api/client/search/survey/?search=' + this.searchValue).subscribe(res => {
        this.clients = res.json();
      });
      this.message = "Respondent, Survey Assigned or Removed successfully!";
      this.toster();
      // console.log(res.json());
    }, error => {
      console.log(error);
    })
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
