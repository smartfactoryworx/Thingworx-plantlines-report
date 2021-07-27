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
  Cause:string;
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
  constructor(private httpClient: HttpClient, protected dataentryservice: ManualEntryService, private util: UtilService,
    private datePipe: DatePipe) { }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    console.log(this.machineData);
    this.GetCycleData(this.machineData);
  }
  GetCycleData(machineDetails) {
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

    let dataSource = 'CycleSetDataInDataTable/Services/allDataJoint'

    this.dataentryservice.GetApiURL().subscribe(apipath => {
      console.log(apipath['api']);
      this.dataentryservice.GetMachineData(apipath['apithings'], dataSource, JSON.stringify(body)).subscribe((machinecycledata: any) => {

        console.log("machinecycledata", machinecycledata);

        var c = machinecycledata.rows;
        for (let i = 0; i < c.length; i++) {
          const data = c[i]
          const allCycleData = {
            CycleRun: data && data.CycleCount,
            Duration: data && data.Duration,
            FaultNumber: data && data.FirstFault,
            FirstFault: data && data.FirstFault > 0 ? 1 : 0,
            FirstFaultDesc: data && data.FaultDescription,
            From: data && moment(data.StartTime).format("HH:mm:ss"),
            InfeedCount: data && data.InfeedCount,
            Machine: data && data.Machine,
            ManualStop: data && data.ManualStop === true ? 1 : 0,
            MaxActualSpeed: data && data.MaxActualSpeed,
            OutFeedCount: data && data.OutFeedCount,
            SKU: data && data.SKU,
            SKUDesc: data && data.SKU_Details,
            To: data && moment(data.StopTime).format("HH:mm:ss"),
            Date: data && moment(data.StartTime).format("DD MMM YYYY"),
            Cause:data && data.CauseSelected
          }
          this.cycleData.push(allCycleData);
        }
        console.log("cycleData", this.cycleData);
        if (this.cycleData.length === 0) {
          this.gotData = true;
          this.errorText = " No Record Found";
        } else {
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
      //delete tabs[6];
      tabs.unshift({
        id: "fm-tab-newtab",
        title: "Export",
        rightGroup: true,
        handler: newtabHandler,
        icon: '<mat-icon>create</mat-icon>'
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
        }
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
            caption: "From Date"
          },
          {
            uniqueName: "SKUDesc",
            caption: "SKU"
          },
          {
            uniqueName: "To",
            caption: "To Date"
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
            caption: "FirstFault Count"
          },
          {
            uniqueName: "ManualStop",
            formula: "((\"ManualStop\"))",
            caption: "ManualStop Count"
          },
          {
            uniqueName: "MaxActualSpeed",
            formula: "(max(\"MaxActualSpeed\"))",
            caption: "Max Speed (" + this.SpeedIntermsOf + ")"
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
            caption: "MCBF&S",
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
            caption: "FirstFault Count"
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
            caption: "FirstFault Count"
          },
          {
            uniqueName: "ManualStop",
            formula: "((\"ManualStop\"))",
            caption: "ManualStop Count"
          },
          {
            uniqueName: "MaxActualSpeed",
            formula: "(max(\"MaxActualSpeed\"))",
            caption: "Max Speed (" + this.SpeedIntermsOf + ")"
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
            caption: "MCBF&S",
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
          caption: "From Date"
        },
        {
          uniqueName: "To",
          caption: "To Date"
        },
        {
          uniqueName: "SKUDesc",
          caption: "SKU"
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
            uniqueName: "CycleRun",
            formula: "((\"CycleRun\"))",
            caption: "Total Cycle Run (" + this.CycleMeaning + ")"
          },
          {
            uniqueName: "FirstFault",
            formula: "((\"FirstFault\"))",
            caption: "Fault Count"
          },

          {
            uniqueName: "ManualStop",
            formula: "((\"ManualStop\"))",
            caption: "ManualStop Count"
          },
          {
            uniqueName: "MaxActualSpeed",
            formula: "(max(\"MaxActualSpeed\"))",
            caption: "Max Speed (" + this.SpeedIntermsOf + ")"
          },
          {
            uniqueName: "Duration",
            formula: "((\"Duration\"))",
            caption: "Duration"
          },
          {
            uniqueName: "InfeedCount",
            formula: "((\"InfeedCount\"))",
            caption: "InfeedCount (" + this.InfeedInTermsOf + ")"
          },
          {
            uniqueName: "OutFeedCount",
            formula: "(max(\"OutFeedCount\"))",
            caption: "OutFeedCount (" + this.OutfeedCountInTermsOf + ")"
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
            caption: "MCBF&S",
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
    else if (reportType === 'SKUwise') {
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
    else if (reportType === 'Faultwise') {
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