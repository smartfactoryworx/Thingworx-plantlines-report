import {
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { WebDataRocksPivot } from '../@webdatarocks/webdatarocks.angular4';
import * as _moment from 'moment';
import { default as _rollupMoment, Moment } from 'moment';
import { HttpClient } from '@angular/common/http';
import { ManualEntryService } from '../../app-manualentry.service';
import { UtilService } from 'src/app/util.service';
import { DatePipe } from '@angular/common';
import Highcharts, { seriesType } from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
HighchartsMore(Highcharts);
import exporting from 'highcharts/modules/exporting';
const moment = _rollupMoment || _moment;
import { MatSnackBar } from '@angular/material/snack-bar';

interface HourlyData {
  Machine: string;
  FromTime: string;
  ToTime: string;
  SKU: number;
  SKUDesc: string;
  TotalCycleRun: number;
  AvgSpeed: number;
  FaultCount: number;
  FaultDuration: number;
  ManualStopCount: number;
  ManualStopDuration: number;
  RunTime: number;
  WaitTime: number;
  BlockTime: number;
  IdleTime: number;
  PowerOffTime: number;
  Date: string;
}
@Component({
  selector: 'app-hourly-report',
  templateUrl: './hourly-report.component.html',
  styleUrls: ['./hourly-report.component.scss'],
})
export class HourlyReportComponent implements OnInit {
  @ViewChild('pivot1') child: WebDataRocksPivot;
  public hourlyData: HourlyData[];
  errorText = '';
  Highcharts: typeof Highcharts = Highcharts;
  pivotTableReportComplete: boolean = false;
  gotData: boolean = true;
  public DataWithStructure = [];
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  machineName: any;
  machineData: any;
  CycleMeaning: any;
  InfeedInTermsOf: any;
  OutfeedCountInTermsOf: any;
  SpeedIntermsOf: any;

  constructor(
    protected dataentryservice: ManualEntryService,
    private util: UtilService,
    private datePipe: DatePipe,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    // this.GetCycleData();
    // setTimeout(() => {
    //   this.BindReportData(this.hourlyData);
    // }, 2000);
    // this.openSnackBar('No data found for this machine ', 'Pls, select another machine');
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  noFunction(value) {}

  GetCycleData(machineDetails?, startDate?, endDate?) {
    console.log(
      machineDetails,
      this.range.value.start,
      this.range.value.end,
      this.datePipe.transform(this.range.value.start, 'yyyy-MM-dd'),
      'HEYYO'
    );
    const startTime = this.datePipe.transform(
      this.range.value.start,
      'yyyy-MM-dd'
    );
    const endTime = this.datePipe.transform(this.range.value.end, 'yyyy-MM-dd');
      // let momentStartDate = moment(this.range.value.start,"YYYY-MM-DD");
      // let momentStopDate = moment(this.range.value.end,"YYYY-MM-DD");
      // let dateDiff = moment.duration(momentStopDate.diff(momentStartDate)).asDays();
      // console.log(momentStartDate,momentStopDate,dateDiff, 'This is difference');


    // this.machineName = machineDetails[0].machineId;
    this.errorText = '';
    this.hourlyData = [];
    this.gotData = false;

    let body = {
      Machine: machineDetails.FilteredMachineData[0].machineId,
      From: startTime,
      To: endTime,
    };

    console.log(JSON.stringify(body));

    let dataSource = 'hourlyDataSetInDataTable/Services/getReport';

    // this.dataentryservice.GetApiURL().subscribe((apipath) => {
    //   console.log(apipath['api']);
    //   this.dataentryservice
    //     .GetMachineData(apipath['apithings'], dataSource, JSON.stringify(body))
    //     .subscribe((hourlyData: any) => {
    //       console.log('HourlyData', hourlyData);
    //       if (hourlyData.rows.length === 0)
    //         this.openSnackBar(
    //           'No data found for this machine ',
    //           'Pls, select another machine'
    //         );
    //       hourlyData.rows.forEach((el) => {
    //         this.hourlyData.push({
    //           Machine: el?.Machine.split('_')[0],
    //           FromTime: moment(el?.FromTime).format('HH:mm'),
    //           ToTime: moment(el?.ToTIme).format('HH:mm'),
    //           SKU: el?.SKU,
    //           SKUDesc: el?.SKUDesc,
    //           TotalCycleRun: el?.TotalCycleRun,
    //           AvgSpeed: el?.AvgSpeed,
    //           FaultCount: el?.FaultCount,
    //           FaultDuration: el?.FaultDuration,
    //           ManualStopCount: el?.ManualStopCount,
    //           ManualStopDuration: el?.ManualStopDuration,
    //           RunTime: el?.RunTIme,
    //           WaitTime: el?.WaitTIme,
    //           BlockTime: el?.BlockTIme,
    //           IdleTime: el?.IdleTime,
    //           PowerOffTime: el?.PowerOffTime,
    //           Date: moment(el?.cDate).format('DD-MM-YYYY'),
    //         });
    //       });

    //       console.log('HourlyData', this.hourlyData);
    //       if (this.hourlyData.length === 0) {
    //         this.gotData = true;
    //         this.errorText = ' No Record Found';
    //       } else {
    //         this.gotData = true;
    //         this.errorText = '';
    //       }
    //       this.hourlyData !== undefined && this.BindReportData(this.hourlyData);
    //     });
    // });
  }

  customizeToolbar(toolbar, reportType, fileName, sheetName) {
    let tabs = toolbar.getTabs();
    console.log(tabs);

    toolbar.getTabs = function () {
      delete tabs[0];
      delete tabs[1];
      delete tabs[2];
      delete tabs[3];
      delete tabs[4];
      delete tabs[5];
      delete tabs[6];
      tabs.unshift({
        id: 'fm-tab-newtab',
        title: 'Export',
        rightGroup: true,
        handler: newtabHandler,
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="-17.5 774.5 36 36"><title>menu_export</title><g fill="#555"><path d="M15.446 795.615l-4.289-6.461c-.346-.515-.803-.654-1.428-.654H7.788c-.186 0-.346-.029-.363.156-.008.076.017.07.059.137l4.76 7.108c.042.06.034.337-.017.38-.025.025-.067.219-.102.219H6.699c-.194 0-.354-.063-.363.125-.305 3.23-3.174 5.495-6.407 5.192-2.81-.263-5.039-2.329-5.3-5.14-.009-.195-.168-.178-.363-.178h-5.401c-.076 0-.144-.281-.144-.357 0-.025.008-.157.017-.175l4.76-7.203c.102-.16.05-.245-.109-.347-.06-.035-.118.082-.187.082h-1.94c-.616 0-1.199.145-1.553.658l-4.664 6.547c-.203.304-.545.586-.545.95v9.216c1 .911 1.267 1.646 2.187 1.629h27.625c.903.009 1.188-.709 1.188-1.611v-9.233c1-.373.157-.735-.054-1.04z"></path><path d="M-3.674 783.5H-2.5v10.2c1 1.4 1.764 2.464 3.165 2.371 1.274-.083 1.835-1.097 2.835-2.371v-10.2h1.207c.346 0 .641-.04.65-.387.008-.151-.042-.193-.144-.311l-4.186-5.11c-.228-.287-.642-.302-.929-.073-.042.034-.076.081-.101.115l-4.135 5.172c-.22.271-.187.447.084.668.11.085.244-.074.38-.074z"></path></g></svg>',
      });
      return tabs;
    };

    var newtabHandler = () => {
      this.Export_Excel(reportType, fileName, sheetName);
    };
  }

  BindReportData(reportData) {
    console.log(reportData);
    this.DataWithStructure = [
      {
        Date: {
          type: 'string',
        },
        Machine: {
          type: 'string',
        },
        FromTime: {
          type: 'date time',
        },
        ToTime: {
          type: 'date time',
        },
        SKU: {
          type: 'string',
        },
        SKUDesc: {
          type: 'string',
        },
        TotalCycleRun: {
          type: 'number',
        },
        AvgSpeed: {
          type: 'number',
        },
        FaultCount: {
          type: 'number',
        },
        FaultDuration: {
          type: 'number',
        },
        ManualStopCount: {
          type: 'number',
        },
        ManualStopDuration: {
          type: 'number',
        },
        RunTime: {
          type: 'number',
        },
        WaitTime: {
          type: 'number',
        },
        BlockTime: {
          type: 'number',
        },
        IdleTime: {
          type: 'number',
        },
        PowerOffTime: {
          type: 'number',
        },
      },
    ];

    this.DataWithStructure = this.DataWithStructure.concat(reportData);

    var setReportSummary;

    setReportSummary = {
      dataSource: {
        data: this.DataWithStructure,
      },
      slice: {
        reportFilters: [
          // {
          //   uniqueName: "Date",
          //   caption: "Date"
          // }
          {
            uniqueName: 'SKU',
            caption: 'SKU',
          },
        ],
        rows: [
          //   {
          //   uniqueName: "FirstFaultDesc",
          //   caption: "First Fault"
          // },
          {
            uniqueName: 'Date',
            caption: 'Date',
          },
          {
            uniqueName: 'Machine',
            caption: 'Machine',
          },
          {
            uniqueName: 'FromTime',
            caption: 'From Time',
          },
          {
            uniqueName: 'ToTime',
            caption: 'To Time',
          },
          {
            uniqueName: 'SKU',
            caption: 'SKU',
          },
          // {
          //   uniqueName: "SKUDesc",
          //   caption: "SKUDesc",
          //   // format: "44mvcoma",
          // },
          // {
          //   uniqueName: "TotalCycleRun",
          //   caption: "TotalCycleRun",
          //   // format: "44mvcoma",
          // },
          // {
          //   uniqueName: "AvgSpeed",
          //   caption: "AvgSpeed",
          //   // format: "44mvcoma",
          // },
          // {
          //   uniqueName: "FaultCount",
          //   caption: "FaultCount",
          //   // format: "44mvcoma",
          // },
          // {
          //   uniqueName: "FaultDuration",
          //   caption: "FaultDuration",
          //   // format: "44mvcoma",
          // },
          // {
          //   uniqueName: "ManualStopCount",
          //   caption: "ManualStopCount",
          //   // format: "44mvcoma",
          // },
          // {
          //   uniqueName: "ManualStopDuration",
          //   caption: "ManualStopDuration",
          //   // format: "44mvcoma",
          // },
          // {
          //   uniqueName: "RunTime",
          //   caption: "RunTime",
          //   // format: "44mvcoma",
          // },
          // {
          //   uniqueName: "WaitTime",
          //   caption: "WaitTime",
          //   // format: "44mvcoma",
          // },
          // {
          //   uniqueName: "BlockTime",
          //   caption: "BlockTime",
          //   // format: "44mvcoma",
          // },
          // {
          //   uniqueName: "IdleTime",
          //   caption: "IdleTime",
          //   // format: "44mvcoma",
          // },
          // {
          //   uniqueName: "PowerOffTime",
          //   caption: "PowerOffTime",
          //   // format: "44mvcoma",
          // },
        ],
        columns: [
          {
            uniqueName: 'Measures',
          },
        ],
        measures: [
          // {
          //   uniqueName: "Machine",
          //   formula: "((\"Machine\"))",
          //   caption: "Machine"
          // },
          // {
          //   uniqueName: "FromTime",
          //   formula: "((\"FromTime\"))",
          //   caption: "From Time",
          //   format: "onlyAlign",
          // },
          // {
          //   uniqueName: "ToTime",
          //   formula: "((\"ToTime\"))",
          //   caption: "To Time",
          //   format: "onlyAlign",
          // },
          // {
          //   uniqueName: "SKU",
          //   formula: "((\"SKU\"))",
          //   caption: "SKU"
          // },

          // {
          //   uniqueName: 'SKUDesc',
          //   formula: '(("SKUDesc"))',
          //   caption: 'SKUDesc',
          //   format: '44mvcoma',
          // },
          {
            uniqueName: 'TotalCycleRun',
            formula: '(("TotalCycleRun"))',
            caption: 'TotalCycleRun',
            format: '44mvcoma',
          },
          {
            uniqueName: 'AvgSpeed',
            formula: '(("AvgSpeed"))',
            caption: 'AvgSpeed',
            format: '44mvcoma',
          },
          {
            uniqueName: 'FaultCount',
            formula: '(("FaultCount"))',
            caption: 'FaultCount',
            format: '44mvcoma',
          },
          {
            uniqueName: 'FaultDuration',
            formula: '(("FaultDuration"/60))',
            caption: 'Fault(In Min.)',
            format: '44mvcoma1',
          },
          {
            uniqueName: 'ManualStopCount',
            formula: '(("ManualStopCount"))',
            caption: 'ManualStopCount',
            format: '44mvcoma',
          },
          {
            uniqueName: 'ManualStopDuration',
            formula: '(("ManualStopDuration"/60))',
            caption: 'ManualStop(In Min.)',
            format: '44mvcoma1',
          },
          {
            uniqueName: 'RunTime',
            formula: '(("RunTime"/60))',
            caption: 'RunTime(In Min.)',
            format: '44mvcoma1',
          },
          {
            uniqueName: 'WaitTime',
            formula: '(("WaitTime"/60))',
            caption: 'WaitTime(In Min.)',
            format: '44mvcoma1',
          },
          {
            uniqueName: 'BlockTime',
            formula: '(("BlockTime"/60))',
            caption: 'BlockTime(In Min.)',
            format: '44mvcoma1',
          },
          {
            uniqueName: 'IdleTime',
            formula: '(("IdleTime"/60))',
            caption: 'IdleTime(In Min.)',
            format: '44mvcoma1',
          },
          {
            uniqueName: 'PowerOffTime',
            formula: '(("PowerOffTime"/60))',
            caption: 'PowerOff(In Min.)',
            format: '44mvcoma1',
          },
        ],

        expands: {
          expandAll: true,
        },
      },
      formats: [
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
        {
          name: '44mvcoma1',
          decimalPlaces: 1,
          currencySymbol: '',
          currencySymbolAlign: '',
          nullValue: '0',
          textAlign: 'center',
          infinityValue: '0',
          divideByZeroValue: '0',
        },
        {
          name: 'onlyAlign',
          currencySymbol: '',
          currencySymbolAlign: '',
          nullValue: '',
          textAlign: 'center',
        },
      ],
      tableSizes: {
        rows: [
          {
            idx: 0,
            height: 50
          },
        ],
        columns: [
          {
            idx: 1,
            width: 90,
          },
          {
            idx: 2,
            width: 65,
          },
          {
            idx: 3,
            width: 65,
          },
          {
            idx: 4,
            width: 76,
          },
          {
            idx: 5,
            width: 56,
          },
          {
            idx: 6,
            width: 56,
          },
          {
            idx: 6,
            width: 90,
          },
        ],
      },
      options: {
        grid: {
          type: 'classic',
          //showHierarchyCaptions: false,
          showHeaders: false,
          showTotals: false,
          //showGrandTotals: "rows"
        },
        dateTimePattern: 'yyyy-MM-dd HH:mm:ss',
        datePattern: 'dd-MMM-yyyy',
        defaultHierarchySortName: 'desc',
        configuratorButton: false,
        showAggregationLabels: false,
      },
    };
    // console.log(setReportSummary);

    if (setReportSummary) {
      setTimeout(() => {
        this.child.webDataRocks.setReport(setReportSummary);
      }, 100);
    }
  }

  Export_Excel(reportType, fileName, sheetName) {
    // console.log(reportType, fileName, sheetName);
    fileName = fileName !== undefined ? fileName : 'hourly';
    this.child.webDataRocks.exportTo(
      'Excel',
      {
        filename: 'Machine_Hourly_Report',
        excelSheetName: sheetName,
        destinationType: 'file',
        url: 'URL to server script saving the file',
      },
      function () {
        //console.log("Export process is finished");
      }
    );
  }
}
