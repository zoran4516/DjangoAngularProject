import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Http } from '@angular/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as $ from 'jquery';
import { IntroService } from '../../services/intro/intro.service';

declare const gapi: any;

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  
  constructor(private fb: FormBuilder,
    private http: Http,
    private route: ActivatedRoute,
    private introService: IntroService,
    private router: Router) {
    // this.userId = this.route.snapshot.params['id'];
    // this.route.params.subscribe((params: Params) => {
    //   this.userId = params['id'];
    // });
  }

  ngOnInit() {

  }


}
