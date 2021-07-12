import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { WebDataRocksPivot } from '../@webdatarocks/webdatarocks.angular4';
import * as _moment from 'moment';
import { default as _rollupMoment, Moment } from 'moment';
import { HttpClient } from '@angular/common/http';
import { ManualEntryService } from '../app-manualentry.service';
import { UtilService } from 'src/app/util.service';
const moment = _rollupMoment || _moment;

interface machinelist {
  machineId: string;
  machineName: string;
  createdDate: Date;
}

interface cycledata {
  CycleRun: number;
  Duration: number;
  FirstFault: number;
  FirstFaultDesc: string;
  From: string;
  InfeedCount: number;
  Machine: string;
  ManualStop: number;
  MaxActualSpeed: number;
  OutFeedCount: number;
  SKU: number;
  SKUDesc: string;
  To: string;
}

@Component({
  selector: 'app-cycle-report',
  templateUrl: './cycle-report.component.html',
  styleUrls: ['./cycle-report.component.scss']
})
export class CycleReportComponent implements OnInit {

  @ViewChild("pivot1") child: WebDataRocksPivot;
  @ViewChild("pivot2") child2: WebDataRocksPivot;

  public MachineList: machinelist[];
  cycleform: FormGroup;
  machine: FormControl;
  public cycleData: cycledata[];
  errorText;
  pivotTableReportComplete: boolean = false;
  gotData: boolean = true;
  public DataWithStructure = [];
  datePipe: any;
  constructor(private httpClient: HttpClient, protected dataentryservice: ManualEntryService, private util: UtilService) { }

  createCurrentTemp() {
    this.machine = new FormControl('', Validators.required);
  }
  createCurrentTempForm() {
    this.cycleform = new FormGroup({
      machine: this.machine,
    });
  }


  BindDefaultData() {
    this.machine.setValue('IS21008a');
  }

  GetMachineData() {
    this.MachineList = [];
    this.httpClient.get('configs/api/api_server.json').subscribe(apipath => {
      console.log(apipath['api']);
      let body = {};
      let dataSource = 'http://103.205.66.170:8082/Thingworx/Things/MachineDetailsMaster/Services/GetDataTableEntries'
      this.dataentryservice.GetMachineData(apipath['apithings'], dataSource, JSON.stringify(body)).subscribe((machineList: any) => {
        // console.log(machineList['rows'], "machineList");
        var c = machineList['rows'];
        for (let i = 0; i < c.length; i++) {
          const a = c[i];
          const data = {
            machineId: a.Machine_MDS,
            machineName: a.Machine_Name,
            createdDate: new Date(moment(a.timestamp).format("DD MMM YYYY hh:mm a"))//a.
          }
          this.MachineList.push(data);
        }
        this.MachineList.sort(this.util.dynamicSort('createdDate'));
        console.log(this.MachineList, "MachineData");
      });

    });
  }
  ngOnInit(): void {
    this.createCurrentTemp();
    this.createCurrentTempForm();
    this.GetMachineData();
    this.BindDefaultData();
    this.GetCycleData(this.machine.value);
  }

  GetCycleData(machine) {
    this.cycleData = [];
    this.gotData = false;
    console.log(machine, "machine");
    let body = {
      "Machine": machine,
    }

    console.log(JSON.stringify(body));

    let dataSource = 'http://103.205.66.170:8082/Thingworx/Things/CycleSetDataInDataTable/Services/getAllCycleReport'

    this.httpClient.get('configs/api/api_server.json').subscribe(apipath => {
      console.log(apipath['api']);
      this.dataentryservice.GetMachineData(apipath['apithings'], dataSource, JSON.stringify(body)).subscribe((machinecycledata: any) => {
        console.log("machinecycledata", machinecycledata);
        var c = machinecycledata.rows;
        for (let i = 0; i < c.length; i++) {
          const data = c[i]
          const allCycleData = {
            CycleRun: data.CycleRun,
            Duration: data.Duration,
            FirstFault: data.FirstFault,
            FirstFaultDesc: data.FirstFaultDesc,
            From: moment(data.From).format("DD MMM YYYY hh:mm a"),
            InfeedCount: data.InfeedCount,
            Machine: data.Machine,
            ManualStop: data.ManualStop,
            MaxActualSpeed: data.MaxActualSpeed,
            OutFeedCount: data.OutFeedCount,
            SKU: data.SKU,
            SKUDesc: data.SKUDesc,
            To: moment(data.To).format("DD MMM YYYY hh:mm a"),
          }
          this.cycleData.push(allCycleData);
        }
        console.log("cycleData", this.cycleData);
        //this.cycleData.sort((a,b)=>a.From-b.To)

        this.gotData = true;
      });
    });
  }

