import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UtilService } from 'src/app/util.service';
import { WebDataRocksPivot } from '../@webdatarocks/webdatarocks.angular4';

// tslint:disable-next-line: class-name
interface machine {
  CycleRun?: number;
  Machine?: string;
  Duration?: number;
  CycleCount?: number;
  ManualStop?: number;
  FirstFault?: number;
  ID?: string;
  MachineMode?: string;
  MachineLocation?: string;
  CustomerName?: string;
  CyclesCountSinceInstall?: number;
  DryRunDurationSinceInstall?: number;
  TotalManualStopsSinceInstall?: number;
  TotalFirstFaultCountSinceInstall?: number;
}

@Component({
  selector: 'app-daily-summary-report',
  templateUrl: './daily-summary-report.component.html',
  styleUrls: ['./daily-summary-report.component.scss']
})

export class DailySummaryReportComponent implements OnInit {
  date: FormControl;
  dailysummaryform: FormGroup;
  @ViewChild('pivot1') child: WebDataRocksPivot;
  public Machines: machine[] = [];
  public temp = [];
  pivotTableReportComplete = false;
  gotData;
  today = new Date();
  constructor(private httpClient: HttpClient, protected datePipe: DatePipe, private utils: UtilService) { }

  // tslint:disable-next-line: typedef
  createFormControlsDailySummary() {
    this.date = new FormControl(null, Validators.required);
  }

  createDailySummaryForm() {
    this.dailysummaryform = new FormGroup({
      date: this.date,
    });
  }

  ngOnInit(): void {
    this.createFormControlsDailySummary();
    this.createDailySummaryForm();
    this.BindDefaultData();
    this.GetData(this.date.value);
  }
  BindDefaultData() {
    this.date.setValue(this.datePipe.transform(this.utils.addDays(new Date(), -1), 'yyyy-MM-dd'));
  }

  GetData(dateevent) {
  let dateSelected = this.datePipe.transform(dateevent, 'yyyy-MM-dd')
  console.log(dateSelected,'Date Selected');
    this.gotData = false;
    this.Machines = [];
    this.httpClient.get('https://capl91gn-lines-postgres.testing.smartfactoryworx.net/api/getsummarydata?date='+dateSelected).subscribe((data: any) => {
      console.log(data.rows);
      for (let i = 0; i < data.rows.length; i++) {
        console.log(data[i]);
        const c = data.rows[i];
        const DailySummaryData =
        {
          CycleRun: c.CycleCount, //Production Mode - non 4,  Dry cycle is 4
          Machine: c && c.Machine,
          Duration: c && c.Duration,
          CycleCount: c && c.CycleCount,
          ProductCycleCount: (c && (c.MachineMode !== 4)) ? c.CycleCount : 0,
          DryCycleCount: (c && (c.MachineMode == 4)) ? c.CycleCount : 0,
          ManualStop: c && c.ManualStop === true ? 1 : 0,
          FirstFault: c && c.FirstFault,
          ID: c && c.ID,
          MachineMode: (c && (c.MachineMode === 4)) ? 'Dry' : 'Product',
          MachineLocation: c && c.MachineLocation,
          CustomerName: c && c.CustomerName,
          CyclesCountSinceInstall: c && c.CyclesCountSinceInstall,
          DryRunDurationSinceInstall: (c && (c.MachineMode == 4)) ? c.Duration : 0,
          TotalManualStopsSinceInstall: c && c.TotalManualStopsSinceInstall,
          TotalFirstFaultCountSinceInstall: c && c.TotalFirstFaultCountSinceInstall,
        };
        this.Machines.push(DailySummaryData);
      }
      console.log(this.Machines, 'MachineData');
    }
    );
  }

