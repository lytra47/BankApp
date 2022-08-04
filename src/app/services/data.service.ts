import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  // login username
  currentUser: any = '';
  currentAcno: any = '';

  //database
  userDetails: any = {
    1000: {
      acno: 1000,
      userName: 'neil',
      passWord: 1000,
      balance: 5000,
      transaction: [],
    },
    1001: {
      acno: 1001,
      userName: 'max',
      passWord: 1001,
      balance: 5000,
      transaction: [],
    },
    1002: {
      acno: 1002,
      userName: 'lien',
      passWord: 1002,
      balance: 5000,
      transaction: [],
    },
  };

  constructor() {
    this.getDetails();
  }

  //to store data in local storage
  saveDetails() {
    //database
    if (this.userDetails) {
      localStorage.setItem('userDetails', JSON.stringify(this.userDetails));
    }
    //login acno
    if (this.currentAcno) {
      localStorage.setItem('currentAcno', JSON.stringify(this.currentAcno));
    }
    if (this.currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
    }
  }
  //to get data from local storage
  getDetails() {
    //data base
    if (localStorage.getItem('userDetails')) {
      this.userDetails = JSON.parse(localStorage.getItem('userDetails') || '');
    }
    //login acno
    if (localStorage.getItem('currentAcno')) {
      this.currentAcno = JSON.parse(localStorage.getItem('currentAcno') || '');
    }
    //login username
    if (localStorage.getItem('currentUser')) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '');
    }
  }

  // register
  register(userName: any, acno: any, passWord: any) {
    const userDetails = this.userDetails;
    if (acno in userDetails) {
      return false;
    } else {
      userDetails[acno] = {
        acno,
        userName,
        passWord,
        balance: 0,
        transaction: [],
      };
      this.saveDetails();
      return true;
    }
  }
  // login
  login(acno: any, pass: any) {
    const userDetails = this.userDetails;
    if (acno in userDetails) {
      if (pass == userDetails[acno].passWord) {
        this.currentUser = userDetails[acno].userName;
        this.currentAcno = acno;
        this.saveDetails();
        return true;
      } else {
        alert('invalid user password');
        return false;
      }
    } else {
      alert('invalid user id ');
      return false;
    }
  }

  deposit(acno: any, amount: any, pass: any) {
    amount = parseInt(amount);
    const userDetails = this.userDetails;
    if (acno in userDetails) {
      if (pass == userDetails[acno].passWord) {
        userDetails[acno].balance += amount;
        userDetails[acno]['transaction'].push({
          type: 'Credit',
          amount: amount,
        });
        console.log(userDetails);
        this.saveDetails();
        return userDetails[acno]['balance'];
      } else {
        alert('Incorrect password');
        return false;
      }
    } else {
      alert('invalid user id ');
      return false;
    }
  }
  withdraw(acno: any, amount: any, pass: any) {
    amount = parseInt(amount);
    const userDetails = this.userDetails;
    if (acno in userDetails) {
      if (pass == userDetails[acno].passWord) {
        if (userDetails[acno].balance > amount) {
          userDetails[acno].balance -= amount;
          userDetails[acno]['transaction'].push({
            type: 'Debit',
            amount: amount,
          });
          console.log(userDetails);
          this.saveDetails();
          return userDetails[acno]['balance'];
        } else {
          alert(`Insufficient balance!`);
        }
      } else {
        alert('Incorrect password');
        return false;
      }
    } else {
      alert('Invalid user id ');
      return false;
    }
  }

  // TRANSACTIONS
  getTransaction(acno: any) {
    return this.userDetails[acno].transaction;
  }
}
