import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit, Input, SimpleChanges, ɵConsole, ViewChild } from '@angular/core';
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
import { FaultDialogComponent } from './fault-dialog/fault-dialog.component';
const moment = _rollupMoment || _moment;


interface fault {
  key?: string;
  source?: string;
  sourceType?: string;
  timestamp?: string;
  FaultCode?: number;
  FaultDescription?: string;
  ID?: string;
  Machine_Selected?: string;
  typeSelected?: string;
}
@Component({
  selector: 'app-fault',
  templateUrl: './fault.component.html',
  styleUrls: ['./fault.component.scss']
})
export class FaultComponent implements OnInit{
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @Input() machine: string
  constructor(private httpClient: HttpClient, private _snackBar: MatSnackBar, public dialog: MatDialog, private manualentryservice: ManualEntryService, private tableutil: TableUtilsService,private util: UtilService) { }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
 
  displayedColumns: string[];// = ['position', 'name', 'weight', 'symbol'];
  gotData: boolean = false;
  vdisplayedColumns: string[];
  public faultData: fault[] = [];
  dataSource: MatTableDataSource<fault>;
  errorText;
  noData;

  displayedColumnsAs = {
    key: { 'DN': 'Key', 'visible': true },
    source: { 'DN': 'Source', 'visible': true },
    sourceType: { 'DN': 'Source Type', 'visible': true },
    timestamp: { 'DN': 'Date', 'visible': true },
    FaultCode: { 'DN': 'Fault Code', 'visible': false },
    FaultDescription: { 'DN': 'Fault Description', 'visible': false },
    ID: { 'DN': 'ID', 'visible': true },
    Machine_Selected: { 'DN': 'Machine Selected', 'visible': true },
    typeSelected: { 'DN': 'Type Selected', 'visible': true },
  }
  getDisplayedColumns() {                                                                 
    return this.displayedColumnsAs;
  }

 


  GetfaultData(machine) {
      this.faultData = [];
      this.gotData = false;
      console.log(machine, "machine");
      let body = {
        "Machine": machine,
      }
  
      console.log(JSON.stringify(body));
  
      let dataSource = 'MachineFaultMaster/Services/getFaultMastersData'
  
      this.manualentryservice.GetApiURL().subscribe(apipath => {
        console.log(apipath['api']);
        this.manualentryservice.GetMachineData(apipath['apithings'], dataSource, JSON.stringify(body)).subscribe((faultdata: any) => {
          console.log("faultdata", faultdata);
          var c = faultdata.rows;
          for (let i = 0; i < c.length; i++) {
            const data = c[i]
            //if(data.FirstFault !=0){
            const allFaultData = {
              key: data.key,
              source: data.source,
              sourceType: data.sourceType,
              timestamp: moment(data.timestamp).format("DD MMM YYYY hh:mm a"),
              FaultCode: data.FaultCode,
              FaultDescription: data.FaultDescription,
              ID: data.ID,
              Machine_Selected: data.Machine_Selected,
              typeSelected: data.typeSelected
            }
            this.faultData.push(allFaultData);
            //}
  
          }
          console.log("faultData", this.faultData);
      this.vdisplayedColumns = [];
      //console.log(this.fgextype[0]);
      if (Object.keys(faultdata).length > 0) {
        for (let i = 0; i < Object.keys(this.faultData[0]).length; i++) {
          this.vdisplayedColumns.push(Object.keys(this.faultData[0])[i]);
          //console.log("function");
        }
        this.vdisplayedColumns.push('star');
        this.gotData = true;
        this.dataSource = new MatTableDataSource(this.faultData);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.displayedColumns = this.vdisplayedColumns;
        this.noData = this.dataSource.filteredData.length;
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
    this.GetfaultData(this.machine);
  }



  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  DailogAddFault() {
    //console.log('add details');
    const dialogRef = this.dialog.open(FaultDialogComponent, {
      width: '700px',
      height: '500px',
      data: {
        dataKey: {
          machine: this.machine,
          title: 'Add Fault',
          button: 'Add',
          key:'AddFault'
        }
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      //console.log('The dialog was closed', result);
      if (result !== undefined) {
        this.postfaultData(result);
      }
    });
  }

  DailogUpdateFault(element) {
    //console.log("fuction called");
    //console.log("this is updated: " + JSON.stringify(element));
    const dialogRef = this.dialog.open(FaultDialogComponent, {
      width: '700px',
      height: '500px',
      data: {
        dataKey: {
          machine: this.machine,
          rowdata: element,
          title: 'Update Details',
          button: 'Update',
          key:'Update'
        }
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      //console.log('The dialog was closed', result);
      if (result !== undefined) {
        this.postfaultData(result);
      }

    });
  }

  postfaultData(result) {
    console.log(result,"Result....");
    var T = {};
    if (result !== null) {
      T = {
        ID : result.ID,
        Machine_Selected: result.Machine_Selected,
        FaultCode: result.FaultCode,
        FaultDescription: result.FaultDescription,
      }
    }
    console.log(T);
    console.log("Data which is being posted : " + JSON.stringify(T));

    let dataSource = 'MachineFaultMaster/Services/addFaultsInDataTableFromFrontEnd'
    this.manualentryservice.GetApiURL().subscribe(apipath => {
      console.log(apipath['api']);
      this.manualentryservice.GetMachineData(apipath['apithings'], dataSource, JSON.stringify(T)).subscribe(
        (data: any[]) => {
          this.GetfaultData(this.machine);
          this.openSnackBar("Success", "Records Added or Updated Successfully");
        },
        (error: HttpErrorResponse) => {
          //console.log(error);
          if (error.status >= 400) {
            this.openSnackBar("Validation", error.error);
          }
          else {
            this.openSnackBar("Error", error.error);
          }
        });
    });
  }

  exportTable() {
    this.tableutil.exportArrayToExcel(this.faultData, "Fault_Master", "Fault_Master");
  }
}

