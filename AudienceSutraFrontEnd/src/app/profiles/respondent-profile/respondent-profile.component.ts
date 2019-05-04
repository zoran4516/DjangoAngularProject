import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-respondent-profile',
  templateUrl: './respondent-profile.component.html',
  styleUrls: ['./respondent-profile.component.css']
})
export class RespondentProfileComponent implements OnInit {

  url: any;
  page: any;
  id: any;

  constructor(private route: ActivatedRoute,
    private router: Router, 
    private titleService: Title) {
    this.url = this.route.snapshot.routeConfig.path;
    this.route.params.subscribe((params: Params) => {
      // this.id = params['id'];
      this.id = 0;
    });
  }

  ngOnInit() {
    this.titleService.setTitle('AudienceSutra Respondent Profile');
    if (this.url.includes('fav')) {
      this.page = 'fav';
    } else if (this.url.includes('stats')) {
      this.page = 'stats';
    } else if (this.url.includes('profile')) {
      this.page = 'profile';
    } else if (this.url.includes('help')) {
      this.page = 'help';
    } else {
      this.page = 'home';
    }
  }

}
