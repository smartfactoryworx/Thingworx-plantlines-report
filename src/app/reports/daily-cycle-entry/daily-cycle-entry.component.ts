import { Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { WebDataRocksPivot } from '../@webdatarocks/webdatarocks.angular4';
import * as _moment from 'moment';
import { default as _rollupMoment, Moment } from 'moment';
import { HttpClient } from '@angular/common/http';
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
  Date?: string;
  SKU?: number;
  From?: string;
  To?: string;
  FaultNumber?: number;
  TotalCycleRun ?: number;
  FaultCount ?: number;
  ManualStopCount?: number;
  MaxSpeed?: number;
  Duration?: string;
  InfeedCount?: number;
  OutFeedCount?: number;
  MeanCycleBetweenFault?: number;
  MeanCycleBetweenFaultNManualStop?: number;
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

  constructor(private _snackBar: MatSnackBar, private httpClient: HttpClient, protected dataentryservice: ManualEntryService, private util: UtilService,
    private datePipe: DatePipe, private tableutil: TableUtilsService,) { }


  displayedColumnsAs = {
    Date: { 'DN': 'Date', 'visible': false },
    SKU: { 'DN': 'SKU', 'visible': false },
    From: { 'DN': 'From Date', 'visible': false },
    To: { 'DN': 'To Date', 'visible': false },
    FaultNumber: { 'DN': 'Fault Number', 'visible': false },
    TotalCycleRun: { 'DN': 'Total Cycle Run', 'visible': false },
    FaultCount: { 'DN': 'Fault Count', 'visible': false },
    ManualStopCount: { 'DN': 'Manual Stop Count', 'visible': false },
    MaxSpeed: { 'DN': 'Max Speed', 'visible': false },
    Duration: { 'DN': 'Duration', 'visible': false },
    InfeedCount: { 'DN': 'Infeed Count', 'visible': false },
    OutFeedCount: { 'DN': 'Outfeed Count', 'visible': false },
    FirstFault: { 'DN': 'Fault', 'visible': false },
    MeanCycleBetweenFault: { 'DN': 'MeanCycle b/w Fault', 'visible': false },
    MeanCycleBetweenFaultNManualStop: { 'DN': 'MeanCycle b/w FaultNManualStop', 'visible': false },
  }

  getDisplayedColumns() {
    return this.displayedColumnsAs;
  }
  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    console.log(this.machineName);
    this.GetCycleData(this.machineName);
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

        for (let i = 0; i < c.length; i++) {
          const data = c[i]
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

  GetCycleData(machine) {
    this.machineName = machine;
    this.errorText = "";
    this.DailyCycle = [];
    this.gotData = false;
    this.loading = false;
    console.log(machine, "machine");
    let body = {
      "Machine": machine,
    }

    console.log(JSON.stringify(body));

    let dataSource = 'CycleSetDataInDataTable/Services/getAllCycleReport'

    this.dataentryservice.GetApiURL().subscribe(apipath => {
      console.log(apipath['api']);
      this.dataentryservice.GetMachineData(apipath['apithings'], dataSource, JSON.stringify(body)).subscribe((machinecycledata: any) => {

        console.log("machinecycledata", machinecycledata);

        var c = machinecycledata.rows;
        for (let i = 0; i < c.length; i++) {
          const data = c[i]
          const allCycleData = {
            Date: moment(data.From).format("DD MMM YYYY"),
            SKU: data.SKUDesc,
            From: moment(data.From).format("DD MMM YYYY hh:mm a"),
            To: moment(data.To).format("DD MMM YYYY hh:mm a"),
            FaultNumber: data.FirstFault,
            TotalCycleRun: data.CycleRun,
            FaultCount: data.FirstFault > 0 ? 1 : 0,
            ManualStopCount: data.ManualStop,
            MaxSpeed: data.MaxActualSpeed,
            Duration: new Date(data.Duration * 1000).toISOString().substr(11, 8),//moment(data.Duration).format("hh:mm a"),
            InfeedCount: data.InfeedCount,
            OutFeedCount: data.OutFeedCount,
            //FirstFault: data.FirstFault > 0 ? 1 : 0,
            FirstFault: data.FirstFault,
            MeanCycleBetweenFault: isFinite(this.util.roundOff(data.CycleRun/data.FirstFault)) ? this.util.roundOff(data.CycleRun/data.FirstFault) : 0,
            MeanCycleBetweenFaultNManualStop: this.util.roundOff(data.CycleRun/(data.FirstFault+data.ManualStop))
          }
          this.DailyCycle.push(allCycleData);
        }
        console.log("DailyCycle", this.DailyCycle);
        this.DailyCycle.sort(this.util.dynamicSort('From'));
        this.GetAllFaultCauseData();
        this.vdisplayedColumns = [];
        //console.log(this.fgextype[0]);
        if (Object.keys(machinecycledata).length > 0) {
          if (this.DailyCycle.length > 0) {
            for (let i = 0; i < Object.keys(this.DailyCycle[0]).length; i++) {
              this.vdisplayedColumns.push(Object.keys(this.DailyCycle[0])[i]);
              //console.log("function");
            }
            this.vdisplayedColumns.push('star');
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
          this.gotData = true;
          this.loading = true;
          this.dataSource = null;
          this.displayedColumns = this.vdisplayedColumns;
          this.noData = this.dataSource.filteredData.length;
        }
      });
    });
  }
  exportTable() {
    this.tableutil.exportArrayToExcel(this.DailyCycle, "Daily_Cycle_Report", "Daily_Cycle_Report");
  }
}
