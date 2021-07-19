import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ManualEntryService } from '../../../app-manualentry.service';

@Component({
  selector: 'app-sku-dailog',
  templateUrl: './sku-dailog.component.html',
  styleUrls: ['./sku-dailog.component.scss']
})
export class SkuDailogComponent implements OnInit  {
  
  skuform: FormGroup;
  ID : FormControl;
  Machine_Selected: FormControl;
  SKU_Code: FormControl;
  SKU_Details: FormControl;
  title;
  button;
  machine;



  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<SkuDailogComponent>,
    private httpClient: HttpClient, private _snackBar: MatSnackBar, protected dataentryservice: ManualEntryService) { }


  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  createsku() {
  this.ID = new FormControl('');
  this.Machine_Selected = new FormControl('', Validators.required);
  this.SKU_Code = new FormControl('', Validators.required);
  this.SKU_Details = new FormControl('', Validators.required);
  }

  createskuform() {
    this.skuform = new FormGroup({
      ID: this.ID,
      Machine_Selected: this.Machine_Selected,
      SKU_Code: this.SKU_Code,
      SKU_Details: this.SKU_Details,
    });
  }
  ngOnInit() {
    console.log(this.data);
    this.createsku();
    this.createskuform();

    if (this.data.dataKey.rowdata !== null) {
      if (this.data.dataKey.key === 'AddSKU') {
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
        this.skuform.patchValue({
          ID:c.ID,
          Machine_Selected: c.Machine_Selected,
          SKU_Code: c.SKU_Code,
          SKU_Details: c.SKU_Details,
        });
      }

    }
  }

  close() {
    this.dialogRef.close();
  }



}
