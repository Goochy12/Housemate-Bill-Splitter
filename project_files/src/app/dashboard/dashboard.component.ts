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
  owedDetailed: {};
  owingDetailed: {};
  owedSummary: {};
  owingSummary: {};
  userList: {};
  allUnpaidRecords: {};
  displayedColumnsOwed: string[] = ['from', 'item_name', 'amount'];
  displayedColumnsOwing: string[] = ['to', 'item_name', 'amount'];
  displayedColumnsAll: string[] = ['to', 'from', 'item_name', 'amount'];

  constructor(private route: ActivatedRoute, private retrievalService: RetrievalService,
    private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {

    this.retrievalService.userObservable$.subscribe(u => {
      if (u) {
        this.user = u;
        this.retrievalService.getOwedDetailed(this.user.id).subscribe(res => {
          this.owedDetailed = res;
        });
        this.retrievalService.getOwingDetailed(this.user.id).subscribe(res => {
          this.owingDetailed = res;
        });
        this.retrievalService.getOwedSummary(this.user.id).subscribe(res => {
          this.owedSummary = res[0]["Amount"];
        });
        this.retrievalService.getOwingSummary(this.user.id).subscribe(res => {
          this.owingSummary = res[0]["Amount"];
        });
        this.retrievalService.getAllUnpaidRecords().subscribe(res => {
          this.allUnpaidRecords = res;
        });
        this.retrievalService.getUserList(this.user.groupID).subscribe(res => {
          this.userList = res;
        }
        )
      } else {
        this.router.navigate([""]);
      }
    });
  }

  logoff() {
    localStorage.removeItem('userCookie');
    this.router.navigate([""]);
  }

  openDialog() {
    this.dialog.open(NewRecordDialogComponent, { data: { "userList": this.userList, "user": this.user } })
  }

  getTotal() {
    return 0;
  }

}