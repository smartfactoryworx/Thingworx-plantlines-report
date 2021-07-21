import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ManualEntryService } from '../../../app-manualentry.service';

@Component({
  selector: 'app-fault-dialog',
  templateUrl: './fault-dialog.component.html',
  styleUrls: ['./fault-dialog.component.scss']
})
export class FaultDialogComponent implements OnInit {
  
  faultform: FormGroup;
  ID : FormControl;
  Machine_Selected: FormControl;
  FaultCode: FormControl;
  FaultDescription: FormControl;
  title;
  button;
  machine;



  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<FaultDialogComponent>,
    private httpClient: HttpClient, private _snackBar: MatSnackBar, protected dataentryservice: ManualEntryService) { }


  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  createfault() {
  this.ID = new FormControl('');
  this.Machine_Selected = new FormControl('', Validators.required);
  this.FaultCode = new FormControl('', Validators.required);
  this.FaultDescription = new FormControl('', Validators.required);
  }

  createfaultform() {
    this.faultform = new FormGroup({
      ID: this.ID,
      Machine_Selected: this.Machine_Selected,
      FaultCode: this.FaultCode,
      FaultDescription: this.FaultDescription,
    });
  }
  ngOnInit() {
    console.log(this.data);
    this.createfault();
    this.createfaultform();

    if (this.data.dataKey.rowdata !== null) {
      if (this.data.dataKey.key === 'AddFault') {
        console.log(this.data.dataKey.machine);
        this.title = this.data.dataKey.title;
        this.button = this.data.dataKey.button;
        this.machine = this.data.dataKey.machine;
        this.Machine_Selected.setValue(this.machine);
        this.ID.setValue('');
      } else {

        console.log(this.data.dataKey.rowdata);
        this.title = this.data.dataKey.title;
        this.button = this.data.dataKey.button;
        const c = this.data.dataKey.rowdata;
        this.faultform.patchValue({
          ID:c.ID,
          Machine_Selected: c.Machine_Selected,
          FaultCode: c.FaultCode,
          FaultDescription: c.FaultDescription,
        });
      }

    }
  }

  close() {
    this.dialogRef.close();
  }



}
