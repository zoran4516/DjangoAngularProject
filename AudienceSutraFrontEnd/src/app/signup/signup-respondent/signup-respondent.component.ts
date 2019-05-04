import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Http } from "@angular/http";
import { Router } from "@angular/router";
import { IntroService } from '../../services/intro/intro.service';

@Component({
  selector: 'app-signup-respondent',
  templateUrl: './signup-respondent.component.html',
  styleUrls: ['./signup-respondent.component.css']
})
export class SignupRespondentComponent implements OnInit {

  respondentProfile: any;
  userId: number;

  constructor(private fb: FormBuilder,
    private http: Http,
    private introService: IntroService,
    private router: Router) {
    this.respondentProfile = this.fb.group({
      email: [''],
      password: [''],
      confirm_password: ['']
    });
  }

  ngOnInit() {
  }

  submit() {
    if (this.respondentProfile.password !== this.respondentProfile.confirm_password) {
      return;
    }
    delete this.respondentProfile.confirm_password;
    // this.http.post('http://127.0.0.1:8000/api/signup/', this.respondentProfile.value).subscribe(
    //   (response) => {
    //     console.log('\nResponse is: ' + response.json().id);
    //     this.userId = response.json().id;
    //     this.router.navigate(['/respondent/' + this.userId + '/intro']);
    //   },
    //   (error) => console.log(error)
    // );


    let formData = this.respondentProfile.value;
    this.introService.addClientUser(formData).subscribe(res => {
      // debugger;
      this.router.navigate(['/respondent/' + res.id + '/intro']);
    }, error => {
      console.log(error);
    });
  }
}
