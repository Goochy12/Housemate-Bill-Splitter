import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RetrievalService {

  constructor(private http: HttpClient) { }

  authenticate(username: string, password: string) {
    return this.http.get(environment.backendURL + "/authenticate", { params: new HttpParams().set("username", username).set("password", password) });
    // return new Observable((observer) => {
    //   observer.next({ "exists": true, "id": 1 });
    // });
  }

  getUserDetails(id: number) {
    return new Observable((observer) => {
      observer.next({ "first_name": "Liam", "surname": "Gooch", "display_name": "Liam Gooch" });
    });
  }
}
