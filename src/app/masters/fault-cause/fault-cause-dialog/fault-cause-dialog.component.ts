import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ManualEntryService } from '../../../app-manualentry.service';
import * as _moment from 'moment';
import { default as _rollupMoment, Moment } from 'moment';
import { FaultDialogComponent } from '../../fault/fault-dialog/fault-dialog.component';

const moment = _rollupMoment || _moment;
@Component({
  selector: 'app-fault-cause-dialog',
  templateUrl: './fault-cause-dialog.component.html',
  styleUrls: ['./fault-cause-dialog.component.scss']
})
export class FaultCauseDialogComponent implements OnInit {

 faultcauseform: FormGroup;
  ID: FormControl;
  CauseNo: FormControl;
  CauseDesc: FormControl;
  title;
  button;
  



  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<FaultDialogComponent>,
    private httpClient: HttpClient, private _snackBar: MatSnackBar, protected dataentryservice: ManualEntryService) { }


  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  createfaultcause() {
    this.ID = new FormControl('');
    this.CauseNo = new FormControl('', Validators.required);
    this.CauseDesc = new FormControl('', Validators.required);
  }

  createfaultcauseform() {
    this.faultcauseform = new FormGroup({
      ID: this.ID,
      CauseNo: this.CauseNo,
      CauseDesc: this.CauseDesc,
    });
  }
  ngOnInit() {
    console.log(this.data);
    this.createfaultcause();
    this.createfaultcauseform();

    if (this.data.dataKey.rowdata !== null) {
      if (this.data.dataKey.key === 'AddMachine') {
        this.title = this.data.dataKey.title;
        this.button = this.data.dataKey.button;
        this.ID.setValue('');
      } else {
        console.log(this.data.dataKey.rowdata);
        this.title = this.data.dataKey.title;
        this.button = this.data.dataKey.button;
        const c = this.data.dataKey.rowdata;
        this.faultcauseform.patchValue({
          ID: c.ID,
          CauseNo: c.CauseNo,
          CauseDesc: c.CauseDesc,
        });
      }

    }
  }

  close() {
    this.dialogRef.close();
  }
}