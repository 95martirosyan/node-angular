import { User } from "./user.model";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) {}

  signup(user: User) {
    const body = JSON.stringify(user);
    return this.http.post('http://localhost:3000/user', body, httpOptions)
      .map(
        (response: HttpResponse) => response
      )
      .catch(
        (error: HttpResponse) => Observable.throw(error)
      )

  }

  signin(user: User) {
    const body = JSON.stringify(user);
    return this.http.post('http://localhost:3000/user/signin', body, httpOptions)
      .map(
        (response: HttpResponse) => response
      )
      .catch(
        (error: HttpResponse) => Observable.throw(error)
      )

  }

  logout() {
    localStorage.clear();
  }

  isLoggedIn() {
    return localStorage.getItem('token') !== null;
  }
}