import { Component, OnInit } from '@angular/core';
import {Http} from "@angular/http";
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-response',
  templateUrl: './response.component.html',
  styleUrls: ['./response.component.css']
})
export class ResponseComponent implements OnInit {
  response: any;
  responseId: number;
  answers: any;
  constructor(private http: Http,
              private route: ActivatedRoute) {
    this.response = [];
    this.responseId = this.route.snapshot.params['responseId'];
    this.route.params.subscribe((params: Params) => {
      this.responseId = params['responseId'];
    });
  }
  ngOnInit() {
    this.http.get('http://127.0.0.1:8000/api/response_answers/' + this.responseId.toString() + '/').subscribe(
      (response) => {
        this.answers = response.json();
        console.log(this.answers);
      },
      (error) => console.log(error)
    );
    this.http.get('http://127.0.0.1:8000/api/response/' + this.responseId.toString() + '/').subscribe(
      (response) => {
        this.response = response.json()[0];
      },
      (error) => console.log(error)
    );
  }
}
