import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { RetrievalService } from '../retrieval.service';

import { User } from '../types/User';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user: User;
  owed: {};

  constructor(private route: ActivatedRoute, private retrievalService: RetrievalService, private router: Router, private cookieService: CookieService) { }

  ngOnInit(): void {

    this.user = this.retrievalService.getUser();

    if (this.user) {
      this.retrievalService.getOwed(this.user.id).subscribe(res => {
        this.owed = res;
      });
    } else {
      this.router.navigate([""]);
    }
  }

  logoff() {
    this.cookieService.delete('userCookie');
    this.router.navigate([""]);
  }

}
