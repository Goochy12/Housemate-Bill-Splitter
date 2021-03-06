import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { User } from './types/User';

import { environment } from 'src/environments/environment';
import { Observable, of, BehaviorSubject, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RetrievalService {

  constructor(private http: HttpClient) { }

  private user: User;

  private userSource = new BehaviorSubject<User>(undefined);  //create a user object that can be observed
  userObservable$ = this.userSource.asObservable(); //create an observable for the user object

  createUser(id: Number) {
    this.user = new User(id);
    this.userSource.next(this.user);
  }

  login() {

  }

  setUserDetails(id?: Number, first_name?: String, surname?: String, display_name?: String, group_id?: Number) {
    if (id) {
      this.user.id = id;
    }
    if (first_name) {
      this.user.first_name = first_name;
    }
    if (surname) {
      this.user.surname = surname;
    }
    if (display_name) {
      this.user.display_name = display_name;
    }
    if (group_id) {
      this.user.groupID = group_id;
    }
    this.userSource.next(this.user);
  }

  // getUser() {
  //   return this.userObservable$;
  //   // return this.user;
  // }

  authenticate(username: string, password: string) {
    return this.http.get(environment.backendURL + "/authenticate", { params: new HttpParams().set("username", username).set("password", password) });
    // return { "exists": true, "id": 1 };
  }

  getUserDetails(id: Number) {
    return this.http.get(environment.backendURL + "/get_user_details", { params: new HttpParams().set("userID", String(id)) });
  }

  getItemList() {
    return this.http.get(environment.backendURL + "/get_item_list");
  }

  getUserList(groupID: Number) {
    return this.http.get(environment.backendURL + "/get_user_list", { params: new HttpParams().set("groupID", String(groupID)) });
  }

  getOwedDetailed(id: Number, groupID: Number) {
    return this.http.get(environment.backendURL + "/get_owed_detailed", {
      params: new HttpParams().set("userID", String(id))
        .set("groupID", String(groupID))
    });
  }

  getOwingDetailed(id: Number, groupID: Number) {
    return this.http.get(environment.backendURL + "/get_owing_detailed", {
      params: new HttpParams().set("userID", String(id))
        .set("groupID", String(groupID))
    });
  }

  getOwedSummary(id: Number, groupID: Number) {
    return this.http.get(environment.backendURL + "/get_owed_summary", {
      params: new HttpParams().set("userID", String(id))
        .set("groupID", String(groupID))
    });
  }

  getOwingSummary(id: Number, groupID: Number) {
    return this.http.get(environment.backendURL + "/get_owing_summary", {
      params: new HttpParams().set("userID", String(id))
        .set("groupID", String(groupID))
    });
  }

  getAllUnpaidRecords(groupID: Number) {
    return this.http.get(environment.backendURL + "/get_all_unpaid", { params: new HttpParams().set("groupID", String(groupID)) });
  }

  submitNewRecord(userID: Number, groupID: Number, owingID: Number, owedID: Number, item: string, amount: Number) {
    return this.http.get(environment.backendURL + "/submit_record", {
      params: new HttpParams()
        .set("userID", String(userID))
        .set("groupID", String(groupID))
        .set("owingID", String(owingID))
        .set("owedID", String(owedID))
        .set("item", String(item))
        .set("amount", String(amount))
    });
  }

  setRecordPaid(recordID: Number, groupID: Number) {
    return this.http.get(environment.backendURL + "/update_record_paid", {
      params: new HttpParams()
        .set("recordID", String(recordID))
        .set("groupID", String(groupID))
    });
  }
}
