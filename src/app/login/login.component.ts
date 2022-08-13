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

  // ngModel login
  login() {
    var acno = this.loginForm.value.acno;
    var pass = this.loginForm.value.pass;

    if (this.loginForm.valid) {
      // calling login - dataservice - async
      this.ds.login(acno, pass).subscribe(
        (result: any) => {
          localStorage.setItem(
            'currentUser',
            JSON.stringify(result.currentUsername)
          );
          localStorage.setItem(
            'currentAcno',
            JSON.stringify(result.currentAcno)
          );
          localStorage.setItem('token', JSON.stringify(result.token));
          alert(result.message);
          this.router.navigateByUrl('dashboard');
        },
        (result) => {
          alert(result.error.message);
        }
      );
    } else {
      alert('Invalid Form');
    }
  }
}
