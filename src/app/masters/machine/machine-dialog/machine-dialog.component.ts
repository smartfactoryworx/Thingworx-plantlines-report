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
  selector: 'app-machine-dialog',
  templateUrl: './machine-dialog.component.html',
  styleUrls: ['./machine-dialog.component.scss']
})
export class MachineDialogComponent implements OnInit {

  machineform: FormGroup;
  ID: FormControl;
  Machine_MDS: FormControl;
  Machine_Name: FormControl;
  Customer_Name: FormControl;
  Installation_Site: FormControl;
  IP_Address: FormControl;
  CycleMeaning: FormControl;
  SpeedIntermsOf: FormControl;
  OutfeedCountInTermsOf: FormControl;
  InfeedInTermsOf :FormControl;
  EndDate =  new FormControl(moment());
  title;
  button;
  machine;
  infeedIntermsofList;
  outfeedIntermsofList;
  speedIntermsofList;


  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<MachineDialogComponent>,
    private httpClient: HttpClient, private _snackBar: MatSnackBar, protected dataentryservice: ManualEntryService) { }


  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  createmachine() {
    this.ID = new FormControl('');
    this.Machine_MDS = new FormControl('', Validators.required);
    this.Machine_Name = new FormControl('', Validators.required);
    this.Customer_Name = new FormControl('', Validators.required);
    this.Installation_Site = new FormControl('', Validators.required);
    this.IP_Address = new FormControl('', Validators.required);
    this.CycleMeaning = new FormControl('');
    this.SpeedIntermsOf = new FormControl('');
    this.OutfeedCountInTermsOf = new FormControl('');
    this.EndDate = new FormControl('');
    this.InfeedInTermsOf = new FormControl('')
  }

  createmachineform() {
    this.machineform = new FormGroup({
      ID: this.ID,
      Machine_MDS: this.Machine_MDS,
      Machine_Name: this.Machine_Name,
      Customer_Name: this.Customer_Name,
      Installation_Site: this.Installation_Site,
      IP_Address: this.IP_Address,
      CycleMeaning: this.CycleMeaning,
      SpeedIntermsOf: this.SpeedIntermsOf,
      OutfeedCountInTermsOf: this.OutfeedCountInTermsOf,
      EndDate: this.EndDate,
      InfeedInTermsOf: this.InfeedInTermsOf
    });
  }
  ngOnInit() {
    console.log(this.data);
    this.createmachine();
    this.createmachineform();

    if (this.data.dataKey.rowdata !== null) {
      console.log(this.data.dataKey.dropdownList);
        this.infeedIntermsofList = this.data.dataKey.dropdownList[0];
        this.outfeedIntermsofList = this.data.dataKey.dropdownList[1];
        this.speedIntermsofList = this.data.dataKey.dropdownList[2];
      if (this.data.dataKey.key === 'AddMachine') {
        this.title = this.data.dataKey.title;
        this.button = this.data.dataKey.button;
        this.ID.setValue('');
        
      } else {
        console.log(this.data.dataKey.rowdata);
        this.title = this.data.dataKey.title;
        this.button = this.data.dataKey.button;
        const c = this.data.dataKey.rowdata;
        this.machineform.patchValue({
          ID: c.ID,
          Machine_MDS: c.Machine_MDS,
          Machine_Name: c.Machine_Name,
          Customer_Name: c.Customer_Name,
          Installation_Site: c.Installation_Site,
          IP_Address: c.IP_Address,
          CycleMeaning: c.CycleMeaning,
          SpeedIntermsOf: c.SpeedIntermsOf,
          OutfeedCountInTermsOf: c.OutfeedCountInTermsOf,
          EndDate: c.EndDate,
          InfeedInTermsOf: c.InfeedInTermsOf
        });
      }

    }
  }

  close() {
    this.dialogRef.close();
  }
}