  customizeToolbar(toolbar) {
    let tabs = toolbar.getTabs();
    //console.log(tabs);
    toolbar.getTabs = function () {
      // delete tabs[0];
      // delete tabs[1];
      // delete tabs[2];
      // delete tabs[3];
      // delete tabs[4];
      // delete tabs[5];
      // delete tabs[6];
      return tabs;
    }
  }

  onReportComplete(reportType): void {
    console.log("*****************************onReportComplete****************************", reportType);
    if (reportType === 'SKUwise') {
      this.BindReportData(this.cycleData, reportType);
      this.child.webDataRocks.off("reportcomplete");
    }
    else if (reportType === 'Faultwise') {
      this.BindReportData(this.cycleData, reportType);
      this.child2.webDataRocks.off("reportcomplete");
    }
    this.pivotTableReportComplete = true;
  }

  GetReport(reportType){
    this.onReportComplete(reportType);
  }

  BindReportData(reportData, reportType) {
    console.log(reportData, reportType);
    this.DataWithStructure = [
      {

        CycleRun: {
          type: "number"
        },
        Duration: {
          type: "time"
        },
        FirstFault: {
          type: "number"
        },
        FirstFaultDesc: {
          type: "string"
        },
        From: {
          type: "datetime"
        },
        InfeedCount: {
          type: "number"
        },
        Machine: {
          type: "string"
        },
        ManualStop: {
          type: "number"
        },
        MaxActualSpeed: {
          type: "number"
        },
        OutFeedCount: {
          type: "number"
        },
        SKU: {
          type: "number"
        },
        SKUDesc: {
          type: "string"
        },
        To: {
          type: "datetime"
        }

      }
    ]
    this.DataWithStructure = this.DataWithStructure.concat(reportData);
    console.log(this.DataWithStructure, "DataWithStructure");

    let rowData;
    if (reportType === 'SKUwise') {
      this.child.webDataRocks.off("reportcomplete");
      rowData = {
        uniqueName: "SKUDesc",
        caption: "SKU"
      }
    } else if (reportType === 'Faultwise') {
      this.child2.webDataRocks.off("reportcomplete");
      rowData = {
        uniqueName: "FirstFaultDesc",
        caption: "First Fault"
      }
    }

    var setReportType;
    setReportType = {
      dataSource: {
        data: this.DataWithStructure
      },
      slice: {
        reportFilters: [
          {
            uniqueName: "FirstFaultDesc",
            caption: "First Fault"
          },
          {
            uniqueName: "From",
            caption: "From Date"
          },
          {
            uniqueName: "SKUDesc",
            caption: "SKU"
          },
          {
            uniqueName: "To",
            caption: "To Date"
          }

        ],
        rows: [rowData],
        columns: [
          {
            uniqueName: "Measures"
          }
        ],
        measures: [
          {
            uniqueName: "CycleRun",
            formula: "((\"CycleRun\"))",
            caption: "Cycle Run"
          },
          {
            uniqueName: "Duration",
            formula: "((\"Duration\"))",
            caption: "Duration"
          },
          {
            uniqueName: "InfeedCount",
            formula: "((\"InfeedCount\"))",
            caption: "InfeedCount"

          },
          {
            uniqueName: "OutFeedCount",
            formula: "((\"OutFeedCount\"))",
            caption: "OutFeedCount"

          },
          {
            uniqueName: "MaxActualSpeed",
            formula: "(max(\"MaxActualSpeed\"))",
            caption: "MaxActualSpeed"
          },
          {
            uniqueName: "ManualStop",
            formula: "((\"ManualStop\"))",
            caption: "ManualStop"
          },

        ],
        expands: {
          expandAll: true,
        }
      },
      options: {
        grid: {
          type: "classic",
          //showHierarchyCaptions: false,
          showHeaders: false,
          showTotals: false,
          //showGrandTotals: "rows"
        },
        dateTimePattern: "yyyy-MM-dd HH:mm:ss",
        defaultHierarchySortName: "desc",
        configuratorButton: false,
        showAggregationLabels: false
      }
    };
    if (reportType === 'SKUwise') {
      this.child.webDataRocks.setReport(setReportType);
    } else if (reportType === 'Faultwise') {
      this.child2.webDataRocks.setReport(setReportType);
    }
  }
}