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
import { WebDataRocksPivot } from "../@webdatarocks/webdatarocks.angular4";
import Highcharts, { seriesType } from 'highcharts';
import HighchartsMore from "highcharts/highcharts-more";
HighchartsMore(Highcharts)
import exporting from 'highcharts/modules/exporting';
exporting(Highcharts)
import { Measure } from 'webdatarocks';
import { UtilService } from "src/app/util.service";
// import WebDataRocks from 'webdatarocks';
// import { WebDataRocksPivot } from "../@webdatarocks/webdatarocks.angular4";
//import { WebDataRocksPivot }
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

interface fault {
  _id: string;
  stop_name: string;
  machine_name: string;
  batch: string;
  fgex: string;
  shift: string;
  start_time: DatePipe;
  date: string;
  end_time: DatePipe;
  fault_name: string;
  operator_name: string;
  user_comment1: string;
  fault_cause: string;
  duration: string;
  line_id: string;
  count: number;
}
@Component({
  selector: 'app-fault-wise-report2',
  templateUrl: './fault-wise-report2.component.html',
  styleUrls: ['./fault-wise-report2.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class FaultWiseReport2Component implements OnInit {
  @ViewChild("pivot1") child: WebDataRocksPivot;
  Highcharts: typeof Highcharts = Highcharts;

  gotData: boolean = false;

  public Fault: fault[] = [];
  LinesData;
 
  faultReport: FormGroup;
  shift: FormControl;
  line_id: FormControl;
  stateid: FormControl;
  Shift = [];
  State = [];

  date = new FormControl(moment());
  errormsg: any;
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
    this.stateid = new FormControl('');
    this.line_id = new FormControl('', Validators.required);
  }
  createFiltersForm() {
    this.faultReport = new FormGroup({
      shift: this.shift,
      date: this.date,
      stateid: this.stateid,
      line_id: this.line_id
    });
  }
  GetLinesList() {
    this.LinesData = [];
    //this.dataSourceService.GetServerAPIPath().subscribe((apipath: any) => {

    this.dataSourceService.GetLineData().subscribe((data: any) => {
      for (let i = 0; i < data.length; i++) {
        const company = data[i];
        company.countries.forEach((country) => {
          country.states.forEach((state) => {
            state.locations.forEach((location) => {
              location.plants.forEach((plant) => {
                plant.lines.forEach((line) => {
                  const ELEMENT_DATA = {
                    companyname: company.company_name,
                    countryname: country.country_name,
                    statename: state.state_name,
                    locationname: location.location_name,
                    plantcode: plant.plant_code,
                    plantname: plant.plant_name,
                    lineid: line._id,
                    linecode: line.line_code,
                    linename: line.line_name,
                  };
                  this.LinesData.push(ELEMENT_DATA);
                });
              });
            });
          });
        });
      }
      console.log(this.LinesData, "LinesData");
    });
    //});

  }

  public temp = [];
  constructor(private httpClient: HttpClient, protected datePipe: DatePipe,
    protected dataSourceService: ManualEntryService, private utils: UtilService) { }
  public pivotReport = {
  };

  GetShift_StateData() {
    this.Shift = [];

    // this.dataSourceService.GetServerAPIPath().subscribe(      (apipath: any) => {

    this.dataSourceService.GetShiftDetails().subscribe(
      (shiftdata: any[]) => {
        //console.log(shiftdata);
        for (let i = 0; i < shiftdata.length; i++) {
          const c = shiftdata[i];
          let a: string[] = [''];
          a.push(c._id);
          a.push(c.shift);
          this.Shift.push(a);
        }
      })

  }


  customizeToolbar(toolbar) {
    //console.log(toolbar);
    let tabs = toolbar.getTabs();
    toolbar.getTabs = function () {

      delete tabs[0];
      delete tabs[1];
      delete tabs[2];
      delete tabs[3];
      delete tabs[4];
      delete tabs[5];
      delete tabs[6];

      return tabs;
    }

  }
  Export_Excel() {
    var D = this.getMonthDateRange(moment(this.date.value).format("YYYY"), moment(this.date.value).format("MM"));
    var lineName = this.dataSourceService.lineName.split("/");
    this.child.webDataRocks.exportTo(
      "Excel", {
      filename: "Fault Report_" + moment(D.start).format("yyyy-MM") + "_" + this.dataSourceService.lineName,
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
    var lineName = this.dataSourceService.lineName.split("/");
    var D = this.getMonthDateRange(moment(this.date.value).format("YYYY"), moment(this.date.value).format("MM"));

    this.child.webDataRocks.exportTo(
      "pdf", {
      filename: "Fault Report_" + moment(D.start).format("yyyy-MM") + "_" + lineName[0],
      header: "Fault Report" + " / " + moment(D.start).format("yyyy-MM") + " / " + this.dataSourceService.lineName,
      destinationType: "file",
      url: "URL to server script saving the file"

    },
      function () {
        //console.log("Export process is finished");
      }
    );
  }

  SearchStateData(data) {
    console.log(data);
    this.temp = [
      {
        line_id: {
          type: "string"
        },
        stop_name: {
          type: "string"
        },
        machine_name: {
          type: "string"
        },
        batch: {
          type: "string"
        },
        fgex: {
          type: "string"
        },
        shift: {
          type: "string"
        },
        start_time: {
          type: "datetime"
        },
        date: {
          type: "string"
        },
        end_time: {
          type: "datetime"
        },
        fault_name: {
          type: "string"
        },
        parts: {
          type: "string"
        },
        operator_name: {
          type: "string"
        },
        user_comment1: {
          type: "string"
        },
        fault_cause: {
          type: "string"
        },
        duration: {
          type: "time"
        },

      }
    ]
    this.temp = this.temp.concat(data);
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
              uniqueName: "batch"
            },
            {
              uniqueName: "operator_name"
            },
            {
              uniqueName: "shift",
            },
            {
              uniqueName: "date",
            }
          ],
          rows: [
            {
              uniqueName: "batch",
              caption: "Batch",
            },
            {
              uniqueName: "start_time",
              caption: "Start Date",
            },
            {
              uniqueName: "end_time",
              caption: "End Date",
            },
            {
              uniqueName: "fault_cause",
              caption: "Fault Cause",
            },
          ],
          measures: [
            {
              uniqueName: "duration",
              formula: '(sum("duration"))',
              format: "decimal2",
              caption: "Fault Duration",
            },
            {
              uniqueName: "count",
              formula: '(count("duration"))',
              caption: "Fault Count",
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
          },

        },

        formats:
          [
            {
              name: "decimal2",
              decimalPlaces: 2
            },
            {
              name: "decimal0",
              decimalPlaces: 0
            },
            {
              name: "cellcoloring",
              decimalPlaces: 2
            }
          ],
      }
    );

    // });
  }

  ngOnInit() {
    this.createFormFilters();
    this.createFiltersForm();
    this.GetLinesList();
    //this.GetShift_StateData();
    this.BindDefaultDates();
    this.getSearchData(this.line_id.value);

  }

  BindDefaultDates() {
    var date = new Date();
    this.date.setValue(this.datePipe.transform(this.utils.addDays(new Date(), -1), 'yyyy-MM-dd'));
    this.shift.setValue('Shift A');
    this.line_id.setValue(this.dataSourceService.lineId);
  }
  getSearchData(lineid) {
    var selectedLineId;
    if (lineid != "") {
      selectedLineId = lineid;
    } else {
      selectedLineId = this.line_id.value;
    }
    console.log(this.line_id.value, "line_id");


    this.FetchDataFromApi(selectedLineId);
  }

  FetchDataFromApi(line_Id) {
    this.gotData = false;
    this.Fault = [];
    this.temp = [];
    this.gotData = false;
    var D = this.getMonthDateRange(moment(this.date.value).format("YYYY"), moment(this.date.value).format("MM"));
    //console.log();
    // this.dataSourceService.GetServerAPIPath().subscribe(
    //   (apipath: any) => {
    // console.log('https://int91mat11.smartfactoryworx.tech' + '/api/trend/day_state_wise_report?startDate=' + moment(D.start).format("yyyy-MM-DD") + '&endDate=' + moment(D.end).format("yyyy-MM-DD") + '&machine_state=fault&duration=5');
    this.dataSourceService.GetFaultwiseData(moment(D.start).format("yyyy-MM-DD"), moment(D.end).format("yyyy-MM-DD"), 'fault', '5', line_Id).subscribe((d: any[]) => {
      for (let i = 0; i < d.length; i++) {
        const a = d[i];
        const Fault_data = {
          _id: a._id,
          stop_name: a.stop_name,
          machine_name: a.machine_name,
          batch: a.batch,
          fgex: a.fgex,
          shift: a.shift,
          start_time: a.start_time,
          date: this.datePipe.transform(a.date, 'yyyy-MM-dd'),
          end_time: a.end_time,
          fault_name: a.fault_name,
          operator_name: a.operator_name,
          user_comment1: a.user_comment1,
          fault_cause: (a.fault_cause == "" ? a.fault_name : a.fault_cause),
          duration: a.duration,
          line_id: a.line_id,
          count: 1
        }
        this.Fault.push(Fault_data);
      }
      console.log(this.Fault);
      this.gotData = true;
      //this.licenseKey = apipath['pivot_license_key'];
    },
      error => {
        console.log('oops', error.error);
        this.errormsg = error.error.error;
      });
  }

  onCustomizeCell(
    cell,
    data
  ): void {
    if (data.isClassicTotalRow) cell.addClass("fm-total-classic-r");
    if (data.isGrandTotalRow) cell.addClass("fm-grand-total-r");
    if (data.isGrandTotalColumn) cell.addClass("fm-grand-total-c");
  }

  pivotTableReportComplete: boolean = false;

  onReportComplete(): void {

    this.SearchStateData(this.Fault);
    this.child.webDataRocks.off("reportcomplete");
    toolbar: true;
    this.pivotTableReportComplete = true;
    this.createChart_FaultCountDuration('higchartcontainer-control-faultcount', 'countbar');
    this.createChart_FaultCountDuration('higchartcontainer-control-faultduration', 'durationbar');
  }

  createChart_FaultCountDuration(controlname, chartType) {
    console.log(this.Fault);
    console.log(controlname, chartType);
    var FaultGroupedData = this.utils.groupAndSum(this.Fault, ['fault_cause'], ['duration', 'count']);
    FaultGroupedData.forEach((itm) => {
      itm["duration"] = this.utils.GetDigitDecimalNum(this.utils.ConvertToHours(itm["duration"]), '1e1')
    });

    console.log(FaultGroupedData, "FaultGroupedData");
    let xAxisData;
    let measureData;
    let chartTitleName;
    let seriesName;
    let color;

    if (chartType === 'countbar') {
      FaultGroupedData.sort(this.utils.dynamicSort('count'))
      xAxisData = this.utils.filterMyArr(FaultGroupedData, 'fault_cause');
      measureData = this.utils.filterMyArr(FaultGroupedData, 'count');
      chartTitleName = "Faultwise - Count";
      seriesName = "Fault Count";
      color = "rgb(192, 235, 152)";
    }
    else if (chartType === 'durationbar') {
      FaultGroupedData.sort(this.utils.dynamicSort('duration'))
      xAxisData = this.utils.filterMyArr(FaultGroupedData, 'fault_cause');
      measureData = this.utils.filterMyArr(FaultGroupedData, 'duration');
      chartTitleName = "Faultwise - Duration( Hours )";
      seriesName = "Fault Duration";
      color = "rgb(124, 181, 236)";
    }
    var ChartData: any;
    ChartData = {

      chart: {
        type: 'bar'
      },
      title: {
        text: chartTitleName,
        align: 'left',
        style: {
          fontWeight: 'bold'
        }
      },
      xAxis: {
        title: {
          text: "Fault Causes"
        },
        categories: xAxisData
      },
      yAxis: [
        {
          title: {
            text: seriesName
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
      plotOptions: {
        bar: {
          stacking: undefined,
          dataLabels: {
            enabled: true,
            style: {
              fontWeight: 'bold',
              color: '#000000'
            },
            formatter: function () {
              let value = (this.y);
              return '' + value;
            }
          }
        }
      },
      series: [{
        name: seriesName,
        data: measureData,
        color: color
      }],
      credits: {
        enabled: false
      }
    }

    // console.log(JSON.stringify(ChartData));
    Highcharts.chart(controlname, ChartData);
  }
}