  SearchData(data) {
    console.log(data);
    this.temp = [
      {
        CycleRun: {
          type: 'number'
        },
        Machine: {
          type: 'string'
        },
        MachineLocation: {
          type: 'string'
        },
        CustomerName: {
          type: 'string'
        },
        Duration: {
          type: 'time'
        },
        CycleCount: {
          type: 'number'
        },
        ProductCycleCount: {
          type: 'number'
        },
        DryCycleCount: {
          type: 'number'
        },
        FirstFault: {
          type: 'number'
        },
        MachineMode: {
          type: 'string'
        },
        CyclesCountSinceInstall: {
          type: 'number'
        },
        DryRunDurationSinceInstall: {
          type: 'time'
        },
        TotalManualStopsSinceInstall: {
          type: 'number'
        },
        TotalFirstFaultCountSinceInstall: {
          type: 'number'
        },

      }
    ];
    this.temp = this.temp.concat(data);
    console.log(this.temp);
    this.child.webDataRocks.off('reportcomplete');
    this.child.webDataRocks.setReport(
      {
        dataSource: {
          data: this.temp
        },
        options: {
          grid: {
            type: 'classic',
            // showHierarchyCaptions: false,
            showHeaders: false,
            showTotals: false,
          },
          dateTimePattern: 'dd/MM/yyyy HH:mm:ss',
          defaultHierarchySortName: 'desc',
          configuratorButton: false
        },
        slice: {
          reportFilters: [
            {
              uniqueName: 'Machine'
            },
            {
              uniqueName: 'MachineLocation'
            },
            {
              uniqueName: 'CustomerName',
            },
          ],
          rows: [
            {
              uniqueName: 'Machine',
              caption: 'Machine',
            },
            {
              uniqueName: 'MachineLocation',
              caption: 'Machine Location',
            },
            {
              uniqueName: 'CustomerName',
              caption: 'Customer Name',
            },
          ],
          measures: [
            {
              uniqueName: 'CycleRun',
              formula: '(("CycleRun"))',
              caption: 'Total Cycle Run'
            },
            {
              uniqueName: 'Duration',
              formula: '(("Duration"))',
              format: 'decimal2',
              caption: 'Duration',
            },
            {
              uniqueName: 'FirstFault',
              formula: '(("FirstFault"))',
              caption: 'First Fault Count'
            },
            {
              uniqueName: 'MachineMode',
              formula: '(("MachineMode"))',
              caption: 'Machine Mode'
            },
            {
              uniqueName: 'MeanCycleBetweenFault',
              formula: '(("CycleRun")/("FirstFault"))',
              caption: 'MCBF',
              format: '44mvcoma',
            },
            {
              uniqueName: 'MeanCycleBetweenFaultNManualStop',
              formula: '(max(("CycleRun")/("FirstFault" + "ManualStop")))',
              caption: 'MCBF & S',
              format: '44mvcoma',
            },
            {
              uniqueName: 'ProductCycleCount',
              formula: '(("ProductCycleCount"))',
              caption: 'Product Cycle Count'
            },
            {
              uniqueName: 'DryCycleCount',
              formula: '(("DryCycleCount"))',
              caption: 'Dry Cycle Count'
            },
            {
              uniqueName: 'CyclesCountSinceInstall',
              formula: '(max("CyclesCountSinceInstall"))',
              caption: 'Cycle Count since install',
              format: '44mvcoma',
            },
            {
              uniqueName: 'DryRunDurationSinceInstall',
              formula: '(max("DryRunDurationSinceInstall"))',
              caption: 'Dry Run Duration Count since install',
              format: '44mvcoma',
            },
            {
              uniqueName: 'TotalMCBFsinceInstall',
              formula: '(max("CycleRun")/("TotalFirstFaultCountSinceInstall"))',
              caption: 'Total MCBF since install',
              format: '44mvcoma',
            },
            {
              uniqueName: 'TotalMCBF&Ssinceinstall',
              formula: '(max("CycleRun")/("TotalFirstFaultCountSinceInstall" + "TotalManualStopsSinceInstall"))',
              caption: 'Total MCBF & S since install',
              format: '44mvcoma',
            },
            {
              uniqueName: 'TotalManualStopsSinceInstall',
              formula: '(max("TotalManualStopsSinceInstall"))',
              caption: 'Total Manual Stops since install',
              format: '44mvcoma',
            },
            {
              uniqueName: 'TotalFirstFaultCountSinceInstall',
              formula: '(max("TotalFirstFaultCountSinceInstall"))',
              caption: 'Total First Fault Count since install',
              format: '44mvcoma',
            },
          ],
          drills: {
            drillAll: true
          },
          expands: {
            expandAll: true,
            rows: [
              { tuple: [] },
            ]
          }
        },
        formats:
          [
            {
              name: 'decimal2',
              decimalPlaces: 2
            },
            {
              name: 'decimal0',
              decimalPlaces: 0
            },
            {
              name: 'cellcoloring',
              decimalPlaces: 2
            },
            {
              name: '44mvcoma',
              decimalPlaces: 0,
              currencySymbol: '',
              currencySymbolAlign: '',
              nullValue: '0',
              textAlign: 'center',
              infinityValue: '0',
              divideByZeroValue: '0',
            },
          ],
          tableSizes: {
            rows: [
              {
                idx: 0,
                height: 63
              },
    
            ],
            columns: [
              {
                idx: 0,
                width: 120
              },
              {
                idx: 1,
                width: 100
              },
              {
                idx: 2,
                width: 100
              },
              {
                idx: 3,
                width: 100
              },
              {
                idx: 4,
                width: 90
              },
              {
                idx: 5,
                width: 90
              },
              {
                idx: 6,
                width: 80
              },
              {
                idx: 7,
                width: 56
              },
              {
                idx: 8,
                width: 60
              },
              {
                idx: 9,
                width: 65
              },
              {
                idx: 10,
                width: 65
              }
            ]
          },
      }
    );
    this.gotData = true;
  }

