import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit, Input, SimpleChanges, ɵConsole, ViewChild, OnChanges } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ManualEntryService } from '../../app-manualentry.service';
import { TableUtilsService } from '../../table-utils.service';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as _moment from 'moment';
import { default as _rollupMoment, Moment } from 'moment';
import { UtilService } from 'src/app/util.service';
import { DatePipe } from '@angular/common';
import { FaultDialogComponent } from '../fault/fault-dialog/fault-dialog.component';
import { FaultCauseDialogComponent } from './fault-cause-dialog/fault-cause-dialog.component';
const moment = _rollupMoment || _moment;

interface faultCauseData {
  ID?: string;
  CauseNo?: number;
  CauseDesc?: string;
}
@Component({
  selector: 'app-fault-cause',
  templateUrl: './fault-cause.component.html',
  styleUrls: ['./fault-cause.component.scss']
})
export class FaultCauseComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
 
  constructor(private httpClient: HttpClient, protected datePipe: DatePipe, private _snackBar: MatSnackBar, public dialog: MatDialog, private manualentryservice: ManualEntryService, private tableutil: TableUtilsService, private util: UtilService) { }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  displayedColumns: string[];// = ['position', 'name', 'weight', 'symbol'];
  gotData: boolean = false;
  vdisplayedColumns: string[];
  public FaultCauseData: faultCauseData[] = [];
  dataSource: MatTableDataSource<faultCauseData>;
  errorText;
  noData;

  displayedColumnsAs = {
    CauseNo: { 'DN': 'Cause Number', 'visible': false },
    CauseDesc: { 'DN': 'Cause Description', 'visible': false },
    ID: { 'DN': 'ID', 'visible': true },

  }
  getDisplayedColumns() {
    return this.displayedColumnsAs;
  }

  GetAllFaultCauseData() {
    this.FaultCauseData = [];
    this.gotData = false;
    let body = {
    }

    console.log(JSON.stringify(body));

    let dataSource = 'MachineFaultCauseMaster/Services/GetDataTableEntries'

    this.manualentryservice.GetApiURL().subscribe(apipath => {
      console.log(apipath['api']);
      this.manualentryservice.GetMachineData(apipath['apithings'], dataSource, JSON.stringify(body)).subscribe((faultcausedata: any) => {
        console.log("faultcausedata", faultcausedata);
        var c = faultcausedata.rows;

        for (let i = 0; i < c.length; i++) {
          const data = c[i]
          //if(data.FirstFault !=0){
          const allFaultCauseData = {
            CauseNo: data && data.CauseNo,
            CauseDesc: data && data.CauseDesc,
            ID: data && data.ID,
          }
          this.FaultCauseData.push(allFaultCauseData);
          //}

        }
        console.log("FaultCauseData", this.FaultCauseData);
        this.vdisplayedColumns = [];
        //console.log(this.fgextype[0]);
        if (Object.keys(faultcausedata).length > 0) {
          if(this.FaultCauseData.length>0){
            for (let i = 0; i < Object.keys(this.FaultCauseData[0]).length; i++) {
              this.vdisplayedColumns.push(Object.keys(this.FaultCauseData[0])[i]);
              //console.log("function");
            }
            this.vdisplayedColumns.push('star');
            this.gotData = true;
            this.dataSource = new MatTableDataSource(this.FaultCauseData);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.displayedColumns = this.vdisplayedColumns;
            this.noData = this.dataSource.filteredData.length;
          }else{
            console.log('hide data');
          this.dataSource = new MatTableDataSource(this.FaultCauseData);
          this.noData = this.dataSource.filteredData.length;
          this.errorText = "No Records Found";
          }
        
        }
        else {
          this.gotData = true;
          this.dataSource = null;
          this.displayedColumns = this.vdisplayedColumns;
          this.noData = this.dataSource.filteredData.length;
        }

      });
    });

  }


  ngOnInit() {
    this.GetAllFaultCauseData();
  }




  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  DailogAddFaultCause() {
    //console.log('add details');
    const dialogRef = this.dialog.open(FaultCauseDialogComponent, {
      width: '700px',
      height: '500px',
      data: {
        dataKey: {
          title: 'Add Fault Cause',
          button: 'Add',
          key: 'AddMachine'
        }
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      //console.log('The dialog was closed', result);
      if (result !== undefined) {
        this.postFaultCauseData(result);
      }
    });
  }

  DailogUpdateFaultCause(element) {
    //console.log("fuction called");
    //console.log("this is updated: " + JSON.stringify(element));
    const dialogRef = this.dialog.open(FaultCauseDialogComponent, {
      width: '700px',
      height: '500px',
      data: {
        dataKey: {
          rowdata: element,
          title: 'Update Details',
          button: 'Update',
          key: 'Update'
        }
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      //console.log('The dialog was closed', result);
      if (result !== undefined) {
        this.postFaultCauseData(result);
      }

    });
  }

  postFaultCauseData(result) {
    console.log(result, "Result....");
    var T = {};
    if (result !== null) {
     
      T = {
       // ID: result.ID,
        CauseNo: 2,
        CauseDesc: "test34",
      }
    }
    console.log(T);
    console.log("Data which is being posted : " + JSON.stringify(T));

    let dataSource = 'MachineFaultCauseMaster/Services/addFaultCauseInDataTable'
    this.manualentryservice.GetApiURL().subscribe(apipath => {
      console.log(apipath['api']);
      this.manualentryservice.GetMachineData(apipath['apithings'], dataSource, JSON.stringify(T)).subscribe(
        (data: any[]) => {
          this.GetAllFaultCauseData();
          this.openSnackBar("Success", "Records Added or Updated Successfully");
        },
        (error: HttpErrorResponse) => {
          //console.log(error);
          if (error.status >= 400) {
            this.openSnackBar("Validation", error.error.error);
          }
          else {
            this.openSnackBar("Error", error.error.error);
          }
        });
    });
  }

  exportTable() {
    this.tableutil.exportArrayToExcel(this.FaultCauseData, "Fault_Cause_Master", "Fault_Cause_Master");
  }
}
