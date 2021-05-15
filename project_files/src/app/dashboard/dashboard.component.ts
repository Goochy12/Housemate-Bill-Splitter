import { Component, OnInit, Input, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { RetrievalService } from '../retrieval.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NewRecordDialogComponent } from '../new-record-dialog/new-record-dialog.component';

import { User } from '../types/User';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user: User;
  owed: {};
  displayedColumnsOwed: string[] = ['from', 'item_name', 'amount'];

  constructor(private route: ActivatedRoute, private retrievalService: RetrievalService,
    private router: Router, private cookieService: CookieService, public dialog: MatDialog) { }

  ngOnInit(): void {

    this.retrievalService.userObservable$.subscribe(u => {
      if (u) {
        this.user = u;
        this.retrievalService.getOwed(this.user.id).subscribe(res => {
          this.owed = res;
        });
      } else {
        this.router.navigate([""]);
      }
    });
  }

  logoff() {
    this.cookieService.delete('userCookie');
    this.router.navigate([""]);
  }

  openDialog() {
    this.dialog.open(NewRecordDialogComponent, { data: null })
  }

}