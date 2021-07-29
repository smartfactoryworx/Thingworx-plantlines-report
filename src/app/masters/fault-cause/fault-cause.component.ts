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

import { FaultCauseDialogComponent } from './fault-cause-dialog/fault-cause-dialog.component';
const moment = _rollupMoment || _moment;

interface faultCauseData {
  ID?: string;
  // causeNo?: number;
  causeDescription?: string;
  MachineType?: string;
  Machine_MDS?: string;
}

interface machinelist {
  machineId: string;
  machineName: string;
  createdDate: Date;
  CycleMeaning:string;
  InfeedInTermsOf:string;
  OutfeedCountInTermsOf:string;
  SpeedIntermsOf:string;
}
@Component({
  selector: 'app-fault-cause',
  templateUrl: './fault-cause.component.html',
  styleUrls: ['./fault-cause.component.scss']
})
export class FaultCauseComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  public MachineList: machinelist[] = [];
  public filteredMachine = this.MachineList.slice();

  displayedColumns: string[];// = ['position', 'name', 'weight', 'symbol'];
  gotData: boolean = false;
  vdisplayedColumns: string[];
  public FaultCauseData: faultCauseData[] = [];
  dataSource: MatTableDataSource<faultCauseData>;
  errorText;
  noData;
  MachineTypeList = [];
  FilteredMachineData = [];
  constructor(private httpClient: HttpClient, protected datePipe: DatePipe, private _snackBar: MatSnackBar, public dialog: MatDialog, private manualentryservice: ManualEntryService, private tableutil: TableUtilsService, private util: UtilService) { }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }



  displayedColumnsAs = {
    // causeNo: { 'DN': 'Cause Number', 'visible': false },
    causeDescription: { 'DN': 'Cause Description', 'visible': false },
    ID: { 'DN': 'ID', 'visible': true },
    Machine_MDS: { 'DN': 'Machine_MDS', 'visible': false },
    MachineType: { 'DN': 'MachineType', 'visible': false },

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
      console.log(apipath['machinetype']);
      this.MachineTypeList = apipath['machinetype'];
      this.manualentryservice.GetMachineData(apipath['apithings'], dataSource, JSON.stringify(body)).subscribe((faultcausedata: any) => {
        console.log("faultcausedata", faultcausedata);
        var c = faultcausedata.rows;

        for (let i = 0; i < c.length; i++) {
          const data = c[i]
          //if(data.FirstFault !=0){
          const allFaultCauseData = {
            // causeNo: data && data.causeNo,
            causeDescription: data && data.causeDescription,
            ID: data && data.ID,
            Machine_MDS: data && data.Machine_MDS === "undefined" ? "" : data.Machine_MDS,
            MachineType: data && data.MachineType === "undefined" ? "" : data.MachineType
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
    this.GetMachineData();
  }

  GetMachineData() {
    this.MachineList = [];
    this.manualentryservice.GetApiURL().subscribe(apipath => {
      console.log(apipath['apithings']);
      let body = {};
      let dataSource = 'MachineDetailsMaster/Services/GetDataTableEntries'
      this.manualentryservice.GetMachineData(apipath['apithings'], dataSource, JSON.stringify(body)).subscribe((machineList: any) => {
        console.log(machineList['rows'], "machineList");
        var c = machineList['rows'];
        for (let i = 0; i < c.length; i++) {
          const a = c[i];
          const data = {
            machineId: a.Machine_MDS,
            machineName: a.Machine_Name,
            createdDate: new Date(moment(a.timestamp).format("DD MMM YYYY hh:mm a")),
            machineDetails: a.Machine_MDS + ' - ' + a.Machine_Name + ' - ' + a.Customer_Name + '(' + moment(new Date(a.timestamp)).format("DD-MM-YYYY") + ')',
            CycleMeaning:a.CycleMeaning,
            InfeedInTermsOf:a.InfeedInTermsOf,
            OutfeedCountInTermsOf:a.OutfeedCountInTermsOf,
            SpeedIntermsOf:a.SpeedIntermsOf          }
          this.MachineList.push(data);
        }
        this.MachineList.sort(this.util.dynamicSort('createdDate'));
        this.filteredMachine = this.MachineList.slice();
        console.log(this.filteredMachine);
        console.log(this.MachineList, "MachineData");
      });
    });
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
          key: 'AddMachine',
          machineType : this.MachineTypeList,
          machineList:this.MachineList,
          filteredMachine:this.filteredMachine
        }
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
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
          key: 'Update',
          machineType : this.MachineTypeList,
          machineList:this.MachineList,
          filteredMachine:this.filteredMachine
        }
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
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
        ID: result.ID,
        // causeNo: result.causeNo,
        causeDescription:  result.causeDescription,
        Machine_MDS:  result.Machine_MDS,
        MachineType:  result.MachineType,
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
