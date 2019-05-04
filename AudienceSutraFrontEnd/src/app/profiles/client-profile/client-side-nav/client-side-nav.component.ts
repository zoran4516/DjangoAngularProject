import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-client-side-nav',
  templateUrl: './client-side-nav.component.html',
  styleUrls: ['./client-side-nav.component.css']
})
export class ClientSideNavComponent implements OnInit {

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