  onReportComplete(): void {

    this.SearchData(this.Machines);
    this.child.webDataRocks.off('reportcomplete');
    this.pivotTableReportComplete = true;
  }

  customizeToolbar(toolbar) {
    // console.log(toolbar);
    const tabs = toolbar.getTabs();
    toolbar.getTabs = function () {

      delete tabs[0];
      delete tabs[1];
      delete tabs[2];
      delete tabs[3];
      delete tabs[4];
      delete tabs[5];
      tabs.unshift({
        id: 'fm-tab-newtab',
        title: 'Export',
        rightGroup: true,
        handler: newtabHandler,
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="-17.5 774.5 36 36"><title>menu_export</title><g fill="#555"><path d="M15.446 795.615l-4.289-6.461c-.346-.515-.803-.654-1.428-.654H7.788c-.186 0-.346-.029-.363.156-.008.076.017.07.059.137l4.76 7.108c.042.06.034.337-.017.38-.025.025-.067.219-.102.219H6.699c-.194 0-.354-.063-.363.125-.305 3.23-3.174 5.495-6.407 5.192-2.81-.263-5.039-2.329-5.3-5.14-.009-.195-.168-.178-.363-.178h-5.401c-.076 0-.144-.281-.144-.357 0-.025.008-.157.017-.175l4.76-7.203c.102-.16.05-.245-.109-.347-.06-.035-.118.082-.187.082h-1.94c-.616 0-1.199.145-1.553.658l-4.664 6.547c-.203.304-.545.586-.545.95v9.216c1 .911 1.267 1.646 2.187 1.629h27.625c.903.009 1.188-.709 1.188-1.611v-9.233c1-.373.157-.735-.054-1.04z"></path><path d="M-3.674 783.5H-2.5v10.2c1 1.4 1.764 2.464 3.165 2.371 1.274-.083 1.835-1.097 2.835-2.371v-10.2h1.207c.346 0 .641-.04.65-.387.008-.151-.042-.193-.144-.311l-4.186-5.11c-.228-.287-.642-.302-.929-.073-.042.034-.076.081-.101.115l-4.135 5.172c-.22.271-.187.447.084.668.11.085.244-.074.38-.074z"></path></g></svg>'
      });
      return tabs;
    };
    const newtabHandler = () => {
      this.ExportExcel('summary' + this.datePipe.transform(this.date.value, 'dd-MM-yyyy'), this.datePipe.transform(this.date.value, 'dd-MM-yyyy'));
    };
  }

  ExportExcel(fileName, sheetName) {
    console.log(fileName, sheetName);
    this.child.webDataRocks.exportTo(
      'Excel', {
      filename: fileName,
      excelSheetName: sheetName,
      destinationType: 'file',
      url: 'URL to server script saving the file'
    });
  }
}
