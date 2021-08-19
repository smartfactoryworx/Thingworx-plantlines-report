import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit, Input, SimpleChanges, ɵConsole, ViewChild, OnChanges } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ManualEntryService } from '../../app-manualentry.service';
import { TableUtilsService } from '../../table-utils.service';
import { MachineDialogComponent } from './machine-dialog/machine-dialog.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as _moment from 'moment';
import { default as _rollupMoment, Moment } from 'moment';
import { UtilService } from 'src/app/util.service';
import { DatePipe } from '@angular/common';
const moment = _rollupMoment || _moment;

interface machineData {
  Machine_MDS?: string;
  Machine_Name?: string;
  key?: string;
  source?: string;
  sourceType?: string;
  timestamp?: Date;
  Customer_Name?: string;
  ID?: string;
  Installation_Site?: string;
  IP_Address?: string;
  Type?: string;
  CycleMeaning?: string;
  SpeedIntermsOf?: string;
  OutfeedCountInTermsOf?: string;
  EndDate?: string;
  InfeedInTermsOf?: string;
  Field1?: string;
  isDisconnected?:boolean;
  createdAt?:string;
}
@Component({
  selector: 'app-machine',
  templateUrl: './machine.component.html',
  styleUrls: ['./machine.component.scss']
})
export class MachineComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @Input() machine: string
  constructor(private httpClient: HttpClient, protected datePipe: DatePipe, private _snackBar: MatSnackBar, public dialog: MatDialog, private manualentryservice: ManualEntryService, private tableutil: TableUtilsService, private util: UtilService) { }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  displayedColumns: string[];// = ['position', 'name', 'weight', 'symbol'];
  gotData: boolean = false;
  vdisplayedColumns: string[];
  public MachineData: machineData[] = [];
  dataSource: MatTableDataSource<machineData>;
  errorText;
  noData;
  InfeedIntermsofList = [] ;
  OutfeedIntermsofList = [];
  SpeedIntermsofList = [];
  MachineTypeList = [];
  AllList;
  displayedColumnsAs = {
    Machine_MDS: { 'DN': 'Machine MDS', 'visible': false },
    Machine_Name: { 'DN': 'Machine Name', 'visible': false },
    key: { 'DN': 'Key', 'visible': true },
    source: { 'DN': 'Source', 'visible': true },
    sourceType: { 'DN': 'Source Type', 'visible': true },
    timestamp: { 'DN': 'Created Date', 'visible': true },
    createdAt: { 'DN': 'Created Date', 'visible': false },
    Customer_Name: { 'DN': 'Customer Name', 'visible': false },
    ID: { 'DN': 'ID', 'visible': true },
    Installation_Site: { 'DN': 'Installation Site', 'visible': false },
    IP_Address: { 'DN': 'IP Address', 'visible': true },
    //Type: { 'DN': 'Type', 'visible': false },
    CycleMeaning: { 'DN': 'Cycle Meaning', 'visible': false },
    SpeedIntermsOf: { 'DN': 'Speed IntermsOf', 'visible': false },
    OutfeedCountInTermsOf: { 'DN': 'Outfeed Count InTermsOf', 'visible': false },
    EndDate: { 'DN': 'EndDate', 'visible': false },
    InfeedInTermsOf: { 'DN': 'Infeed InTermsOf', 'visible': false },
    Field1: { 'DN': 'Machine Type', 'visible': false },
    isDisconnected: { 'DN': 'Machine Connection Status', 'visible': true },
   
  }
  getDisplayedColumns() {
    return this.displayedColumnsAs;
  }

  GetAllMachineData() {
    this.MachineData = [];
    this.gotData = false;
    let body = {
    }

    console.log(JSON.stringify(body));

    let dataSource = 'MachineDetailsMaster/Services/GetDataTableEntries'

    this.manualentryservice.GetApiURL().subscribe(apipath => {
      console.log(apipath['api']);
      this.InfeedIntermsofList = apipath['infeedintermsof'];
      this.OutfeedIntermsofList  = apipath['outfeedintermsof'];
      this.SpeedIntermsofList  = apipath['speedintermsof'];
      this.MachineTypeList  = apipath['machinetype'];
      this.AllList = [this.InfeedIntermsofList,this.OutfeedIntermsofList,this.SpeedIntermsofList,this.MachineTypeList];
      this.manualentryservice.GetMachineData(apipath['apithings'], dataSource, JSON.stringify(body)).subscribe((machinedata: any) => {
        console.log("machinedata", machinedata);
        var c = machinedata.rows;
     
        for (let i = 0; i < c.length; i++) {
          const data = c[i]
          //if(data.FirstFault !=0){
          const allMachineData = {
            Machine_MDS: data && data.Machine_MDS,
            Machine_Name: data && data.Machine_Name,
            key: data && data.key,
            source: data && data.source,
            sourceType: data && data.sourceType,
            timestamp: data && new Date(moment(data.createdAt).format("DD-MMM-YY hh:mm")),
            createdAt:data && moment(data.createdAt).format("DD-MMM-YYYY"),
            Customer_Name: data && data.Customer_Name,
            ID: data && data.ID,
            Installation_Site: data && data.Installation_Site,
            IP_Address: data && data.IP_Address,
            // Type: data && data.Type,
            CycleMeaning: data && data.CycleMeaning,
            SpeedIntermsOf: data && data.SpeedIntermsOf,
            OutfeedCountInTermsOf: data && data.OutfeedCountInTermsOf,
            EndDate: data && this.datePipe.transform(data.EndDate, 'yyyy-MM-dd'), 
            InfeedInTermsOf: data && data.InfeedInTermsOf,
            Field1: data && data.Field1,
            isDisconnected: data && data.isDisconnected,
         
          }
          this.MachineData.push(allMachineData);
          //}

        }
        console.log("MachineData", this.MachineData);
        this.MachineData.sort(this.util.dynamicSort('timestamp'));
        this.vdisplayedColumns = [];
        //console.log(this.fgextype[0]);
        if (Object.keys(machinedata).length > 0) {
          if (this.MachineData.length > 0) {
          for (let i = 0; i < Object.keys(this.MachineData[0]).length; i++) {
            this.vdisplayedColumns.push(Object.keys(this.MachineData[0])[i]);
            //console.log("function");
          }
          this.vdisplayedColumns.push('machinestatus');
          this.vdisplayedColumns.push('star');
          this.gotData = true;
          this.dataSource = new MatTableDataSource(this.MachineData);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.displayedColumns = this.vdisplayedColumns;
          this.noData = this.dataSource.filteredData.length;
        }else{
          console.log('hide data');
          this.dataSource = new MatTableDataSource(this.MachineData);
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
    this.GetAllMachineData();
  }




  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  DailogAddMachine() {
    //console.log('add details');
    const dialogRef = this.dialog.open(MachineDialogComponent, {
      width: '800px',
      height: '500px',
      data: {
        dataKey: {
          title: 'Add Machine',
          button: 'Add',
          key: 'AddMachine',
          dropdownList:  this.AllList
        }
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      //console.log('The dialog was closed', result);
      if (result !== undefined) {
        this.postMachineData(result);
      }
    });
  }

  DailogUpdateMachine(element) {
    //console.log("fuction called");
    //console.log("this is updated: " + JSON.stringify(element));
    const dialogRef = this.dialog.open(MachineDialogComponent, {
      width: '800px',
      height: '500px',
      data: {
        dataKey: {
          rowdata: element,
          title: 'Update Details',
          button: 'Update',
          key: 'Update',
          dropdownList:  this.AllList
        }
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      //console.log('The dialog was closed', result);
      if (result !== undefined) {
        this.postMachineData(result);
      }

    });
  }

  postMachineData(result) {
    console.log(result, "Result....");
    var T = {};
    var PostData = {};
    if (result !== null) {
      T ={
        ID: result.ID,
        Machine_MDS: result.Machine_MDS,
        Machine_Name: result.Machine_Name,
        Customer_Name: result.Customer_Name,
        Installation_Site: result.Installation_Site,
        IP_Address: result.IP_Address,
        CycleMeaning: result.CycleMeaning,
        SpeedIntermsOf: result.SpeedIntermsOf,
        OutfeedCountInTermsOf: result.OutfeedCountInTermsOf,
        EndDate: result.EndDate ? this.datePipe.transform(result.EndDate, 'yyyy-MM-dd') : "", 
        InfeedInTermsOf: result.InfeedInTermsOf,
        Field1: result.Field1,
        isDisconnected:result.isDisconnected
      }
    }
    console.log(T);
    console.log("Data which is being posted : " + JSON.stringify(T));

    let dataSource = 'MachineDetailsMaster/Services/addMachineMasters'
    PostData = {
      "datasource": dataSource,
      "input": T 
    }
  
    console.log("Data which is being posted : " + JSON.stringify(PostData));

    this.manualentryservice.GetApiURL().subscribe(apipath => {
      console.log(apipath['apifaultthings']);
      this.manualentryservice.PostFaultData(apipath['apifaultthings'], JSON.stringify(PostData)).subscribe(
        (data: any[]) => {
          //this.GetCycleData(this.machineName);
          console.log(data);
          this.openSnackBar("Success", "Records Added or Updated Successfully");
          this.GetAllMachineData();
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
    this.tableutil.exportArrayToExcel(this.MachineData, "Machine_Master", "Machine_Master");
  }
}
