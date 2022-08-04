import { Component, OnInit } from '@angular/core';
import {
  ControlContainer,
  FormBuilder,
  RequiredValidator,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  // properties / variable
  aim = 'Your perfect banking partner';
  account = 'Please enter your a/c number';
  // to hold user account number.
  acno = '';
  pass = '';

  // Register - model
  loginForm = this.fb.group({
    acno: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    pass: [
      '',
      [
        Validators.required,
        Validators.pattern('[a-z,A-Z,0-9,!@#$%^&*()_+-=]*'),
      ],
    ],
  });

  // constructor - to initialize objects // first exectuion is constructor
  // DEPENDENCY INJECTION  -should specify acces specifier
  constructor(
    private router: Router,
    private ds: DataService,
    private fb: FormBuilder
  ) {}

  //  life cycle hook of angular
  ngOnInit(): void {}

  // user defined functions

  // //acnochange
  // acnoChange(event: any) {
  //   this.acno = event.target.value; //this to acces properties of a class. doing this so that the value can be accessed by other functions in the same class.
  //   console.log(this.acno);
  // }
  // passChange(event: any) {
  //   this.pass = event.target.value;
  //   console.log(this.pass);
  // }

  // login
  //   login() {
  //     const acno = this.acno;
  //     const pass = this.pass;
  //     const userDetails = this.userDetails;
  //     if (acno in userDetails) {
  //       if (pass == userDetails[acno].passWord) {
  //         alert('login success');
  //       } else {
  //         alert('invalid user id or password');
  //       }
  //     } else {
  //       alert('invalid user id or password');
  //     }
  //   }
  // }
  //   // TEMPLATE REFERENCING
  //   login(a: any, p: any) {
  //     console.log(a.value, p.value);
  //     const acno = a.value;
  //     const pass = p.value;
  //     const userDetails = this.userDetails;
  //     if (acno in userDetails) {
  //       if (pass == userDetails[acno].passWord) {
  //         alert('login success');
  //       } else {
  //         alert('invalid user id or password');
  //       }
  //     } else {
  //       alert('invalid user id or password');
  //     }
  //   }
  // }

  // ngModel login
  login() {
    const acno = this.loginForm.value.acno;
    const pass = this.loginForm.value.pass;
    console.log(this.loginForm.valid);

    if (this.loginForm.valid) {
      const result = this.ds.login(acno, pass);

      if (result) {
        alert('login success');
        this.router.navigateByUrl('dashboard');
        console.log(this.ds.userDetails);
      }
    } else {
      alert('Invalid Form');
    }
  }
}
