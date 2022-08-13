import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss'],
})
export class TransactionComponent implements OnInit {
  // login acno
  currentAcno: any;
  //tjo hold transaction array
  transaction: any;

  constructor(private ds: DataService, private router: Router) {
    // to get login acno from data service
    this.currentAcno = JSON.parse(localStorage.getItem('currentAcno') || '');
    //get transaction array from data service
    this.ds.getTransaction(this.currentAcno).subscribe(
      // 200
      (result: any) => {
        this.transaction = result.transaction;
      },
      (result) => {
        // 400
        alert(result.error.message);
      }
    );
  }

  ngOnInit(): void {}

  logout() {
    //Remove user login and acno
    localStorage.removeItem('currentAcno');
    localStorage.removeItem('currentUser');
    this.router.navigateByUrl('');
  }
}
