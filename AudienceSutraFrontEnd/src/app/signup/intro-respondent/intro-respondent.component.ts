import { AfterViewInit, Component } from '@angular/core';
import * as $ from 'jquery';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Http } from '@angular/http';
import { IntroService } from '../../services/intro/intro.service';

@Component({
  selector: 'app-intro-respondent',
  templateUrl: './intro-respondent.component.html',
  styleUrls: ['./intro-respondent.component.css']
})
export class IntroRespondentComponent implements AfterViewInit {

  userId: number=0;
  respondentProfileExtra: FormGroup = new FormGroup({
    first_name: new FormControl(''),
    last_name: new FormControl(''),
    middle_name: new FormControl(''),
    state: new FormControl(''),
    pincode: new FormControl(''),
    city: new FormControl(''),
    country: new FormControl(''),
    isRespondent: new FormControl('True'),
  });

  constructor(private route: ActivatedRoute,
    private http: Http,
    private introService: IntroService,
    private router: Router) {
    // this.userId = this.route.snapshot.params['id'];
    // this.route.params.subscribe((params: Params) => {
    //   this.userId = params['id'];
    // });
  }

  getDetails() {
    this.introService.getDetailByUserId(this.userId).subscribe(res => {
      this.respondentProfileExtra.get('first_name').setValue(res.first_name);
      this.respondentProfileExtra.get('middle_name').setValue(res.middle_name);
      this.respondentProfileExtra.get('last_name').setValue(res.last_name);
      this.respondentProfileExtra.get('country').setValue(res.country);
      this.respondentProfileExtra.get('state').setValue(res.state);
      this.respondentProfileExtra.get('city').setValue(res.city);
      this.respondentProfileExtra.get('pincode').setValue(res.pincode);
    }, error => {
      console.log(error);
    });
  }

  ngOnInit() {
    this.getDetails();
  }

  ngAfterViewInit() {
    // $('.num').click(function () {
    //   let item: any = $(this).html();
    //   if (item !== $('.active').html()) {
    //     let num = ['one', 'two', 'three'];
    //     let slide = '#' + num[item - 1];
    //     let act = $('.act');
    //     act.toggle('left');
    //     $('.num').removeClass('active');
    //     $(this).addClass('active');
    //     act.removeClass('act');
    //     $(slide).toggle('left');
    //     $(slide).addClass('act');
    //   }
    // });
  }

  skip(i) {
    $(document).ready(function () {
      let num = ['one', 'two', 'three'];
      let thisSlide = '#' + num[i - 1];
      let nextSlide = '#' + num[i];
      let next = '.' + num[i];
      // $(thisSlide).toggle('left');
      // $('.act').removeClass('act');
      // $('.num').removeClass('active');
      // $(next).addClass('active');
      // $(nextSlide).toggle('left');
      // $(nextSlide).addClass('act');
    });
  }

  submit() {
    // console.log('http://127.0.0.1:8000/api/signup/' + this.userId + '/', this.respondentProfileExtra.value);
    // this.http.patch('http://127.0.0.1:8000/survey/api/signup/' + this.userId + '/', this.respondentProfileExtra.value).subscribe(
    //   (response) => {
    //     console.log('\nResponse is: ' + response.json().id);
    //     this.router.navigate(['/signup/respondent/' + this.userId + '/firstSurvey']);
    //   },
    //   (error) => console.log(error)
    // );

    let formData = this.respondentProfileExtra.value;
    this.introService.updateRespondentUser(this.userId, formData).subscribe(res => {
      // this.router.navigate(['/signup/respondent/' + this.userId + '/firstSurvey']);
      this.router.navigate(['/signup/respondent/firstSurvey']);
    }, error => {
      console.log(error);
    });
  }
}
