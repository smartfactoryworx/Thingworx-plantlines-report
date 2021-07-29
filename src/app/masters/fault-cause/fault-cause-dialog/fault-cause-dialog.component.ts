import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ManualEntryService } from '../../../app-manualentry.service';
import * as _moment from 'moment';
import { default as _rollupMoment, Moment } from 'moment';


const moment = _rollupMoment || _moment;
@Component({
  selector: 'app-fault-cause-dialog',
  templateUrl: './fault-cause-dialog.component.html',
  styleUrls: ['./fault-cause-dialog.component.scss']
})
export class FaultCauseDialogComponent implements OnInit {

 faultcauseform: FormGroup;
  ID: FormControl;
  // causeNo: FormControl;
  MachineType: FormControl;
  Machine_MDS: FormControl;
  causeDescription: FormControl;
  title;
  button;
  machinetypeList;
  machineDataList;
  filteredMachine;
  errorText="";

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<FaultCauseDialogComponent>,
    private httpClient: HttpClient, private _snackBar: MatSnackBar, protected dataentryservice: ManualEntryService) { }


  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  createfaultcause() {
    this.ID = new FormControl('');
    // this.causeNo = new FormControl('', Validators.required);
    this.causeDescription = new FormControl('', Validators.required);
    this.Machine_MDS =   new FormControl('');
    this.MachineType = new FormControl('');
  }

  createfaultcauseform() {
    this.faultcauseform = new FormGroup({
      ID: this.ID,
      // causeNo: this.causeNo,
      Machine_MDS:this.Machine_MDS,
      MachineType:this.MachineType,
      causeDescription: this.causeDescription,
    });
  }

  MachineTypeRadio(){
    this.Machine_MDS.setValue('');
  }
  MachineMDSRadio(){
    this.MachineType.setValue('');
  }
  GetFaultCauseDetail(){
    this.errorText ="";
    console.log(this.MachineType.value,this.Machine_MDS.value);
    if((this.MachineType.value ==="" || this.MachineType.value === undefined || this.MachineType.value ==="undefined")&& (this.Machine_MDS.value === "" ||this.Machine_MDS.value === "undefined" || this.Machine_MDS.value === undefined)){
      this.errorText = "Please select the list item"
      return;
    }
    this.dialogRef.close(this.faultcauseform.value);
  }

  ResetErrorMsg(){
    this.errorText = "";
  }
  ngOnInit() {
    console.log(this.data);
    this.createfaultcause();
    this.createfaultcauseform();
    if (this.data.dataKey.rowdata !== null) {
      this.machinetypeList =this.data.dataKey.machineType;
      this.machineDataList = this.data.dataKey.machineList;
      this.filteredMachine = this.data.dataKey.filteredMachine;
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
          // causeNo: c.causeNo,
          Machine_MDS:c.Machine_MDS,
          MachineType:c.MachineType,
          causeDescription: c.causeDescription,
        });
      }

    }
  }

  close() {
    this.dialogRef.close();
  }
}