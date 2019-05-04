import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";

@Component({
  selector: 'app-client-profile',
  templateUrl: './client-profile.component.html',
  styleUrls: ['./client-profile.component.css']
})
export class ClientProfileComponent implements OnInit {

  url: any;
  page: any;
  // id: any;

  constructor(private route: ActivatedRoute) {
    this.url = this.route.snapshot.routeConfig.path;
    // this.route.params.subscribe((params: Params) => {
    //   this.id = params['id'];
    // });
  }

  ngOnInit() {
    // console.log(this.url);
    if (this.url.includes('activeSurvey')) {
      this.page = 'activeSurvey';
    } else if (this.url.includes('feedback')) {
      this.page = 'feedback';
    } else if (this.url.includes('help')) {
      this.page = 'help';
    } else {
      this.page = 'home';
    }
  }

}
