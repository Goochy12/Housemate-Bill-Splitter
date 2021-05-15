import { Component, OnInit } from '@angular/core';

import { RetrievalService } from '../retrieval.service';

import { ActivatedRoute, Router } from '@angular/router';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  username: string = null;
  password: string = null;

  hidePassword: boolean = true;

  constructor(private route: ActivatedRoute, private retrievalService: RetrievalService, private router: Router, private cookieService: CookieService) { }

  ngOnInit(): void {
    var userCookie = this.cookieService.get("userCookie");
    if (userCookie) {
      this.retrievalService.createUser(Number(userCookie));
      this.getUserDetails(Number(userCookie));
      this.router.navigate(['dashboard']);
    }
  }

  buttonOnSelect() {
    this.retrievalService.authenticate(this.username, this.password).subscribe(authRes => {
      if (authRes) {
        if (authRes["exists"]) {
          this.retrievalService.createUser(authRes['id']);
          this.getUserDetails(authRes['id']);
          this.cookieService.set('userCookie', authRes['id']);
          this.router.navigate(['dashboard']);
        }
      } else {
        console.log(false);
      }
    })
  }

  getUserDetails(id: Number) {
    this.retrievalService.getUserDetails(id).subscribe(detailsRes => {
      this.retrievalService.setUserDetails(null, detailsRes['first_name'], detailsRes['surname'], detailsRes['display_name']);
    });
  }

}
