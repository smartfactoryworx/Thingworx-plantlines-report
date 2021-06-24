import { WebDataRocksPivot } from '../@webdatarocks/webdatarocks.angular4';
import { Component, ViewChild, OnInit } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ManualEntryService } from '../app-manualentry.service';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import { default as _rollupMoment, Moment } from 'moment';
import { sortAscendingPriority } from '@angular/flex-layout';
import { ChartEditorComponent } from 'angular-google-charts';
import { UtilService } from 'src/app/util.service';


const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'MMM - YYYY',
  },
  display: {
    dateInput: 'MMM - YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
@Component({
  selector: 'app-changeover-report2',
  templateUrl: './changeover-report2.component.html',
  styleUrls: ['./changeover-report2.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class ChangeoverReport2Component implements OnInit {
  @ViewChild("pivot2") child: WebDataRocksPivot;
  gotData: boolean = false;
  faultReport: FormGroup;
  shift: FormControl;
  stateid: FormControl;
  Shift = [];
  State = [];

  date = new FormControl(moment());
  LinesData;
  chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue = new FormControl(moment()).value;
    ctrlValue.year(normalizedYear.year());
    this.date.setValue(ctrlValue);
  }

  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = new FormControl(moment()).value;
    ctrlValue.month(normalizedMonth.month());
    this.date.setValue(ctrlValue);
    datepicker.close();
  }

  //--------------------------------------------------------------

  getMonthDateRange(year, month) {
    var startDate = moment([year, month - 1]);
    var endDate = moment(startDate).endOf('month');

    // just for demonstration:
    //console.log(startDate.toDate());
    //console.log(endDate.toDate());

    // make sure to call toDate() for plain JavaScript date type
    return { start: startDate, end: endDate };
  }
  createFormFilters() {
    this.shift = new FormControl('', Validators.required);
    this.date = new FormControl('', Validators.required);
    //this.machine_state = new FormControl('', Validators.required);
    this.stateid = new FormControl('');
  }
  createFiltersForm() {
    this.faultReport = new FormGroup({
      shift: this.shift,
      date: this.date,
      stateid: this.stateid
    });
  }


  public temp = [];
  constructor(private httpClient: HttpClient, protected datePipe: DatePipe,
    protected dataSourceService: ManualEntryService, private utils: UtilService) { }
  public pivotReport = {
  };


  customizeToolbar(toolbar) {
    let tabs = toolbar.getTabs();
    //var newtabHandlerBlue =this.child.webDataRocks.expandAllData();
    //var newtabHandlerDefault=this.child.webDataRocks.collapseAllData();
    //console.log(tabs);
    toolbar.getTabs = function () {

      //   tabs.unshift({
      //     id: "wdr-tab-lightblue",
      //     title: "LightBlue",
      //     handler: newtabHandlerBlue,
      //     icon: this.icons.format
      // }, {
      //     id: "wdr-tab-default",
      //     title: "Default",
      //     handler: newtabHandlerDefault,
      //     icon: this.icons.format
      // });
      delete tabs[0];
      delete tabs[1];
      delete tabs[2];
      delete tabs[3];
      delete tabs[4];
      delete tabs[5];
      delete tabs[6];
      //delete tabs[7];
      return tabs;
    }


  }

  expandAll() {
    this.child.webDataRocks.expandAllData();
  }
  collapseAll() {
    this.child.webDataRocks.collapseAllData();
  }
  Export_Excel() {
    var D = this.getMonthDateRange(moment(this.date.value).format("YYYY"), moment(this.date.value).format("MM"));
    var lineName = this.dataSourceService.lineName.split("/");
    this.child.webDataRocks.exportTo(
      "Excel", {
      filename: "Changeover Report_" + moment(D.start).format("yyyy-MM") + "_" + this.dataSourceService.lineName,
      excelSheetName: moment(D.start).format("yyyy-MM") + "_" + lineName[0],
      destinationType: "file",
      url: "URL to server script saving the file"

    },
      function () {
        //console.log("Export process is finished");
      }
    );
  }
  Export_PDF() {
    var D = this.getMonthDateRange(moment(this.date.value).format("YYYY"), moment(this.date.value).format("MM"));
    var lineName = this.dataSourceService.lineName.split("/");
    this.child.webDataRocks.exportTo(
      "pdf", {
      filename: "Changeover Report_" + moment(D.start).format("yyyy-MM") + "_" + lineName[0],
      header: "Changeover Report" + " / " + moment(D.start).format("yyyy-MM") + " / " + this.dataSourceService.lineName,
      destinationType: "file",
      url: "URL to server script saving the file"
    },
      function () {
        //console.log("Export process is finished");
      }
    );
  }

  SearchStateData() {
    this.temp = [];

    this.gotData = false;
    var D = this.getMonthDateRange(moment(this.date.value).format("YYYY"), moment(this.date.value).format("MM"));
    //console.log()
    // this.dataSourceService.GetServerAPIPath().subscribe(
    //   (apipath: any) => {

    // console.log('https://int91mat11.smartfactoryworx.tech' + '/api/changeover/changeoverreport?startDate=' + moment(D.start).format("yyyy-MM-DD") + '&endDate=' + moment(D.end).format("yyyy-MM-DD"))
    this.dataSourceService.GetChangeoverData(moment(D.start).format("yyyy-MM-DD"), moment(D.end).format("yyyy-MM-DD")).subscribe((d: any) => {

      //console.log(d);
      this.temp = [
        {
          _id: {
            type: "string"
          },
          changeover_wastage: {
            type: "time"
          },
          operator_name: {
            type: "string"
          },
          date: {
            type: "date"
          },
          shift: {
            type: "string"
          },
          line: {
            type: "string"
          },
          changeover_finish_type: {
            type: "string"
          },
          batch_name: {
            type: "string"
          },
          batch_size: {
            type: "string"
          },
          type: {
            type: "string"
          },
          product_name: {
            type: "string"
          },

          from_fgex: {
            type: "string"
          },
          to_fgex: {
            type: "string"
          },
          changeover_finish_time: {
            type: "datetime"
          },
          standard_duration: {
            type: "number"
          },
          shift_changeover_start_time: {
            type: "datetime"
          },
          shift_changeover_end_time: {
            type: "datetime"
          },
          changeover_start_time: {
            type: "datetime"
          },
          production_start: {
            type: "datetime"
          },
          // mechanical_actual_time: {
          //   type: "time"
          // },
          // quality_actual_time: {
          //   type: "time"
          // },
          standard_duration_split: {
            type: "time"
          },
          actual_total_time: {
            type: "number"
          },
          // Efficiency: {
          //   type: "number"
          // },
          shift_actual_time: {
            type: "time"
          },
          layout: {
            type: "string"
          }
        }
      ]
      this.temp = this.temp.concat(d);
      //console.log(this.temp);
      this.child.webDataRocks.off("reportcomplete");
      this.child.webDataRocks.setReport(
        {
          dataSource: {
            data: this.temp
          },
          options: {
            grid: {
              type: "classic",
              //showHierarchyCaptions: false,
              showHeaders: false,
              showTotals: false,
            },
            dateTimePattern: "dd/MM/yyyy HH:mm:ss",
            defaultHierarchySortName: "desc",
            configuratorButton: false
          },
          slice: {
            reportFilters: [
              {
                uniqueName: "batch_name"
              },
              {
                uniqueName: "operator_name",
                caption: "Operator"
              },
              {
                uniqueName: "date",
                //sort: "asc"
              },
              {
                uniqueName: "shift",
                //sort: "asc"
              },
              {
                uniqueName: "type"
              },
              {
                uniqueName: "changeover_finish_time",
                caption: "Set up start"
              },
              {
                uniqueName: "product_name",
                caption: "Product"
              },
              {
                uniqueName: "from_fgex",
                caption: "fromfgex",
              },
              {
                uniqueName: "to_fgex",
                caption: "To Fgex",
              },
              {
                uniqueName: "batch_size",
                caption: "Batch Size",
              },
              {
                uniqueName: "changeover_finish_time",
                caption: "CO END",
              },
              {
                uniqueName: "layout",
                caption: "Layout"
              }
            ],
            rows: [
              {
                uniqueName: "line",
                caption: "Line",
              },
              {
                uniqueName: "changeover_start_time",
                caption: "CO Start",
              },
              {
                uniqueName: "changeover_finish_time",
                caption: "Set up start"
              },
              {
                uniqueName: "production_start",
                caption: "Production Start",
              },
              {
                uniqueName: "batch_name",
                caption: "Batch",
              },

            ],

            measures: [
              {
                uniqueName: "changeover_wastage",
                formula: '(sum("changeover_wastage"))',
                format: "decimal2",
                caption: "Wastage",
              },
              // {
              //   uniqueName: "mechanical_actual_time",
              //   formula: '(sum("mechanical_actual_time"))',
              //   format: "decimal2",
              //   caption: "Mechanical Time",
              // },
              // {
              //   uniqueName: "quality_actual_time",
              //   formula: '(sum("quality_actual_time"))',
              //   format: "decimal2",
              //   caption: "Quality Time",
              // },
              {
                uniqueName: "shift_actual_time",
                formula: '(sum("shift_actual_time"))',
                format: "decimal2",
                caption: "Actual Time taken",
              },
              {
                uniqueName: "standard_duration_split",
                formula: '(sum("standard_duration_split"))',
                format: "decimal2",
                caption: "Standard Duration",
              },

              {
                uniqueName: "Efficiency",
                formula: "(\"standard_duration_split\" / \"shift_actual_time\")*100",
                format: "44mvcoma",
                caption: "Efficiency%",
              },
            ],

            // sorting: {
            //   column: [{
            //     type: "desc",
            //     tuple: [],
            //     measure: {
            //       uniqueName: "duration",
            //     }
            //   }]
            // },
            expands: {
              expandAll: true,
              rows: [
                // {
                //   tuple: [
                //     "shift.Shift C"
                //   ]
                // },
                // {
                //   tuple: [
                //     "shift.Shift B"
                //   ]
                // },
                // {
                //   tuple: [
                //     "shift.Shift A"
                //   ]
                // }
              ]
            }

          },


          formats: [
            {
              name: "decimal2",
              decimalPlaces: 2
            },
            {
              name: "decimal0",
              decimalPlaces: 1
            },
            {
              name: "cellcoloring",
              decimalPlaces: 2
            },
            {
              name: "44mvcoma",
              thousandsSeparator: " ",
              decimalSeparator: ".",
              decimalPlaces: 2,
              currencySymbol: "%",
              currencySymbolAlign: "right",
              nullValue: "",
              textAlign: "right",
            }
          ],
          tableSizes: {
            columns: [
              // {
              //   idx:4,
              //   width:80
              // },
              // {
              //   idx:5,
              //   width:100
              // },
              // {
              //   idx:7,
              //   width:100
              // },
              // {
              //   idx:8 ,
              //   width:100
              // }
            ]
          }
        }
      );
      this.gotData = true;
    });
    // });
  }

  ngOnInit() {
    this.createFormFilters();
    this.createFiltersForm();
    this.BindDefaultDates();
    google.charts.load("current", { packages: ["corechart"] });
    google.charts.setOnLoadCallback(() => this.onGoogleBarChartsLoaded());
  }

  BindDefaultDates() {
    var date = new Date();

    this.date.setValue(this.datePipe.transform(this.utils.addDays(new Date(), -1), 'yyyy-MM-dd'));
    this.shift.setValue('Shift A');
    // this.stateid.setValue('fault');
  }

  onGoogleBarChartsLoaded() {
    if (this.pivotTableReportComplete) {
      this.createGoogleBarChart_1();
      this.createGoogleBarChart_2();
    }
  }



  onCustomizeCell(
    cell,
    data
  ): void {
    //console.log("[customizeCell] WebDataRocksPivot");
    if (data.isClassicTotalRow) cell.addClass("fm-total-classic-r");
    if (data.isGrandTotalRow) cell.addClass("fm-grand-total-r");
    if (data.isGrandTotalColumn) cell.addClass("fm-grand-total-c");
  }

  pivotTableReportComplete: boolean = false;

  onReportComplete(): void {

    this.SearchStateData();
    this.child.webDataRocks.off("reportcomplete");
    this.pivotTableReportComplete = true;
    this.createGoogleBarChart_1();
    this.createGoogleBarChart_2();
  }

  createGoogleBarChart_1() {
    try {
      this.child.webDataRocks.googlecharts.getData(
        {
          type: "column",
          slice: {
            rows: [
              {
                uniqueName: "operator_name",
              },
            ],

            measures: [
              {
                uniqueName: "Efficiency",
                formula: "((\"standard_duration_split\" / \"shift_actual_time\")*100)",
                caption: "Efficiency %",
              },

              // {
              //   uniqueName: "standard_duration_split",
              //   formula: "1*100",
              //   caption: "Standard Duration",
              // },
              // {
              //   uniqueName: "shift_actual_time",
              //   formula: '(sum("shift_actual_time")/60)',
              //   caption: "Shift Time",
              //   format: "decimal2",
              // },
              // {
              //   uniqueName: "mechanical_actual_time",
              //   formula: '(sum("mechanical_actual_time")/60)',
              //   format: "decimal2",
              //   caption: "Mechanical Time",
              // },
              // {
              //   uniqueName: "quality_actual_time",
              //   formula: '(sum("quality_actual_time")/60)',
              //   format: "decimal2",
              //   caption: "Quality Time",
              // }
            ]
          },

        },
        data => this.drawChart1(data),
        data => this.drawChart1(data)
      );
    } catch (error) {
    }
  }

  createGoogleBarChart_2() {
    //if (this.IsBarchart2_Loaded) {
    try {
      this.child.webDataRocks.googlecharts.getData(
        {
          type: "bar",
          slice: {
            rows: [
              {
                uniqueName: "batch_name",
              },
            ],
            measures: [
              {
                uniqueName: "standard_duration_split",
                formula: '(sum("standard_duration_split"))',
                caption: "Standard Duration",
              },
              {
                uniqueName: "shift_actual_time",
                formula: '(sum("shift_actual_time"))',
                caption: "Actual Time taken",
                format: "decimal2",
              }
            ]
          },

        },
        data => this.drawChart2(data),
        data => this.drawChart2(data)

      );
    } catch (error) {
    }
  }





  drawChart1(_data: any) {
    try {
      this.ConvertArrayDataToHour(_data.data);
      var arr1 = [];
      arr1 = _data.data.sort(this.utils.SortArray);
      //console.log(arr1[1][1]);
      arr1[0][2] = { role: 'annotation' };
      for (let i = 1; i <= _data.data.length - 1; i++) {
        arr1[i][2] = parseFloat(_data.data[i][1]).toFixed(1) + "%";//arr1[i][2] = _data.data[i][1];
      }

      var data = google.visualization.arrayToDataTable(_data.data);
      //console.log(_data);
      //console.log(data);
      //console.log(<google.visualization.ColumnChartOptions>options);

      var options = {
        title: "Operator Wise Changeover Efficiency",
        //colors: ["#8080ff", "#aaaa55", "#E9C46A"],
        //bars: "horizontal",
        legend: {
          position: 'right'
        },
        is3D: true
      };

      var chart = new google.visualization.BarChart(
        document.getElementById("GBarchart1")
      );
      //console.log(data);
      chart.draw(data, <google.visualization.ColumnChartOptions>options);
    } catch (error) {

    }
  }

  drawChart2(_data: any) {
    try {
      this.ConvertArrayDataToHour1(_data.data);
      var data = google.visualization.arrayToDataTable(_data.data);
      //console.log(<google.visualization.ColumnChartOptions>options);
      var options = {
        title: "Changeover Duration STD vs Actual (in min.)",
        legend: {
          position: 'right'
        },
        is3D: true
      };
      //console.log(options);

      var chart = new google.visualization.BarChart(
        document.getElementById("GBarchart2")
      );
      //console.log(chart);
      chart.draw(data, <google.visualization.ColumnChartOptions>options);
    } catch (error) {

    }
  }


  ConvertArrayDataToHour(data) {
    try {
      data.forEach(function (sa, index) {
        data[index] = sa.map(function (each_element) {
          if (typeof each_element === "number") { return Number((each_element).toFixed(1)); } else { return each_element }
        });
      });
      return data;
    } catch (error) {
      return data;
    }
  }
  ConvertArrayDataToHour1(data) {
    try {
      data.forEach(function (sa, index) {
        data[index] = sa.map(function (each_element) {
          if (typeof each_element === "number") { return Number(((each_element) / 60).toFixed(1)); } else { return each_element }
        });
      });
      return data;
    } catch (error) {
      return data;
    }
  }
}
