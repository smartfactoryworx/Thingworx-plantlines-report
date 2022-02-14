import { Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { WebDataRocksPivot } from '../@webdatarocks/webdatarocks.angular4';
import * as _moment from 'moment';
import { default as _rollupMoment, Moment } from 'moment';
import { HttpClient } from '@angular/common/http';
import { ManualEntryService } from '../../app-manualentry.service';
import { UtilService } from 'src/app/util.service';
import { DatePipe } from '@angular/common';
import Highcharts, { seriesType } from 'highcharts';
import HighchartsMore from "highcharts/highcharts-more";
HighchartsMore(Highcharts)
import exporting from 'highcharts/modules/exporting';
const moment = _rollupMoment || _moment;

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
  Date: string;
  FaultNumber: number;
  Cause: string;
  Count: number;
  
  StateDuration: number;//Duration of Fault/Manual Stop
  // CheckFrom:string;
  // CheckTo:string;

}
interface Filter {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-cycle-report',
  templateUrl: './cycle-report.component.html',
  styleUrls: ['./cycle-report.component.scss']
})
export class CycleReportComponent implements OnChanges {

  @ViewChild("pivot1") child: WebDataRocksPivot;
  @ViewChild("pivot2") child2: WebDataRocksPivot;
  @ViewChild("pivot3") child3: WebDataRocksPivot;
  @ViewChild("pivot4") child4: WebDataRocksPivot;


  public cycleData: cycledata[];
  errorText = "";
  Highcharts: typeof Highcharts = Highcharts;
  pivotTableReportComplete: boolean = false;
  gotData: boolean = true;
  public DataWithStructure = [];
  filters: Filter[] = [
    // { value: 'SKUDesc', viewValue: 'SKU Wise' },
    { value: 'FirstFaultDesc', viewValue: 'Fault Wise' },
    // { value: 'Date', viewValue: 'Daily Cycle Wise' },
  ];
  public selected = this.filters[0].value;

