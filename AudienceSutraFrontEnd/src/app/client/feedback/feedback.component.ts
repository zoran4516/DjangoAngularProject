import { Component, OnInit } from '@angular/core';
import { IntroService } from '../../services/intro/intro.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {
  public data = {
    reason: "",
    name: "",
    email: "",
    message: "",
    flag: "feedback"
  }
  public message = "All fields are required";

  constructor(private introService: IntroService) { }

  ngOnInit() {
    // $(".set-account-modal").show();
  }

  saveFeedback() {
    if (this.data.reason == "" && this.data.name == "" && this.data.email == "" && this.data.message == "") {
      this.message = "All fields are required!";
      this.toster();
    }
    else if (this.data.reason == "") {
      this.message = "Reason is required!";
      this.toster();
    }
    else if (this.data.name == "") {
      this.message = "Name is required!";
      this.toster();
    }
    else if (this.data.email == "") {
      this.message = "Email is required!";
      this.toster();
    }
    else if (this.data.message == "") {
      this.message = "Message is required!";
      this.toster();
    }
    else {
      let data = this.validateEmail(this.data.email)
      if (data == false) {
        this.message = "Please provide valid email.";
        this.toster();
      }
      else {
        $(".set-account-modal").show();
        this.introService.submitFeedback(this.data).subscribe(res => {
          this.data = {
            reason: "",
            name: "",
            email: "",
            message: "",
            flag: "feedback"
          };
          $(".set-account-modal").hide();
          this.message = "Mail successfully send.";
          this.toster();
        }, error => {
          $(".set-account-modal").hide();
          this.message = error;
          this.toster();
        });
      }
    }
  }

  toster() {
    // Get the snackbar DIV
    var x = document.getElementById("snackbar");
    // Add the "show" class to DIV
    x.className = "show";
    // After 3 seconds, remove the show class from DIV
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 2000);
  }

  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

}
