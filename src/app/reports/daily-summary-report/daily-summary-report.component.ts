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
  DurationSinceInstall?: number;
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
    this.GetData();
  }
  BindDefaultData() {
    this.date.setValue(this.datePipe.transform(this.utils.addDays(new Date(), -1), 'yyyy-MM-dd'));
  }

  GetData() {
    this.gotData = false;
    this.Machines = [];
    this.httpClient.get('https://capl91gn-lines-postgres.testing.smartfactoryworx.net/api/getsummarydata?date=2022-04-19').subscribe((data: any) => {
      console.log(data.rows);
      for (let i = 0; i < data.rows.length; i++) {
        console.log(data[i]);
        const c = data.rows[i];
        const DailySummaryData =
        {
          CycleRun: (c && (c.MachineMode !== 4)) ? c.CycleCount : 0,
          Machine: c && c.Machine,
          Duration: c && c.Duration,
          CycleCount: c && c.CycleCount,
          ManualStop: c && c.ManualStop === true ? 1 : 0,
          FirstFault: c && c.FirstFault,
          ID: c && c.ID,
          MachineMode: (c && (c.MachineMode === 4)) ? 'Dry' : 'Product',
          MachineLocation: c && c.MachineLocation,
          CustomerName: c && c.CustomerName,
          CyclesCountSinceInstall: c && c.CyclesCountSinceInstall,
          DurationSinceInstall: c && c.DurationSinceInstall,
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
        MachineName: {
          type: 'string'
        },
        Duration: {
          type: 'time'
        },
        CycleCount: {
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
        DurationSinceInstall: {
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
            {
              uniqueName: 'MachineName',
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
              formula: '(sum("Duration"))',
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
              formula: '(("CycleRun")/("FirstFault" + "ManualStop"))',
              caption: 'MCBF & S',
              format: '44mvcoma',
            },
            {
              uniqueName: 'CyclesCountSinceInstall',
              formula: '(("CyclesCountSinceInstall"))',
              caption: 'Cycle Count since install',
              format: '44mvcoma',
            },
            {
              uniqueName: 'DurationSinceInstall',
              formula: '(("DurationSinceInstall"))',
              caption: 'Duration Count since install',
              format: '44mvcoma',
            },
            {
              uniqueName: 'TotalManualStopsSinceInstall',
              formula: '(("TotalManualStopsSinceInstall"))',
              caption: 'Total Manual Stops since install',
              format: '44mvcoma',
            },
            {
              uniqueName: 'TotalFirstFaultCountSinceInstall',
              formula: '(("TotalFirstFaultCountSinceInstall"))',
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
          ]
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
      delete tabs[6];
      delete tabs[7];

      return tabs;
    };

  }
}