  machineName: any;
  machineData: any;
  CycleMeaning: any;
  InfeedInTermsOf: any;
  OutfeedCountInTermsOf: any;
  SpeedIntermsOf: any;
  constructor(private httpClient: HttpClient, public dataentryservice: ManualEntryService, private util: UtilService,
    private datePipe: DatePipe) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    console.log(this.machineData);
    this.GetCycleData(this.machineData);
  }
  GetCycleData(machineDetails) {
    this.dataentryservice.getDataLoaded(false);
    console.log(machineDetails);

    console.log(machineDetails[0].machineId, machineDetails[0].CycleMeaning, machineDetails[0].InfeedInTermsOf, machineDetails[0].OutfeedCountInTermsOf, machineDetails[0].SpeedIntermsOf);
    this.machineData = machineDetails;
    this.machineName = machineDetails[0].machineId;
    this.CycleMeaning = machineDetails[0].CycleMeaning == undefined ? '' : machineDetails[0].CycleMeaning;
    this.InfeedInTermsOf = machineDetails[0].InfeedInTermsOf == undefined ? '' : machineDetails[0].InfeedInTermsOf;
    this.OutfeedCountInTermsOf = machineDetails[0].OutfeedCountInTermsOf == undefined ? '' : machineDetails[0].OutfeedCountInTermsOf;
    this.SpeedIntermsOf = machineDetails[0].SpeedIntermsOf == undefined ? '' : machineDetails[0].SpeedIntermsOf;
    this.errorText = "";
    this.cycleData = [];
    this.gotData = false;

    let body = {
      "Machine": this.machineName,
    }

    console.log(JSON.stringify(body));

    let dataSource = 'CycleSetDataInDataTable/Services/allDataJointWithTimeQuery'

    this.dataentryservice.GetApiURL().subscribe(apipath => {
      console.log(apipath['api']);
      this.dataentryservice.GetMachineData(apipath['apithings'], dataSource, JSON.stringify(body)).subscribe((machinecycledata: any) => {

        console.log("machinecycledata", machinecycledata);

        var c = machinecycledata.rows;
        for (let i = 0; i < c.length; i++) {
          const currentData = c[i];
          let nextData;
          //Only 1 records is present.
          nextData = (c.length === 1 || i === c.length-1 ?  c[i] : c[i + 1]);

          const allCycleData = {
            CycleRun: currentData && currentData.CycleCount,
            Duration: currentData && currentData.Duration,
            FaultNumber: currentData && currentData.FirstFault,
            FirstFault: currentData && currentData.FirstFault > 0 ? 1 : 0,
            FirstFaultDesc: currentData && currentData.ManualStop === true ? "Manual Stop" : currentData && currentData.FaultDescription,
            From: currentData && moment(currentData.StartTime).format("HH:mm"),
            ManualStop: currentData && currentData.ManualStop === true ? 1 : 0,
            InfeedCount: currentData && currentData.InfeedCount,
            Machine: currentData && currentData.Machine,
            MaxActualSpeed: currentData && currentData.MaxActualSpeed,
            OutFeedCount: currentData && currentData.OutFeedCount,
            SKU: currentData && currentData.SKU,
            SKUDesc: currentData && currentData.SKU_Details,
            To: currentData && moment(currentData.StopTime).format("HH:mm"),
            Date: currentData && moment(currentData.StartTime).format("DD MMM YYYY"),
            Cause: currentData && currentData.CauseSelected,
            Count: 1,
            StateDuration: i === c.length-1?0: moment(nextData.StartTime).diff(moment(currentData.StopTime), 'seconds'),
            // CheckFrom:moment(nextData.StartTime).format("HH:mm"),
            // CheckTo:moment(currentData.StopTime).format("HH:mm")
          }
          this.cycleData.push(allCycleData);
        }
        console.log("cycleData", this.cycleData);
        if (this.cycleData.length === 0) {
          this.gotData = true;
          this.dataentryservice.getDataLoaded( true);
          this.errorText = " No Record Found";
        } else {
          this.dataentryservice.getDataLoaded( true);
          this.gotData = true;
          this.errorText = "";
        }

      });
    });
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
        id: "fm-tab-newtab",
        title: "Export",
        rightGroup: true,
        handler: newtabHandler,
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="-17.5 774.5 36 36"><title>menu_export</title><g fill="#555"><path d="M15.446 795.615l-4.289-6.461c-.346-.515-.803-.654-1.428-.654H7.788c-.186 0-.346-.029-.363.156-.008.076.017.07.059.137l4.76 7.108c.042.06.034.337-.017.38-.025.025-.067.219-.102.219H6.699c-.194 0-.354-.063-.363.125-.305 3.23-3.174 5.495-6.407 5.192-2.81-.263-5.039-2.329-5.3-5.14-.009-.195-.168-.178-.363-.178h-5.401c-.076 0-.144-.281-.144-.357 0-.025.008-.157.017-.175l4.76-7.203c.102-.16.05-.245-.109-.347-.06-.035-.118.082-.187.082h-1.94c-.616 0-1.199.145-1.553.658l-4.664 6.547c-.203.304-.545.586-.545.95v9.216c1 .911 1.267 1.646 2.187 1.629h27.625c.903.009 1.188-.709 1.188-1.611v-9.233c1-.373.157-.735-.054-1.04z"></path><path d="M-3.674 783.5H-2.5v10.2c1 1.4 1.764 2.464 3.165 2.371 1.274-.083 1.835-1.097 2.835-2.371v-10.2h1.207c.346 0 .641-.04.65-.387.008-.151-.042-.193-.144-.311l-4.186-5.11c-.228-.287-.642-.302-.929-.073-.042.034-.076.081-.101.115l-4.135 5.172c-.22.271-.187.447.084.668.11.085.244-.074.38-.074z"></path></g></svg>'
      });
      return tabs;

    }

    var newtabHandler = () => {
      this.Export_Excel(reportType, fileName, sheetName);
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
      this.createChart_kpi_linewise('highchartcontainer-control', this.selected, 'Fault-Wise', 'fault');
    }
    else if (reportType === 'Summary') {
      this.BindReportData(this.cycleData, reportType);
      this.child3.webDataRocks.off("reportcomplete");
    }
    else if (reportType === 'DailyCycle') {
      this.BindReportData(this.cycleData, reportType);
      this.child4.webDataRocks.off("reportcomplete");
    }
    this.pivotTableReportComplete = true;

  }

  GetReport(reportType) {
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
          type: "string"
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
          type: "string"
        },
        Date: {
          type: "date string"
        },
        FaultNumber: {
          type: "number"
        },
        Cause: {
          type: "string"
        },
        Count: {
          type: "number"
        },
        StateDuration:{
          type:"time"
        },
        // CheckFrom:{
        //   type: "string"
        // },
        // CheckTo:{
        //   type: "string"
        // }
      }
    ]


    if (reportType === 'Faultwise') {
      var FalutWiseData = reportData.filter(function (value) {
        return value.FirstFault != 0
      })
      console.log(FalutWiseData, "FalutWiseData");
      this.DataWithStructure = this.DataWithStructure.concat(FalutWiseData);
      console.log(this.DataWithStructure, "DataWithStructure");
    } else {
      this.DataWithStructure = this.DataWithStructure.concat(reportData);
      console.log(this.DataWithStructure, "DataWithStructure");
    }

    var setReportSKUwise;
    var setReportFaultwise;
    var setReportSummary;
    var setReportDailyCycle;
    setReportSKUwise = {
      dataSource: {
        data: this.DataWithStructure
      },
      slice: {
        reportFilters: [
          {
            uniqueName: "From",
            caption: "From"
          },
          {
            uniqueName: "SKUDesc",
            caption: "SKU"
          },
          {
            uniqueName: "To",
            caption: "To"
          },

        ],
        rows: [{
          uniqueName: "Date",
          caption: "Date"
        },
        {
          uniqueName: "SKUDesc",
          caption: "SKU"
        }],
        columns: [
          {
            uniqueName: "Measures"
          }
        ],
        measures: [
          {
            uniqueName: "CycleRun",
            formula: "((\"CycleRun\"))",
            caption: "Total Cycle Run (" + this.CycleMeaning + ")"
          },
          {
            uniqueName: "FirstFault",
            formula: "((\"FirstFault\"))",
            caption: "First Fault Count"
          },
          {
            uniqueName: "ManualStop",
            formula: "((\"ManualStop\"))",
            caption: "Manual Stop Count"
          },
          {
            uniqueName: "MaxActualSpeed",
            formula: "(max(\"MaxActualSpeed\"))",
            caption: "Max Speed (" + this.SpeedIntermsOf + ")",
            format: "decimal0",
          },
          {
            uniqueName: "MeanCycleBetweenFault",
            formula: "((\"CycleRun\")/(\"FirstFault\"))",
            caption: "MCBF",
            format: "44mvcoma",
          },
          {
            uniqueName: "MeanCycleBetweenFaultNManualStop",
            formula: "((\"CycleRun\")/(\"FirstFault\" + \"ManualStop\"))",
            caption: "MCBF & S",
            format: "44mvcoma",
          },],
        expands: {
          expandAll: true,
        }
      },
      formats: [
        {
          name: "44mvcoma",
          decimalPlaces: 0,
          currencySymbol: "",
          currencySymbolAlign: "",
          nullValue: "0",
          textAlign: "center",
          infinityValue: "0",
          divideByZeroValue: "0",
        },
        {
          name: "decimal0",
          decimalPlaces: 0,
        }
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
            idx: 2,
            width: 51
          },
          {
            idx: 3,
            width: 56
          },
          {
            idx: 4,
            width: 62
          },
          {
            idx: 5,
            width: 76
          },
          {
            idx: 6,
            width: 56
          },
          {
            idx: 7,
            width: 56
          }
        ]
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
        datePattern: "dd-MMM-yyyy",
        defaultHierarchySortName: "desc",
        configuratorButton: false,
        showAggregationLabels: false
      }
    };
    setReportFaultwise = {
      dataSource: {
        data: this.DataWithStructure
      },
      slice: {
        reportFilters: [
          {
            uniqueName: "FirstFaultDesc",
            caption: "First Fault"
          },

        ],
        rows: [
          {
            uniqueName: "Date",
            caption: "Date"
          },
          {
            uniqueName: "FirstFaultDesc",
            caption: "First Fault"
          },
          {
            uniqueName: "FaultNumber",
            caption: "Fault No."
          }
        ],
        columns: [
          {
            uniqueName: "Measures"
          }
        ],
        measures: [

          {
            uniqueName: "FirstFault",
            formula: "((\"FirstFault\"))",
            caption: "First Fault Count"
          },
          {
            uniqueName: "StateDuration",
            formula: "((\"StateDuration\"))",
            caption: "Fault Duration",
            format: "44mvcoma"
          }
        ],

        expands: {
          expandAll: true,
        }
      },
      formats: [
        {
          name: "44mvcoma",
          decimalPlaces: 0,
          currencySymbol: "",
          currencySymbolAlign: "",
          nullValue: "0",
          textAlign: "center",
          infinityValue: "0",
          divideByZeroValue: "0",
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
            idx: 2,
            width: 62
          },
          {
            idx: 3,
            width: 54
          },
        ]
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
        datePattern: "dd-MMM-yyyy",
        defaultHierarchySortName: "desc",
        configuratorButton: false,
        showAggregationLabels: false
      }
    };
    setReportSummary = {
      dataSource: {
        data: this.DataWithStructure
      },
      slice: {
        reportFilters: [
          {
            uniqueName: "Date",
            caption: "Date"
          }
        ],
        rows: [
          //   {
          //   uniqueName: "FirstFaultDesc",
          //   caption: "First Fault"
          // },
          {
            uniqueName: "Date",
            caption: "Date"
          },
        ],
        columns: [
          {
            uniqueName: "Measures"
          }
        ],
        measures: [
          {
            uniqueName: "CycleRun",
            formula: "((\"CycleRun\"))",
            caption: "Total Cycle Run (" + this.CycleMeaning + ")"
          },
          {
            uniqueName: "FirstFault",
            formula: "((\"FirstFault\"))",
            caption: "First Fault Count"
          },
          {
            uniqueName: "ManualStop",
            formula: "((\"ManualStop\"))",
            caption: "Manual Stop Count"
          },
          {
            uniqueName: "MaxActualSpeed",
            formula: "(max(\"MaxActualSpeed\"))",
            caption: "Max Speed (" + this.SpeedIntermsOf + ")",
            format: "44mvcoma",
          },
          {
            uniqueName: "MeanCycleBetweenFault",
            formula: "((\"CycleRun\")/(\"FirstFault\"))",
            caption: "MCBF",
            format: "44mvcoma",
          },
          {
            uniqueName: "MeanCycleBetweenFaultNManualStop",
            formula: "((\"CycleRun\")/(\"FirstFault\" + \"ManualStop\"))",
            caption: "MCBF & S",
            format: "44mvcoma",
          },
        ],

        expands: {
          expandAll: true,
        }
      },
      formats: [
        {
          name: "44mvcoma",
          decimalPlaces: 0,
          currencySymbol: "",
          currencySymbolAlign: "",
          nullValue: "0",
          textAlign: "center",
          infinityValue: "0",
          divideByZeroValue: "0",
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
            idx: 1,
            width: 51
          },
          {
            idx: 2,
            width: 56
          },
          {
            idx: 3,
            width: 62
          },
          {
            idx: 4,
            width: 76
          },
          {
            idx: 5,
            width: 56
          },
          {
            idx: 6,
            width: 56
          }
        ]
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
        datePattern: "dd-MMM-yyyy",
        defaultHierarchySortName: "desc",
        configuratorButton: false,
        showAggregationLabels: false
      }
    };
    setReportDailyCycle = {
      dataSource: {
        data: this.DataWithStructure
      },
      slice: {
        reportFilters: [{
          uniqueName: "Date",
          caption: "Date"
        },
        {
          uniqueName: "SKUDesc",
          caption: "SKU"
        },
        {
          uniqueName: "Cause",
          caption: "Cause"
        },
        ],
        rows: [{
          uniqueName: "Date",
          caption: "Date"
        },

        {
          uniqueName: "From",
          caption: "From"
        },
        {
          uniqueName: "To",
          caption: "To"
        },
        {
          uniqueName: "SKUDesc",
          caption: "SKU"
        },
        {
          uniqueName: "FirstFaultDesc",
          caption: "Fault Desc"
        },
        // {
        //   uniqueName: "CheckFrom",
        //   caption: "CheckFrom"
        // },{
        //   uniqueName: "CheckTo",
        //   caption: "CheckTo"
        // }
        ],
        columns: [
          {
            uniqueName: "Measures"
          }
        ],
        measures: [
          {
            uniqueName: "CycleRun",
            formula: "((\"CycleRun\"))",
            caption: "Total Cycle Run (" + this.CycleMeaning + ")"
          },
          // {
          //   uniqueName: "FirstFault",
          //   formula: "((\"FirstFault\"))",
          //   caption: "Fault Count"
          // },

          // {
          //   uniqueName: "ManualStop",
          //   formula: "((\"ManualStop\"))",
          //   caption: "Manual Stop Count"
          // },
          {
            uniqueName: "MaxActualSpeed",
            formula: "(max(\"MaxActualSpeed\"))",
            caption: "Max Speed (" + this.SpeedIntermsOf + ")",
            format: "44mvcoma",
          },
          {
            uniqueName: "Duration",
            formula: "((\"Duration\"))",
            caption: "Duration"
          },
          {
            uniqueName: "InfeedCount",
            formula: "((\"InfeedCount\"))",
            caption: "Infeed Count (" + this.InfeedInTermsOf + ")"
          },
          {
            uniqueName: "OutFeedCount",
            formula: "(max(\"OutFeedCount\"))",
            caption: "OutFeed Count (" + this.OutfeedCountInTermsOf + ")"
          },
          {
            uniqueName: "MeanCycleBetweenFault",
            formula: "((\"CycleRun\")/(\"FirstFault\"))",
            caption: "MCBF",
            format: "44mvcoma",
          },
          {
            uniqueName: "MeanCycleBetweenFaultNManualStop",
            formula: "((\"CycleRun\")/(\"FirstFault\" + \"ManualStop\"))",
            caption: "MCBF & S",
            format: "44mvcoma",
          },
          {
            uniqueName: "Count",
            formula: "((\"Count\"))",
            caption: "Count"
          }, 
          // {
          //   uniqueName: "StateDuration",
          //   formula: "((\"StateDuration\"))",
          //   caption: "Dur"
          // }

        ],

        expands: {
          expandAll: true,
        }
      },
      formats: [
        {
          name: "44mvcoma",
          decimalPlaces: 0,
          currencySymbol: "",
          currencySymbolAlign: "",
          nullValue: "0",
          textAlign: "center",
          infinityValue: "0",
          divideByZeroValue: "0",
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
            idx: 1,
            width: 65
          },
          {
            idx: 2,
            width: 65
          },
          {
            idx: 4,
            width: 236
          },
          {
            idx: 5,
            width: 51
          },
          // {
          //   idx: 6,
          //   width: 54
          // },
          // {
          //   idx: 7,
          //   width: 62
          // },
          {
            idx: 6,
            width: 76
          },
          {
            idx: 7,
            width: 67
          },
          {
            idx: 8,
            width: 66
          },
          {
            idx: 9,
            width: 68
          },
          {
            idx: 10,
            width: 56
          },
          {
            idx: 11,
            width: 56
          },
          {
            idx: 12,
            width: 56
          }
        ]
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
        datePattern: "dd-MMM-yyyy",
        defaultHierarchySortName: "desc",
        configuratorButton: false,
        showAggregationLabels: false
      }
    };
    if (reportType === 'SKUwise') {
      this.child.webDataRocks.setReport(setReportSKUwise);
    } else if (reportType === 'Faultwise') {
      this.child2.webDataRocks.setReport(setReportFaultwise);
    }
    else if (reportType === 'Summary') {
      this.child3.webDataRocks.setReport(setReportSummary);
    } else if (reportType === 'DailyCycle') {
      this.child4.webDataRocks.setReport(setReportDailyCycle);
    }

  }

  Export_Excel(reportType, fileName, sheetName) {
    console.log(reportType, fileName, sheetName);
    if (reportType === 'Summary') {
      this.child3.webDataRocks.exportTo(
        "Excel", {
        filename: fileName,
        excelSheetName: sheetName,
        destinationType: "file",
        url: "URL to server script saving the file"

      },
        function () {
          //console.log("Export process is finished");
        }
      );
    }
    else if (reportType === 'SKUwise') {
      this.child.webDataRocks.exportTo(
        "Excel", {
        filename: fileName,
        excelSheetName: sheetName,
        destinationType: "file",
        url: "URL to server script saving the file"

      },
        function () {
          //console.log("Export process is finished");
        }
      );
    }
    else if (reportType === 'Faultwise') {
      this.child2.webDataRocks.exportTo(
        "Excel", {
        filename: fileName,
        excelSheetName: sheetName,
        destinationType: "file",
        url: "URL to server script saving the file"

      },
        function () {
          //console.log("Export process is finished");
        }
      );
    }
    else if (reportType === 'DailyCycle') {
      this.child4.webDataRocks.exportTo(
        "Excel", {
        filename: fileName,
        excelSheetName: sheetName,
        destinationType: "file",
        url: "URL to server script saving the file"

      },
        function () {
          //console.log("Export process is finished");
        }
      );
    }
  }

  //Highcharts

  createChart_kpi_linewise(controlname, category, chartTitle, chartType) {
    console.log(controlname, "controlname");
    console.log(category, "category");
    console.log(this.cycleData);
    if (category === 'FirstFaultDesc') {
      var FalutWiseData = this.cycleData.filter(function (value) {
        return value.FirstFault != 0
      })
    }
    // const GroupedData1 = this.util.groupAndSum(this.cycleData, ['Date'], ['CycleRun', 'InfeedCount', 'OutFeedCount', 'ManualStop', 'FirstFault', 'FaultNumber']);
    const GroupedDataFault = this.util.groupAndSum(FalutWiseData, [category], ['FirstFault']);
    //console.log(GroupedData1, "GroupedData");
    console.log(GroupedDataFault, "GroupedData");

    let xAxisData;
    let measureDataFaultCount;

    let chartTitleName;
    let seriesData;
    let chartTypeName;
    let chartForm;


    if (chartType === 'fault') {

      GroupedDataFault.sort(this.util.dynamicSort('FirstFault'))
      xAxisData = this.util.filterMyArr(GroupedDataFault, category);
      measureDataFaultCount = this.util.filterMyArr(GroupedDataFault, "FirstFault");
      chartTitleName = chartTitle;

      seriesData = [
        {
          name: "Fault Count",
          data: measureDataFaultCount,
          color: '#ffe66d'
        },
      ]
    } else if (chartType === 'skuwise') {

    } else if (chartType === 'dailycycle') {

    }

    if (category === "date") {
      chartTypeName = "line";
      chartForm = {
        series: {
          stacking: undefined,
          dataLabels: {
            enabled: true,
            style: {
              fontWeight: 'bold',
              color: '#000000',
              fontSize: '15px'
            },
            formatter: function () {
              let value = (this.y);
              return '' + value;
            }
          }
        }
      }
    } else {
      chartTypeName = "column";
      chartForm = {
        column: {
          stacking: undefined,
          dataLabels: {
            enabled: true,
            style: {
              fontWeight: 'bold',
              color: '#000000',
              fontSize: '15px'
            },
            formatter: function () {
              let value = (this.y);
              return '' + value;
            }
          }
        }
      }
    }
    //console.log(chartTypeName, "chartTypeName");
    var ChartData: any;
    ChartData = {

      chart: {
        type: chartTypeName,
      },
      title: {
        text: chartTitleName,
        align: 'left',
        style: {
          fontWeight: 'bold',
          fontSize: '15px'
        }
      },
      xAxis: {
        title: {
          text: category
        },
        categories: xAxisData
      },
      yAxis: [
        {
          title: {
            text: "Fault Count"
          },
          opposite: false,
          labels: {
            enabled: true,
            formatter: function () {
              let value = (this.value);
              return value;
            },
          },
        },
      ],
      tooltip: {
        formatter: function () {
          let value = (this.y);
          return this.key + '<br>' + '' + value;
        }
      },
      plotOptions: chartForm,
      series: seriesData,
      credits: {
        enabled: false
      }
    }
    console.log(JSON.stringify(ChartData));
    Highcharts.chart(controlname, ChartData);
  }

}
