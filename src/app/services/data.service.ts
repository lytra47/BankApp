import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

//global headers
const options = {
  headers: new HttpHeaders(),
};

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  // register
  register(userName: any, acno: any, passWord: any) {
    const data = {
      userName,
      acno,
      passWord,
    };
    //register api call - asynchronous
    return this.http.post(' http://localhost:3000/register ', data);
  }
  // login
  login(acno: any, pass: any) {
    //req body
    const data = {
      acno,
      pass,
    };
    // login api - async
    return this.http.post('http://localhost:3000/login', data);
  }
  // to get headers with token and attach it to its request header.
  getOptions() {
    //fetch the token from localstorage
    const token = JSON.parse(localStorage.getItem('token') || '');
    //to get reqeust header create an object for HttpHeaders
    let headers = new HttpHeaders();
    //append token inside the header
    if (token) {
      headers = headers.append('x-access-token', token);
      options.headers = headers;
    }
    return options;
  }

  // deposit
  deposit(acno: any, amount: any, pass: any) {
    //req body
    const data = {
      acno,
      amount,
      pass,
    };
    // deposit api - async
    return this.http.post(
      'http://localhost:3000/deposit',
      data,
      this.getOptions()
    );
  }
  // withdraw
  withdraw(acno: any, amount: any, pass: any) {
    //req body
    const data = {
      acno,
      amount,
      pass,
    };
    // deposit api - async
    return this.http.post(
      'http://localhost:3000/withdraw',
      data,
      this.getOptions()
    );
  }

  // TRANSACTIONS
  getTransaction(acno: any) {
    //req body
    const data = {
      acno,
    };
    // transaction api - async
    return this.http.post(
      'http://localhost:3000/transaction',
      data,
      this.getOptions()
    );
  }

  //delete api
  delete(acno: any) {
    return this.http.delete('http://localhost:3000/onDelete/' + acno);
  }
}
