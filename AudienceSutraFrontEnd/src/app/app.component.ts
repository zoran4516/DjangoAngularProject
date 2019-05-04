import { Component, OnInit } from '@angular/core';
import { IntroService } from './services/intro/intro.service';
import { Router, ActivatedRoute } from "@angular/router";
import { Http } from '@angular/http';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';
  public userInfo: any;
  url: any;
  public id:any;

  constructor(private router: Router, private http: Http,
    private introService: IntroService,
    private location: Location,
    private route: ActivatedRoute) {
    // this.url = this.route.snapshot.routeConfig.path;
  }

  ngOnInit() {
    //this.router.navigate([''])
    // console.log(this.url.includes('fav'));
    this.id =1;
    this.getDetails();
  }
  addClass(id: any) {
    this.id = id;
}

  getDetails() {
    this.introService.getLogedInUserData().subscribe(res => {
      this.userInfo = res;
    }, error => {
      // console.log(error);
    });
  }

  changeImage() {
    if (this.userInfo) {
      if (this.userInfo.user_type == "Client") {
        //this.router.navigate(['client/intro'])
        var link = document.createElement('a');
        document.body.appendChild(link);
        link.setAttribute("type", "hidden");
        link.href = "/client/intro/1";
        link.click();
      }
      else if (this.userInfo.user_type == "Respondent") {
        var link = document.createElement('a');
        document.body.appendChild(link);
        link.setAttribute("type", "hidden");
        link.href = "/respondent/intro/";
        link.click();
        // console.log("1")
      }
    }
  }

  confirmLogout() {
    var link = document.createElement('a');
    document.body.appendChild(link);
    link.setAttribute("type", "hidden");
    link.href = "/accounts/logout/";
    link.click();
  }

  activeClass(event) {
    // debugger;
    // event.target.className = "active";
  }

  goBack(): void {
    this.location.back();
  }

}