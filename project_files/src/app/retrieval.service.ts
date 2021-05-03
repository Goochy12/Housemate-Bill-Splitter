import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { User } from './types/User';

import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RetrievalService {

  constructor(private http: HttpClient) { }

  private user: User;

  createUser(id: Number) {
    this.user = new User(id);
  }

  login() {

  }

  setUserDetails(id?: Number, first_name?: String, surname?: String, display_name?: String) {

  }

  getUser() {
    return this.user;
  }

  authenticate(username: string, password: string) {
    return this.http.get(environment.backendURL + "/authenticate", { params: new HttpParams().set("username", username).set("password", password) });
    // return new Observable((observer) => {
    //   observer.next({ "exists": true, "id": 1 });
    // });
  }

  getUserDetails(id: Number) {
    return new Observable((observer) => {
      observer.next({ "first_name": "Liam", "surname": "Gooch", "display_name": "Liam Gooch" });
    });
  }
}
