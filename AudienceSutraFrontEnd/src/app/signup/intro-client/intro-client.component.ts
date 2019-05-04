import { AfterViewInit, Component } from '@angular/core';
import * as $ from 'jquery';
import { Form, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Http } from '@angular/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { IntroService } from '../../services/intro/intro.service';

@Component({
  selector: 'app-intro-client',
  templateUrl: './intro-client.component.html',
  styleUrls: ['./intro-client.component.css']
})
export class IntroClientComponent implements AfterViewInit {

  clientProfileExtra: any;
  userId: number = 0;
  constructor(private fb: FormBuilder,
    private http: Http,
    private route: ActivatedRoute,
    private introService: IntroService,
    private router: Router) {
    this.clientProfileExtra = this.fb.group({
      first_name: new FormControl(''),
      last_name: new FormControl(''),
      middle_name: new FormControl(''),
      company_name: new FormControl(''),
      email_office: new FormControl(''),
      designation: new FormControl(''),
      address: new FormControl(''),
      state: new FormControl(''),
      pincode: new FormControl(''),
      city: new FormControl(''),
      country: new FormControl(''),
      phone: new FormControl(''),
      isClient: new FormControl('True'),
    });
    // this.userId = this.route.snapshot.params['id'];
    // this.route.params.subscribe((params: Params) => {
    //   this.userId = params['id'];
    // });
  }

  getDetails() {
    this.introService.getDetailByUserId(this.userId).subscribe(res => {
      // this.introService.getDetailByUserId().subscribe(res => {
      this.clientProfileExtra.get('first_name').setValue(res.first_name);
      this.clientProfileExtra.get('middle_name').setValue(res.middle_name);
      this.clientProfileExtra.get('last_name').setValue(res.last_name);
      this.clientProfileExtra.get('country').setValue(res.country);
      this.clientProfileExtra.get('state').setValue(res.state);
      this.clientProfileExtra.get('city').setValue(res.city);
      this.clientProfileExtra.get('pincode').setValue(res.pincode);
      this.clientProfileExtra.get('company_name').setValue(res.company_name);
      this.clientProfileExtra.get('email_office').setValue(res.email);
      this.clientProfileExtra.get('designation').setValue(res.designation);
      this.clientProfileExtra.get('address').setValue(res.address);
      this.clientProfileExtra.get('phone').setValue(res.phone);
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
    //     let num = ['one', 'two', 'three', 'four'];
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
      let num = ['one', 'two', 'three', 'four'];
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
    // this.http.post('http://127.0.0.1:8000/api/client_profile/', {
    //   'user': this.userId,
    //   'designation': this.clientProfileExtra.value.designation,
    //   'company_name': this.clientProfileExtra.value.company_name,
    //   'address': this.clientProfileExtra.value.address_street,
    //   'email': this.clientProfileExtra.value.email_office,
    //   'phone': this.clientProfileExtra.value.phone
    // }).subscribe(
    //   (response) => {
    //     console.log('\nResponse is: ' + response.json().id);
    //   },
    //   (error) => console.log(error)
    // );
    // this.http.patch('http://127.0.0.1:8000/api/signup/' + this.userId + '/', this.clientProfileExtra.value).subscribe(
    //   (response) => {
    //     console.log('\nResponse is: ' + response.json().id);
    //     this.router.navigate(['/client/' + this.userId + '/profile']);
    //   },
    //   (error) => console.log(error)
    // );

    // // ===============================

    // let data = {
    //   'user': this.userId,
    //   'designation': this.clientProfileExtra.value.designation,
    //   'company_name': this.clientProfileExtra.value.company_name,
    //   'address': this.clientProfileExtra.value.address_street,
    //   'email': this.clientProfileExtra.value.email_office,
    //   'phone': this.clientProfileExtra.value.phone
    // };
    // this.introService.addClientUser(data).subscribe(res => { },
    //   error => {
    //     console.log(error);
    //   });

    let formData = this.clientProfileExtra.value;
    this.introService.updateRespondentUser(this.userId, formData).subscribe(res => {
      // this.router.navigate(['/client/' + this.userId + '/profile']);
      this.router.navigate(['/client/profile']);
    }, error => {
      console.log(error);
    });
  }
}
