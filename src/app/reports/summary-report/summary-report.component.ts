import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import * as _moment from 'moment';
import { default as _rollupMoment, Moment } from 'moment';
const moment = _rollupMoment || _moment;
import { WebDataRocksPivot } from '../@webdatarocks/webdatarocks.angular4';
import { ManualEntryService } from '../app-manualentry.service';

interface machinelist {
  machineId: string;
  machineName: string;
}


@Component({
  selector: 'app-summary-report',
  templateUrl: './summary-report.component.html',
  styleUrls: ['./summary-report.component.scss'],

})
export class SummaryReportComponent implements OnInit {

  @ViewChild("pivot1") child: WebDataRocksPivot;
  public MachineList: machinelist[];
  currenttemp: FormGroup;
  machine: FormControl;
  fromdate = new FormControl(moment());
  todate = new FormControl(moment());
  public skuData = [];
  errorText;
  pivotTableReportComplete: boolean = false;
  public DataWithStructure = [];
  constructor(private httpClient: HttpClient, protected dataentryservice: ManualEntryService) { }

  createCurrentTemp() {
    this.machine = new FormControl('', Validators.required);
    this.fromdate = new FormControl('', Validators.required);
    this.todate = new FormControl('', Validators.required);
  }
  createCurrentTempForm() {
    this.currenttemp = new FormGroup({
      machine: this.machine,
      fromdate: this.fromdate,
      todate: this.todate
    });
  }


  BindDefaultData() {
    this.machine.setValue('IP21033a');
  }

  GetMachineData() {
    this.MachineList = [];
    this.httpClient.get('configs/api/api_server.json').subscribe(apipath => {
      console.log(apipath['api']);
      let body = {};
      let dataSource = 'MachineDetailsMaster/Services/GetDataTableEntries'
      this.dataentryservice.GetMachineData(apipath['apithings'], dataSource, JSON.stringify(body)).subscribe((machineList: any) => {
        console.log(machineList['rows'], "machineList");
        var c = machineList['rows'];
        for (let i = 0; i < c.length; i++) {
          const a = c[i];
          const data = {
            machineId: a.Machine_MDS,
            machineName: a.Machine_Name
          }
          this.MachineList.push(data);
        }

        console.log(this.MachineList, "MachineData");
      });

    });
  }
  ngOnInit(): void {
    this.createCurrentTemp();
    this.createCurrentTempForm();
    this.GetMachineData();
    //this.BindDefaultData();
  }

  PostCurrentTemp(machine, startDate, endDate) {
    console.log(machine, "machine", startDate, endDate);
    let body = {
      "Machine": machine,
      "from": startDate,
      "to": endDate
    }

    console.log(JSON.stringify(body));

    let dataSource = 'CycleSetDataInDataTable/Services/getSKUWiseData'

    this.httpClient.get('configs/api/api_server.json').subscribe(apipath => {
      console.log(apipath['api']);
      this.dataentryservice.GetMachineData(apipath['apithings'], dataSource, JSON.stringify(body)).subscribe((machinedatasku: any) => {
        console.log("machinedatasku", machinedatasku);
        this.skuData.push(machinedatasku.rows);
        console.log("skuData", this.skuData);
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

  onReportComplete(): void {
    console.log("*****************************onReportComplete****************************");
    this.BindReportData(this.skuData[0]);
    this.child.webDataRocks.off("reportcomplete");
    this.pivotTableReportComplete = true;
  }

  BindReportData(reportData) {
    console.log(reportData);
    var setReportType;
    setReportType = {
      dataSource: {
        "dataSourceType": "json",
        "data": reportData
      },
      slice: {
        rows: [
          {
            uniqueName: "MachineName"
          },
          {
            uniqueName: "SKUDesc"
          }
        ],
        columns: [
          {
            uniqueName: "Measures"
          }
        ],
        measures: [
         
          {
            uniqueName: "FirstFaultCount",
            formula: "((\"FirstFaultCount\"))",
            //aggregation: "sum"
          },
          {
            uniqueName: "ManualStopCount",
            aggregation: "sum"
          },
          {
            uniqueName: "MaxSpeed",
            aggregation: "sum"
          },
          {
            uniqueName: "MeanCycleBetweenFault",
            aggregation: "sum"
          },
          {
            uniqueName: "MeanCycleBetweenFaultNManualStop",
            aggregation: "sum"
          },
          {
            uniqueName: "TotalCycleRun",
            aggregation: "sum"
          }
        ],
        "sorting": {
          "row": {
            "type": "desc",
            "tuple": [],
            "measure": "SKU"
          }
        },
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
    this.child.webDataRocks.setReport(setReportType);

  }
}
