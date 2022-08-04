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
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  uname = '';
  acno = '';
  pass = '';

  // Register - model
  registerForm = this.fb.group({
    uname: ['', [Validators.required, Validators.pattern('[a-z,A-Z]*')]],
    acno: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    pass: [
      '',
      [
        Validators.required,
        Validators.pattern('[a-z,A-Z,0-9,!@#$%^&*()_+-=]*'),
      ],
    ],
  });

  constructor(
    private ds: DataService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {}

  register() {
    const uname = this.registerForm.value.uname;
    const acno = this.registerForm.value.acno;
    const pass = this.registerForm.value.pass;

    if (this.registerForm.valid) {
      // call register in data service
      const result = this.ds.register(uname, acno, pass);
      if (result) {
        alert('Register successfull');
        this.router.navigateByUrl('');
        console.log(this.ds);
      } else alert('Account exist, please login');
    } else {
      alert('Invalid Form');
    }
  }
}
