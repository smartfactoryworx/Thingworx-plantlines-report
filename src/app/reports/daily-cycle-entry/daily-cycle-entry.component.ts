import { Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { WebDataRocksPivot } from '../@webdatarocks/webdatarocks.angular4';
import * as _moment from 'moment';
import { default as _rollupMoment, Moment } from 'moment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ManualEntryService } from '../../app-manualentry.service';
import { UtilService } from 'src/app/util.service';
import { DatePipe, Time } from '@angular/common';
import { TableUtilsService } from 'src/app/table-utils.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
const moment = _rollupMoment || _moment;


interface dailyCycle {
  ID?: string;
  Date?: string;
  SKU?: number;
  From?: string;
  To?: string;
  FaultNumber?: number;
  TotalCycleRun?: number;
  FaultCount?: number;
  ManualStopCount?: number;
  MaxSpeed?: number;
  Duration?: string;
  InfeedCount?: number;
  OutFeedCount?: number;
  MeanCycleBetweenFault?: number;
  MeanCycleBetweenFaultNManualStop?: number;
  CauseSelected?: string;
}

interface faultCauseData {
  ID?: string;
  causeNo?: number;
  causeDescription?: string;
}
@Component({
  selector: 'app-daily-cycle-entry',
  templateUrl: './daily-cycle-entry.component.html',
  styleUrls: ['./daily-cycle-entry.component.scss']
})
export class DailyCycleEntryComponent implements OnChanges {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  public DailyCycle: dailyCycle[];
  public FaultCauseData: faultCauseData[] = [];
  dataSource: MatTableDataSource<dailyCycle>;
  errorText = "";
  noData;
  machineName;
  pivotTableReportComplete: boolean = false;
  gotData: boolean = false;
  loading: boolean = true;
  public DataWithStructure = [];
  displayedColumns: string[];// = ['position', 'name', 'weight', 'symbol'];
  vdisplayedColumns: string[];
  //datePipe: any;
  lastUpdated;
  lastValueofArray: string;
  CycleMeaning = "";
  InfeedInTermsOf = "";
  OutfeedCountInTermsOf = "";
  SpeedIntermsOf = "";
  machineData;
  machineType: any;
  constructor(private _snackBar: MatSnackBar, private httpClient: HttpClient, public dataentryservice: ManualEntryService, private util: UtilService,
    private datePipe: DatePipe, private tableutil: TableUtilsService,) { }



  displayedColumnsAs = {
    ID: { 'DN': 'ID', 'visible': true },
    Date: { 'DN': 'Date', 'visible': false },
    SKU: { 'DN': 'SKU', 'visible': false },
    From: { 'DN': 'From Date', 'visible': false },
    To: { 'DN': 'To Date', 'visible': false },
    FaultNumber: { 'DN': 'Fault Description', 'visible': false },
    TotalCycleRun: { 'DN': 'Total Cycle Run (' + this.CycleMeaning + ')', 'visible': false },
    FaultCount: { 'DN': 'Fault Count', 'visible': true },
    ManualStopCount: { 'DN': 'Manual Stop Count', 'visible': true },
    MaxSpeed: { 'DN': 'Max Speed (' + this.SpeedIntermsOf + ')', 'visible': false },
    Duration: { 'DN': 'Duration', 'visible': false },
    InfeedCount: { 'DN': 'Infeed Count (' + this.InfeedInTermsOf + ')', 'visible': false },
    OutFeedCount: { 'DN': 'Outfeed Count (' + this.OutfeedCountInTermsOf + ')', 'visible': false },
    FirstFault: { 'DN': 'Fault', 'visible': true },
    MeanCycleBetweenFault: { 'DN': 'MCBF', 'visible': false },
    MeanCycleBetweenFaultNManualStop: { 'DN': 'MCBFS', 'visible': false },
    CauseSelected: { 'DN': 'Cause Selected', 'visible': false },
  }



  getDisplayedColumns() {
    return this.displayedColumnsAs;
  }


  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    this.GetCycleData(this.machineData);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }


  GetAllFaultCauseData() {
    console.log(this.machineType, this.machineName);
    this.FaultCauseData = [];
    let body = {
    }

    console.log(JSON.stringify(body));

    let dataSource = 'MachineFaultCauseMaster/Services/GetDataTableEntries'

    this.dataentryservice.GetApiURL().subscribe(apipath => {
      console.log(apipath['api']);
      this.dataentryservice.GetMachineData(apipath['apithings'], dataSource, JSON.stringify(body)).subscribe((faultcausedata: any) => {
        console.log("faultcausedata", faultcausedata);
        var c = faultcausedata.rows;
        console.log(this.machineType,"MTYPE");
        let FilterData = c.filter(item => this.machineType.includes(item.MachineType) || item.Machine_MDS === this.machineName);

        console.log(FilterData, "FilterData");
        console.log(FilterData.length);
        for (let i = 0; i < FilterData.length; i++) {
          const data = FilterData[i]
          //if(data.FirstFault !=0){
          const allFaultCauseData = {
            causeNo: data && data.causeNo,
            causeDescription: data && data.causeDescription,
            ID: data && data.ID,
          }
          this.FaultCauseData.push(allFaultCauseData);
          //}

        }
        console.log("FaultCauseData", this.FaultCauseData);
      });
    });

  }

  GetCycleData(machineDetails) {
    this.dataentryservice.getDataLoaded(false);
    console.log(machineDetails);

    console.log(machineDetails[0].machineId, machineDetails[0].CycleMeaning, machineDetails[0].InfeedInTermsOf, machineDetails[0].OutfeedCountInTermsOf, machineDetails[0].SpeedIntermsOf);
    this.machineData = machineDetails;
    this.machineName = machineDetails[0].machineId;
    this.machineType = machineDetails[0].Field1;
    this.CycleMeaning = machineDetails[0].CycleMeaning;
    this.InfeedInTermsOf = machineDetails[0].InfeedInTermsOf;
    this.OutfeedCountInTermsOf = machineDetails[0].OutfeedCountInTermsOf;
    this.SpeedIntermsOf = machineDetails[0].SpeedIntermsOf;

    this.errorText = "";
    this.DailyCycle = [];
    this.gotData = false;
    this.loading = false;

    let body = {
      "Machine": this.machineName,
    }

    console.log(JSON.stringify(body));

   // let dataSource = 'CycleSetDataInDataTable/Services/allDataJoint'

    this.dataentryservice.GetApiURL().subscribe(apipath => {
      console.log(apipath['api']);
      this.dataentryservice.GetMachineRowData(this.machineName).subscribe((machinecycledata: any) => {

        console.log("machinecycledata", machinecycledata);

        var c = machinecycledata.rows;
        c.sort((a,b)=>{
          console.log((new Date(a.StartTime)));
          return moment(Number(b.StartTime)).valueOf()-moment(Number(a.StartTime)).valueOf();
        });
        for (let i = 0; i < c.length; i++) {
          const data = c[i]
          const allCycleData = {
            ID: data && data.ID,
            Date: data && moment(Number(data.StartTime)).utcOffset(330).format("DD MMM YYYY"),
            SKU: data && data.SKU_Details,
            From: data && moment(Number(data.StartTime)).utcOffset(330).format("HH:mm"),
            To: data && moment(Number(data.StopTime)).utcOffset(330).format("HH:mm"),
            FaultNumber: data && data.ManualStop === true ? "Manual Stop" : data && data.FaultDescription ,
            TotalCycleRun: data && data.CycleCount,
            FaultCount: data && data.FirstFault > 0 ? 1 : 0,
            ManualStopCount: data && data.ManualStop === true ? 1 : 0,
            MaxSpeed: data && data.MaxActualSpeed,
            Duration: data && new Date(data.Duration * 1000).toISOString().substr(11, 8),//moment(data.Duration).format("hh:mm a"),
            InfeedCount: data && data.InfeedCount,
            OutFeedCount: data && data.OutFeedCount,
            //FirstFault: data.FirstFault > 0 ? 1 : 0,
            FirstFault: data && data.FirstFault,
            MeanCycleBetweenFault: data && isFinite(this.util.roundOff(data.CycleCount / data.FirstFault)) ? this.util.roundOff(data.CycleCount / data.FirstFault) : 0,
            MeanCycleBetweenFaultNManualStop: data && isFinite(this.util.roundOff(data.CycleCount / (data.FirstFault + data.ManualStop === true ? 1 : 0))) ? this.util.roundOff(data.CycleCount / (data.FirstFault + data.ManualStop === true ? 1 : 0)) : 0,
            CauseSelected: data && data.CauseSelected
          }
          this.DailyCycle.push(allCycleData);
        }
        console.log("DailyCycle", this.DailyCycle);
        console.log(this.DailyCycle);
        //this.DailyCycle.sort(this.util.dynamicDescSort('OutFeedCount'));
        this.displayedColumnsAs = {
          ID: { 'DN': 'ID', 'visible': true },
          Date: { 'DN': 'Date', 'visible': false },
          SKU: { 'DN': 'SKU', 'visible': false },
          From: { 'DN': 'From Date', 'visible': false },
          To: { 'DN': 'To Date', 'visible': false },
          FaultNumber: { 'DN': 'Fault Description', 'visible': false },
          TotalCycleRun: { 'DN': 'Total Cycle Run (' + this.CycleMeaning + ')', 'visible': false },
          FaultCount: { 'DN': 'Fault Count', 'visible': true },
          ManualStopCount: { 'DN': 'Manual Stop Count', 'visible': true },
          MaxSpeed: { 'DN': 'Max Speed (' + this.SpeedIntermsOf + ')', 'visible': false },
          Duration: { 'DN': 'Duration', 'visible': false },
          InfeedCount: { 'DN': 'Infeed Count (' + this.InfeedInTermsOf + ')', 'visible': false },
          OutFeedCount: { 'DN': 'Outfeed Count (' + this.OutfeedCountInTermsOf + ')', 'visible': false },
          FirstFault: { 'DN': 'Fault', 'visible': true },
          MeanCycleBetweenFault: { 'DN': 'MCBF', 'visible': false },
          MeanCycleBetweenFaultNManualStop: { 'DN': 'MCBFS', 'visible': false },
          CauseSelected: { 'DN': 'Cause Selected', 'visible': false },
        }

        this.GetAllFaultCauseData();
        this.vdisplayedColumns = [];
        //console.log(this.fgextype[0]);
        if (Object.keys(machinecycledata).length > 0) {
          if (this.DailyCycle.length > 0) {
            for (let i = 0; i < Object.keys(this.DailyCycle[0]).length; i++) {
              this.vdisplayedColumns.push(Object.keys(this.DailyCycle[0])[i]);
              //console.log("function");
            }
            //this.vdisplayedColumns.push('CauseSelected');
            console.log(this.vdisplayedColumns)

            this.lastValueofArray = this.vdisplayedColumns.slice(-1)[0];
            console.log(this.lastValueofArray);

            this.gotData = true;
            this.loading = true;
            this.dataSource = new MatTableDataSource(this.DailyCycle);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.displayedColumns = this.vdisplayedColumns;
            this.noData = this.dataSource.filteredData.length;
          }
          else {
            console.log('hide data');
            this.dataSource = new MatTableDataSource(this.DailyCycle);
            this.noData = this.dataSource.filteredData.length;
            this.gotData = false;
            this.loading = true;
            //this.errorText = "No Records Found";
          }
        }

        else {
          this.dataentryservice.getDataLoaded(true);
          this.gotData = true;
          this.loading = true;
          this.dataSource = null;
          this.displayedColumns = this.vdisplayedColumns;
          this.noData = this.dataSource.filteredData.length;
        }
        this.dataentryservice.getDataLoaded(true);
      });
    });
  }

  PostRowData(element, event) {
    console.log(element, event.value);
    let T = {};
    let PostData = {};
    let dataSource = 'causeEnteredData/Services/saveData'

    if (element !== null) {
      T = {
        RawDataID: element.ID,
        CauseSelected: event.value,
      }
    }
    PostData = {
      "datasource": dataSource,
      "input": T
    }

    console.log("Data which is being posted : " + JSON.stringify(PostData));

    this.dataentryservice.GetApiURL().subscribe(apipath => {
      console.log(apipath['apifaultthings']);
      this.dataentryservice.PostFaultData(apipath['apifaultthings'], JSON.stringify(PostData)).subscribe(
        (data: any[]) => {
          this.GetCycleData(this.machineData);
          console.log(data);
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
    this.tableutil.exportArrayToExcel(this.DailyCycle, "Daily_Cycle_Report", "Daily_Cycle_Report");
  }
}
