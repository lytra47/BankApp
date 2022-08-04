import { Component, OnInit } from '@angular/core';
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

  constructor(private ds: DataService) {
    // to get login acno from data service
    this.currentAcno = this.ds.currentAcno;
    //get transaction array from data service
    this.transaction = this.ds.getTransaction(this.currentAcno);
    console.log(this.transaction);
  }

  ngOnInit(): void {}
}
