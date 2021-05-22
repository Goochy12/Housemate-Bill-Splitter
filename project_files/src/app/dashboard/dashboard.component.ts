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
  owedDetailed;
  owingDetailed;
  newOwedDetailed;
  newOwingDetailed;
  owedSummary: {};
  owingSummary: {};
  userList: {};
  allUnpaidRecords: {};
  displayedColumnsOwed: string[] = ['from', 'item_name', 'amount', 'paid'];
  displayedColumnsOwing: string[] = ['to', 'item_name', 'amount'];
  displayedColumnsAll: string[] = ['to', 'from', 'item_name', 'amount'];
  owedFilterValue: string = null;
  owingFilterValue: string = null;
  owedTotal: Number = null;
  owingTotal: Number = null;

  constructor(private route: ActivatedRoute, private retrievalService: RetrievalService,
    private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {

    this.retrievalService.userObservable$.subscribe(u => {
      if (u) {
        this.user = u;
        this.getAllData();
      } else {
        this.router.navigate([""]);
      }
    });
  }

  getAllData() {
    this.retrievalService.getOwedDetailed(this.user.id).subscribe(res => {
      this.owedDetailed = res;
      this.newOwedDetailed = res;
      this.calculateTotals();
    });
    this.retrievalService.getOwingDetailed(this.user.id).subscribe(res => {
      this.owingDetailed = res;
      this.newOwingDetailed = res;
      this.calculateTotals();
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
  }

  logoff() {
    localStorage.removeItem('userCookie');
    this.router.navigate([""]);
  }

  openDialog() {
    const dialogRef = this.dialog.open(NewRecordDialogComponent, { data: { "userList": this.userList, "user": this.user } });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        if (res.refresh) {
          this.getAllData();
        }
      }
    })
  }

  calculateTotals() {
    this.owedTotal = 0;
    this.owingTotal = 0;

    if (this.newOwedDetailed) {
      this.newOwedDetailed.forEach(element => {
        this.owedTotal += element.Amount;
      });
    }

    if (this.newOwingDetailed) {
      this.newOwingDetailed.forEach(element => {
        this.owingTotal += element.Amount;
      });
    }
  }

  filter() {
    if (this.owedFilterValue) {
      this.newOwedDetailed = this.owedDetailed.filter(c => {
        return c.From == this.owedFilterValue;
      })
    } else {
      this.newOwedDetailed = this.owedDetailed;
    }
    if (this.owingFilterValue) {
      this.newOwingDetailed = this.owingDetailed.filter(c => {
        return c.From == this.owingFilterValue;
      })
    } else {
      this.newOwingDetailed = this.owingDetailed;
    }

    this.calculateTotals();
  }

  markPaid(id: Number) {
    console.log(id);
  }

}