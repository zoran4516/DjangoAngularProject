import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  @Input() page: any;
  @Input() userId: any;

  url: any;
  constructor(private route: ActivatedRoute) {
    this.userId = this.route.snapshot.params['id'];
    this.route.params.subscribe((params: Params) => {
      this.userId = params['id'];
    });
  }

  ngOnInit() {
  }

}
