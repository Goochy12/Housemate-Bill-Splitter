import { Component, OnInit } from '@angular/core';

import { RetrievalService } from '../retrieval.service';

import { ActivatedRoute, Router } from '@angular/router';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  username: string = null;
  password: string = null;

  constructor(private route: ActivatedRoute, private retrievalService: RetrievalService, private router: Router,) { }

  ngOnInit(): void {
  }

  buttonOnSelect() {
    this.retrievalService.authenticate(this.username, this.password).subscribe(res => {
      if (res) {
        if (res["exists"]) {
          this.router.navigate(['dashboard']);
        }
      } else {
        console.log(false);
      }
    })
  }

}
