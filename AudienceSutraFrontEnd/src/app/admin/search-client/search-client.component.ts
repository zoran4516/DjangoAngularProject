import { Component, OnInit } from '@angular/core';
import { Http } from "@angular/http";

@Component({
  selector: 'app-search-client',
  templateUrl: './search-client.component.html',
  styleUrls: ['./search-client.component.scss']
})
export class SearchClientComponent implements OnInit {
  panelOpenState = false;
  clients: any;

  constructor(private http: Http) { }

  ngOnInit() {
    this.http.get('/survey/api/client/survey/').subscribe(res => {
      this.clients = res.json();
      // console.log(this.clients);
    }, error => {
      console.log(error);
    });
  }

}
