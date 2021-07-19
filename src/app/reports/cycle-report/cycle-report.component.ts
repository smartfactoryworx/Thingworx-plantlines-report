import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { WebDataRocksPivot } from '../@webdatarocks/webdatarocks.angular4';
import * as _moment from 'moment';
import { default as _rollupMoment, Moment } from 'moment';
import { HttpClient } from '@angular/common/http';
import { ManualEntryService } from '../app-manualentry.service';
import { UtilService } from 'src/app/util.service';
import { DatePipe } from '@angular/common';
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
  Date: string;
  FaultNumber: number;
}

@Component({
  selector: 'app-cycle-report',
  templateUrl: './cycle-report.component.html',
  styleUrls: ['./cycle-report.component.scss']
})
export class CycleReportComponent implements OnInit {

  @ViewChild("pivot1") child: WebDataRocksPivot;
  @ViewChild("pivot2") child2: WebDataRocksPivot;
  @ViewChild("pivot3") child3: WebDataRocksPivot;
  @ViewChild("pivot4") child4: WebDataRocksPivot;
  public MachineList: machinelist[] = [];
  public filteredMachine = this.MachineList.slice();
  cycleform: FormGroup;
  machine: FormControl;
  public cycleData: cycledata[];
  errorText;
  pivotTableReportComplete: boolean = false;
  gotData: boolean = true;
  public DataWithStructure = [];

  //datePipe: any;
  lastUpdated;
  constructor(private httpClient: HttpClient, protected dataentryservice: ManualEntryService, private util: UtilService,
    private datePipe: DatePipe) { }

  createCurrentTemp() {
    this.machine = new FormControl('', Validators.required);
  }
  createCurrentTempForm() {
    this.cycleform = new FormGroup({
      machine: this.machine,
    });
  }

  BindDefaultData() {
    this.machine.setValue('RU21005a');
  }

  GetMachineData() {
    this.MachineList = [];
    this.httpClient.get('configs/api/api_server.json').subscribe(apipath => {
      console.log(apipath['api']);
      let body = {};
      let dataSource = 'MachineDetailsMaster/Services/GetDataTableEntries'
      this.dataentryservice.GetMachineData(apipath['apithings'], dataSource, JSON.stringify(body)).subscribe((machineList: any) => {
        // console.log(machineList['rows'], "machineList");
        var c = machineList['rows'];
        for (let i = 0; i < c.length; i++) {
          const a = c[i];
          const data = {
            machineId: a.Machine_MDS,
            machineName: a.Machine_Name,
            createdDate: new Date(moment(a.timestamp).format("DD MMM YYYY hh:mm a")),
            machineDetails: a.Machine_MDS + ' - ' + a.Machine_Name + ' - ' + a.Customer_Name + '(' + moment(new Date(a.timestamp)).format("DD-MM-YYYY") + ')'
          }
          this.MachineList.push(data);
        }
        this.MachineList.sort(this.util.dynamicSort('createdDate'));
        this.filteredMachine = this.MachineList.slice();
        console.log(this.filteredMachine);
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

    let dataSource = 'CycleSetDataInDataTable/Services/getAllCycleReport'

    this.httpClient.get('configs/api/api_server.json').subscribe(apipath => {
      console.log(apipath['api']);
      this.dataentryservice.GetMachineData(apipath['apithings'], dataSource, JSON.stringify(body)).subscribe((machinecycledata: any) => {
        this.lastUpdated = this.datePipe.transform(new Date(), 'dd-MMM-yyyy hh:mm:ss')
        console.log("machinecycledata", machinecycledata);
        var c = machinecycledata.rows;
        for (let i = 0; i < c.length; i++) {
          const data = c[i]
          //if(data.FirstFault !=0){
          const allCycleData = {
            CycleRun: data.CycleRun,
            Duration: data.Duration,
            FaultNumber: data.FirstFault,
            FirstFault: data.FirstFault > 0 ? 1 : 0,
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
            Date: moment(data.From).format("DD MMM YYYY"),

          }
          this.cycleData.push(allCycleData);
          //}

        }
        //this.cycleData.sort(this.util.dynamicSort('Date'));
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
      delete tabs[0];
      delete tabs[1];
      delete tabs[2];
      delete tabs[3];
      delete tabs[4];
      delete tabs[5];
      //delete tabs[6];
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
        },
        Date: {
          type: "date string"
        },
        FaultNumber: {
          type: "number"
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
            caption: "Total Cycle Run"
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
            caption: "Max Speed"
          },
          {
            uniqueName: "MeanCycleBetweenFault",
            formula: "((\"CycleRun\")/(\"FirstFault\"))",
            caption: "MeanCycleBetweenFault",
            format: "44mvcoma",
          },
          {
            uniqueName: "MeanCycleBetweenFaultNManualStop",
            formula: "((\"CycleRun\")/(\"FirstFault\" + \"ManualStop\"))",
            caption: "MeanCycleBetweenFaultNManualStop",
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
            caption: "Fault Number"
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
            caption: "Total Cycle Run"
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
            caption: "Max Speed"
          },


          {
            uniqueName: "MeanCycleBetweenFault",
            formula: "((\"CycleRun\")/(\"FirstFault\"))",
            caption: "MeanCycleBetweenFault",
            format: "44mvcoma",
          },
          {
            uniqueName: "MeanCycleBetweenFaultNManualStop",
            formula: "((\"CycleRun\")/(\"FirstFault\" + \"ManualStop\"))",
            caption: "MeanCycleBetweenFaultNManualStop",
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
        reportFilters: [],
        rows: [{
          uniqueName: "Date",
          caption: "Date"
        },
        {
          uniqueName: "SKUDesc",
          caption: "SKU"
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
          uniqueName: "FaultNumber",
          caption: "Fault Number"
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
            caption: "Total Cycle Run"
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
            caption: "Max Speed"
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
            formula: "(max(\"OutFeedCount\"))",
            caption: "OutFeedCount"
          },
          {
            uniqueName: "MeanCycleBetweenFault",
            formula: "((\"CycleRun\")/(\"FirstFault\"))",
            caption: "MeanCycleBetweenFault",
            format: "44mvcoma",
          },
          {
            uniqueName: "MeanCycleBetweenFaultNManualStop",
            formula: "((\"CycleRun\")/(\"FirstFault\" + \"ManualStop\"))",
            caption: "MeanCycleBetweenFaultNManualStop",
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

}