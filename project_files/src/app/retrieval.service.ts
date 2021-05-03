import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RetrievalService {

  constructor(private http: HttpClient) { }

  authenticate(username: string, password: string) {
    this.http
  }
}
