import { Component, OnInit } from '@angular/core';
import { IntroService } from '../services/intro/intro.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userName: String;
  userDesignation: String;
  img_src: String;
  constructor(private introService: IntroService) { }

  ngOnInit() {
    this.getDetails();
  }

  getDetails() {
    this.introService.getLogedInUserData().subscribe(res => {
      this.userName = res.first_name;
      this.userDesignation = res.designation;
      this.img_src = res.profile_pic;
    }, error => {
      console.log(error);
    });
  }
}
