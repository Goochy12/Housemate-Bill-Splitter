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
  owedSummary = 0;
  owingSummary = 0;
  userList: {};
  itemList: {};
  allUnpaidRecords: {};
  newAllUnpaidRecords: {};
  displayedColumnsOwed: string[] = ['from', 'item_name', 'amount', 'paid'];
  displayedColumnsOwing: string[] = ['to', 'item_name', 'amount', 'paid'];
  displayedColumnsAll: string[] = ['to', 'from', 'item_name', 'amount', 'paid'];
  owedFilterValue: string = null;
  owingFilterValue: string = null;
  overviewFilterValue: string = null;
  owedTotal: Number = null;
  owingTotal: Number = null;

  loadingOwedSummary: boolean = true;
  loadingOwingSummary: boolean = true;
  loadingOwed: boolean = true;
  loadingOwing: boolean = true;
  loadingAll: boolean = true;
  loading: boolean = true;

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
    this.retrievalService.getOwedDetailed(this.user.id, this.user.groupID).subscribe(res => {
      if (res) {
        this.loadingOwed = false;
        this.owedDetailed = res;
        this.newOwedDetailed = res;
        this.filterRows();
      }
    });
    this.retrievalService.getOwingDetailed(this.user.id, this.user.groupID).subscribe(res => {
      if (res) {
        this.loadingOwing = false;
        this.owingDetailed = res;
        this.newOwingDetailed = res;
        this.filterRows();
      }
    });
    this.retrievalService.getOwedSummary(this.user.id, this.user.groupID).subscribe(res => {
      if (res[0]) {
        this.owedSummary = res[0].Amount;
      } else {
        this.owedSummary = 0;
      }
      this.loadingOwedSummary = false;
    });
    this.retrievalService.getOwingSummary(this.user.id, this.user.groupID).subscribe(res => {
      if (res[0]) {
        this.owingSummary = res[0].Amount;
      } else {
        this.owingSummary = 0;
      }
      this.loadingOwingSummary = false;
    });
    this.retrievalService.getAllUnpaidRecords(this.user.groupID).subscribe(res => {
      if (res) {
        this.loadingAll = false;
        this.allUnpaidRecords = res;
      }
    });
    this.retrievalService.getUserList(this.user.groupID).subscribe(res => {
      if (res) {
        this.userList = res;
      }
    }
    )
    this.retrievalService.getItemList().subscribe(res => {
      this.itemList = res;
    });
  }

  logoff() {
    localStorage.removeItem('userCookie');
    this.router.navigate([""]);
  }

  openDialog() {
    const dialogRef = this.dialog.open(NewRecordDialogComponent, { data: { "userList": this.userList, "user": this.user, "itemList": this.itemList } });

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

  filterRows() {
    if (this.owedFilterValue) {
      this.newOwedDetailed = this.owedDetailed.filter(c => {
        return c.From == this.owedFilterValue;
      })
    } else {
      this.newOwedDetailed = this.owedDetailed;
    }
    if (this.owingFilterValue) {
      this.newOwingDetailed = this.owingDetailed.filter(c => {
        return c.To == this.owingFilterValue;
      })
    } else {
      this.newOwingDetailed = this.owingDetailed;
    }

    this.calculateTotals();
  }

  markPaid(id: Number) {
    this.retrievalService.setRecordPaid(id, this.user.groupID).subscribe(res => {
      if (res) {
        this.getAllData();
      }
    })
  }

}