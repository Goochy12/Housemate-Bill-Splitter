import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RetrievalService } from '../retrieval.service';
import { User } from '../types/User';

@Component({
  selector: 'app-new-record-dialog',
  templateUrl: './new-record-dialog.component.html',
  styleUrls: ['./new-record-dialog.component.css']
})
export class NewRecordDialogComponent implements OnInit {

  itemValue: string = null;
  amountValue: string = null;
  userList: [] = null;
  user: User = null;
  owingID: Number = null;
  owedID: Number = null;

  constructor(@Inject(MAT_DIALOG_DATA) public data: {}, private retrievalService: RetrievalService) { }

  ngOnInit(): void {
    this.user = this.data["user"];
    this.userList = this.data["userList"];
  }

  submit() {
    this.retrievalService.submitNewRecord(this.user.id, this.owingID, this.owedID, this.itemValue, Number(this.amountValue));
  }

}
