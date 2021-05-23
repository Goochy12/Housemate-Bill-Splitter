import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RetrievalService } from '../retrieval.service';
import { User } from '../types/User';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-new-record-dialog',
  templateUrl: './new-record-dialog.component.html',
  styleUrls: ['./new-record-dialog.component.css']
})
export class NewRecordDialogComponent implements OnInit {

  itemValue: string = null;
  amountValue: string = null;
  userList: [] = null;
  itemList = null;
  filteredOptions: Observable<string[]>;
  user: User = null;
  owingID: Number = null;
  owedID: Number = null;
  owedDisplayName: string = null;

  myControl = new FormControl();

  constructor(@Inject(MAT_DIALOG_DATA) public data: {}, private retrievalService: RetrievalService, private dialogRef: MatDialogRef<NewRecordDialogComponent>) { }

  ngOnInit(): void {
    this.user = this.data["user"];
    this.userList = this.data["userList"];
    this.itemList = this.data["itemList"];

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.itemList.filter(option => {
      return option.name.toLowerCase().indexOf(filterValue) === 0;
    });
  }

  submit() {
    // console.log(this.owedID);
    this.retrievalService.submitNewRecord(
      this.user.id
      , this.user.groupID
      , this.owingID
      , this.owedID
      , this.itemValue
      , Number(this.amountValue)).subscribe(res => {
        if (res) {
          this.dialogRef.close({ "refresh": true });
        }
      });
  }

}
