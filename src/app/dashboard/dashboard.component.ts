import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  // deposit - model
  depositForm = this.fb.group({
    amount: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    acno: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    pass: [
      '',
      [
        Validators.required,
        Validators.pattern('[a-z,A-Z,0-9,!@#$%^&*()_+-=]*'),
      ],
    ],
  });
  // withdrawl - model
  withdrawForm = this.fb.group({
    amount1: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    acno1: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    pass1: [
      '',
      [
        Validators.required,
        Validators.pattern('[a-z,A-Z,0-9,!@#$%^&*()_+-=]*'),
      ],
    ],
  });
  //acno to child
  acno: any;

  // date
  lDate: any;

  // username login
  user: any;
  constructor(
    private ds: DataService,
    private fb: FormBuilder,
    private router: Router
  ) {
    // fetch username from local storage

    this.lDate = new Date();
    if (localStorage.getItem('currentUser')) {
      this.user = JSON.parse(localStorage.getItem('currentUser') || '');
    }
  }

  ngOnInit(): void {
    if (!localStorage.getItem('currentAcno')) {
      alert('please login');
      this.router.navigateByUrl('');
    }
  }

  deposit() {
    const acno = this.depositForm.value.acno;
    const amount = this.depositForm.value.amount;
    const pass = this.depositForm.value.pass;
    if (this.depositForm.valid) {
      this.ds.deposit(acno, amount, pass).subscribe(
        (result: any) => {
          alert(result.message);
        },
        (result) => {
          alert(result.error.message);
        }
      );
    } else {
      alert('Invalid form');
    }
  }

  withdraw() {
    const acno = this.withdrawForm.value.acno1;
    const amount = this.withdrawForm.value.amount1;
    const pass = this.withdrawForm.value.pass1;

    if (this.withdrawForm.valid) {
      //async fn call
      const result = this.ds.withdraw(acno, amount, pass).subscribe(
        // 200
        (result: any) => {
          alert(result.message);
        },
        (result) => {
          // 400
          alert(result.error.message);
        }
      );
    } else {
      alert('Invalid form');
    }
  }
  logout() {
    //Remove user login and acno
    localStorage.removeItem('currentAcno');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    this.router.navigateByUrl('');
  }

  // deteteParent()
  deleteParent() {
    this.acno = JSON.parse(localStorage.getItem('currentAcno') || '');
  }

  //cancel() - to set acno as empty
  cancel() {
    this.acno = '';
  }

  //onDelete ($event)
  onDelete(event: any) {
    //async
    this.ds.delete(event).subscribe(
      (result: any) => {
        alert(result.message);
        this.logout();
      },
      (result) => {
        alert(result.error.message);
      }
    );
  }
}
