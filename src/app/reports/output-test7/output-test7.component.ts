import { Component, ViewChild, OnInit } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ManualEntryService } from '../app-manualentry.service';
import Drilldown from 'highcharts/modules/drilldown';
Drilldown(Highcharts);
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import * as _moment from 'moment';
import { default as _rollupMoment, Moment } from 'moment';
import Highcharts, { seriesType } from 'highcharts';
import HighchartsMore from "highcharts/highcharts-more";
HighchartsMore(Highcharts)
import exporting from 'highcharts/modules/exporting';
// import { SliceMeasure } from 'flexmonster';
// import * as Flexmonster from 'flexmonster';
// import { FlexmonsterPivot } from 'ng-flexmonster';
import { CdkColumnDef } from "@angular/cdk/table";
import { WebDataRocksPivot } from "../@webdatarocks/webdatarocks.angular4";
import { Measure } from 'webdatarocks';

exporting(Highcharts)

const moment = _rollupMoment || _moment;

// export const MY_FORMATS = {
//   parse: {
//     dateInput: 'MMM - YYYY',
//   },
//   display: {
//     dateInput: 'MMM - YYYY',
//     monthYearLabel: 'MMM YYYY',
//     dateA11yLabel: 'LL',
//     monthYearA11yLabel: 'MMMM YYYY',
//   },
// };


interface output {
  _id: string;
  line_id: string;
  plant_id: string;
  shift: string;
  machine_name: string;
  case_count: number;
  roll_changeover: number;
  operator_name: string;
  peak_speed: number;
  layout: string;
  product: string;
  batch_name: string;
  batch_size: number;
  t200Use: boolean;
  changeover_type: string;
  cause: string;
  remark: string;
  mechanical_changeover: number;
  setup_changeover: number;
  batch_end_type: string;
  rated_speed: number;
  month: string;
  blocked_count: number;
  waiting_count: number;
  break_pdt: number;
  co_pdt: number;
  updt_count: number;
  changeover_count: number;
  major_fault_count: number;
  minor_fault_count: number;
  major_manual_stop_count: number;
  minor_manual_stop_count: number;
  co_pdt_count: number;
  break_pdt_count: number;
  reject_count: number;
  pdt_count: number;
  avg_speed: number;
  performance_time: number;
  reject_time: number;
  changeover_wastage_time: number;
  speed_loss: number;
  net_operating_time: number;
  fgex: string;
  total_idle_time: number;
  total_idle_count: number;
  idle_time: number;
  idle_count: number;
  date: string;
  batch_start: DatePipe;
  batch_end: DatePipe;
  changeover_wastage: number;
  planed_production_time: number;
  goodCount: number;
  nmx_count: number;
  blocked_time: number;
  waiting_time: number;
  major_manual_stop_time: number;
  minor_manual_stop_time: number;
  pdt_time: number;
  updt_time: number;
  changeover_time: number;
  gross_operating_time: number;
  theoretical_time: number;
  major_fault_time: number;
  minor_fault_time: number;
  good_count_machine: string;
  executing: number;
  productive_time: number;
  cleaning_part_fixing: number;
  no_production_planned: number;
  excess_changeover_time: number;
}

interface Filter {
  value: string;
  viewValue: string;
}
var HighCharts_ColorsType1 = ['#FFE66D', '#4ECDC4', '#1A535C', '#FF6B6B', '#64E572', '#FF9655', '#FFF263', '#6AF9C4']
var HighCharts_ColorsType2 = ["#32cd32", "rgb(254,1,1)", "rgb(163, 163, 117)", "rgb(255, 51, 204)",]
var HighCharts_yAxisOptions1 = {
  labels: { formatter: undefined },
  plotLines: [{
    //   color: 'blue',
    //   width: 2,
    //   value: 25,
    //   zIndex: 5,
    //   label: {
    //     text: "Average",
    //     align: 'left'
    //   }
    // },
    // {
    //   color: 'blue',
    //   width: 2,
    //   value: 15,
    //   zIndex: 5,
    //   label: {
    //     text: "Till Date",
    //     align: 'left'
    //   }
  }]
}
var HighCharts_yAxisOptions2 = {
  title: {
    enabled: false
  },
  labels: {
    enabled: true,
    formatter: function () {
      let value = (this.value) / 3600;
      return value.toFixed(0);
    },


  },

}
var HighCharts_yAxisOptions3 = {

}
var HighCharts_yAxisOptions4 = {
  labels: { formatter: undefined },
  plotLines: [{

  }]
}

var HighCharts_yAxisOptions5 = {
  labels: {

    formatter: function () {
      let value = (this.value) / 3600;
      return value.toFixed(0);
    },

  },
  plotLines: [{
    //   color: 'blue',
    //   width: 2,
    //   value: 25,
    //   zIndex: 5,
    //   label: {
    //     text: "label1",
    //     align: 'left'
    //   }
    // },
    // {
    //   color: 'blue',
    //   width: 2,
    //   value: 15,
    //   zIndex: 5,
    //   label: {
    //     text: "label1",
    //     align: 'left'
    //   }
  }]
}
var HighCharts_xAxisOptions2 = {
  labels: {
    enabled: false,
  },
  plotLines: [{}]
}
var HighCharts_xAxisOptions1 = {
  labels: {
    enabled: true,
  },
  plotLines: [{}]
}
var HighCharts_PlotOptions1 = {
  series: {
    stacking: undefined,
    borderWidth: 0,
    dataSorting: {
      enabled: true,
    },
    dataLabels: {
      allowOverlap: false,
      enabled: true,
      formatter: function () {
        let value = (this.y);
        return '' + value.toFixed(1);
      }

    },
  }
}
var HighCharts_PlotOptions2 = {
  series: {
    borderWidth: 0,
    dataSorting: {
      enabled: true,
    },
    dataLabels: {
      enabled: true,
      allowOverlap: false,
      formatter: function () {
        let value = (this.y) / 3600;
        return '' + value.toFixed(0);
      }

    } // set colors of the series
  },
}
var HighCharts_PlotOptions3 = {
  series: {
    borderWidth: 0,
    connectNulls: true,
    dataSorting: {
      enabled: false,
    },
    dataLabels: {
      enabled: true,

      formatter: function () {
        let value = (this.y);
        return '' + value.toFixed(1);
      }

    },
  }
}
var HighCharts_PlotOptions4 = {
  // column: {
  //   stacking: 'normal',
  //   dataLabels: {
  //     enabled: true
  //   }
  // },
  series: {

    borderWidth: 0,
    stacking: 'normal',
    dataLabels: {
      enabled: true,
      allowOverlap: false,
      formatter: function () {
        let value = (this.y) / 3600;
        return '' + value.toFixed(0);
      }
    },
    dataSorting: {
      enabled: false,
    },
    tooltip: { valueDecimals: 0 },
  }
}


@Component({
  selector: 'app-output-test7',
  templateUrl: './output-test7.component.html',
  styleUrls: ['./output-test7.component.scss'],
  // providers: [
  //   {
  //     provide: DateAdapter,
  //     useClass: MomentDateAdapter,
  //     deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
  //   },
  //   { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  // ]
})
export class OutputTest7Component implements OnInit {
  @ViewChild("pivot1") child: WebDataRocksPivot;
  @ViewChild("pivot2") child2: WebDataRocksPivot;

  public OutputData: output[] = [];
  errormsg;
  licenseKey;
  //public multiLineData = [];
  gotData: boolean = false;
  gotLines: boolean = false;

  outputReport: FormGroup;
  lines = [];
  filters: Filter[] = [
    { value: 'operatorwise', viewValue: 'Operator wise' },
    // { value: 'datewise', viewValue: 'Date wise' },
    { value: 'batchwise', viewValue: 'Batch wise' },
    { value: 'shiftwise', viewValue: 'Shift wise' },
    { value: 'productwise', viewValue: 'Product wise' }
  ];
  public selected2 = this.filters[0].value;
  //lines = ["line-1", "line-2", "line-3", "line-4", "line-5"];

  pivotTableReportComplete: boolean = false;
  Highcharts: typeof Highcharts = Highcharts;

  date = new FormControl(moment());
  chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue = new FormControl(moment()).value;
    ctrlValue.year(normalizedYear.year());
    this.date.setValue(ctrlValue);
  }

  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = new FormControl(moment()).value;
    ctrlValue.month(normalizedMonth.month());
    ctrlValue.year(normalizedMonth.year());
    this.date.setValue(ctrlValue);
    datepicker.close();
  }



  createFormFilters() {
    this.date = new FormControl('', Validators.required);
  }
  createFiltersForm() {
    this.outputReport = new FormGroup({
      date: this.date,
    });
  }

  public DataWithStructure = [];
  constructor(private httpClient: HttpClient, protected datePipe: DatePipe,
    protected dataSourceService: ManualEntryService) { }
  public pivotReport = {
  };

  //--------------------------------------------------------------
  getMonthDateRange(year, month) {
    console.log(year, month)
    var startDate = moment([year, month - 1]);
    var endDate = moment(startDate).endOf('month');
    console.log(startDate, endDate)

    return { start: startDate, end: endDate };
  }
  getPreviousMonthDateRange(year, month) {
    console.log(year, month);
    var date = new Date(year, month, 1);
    date.setMonth(date.getMonth() - 2);
    var monthStartDay = new Date(date.getFullYear(), date.getMonth(), 1);
    var monthEndDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    console.log(monthStartDay, monthEndDay)
    return { start: this.datePipe.transform(monthStartDay, 'yyyy-MM-dd'), end: this.datePipe.transform(monthEndDay, 'yyyy-MM-dd') };
  }

  getFilterValueOee(value, line) {

    console.log(value)

    if (value === "operatorwise") {
      //oee_operatorwise

      this.createGoogleBarChart2(HighCharts_ColorsType1, "line_id", "Line Name", "operator_name", ["line_id." + line], false, [], false,
        [{ uniqueName: "OEE", formula: "((\"productive_time\")/(\"planed_production_time\"))*100", caption: "OEE (%)", format: "44mvcoma", },], "column", false,
        true, HighCharts_yAxisOptions1, HighCharts_PlotOptions1, "higchartcontainer-control-oee-" + line, false, false, true, "OEE Operatorwise");
    }
    else if (value === "datewise") {
      this.createGoogleBarChart2(HighCharts_ColorsType1, "date", "Date", "line_id", [], false, ["line_id." + line], false,
        [{ uniqueName: "OEE", formula: "((\"productive_time\")/(\"planed_production_time\"))*100", caption: "OEE (%)", format: "44mvcoma", },], "line", false,
        true, HighCharts_yAxisOptions1, HighCharts_PlotOptions3, "higchartcontainer-control-oee-" + line, false, false, true, "OEE Datewise");
    }
    else if (value === "batchwise") {
      //oee_batchwise
      this.createGoogleBarChart2(HighCharts_ColorsType1, "line_id", "Line Name", "batch_name", ["line_id." + line], false, [], false,
        [{ uniqueName: "OEE", formula: "((\"productive_time\")/(\"planed_production_time\"))*100", caption: "OEE (%)", format: "44mvcoma", },], "column", false,
        true, HighCharts_yAxisOptions1, HighCharts_PlotOptions1, "higchartcontainer-control-oee-" + line, false, false, true, "OEE Batchwise");
    }
    else if (value === "shiftwise") {
      //oee_shiftwise
      this.createGoogleBarChart2(HighCharts_ColorsType1, "line_id", "Line Name", "shift", ["line_id." + line], false, [], false,
        [{ uniqueName: "OEE", formula: "((\"productive_time\")/(\"planed_production_time\"))*100", caption: "OEE (%)", format: "44mvcoma", },], "column", false,
        true, HighCharts_yAxisOptions1, HighCharts_PlotOptions1, "higchartcontainer-control-oee-" + line, false, false, true, "OEE Shiftwise");
    }
    else if (value === "productwise") {
      //oee_productwise
      this.createGoogleBarChart2(HighCharts_ColorsType1, "line_id", "Line Name", "product", ["line_id." + line], false, [], false,
        [{ uniqueName: "OEE", formula: "((\"productive_time\")/(\"planed_production_time\"))*100", caption: "OEE (%)", format: "44mvcoma", },], "column", false,
        true, HighCharts_yAxisOptions1, HighCharts_PlotOptions1, "higchartcontainer-control-oee-" + line, false, false, true, "OEE Productwise");
    }
  }

  getFilterValuePerformance(value, line) {

    console.log(value)

    if (value === "operatorwise") {
      this.createGoogleBarChart2(HighCharts_ColorsType1, "line_id", "Line Name", "operator_name", ["line_id." + line], false, [], false,
        [{ uniqueName: "Performance", formula: "((\"net_operating_time\") / (\"gross_operating_time\"))*100", caption: "P (%)", format: "44mvcoma", },], "column", false,
        true, HighCharts_yAxisOptions1, HighCharts_PlotOptions1, "higchartcontainer-control-performance-" + line, false, false, true, "Performance Operatorwise");
    }
    else if (value === "datewise") {
      this.createGoogleBarChart2(HighCharts_ColorsType1, "date", "Date", "line_id", [], false, ["line_id." + line], false,
        [{ uniqueName: "Performance", formula: "((\"net_operating_time\") / (\"gross_operating_time\"))*100", caption: "P (%)", format: "44mvcoma", },], "line", false,
        true, HighCharts_yAxisOptions1, HighCharts_PlotOptions3, "higchartcontainer-control-performance-" + line, false, false, true, "Performance Datewise");
    }
    else if (value === "batchwise") {
      this.createGoogleBarChart2(HighCharts_ColorsType1, "line_id", "Line Name", "batch_name", ["line_id." + line], false, [], false,
        [{ uniqueName: "Performance", formula: "((\"net_operating_time\") / (\"gross_operating_time\"))*100", caption: "P (%)", format: "44mvcoma", },], "column", false,
        true, HighCharts_yAxisOptions1, HighCharts_PlotOptions1, "higchartcontainer-control-performance-" + line, false, false, true, "Performance Batchwise");
    }
    else if (value === "shiftwise") {

      this.createGoogleBarChart2(HighCharts_ColorsType1, "line_id", "Line Name", "shift", ["line_id." + line], false, [], false,
        [{ uniqueName: "Performance", formula: "((\"net_operating_time\") / (\"gross_operating_time\"))*100", caption: "P (%)", format: "44mvcoma", },], "column", false,
        true, HighCharts_yAxisOptions1, HighCharts_PlotOptions1, "higchartcontainer-control-performance-" + line, false, false, true, "Performance Shiftwise");
    }
    else if (value === "productwise") {

      this.createGoogleBarChart2(HighCharts_ColorsType1, "line_id", "Line Name", "product", ["line_id." + line], false, [], false,
        [{ uniqueName: "Performance", formula: "((\"net_operating_time\") / (\"gross_operating_time\"))*100", caption: "P (%)", format: "44mvcoma", },], "column", false,
        true, HighCharts_yAxisOptions1, HighCharts_PlotOptions1, "higchartcontainer-control-performance-" + line, false, false, true, "Performance Productwise");
    }
  }

  getFilterValueQuality(value, line) {

    console.log(value)

    if (value === "operatorwise") {
      this.createGoogleBarChart2(HighCharts_ColorsType1, "line_id", "Line Name", "operator_name", ["line_id." + line], false, [], false,
        [{
          uniqueName: "Quality", formula: "((\"productive_time\"/60) / (\"net_operating_time\"/60))*100", caption: "Q (%)",
          format: "44mvcoma",
        }], "column", false,
        true, HighCharts_yAxisOptions1, HighCharts_PlotOptions1, "higchartcontainer-control-quality-" + line, false, false, true, "Quality Operatorwise");
    }
    else if (value === "datewise") {
      this.createGoogleBarChart2(HighCharts_ColorsType1, "date", "Date", "line_id", [], false, ["line_id." + line], false,
        [{
          uniqueName: "Quality", formula: "((\"productive_time\"/60) / (\"net_operating_time\"/60))*100", caption: "Q (%)",
          format: "44mvcoma",
        }], "line", false,
        true, HighCharts_yAxisOptions1, HighCharts_PlotOptions3, "higchartcontainer-control-quality-" + line, false, false, true, "Quality Datewise");
    }
    else if (value === "batchwise") {

      this.createGoogleBarChart2(HighCharts_ColorsType1, "line_id", "Line Name", "batch_name", ["line_id." + line], false, [], false,
        [{
          uniqueName: "Quality", formula: "((\"productive_time\"/60) / (\"net_operating_time\"/60))*100", caption: "Q (%)",
          format: "44mvcoma",
        }], "column", false,
        true, HighCharts_yAxisOptions1, HighCharts_PlotOptions1, "higchartcontainer-control-quality-" + line, false, false, true, "Quality Batchwise");

    }
    else if (value === "shiftwise") {
      this.createGoogleBarChart2(HighCharts_ColorsType1, "line_id", "Line Name", "shift", ["line_id." + line], false, [], false,
        [{
          uniqueName: "Quality", formula: "((\"productive_time\"/60) / (\"net_operating_time\"/60))*100", caption: "Q (%)",
          format: "44mvcoma",
        }], "column", false,
        true, HighCharts_yAxisOptions1, HighCharts_PlotOptions1, "higchartcontainer-control-quality-" + line, false, false, true, "Quality Shiftwise");

    }
    else if (value === "productwise") {
      this.createGoogleBarChart2(HighCharts_ColorsType1, "line_id", "Line Name", "product", ["line_id." + line], false, [], false,
        [{
          uniqueName: "Quality", formula: "((\"productive_time\"/60) / (\"net_operating_time\"/60))*100", caption: "Q (%)",
          format: "44mvcoma",
        }], "column", false,
        true, HighCharts_yAxisOptions1, HighCharts_PlotOptions1, "higchartcontainer-control-quality-" + line, false, false, true, "Quality Productwise");
    }
  }
  getFilterValueAvailability(value, line) {

    console.log(value)

    if (value === "operatorwise") {

      this.createGoogleBarChart2(HighCharts_ColorsType1, "line_id", "Line Name", "operator_name", ["line_id." + line], false, [], false,
        [{ uniqueName: "Availability", formula: "((\"gross_operating_time\") / (\"planed_production_time\"))*100", caption: "A (%)", format: "44mvcoma", },], "column", false,
        true, HighCharts_yAxisOptions1, HighCharts_PlotOptions1, "higchartcontainer-control-availability-" + line, false, false, true, "Availability Operatorwise");
    }
    else if (value === "datewise") {
      this.createGoogleBarChart2(HighCharts_ColorsType1, "date", "Date", "line_id", [], false, ["line_id." + line], false,
        [{ uniqueName: "Availability", formula: "((\"gross_operating_time\") / (\"planed_production_time\"))*100", caption: "A (%)", format: "44mvcoma", },], "line", false,
        true, HighCharts_yAxisOptions1, HighCharts_PlotOptions3, "higchartcontainer-control-availability-" + line, false, false, true, "Availability Datewise");
    }
    else if (value === "batchwise") {
      this.createGoogleBarChart2(HighCharts_ColorsType1, "line_id", "Line Name", "batch_name", ["line_id." + line], false, [], false,
        [{ uniqueName: "Availability", formula: "((\"gross_operating_time\") / (\"planed_production_time\"))*100", caption: "A (%)", format: "44mvcoma", },], "column", false,
        true, HighCharts_yAxisOptions1, HighCharts_PlotOptions1, "higchartcontainer-control-availability-" + line, false, false, true, "Availability Batchwise");
    }
    else if (value === "shiftwise") {

      this.createGoogleBarChart2(HighCharts_ColorsType1, "line_id", "Line Name", "shift", ["line_id." + line], false, [], false,
        [{ uniqueName: "Availability", formula: "((\"gross_operating_time\") / (\"planed_production_time\"))*100", caption: "A (%)", format: "44mvcoma", },], "column", false,
        true, HighCharts_yAxisOptions1, HighCharts_PlotOptions1, "higchartcontainer-control-availability-" + line, false, false, true, "Availability Shiftwise");

    }
    else if (value === "productwise") {

      this.createGoogleBarChart2(HighCharts_ColorsType1, "line_id", "Line Name", "product", ["line_id." + line], false, [], false,
        [{ uniqueName: "Availability", formula: "((\"gross_operating_time\") / (\"planed_production_time\"))*100", caption: "A (%)", format: "44mvcoma", },], "column", false,
        true, HighCharts_yAxisOptions1, HighCharts_PlotOptions1, "higchartcontainer-control-availability-" + line, false, false, true, "Availability Productwise");

    }


  }
  getFilterValueSpeedloss(value, line) {

    console.log(value)

    if (value === "operatorwise") {

      this.createGoogleBarChart2(HighCharts_ColorsType1, "line_id", "Line Name", "operator_name", ["line_id." + line], false, [], false,
        [{ uniqueName: "speed_loss", formula: "((\"speed_loss\"))", caption: "Speed Loss (Hrs)", format: "decimal2", },], "column", false,
        true, HighCharts_yAxisOptions1, HighCharts_PlotOptions1, "higchartcontainer-control-speedloss-" + line, false, false, true, "Speed Loss Operatorwise");
    }
    else if (value === "datewise") {


      this.createGoogleBarChart2(HighCharts_ColorsType1, "date", "Date", "line_id", [], false, ["line_id." + line], false,
        [{ uniqueName: "speed_loss", formula: "((\"speed_loss\"))", caption: "Speed Loss (Hrs)", format: "decimal2", },], "line", false,
        true, HighCharts_yAxisOptions1, HighCharts_PlotOptions3, "higchartcontainer-control-speedloss-" + line, false, false, true, "Speed Loss Datewise");

    }
    else if (value === "batchwise") {

      this.createGoogleBarChart2(HighCharts_ColorsType1, "line_id", "Line Name", "batch_name", ["line_id." + line], false, [], false,
        [{ uniqueName: "speed_loss", formula: "((\"speed_loss\"))", caption: "Speed Loss (Hrs)", format: "decimal2", },], "column", false,
        true, HighCharts_yAxisOptions1, HighCharts_PlotOptions1, "higchartcontainer-control-speedloss-" + line, false, false, true, "Speed Loss Batchwise");

    }
    else if (value === "shiftwise") {

      this.createGoogleBarChart2(HighCharts_ColorsType1, "line_id", "Line Name", "shift", ["line_id." + line], false, [], false,
        [{ uniqueName: "speed_loss", formula: "((\"speed_loss\"))", caption: "Speed Loss (Hrs)", format: "decimal2", },], "column", false,
        true, HighCharts_yAxisOptions1, HighCharts_PlotOptions1, "higchartcontainer-control-speedloss-" + line, false, false, true, "Speed Loss Shiftwise");

    }
    else if (value === "productwise") {

      this.createGoogleBarChart2(HighCharts_ColorsType1, "line_id", "Line Name", "product", ["line_id." + line], false, [], false,
        [{ uniqueName: "speed_loss", formula: "((\"speed_loss\"))", caption: "Speed Loss (Hrs)", format: "decimal2", },], "column", false,
        true, HighCharts_yAxisOptions1, HighCharts_PlotOptions1, "higchartcontainer-control-speedloss-" + line, false, false, true, "Speed Loss Productwise");

    }
  }
  getFilterValueIdletime(value, line) {

    console.log(value)

    if (value === "operatorwise") {

      this.createGoogleBarChart2(HighCharts_ColorsType1, "line_id", "Line Name", "operator_name", ["line_id." + line], false, [], false,
        [{ uniqueName: "idle_time", formula: "((\"idle_time\"))", caption: "Idle Time(Hrs)", format: "decimal2", },], "column", false,
        true, HighCharts_yAxisOptions1, HighCharts_PlotOptions1, "higchartcontainer-control-idletime-" + line, false, false, true, "Idle Time Operatorwise");

    }
    else if (value === "datewise") {

      this.createGoogleBarChart2(HighCharts_ColorsType1, "date", "Date", "line_id", [], false, ["line_id." + line], false,
        [{ uniqueName: "idle_time", formula: "((\"idle_time\"))", caption: "Idle Time(Hrs)", format: "decimal2", },], "line", false,
        true, HighCharts_yAxisOptions1, HighCharts_PlotOptions3, "higchartcontainer-control-idletime-" + line, false, false, true, "Idle Time Datewise");

    }
    else if (value === "batchwise") {

      this.createGoogleBarChart2(HighCharts_ColorsType1, "line_id", "Line Name", "batch_name", ["line_id." + line], false, [], false,
        [{ uniqueName: "idle_time", formula: "((\"idle_time\"))", caption: "Idle Time(Hrs)", format: "decimal2", },], "column", false,
        true, HighCharts_yAxisOptions1, HighCharts_PlotOptions1, "higchartcontainer-control-idletime-" + line, false, false, true, "Idle Time Batchwise");

    }
    else if (value === "shiftwise") {

      this.createGoogleBarChart2(HighCharts_ColorsType1, "line_id", "Line Name", "shift", ["line_id." + line], false, [], false,
        [{ uniqueName: "idle_time", formula: "((\"idle_time\"))", caption: "Idle Time(Hrs)", format: "decimal2", },], "column", false,
        true, HighCharts_yAxisOptions1, HighCharts_PlotOptions1, "higchartcontainer-control-idletime-" + line, false, false, true, "Idle Time Shiftwise");
    }
    else if (value === "productwise") {

      this.createGoogleBarChart2(HighCharts_ColorsType1, "line_id", "Line Name", "product", ["line_id." + line], false, [], false,
        [{ uniqueName: "idle_time", formula: "((\"idle_time\"))", caption: "Idle Time(Hrs)", format: "decimal2", },], "column", false,
        true, HighCharts_yAxisOptions1, HighCharts_PlotOptions1, "higchartcontainer-control-idletime-" + line, false, false, true, "Idle Time Productwise");
    }
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
      delete tabs[6];
      return tabs;
    }
  }
  //Simply adding header to PIVOT table.

  SearchStateData(data) {
    console.log('*************************1050*******************');
    console.log(data, 'SearchStateData');
    this.DataWithStructure = [
      {
        _id: {
          type: "string"
        },
        line_id: {
          type: "string"
        },
        plant_id: {
          type: "string"
        },

        shift: {
          type: "string"
        },
        machine_name: {
          type: "string"
        },
        case_count: {
          type: "number"
        },
        roll_changeover: {
          type: "time"
        },
        operator_name: {
          type: "string"
        },
        peak_speed: {
          type: "number"
        },
        layout: {
          type: "string"
        },
        product: {
          type: "string"
        },
        batch_name: {
          type: "string"
        },
        batch_size: {
          type: "number"
        },
        t200Use: {
          type: "boolean"
        },
        changeover_type: {
          type: "string"
        },
        cause: {
          type: "string"
        },
        remark: {
          type: "string"
        },
        mechanical_changeover: {
          type: "number"
        },
        setup_changeover: {
          type: "time"
        },
        batch_end_type: {
          type: "string"
        },
        rated_speed: {
          type: "number"
        },
        month: {
          type: "string"
        },
        blocked_count: {
          type: "number"
        },
        waiting_count: {
          type: "number"
        },
        break_pdt: {
          type: "time"
        },
        co_pdt: {
          type: "time"
        },
        updt_count: {
          type: "number"
        },
        changeover_count: {
          type: "number"
        },
        major_fault_count: {
          type: "number"
        },
        minor_fault_count: {
          type: "number"
        },
        major_manual_stop_count: {
          type: "number"
        },
        minor_manual_stop_count: {
          type: "number"
        },
        co_pdt_count: {
          type: "number"
        },
        break_pdt_count: {
          type: "number"
        },
        reject_count: {
          type: "number"
        },
        pdt_count: {
          type: "number"
        },
        avg_speed: {
          type: "number"
        },
        performance_time: {
          type: "time"
        },
        reject_time: {
          type: "time"
        },
        changeover_wastage_time: {
          type: "time"
        },
        speed_loss: {
          type: "time"
        },
        net_operating_time: {
          type: "time"
        },
        fgex: {
          type: "string"
        },
        total_idle_time: {
          type: "time"
        },
        total_idle_count: {
          type: "number"
        },
        idle_time: {
          type: "time"
        },
        idle_count: {
          type: "number"
        },
        date: {
          type: "string"
        },
        batch_start: {
          type: "datetime"
        },
        batch_end: {
          type: "datetime"
        },
        changeover_watage: {
          type: "time"
        },
        planed_production_time: {
          type: "time"
        },
        goodCount: {
          type: "number"
        },
        nmx_count: {
          type: "number"
        },
        blocked_time: {
          type: "time"
        },
        waiting_time: {
          type: "time"
        },
        major_manual_stop_time: {
          type: "time"
        },
        minor_manual_stop_time: {
          type: "time"
        },
        pdt_time: {
          type: "time"
        },
        updt_time: {
          type: "time"
        },
        changeover_time: {
          type: "time"
        },
        excess_changeover_time: {
          type: "time"
        },
        gross_operating_time: {
          type: "time"
        },
        theoretical_time: {
          type: "time"
        },
        major_fault_time: {
          type: "time"
        },
        minor_fault_time: {
          type: "time"
        },
        good_count_machine: {
          type: "string"
        },
        executing: {
          type: "time"
        },
        productive_time: {
          type: "time"
        },
        total_sum_idle_time: {
          type: "time"
        },
        total_manual_stop_time: {
          type: "time"
        },
        total_manual_stop_time1: {
          type: "number"
        },
        no_production_planned: {
          type: "time"
        },
        total_fault_time: {
          type: "time"
        },
        cleaning_part_fixing: {
          type: "time"
        }
      }
    ]
    this.DataWithStructure = this.DataWithStructure.concat(data);
    console.log(this.DataWithStructure, "DataWithStructure");
    console.log(this.child, "this.child");
    this.child.webDataRocks.off("reportcomplete");

    var setReportType;
    setReportType = {
      dataSource: {
        data: this.DataWithStructure
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
      },
      slice: {
        reportFilters: [
          {
            uniqueName: "batch_name"
          },
          {
            uniqueName: "operator_name"
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
            uniqueName: "layout",
          },
          {
            uniqueName: "fgex"
          },
          {
            uniqueName: "cause",
            caption: "early batch end",
          },
          {
            uniqueName: "product"
          },
          {
            uniqueName: "good_count_machine",
            caption: "Machine Name",
          },
          {
            uniqueName: "changeover_type",
            caption: "Type of CO",
          },
        ],
        rows: [
          {
            uniqueName: "line_id"
          },
          {
            uniqueName: "batch_name"
          },
          {
            uniqueName: "date"
          },
          {
            uniqueName: "operator_name"
          },

          {
            uniqueName: "shift"
          },
          {
            uniqueName: "fgex"
          },


        ],
        drills: {
          drillAll: true
        },
        expands: {
          expandAll: true,
        },
        columns: [
          {
            uniqueName: "Measures",

          }
        ],
        measures: [
          {
            uniqueName: "OEE",
            formula: "((\"productive_time\")/(\"planed_production_time\"))*100",
            caption: "OEE",
            format: "44mvcoma",
          },
          {
            uniqueName: "Availability",
            formula: "((\"gross_operating_time\") / (\"planed_production_time\"))*100",
            caption: "A",
            format: "44mvcoma",
          },
          {
            uniqueName: "Performance",
            formula: "((\"net_operating_time\") / (\"gross_operating_time\"))*100",
            caption: "P",
            format: "44mvcoma",
          },
          {
            uniqueName: "Quality",
            formula: "((\"productive_time\"/60) / (\"net_operating_time\"/60))*100",
            caption: "Q",
            format: "44mvcoma",
          },
          {
            uniqueName: "goodCount",
            formula: "((\"goodCount\"))",
            caption: "Good count"
          },

          {
            uniqueName: "Reject_Count",
            formula: "(sum(\"reject_count\"))",
            caption: "Reject count"
          },
          {
            uniqueName: "theoretical_time",
            formula: "((\"theoretical_time\"))",
            caption: "Total",
            format: "decimal2",
          },

          {
            uniqueName: "break_pdt",
            formula: "((\"break_pdt\"))",
            caption: "Standard time",
            format: "decimal2",
          },
          {
            uniqueName: "updt_time",
            formula: "(\"updt_time\")",
            caption: "Power Off",
            format: "decimal2",
          },
          {
            uniqueName: "co_pdt",
            formula: "((\"co_pdt\"))",
            caption: "PDT-Std CO",
            format: "decimal2",
          },

          {
            uniqueName: "changeover_time",
            formula: "(\"changeover_time\")",
            caption: "Changeover",
            format: "decimal2",
          },
          {
            uniqueName: "cleaning_part_fixing",
            formula: "(\"cleaning_part_fixing\")",
            caption: "Clean & part Fixing ",
            format: "decimal2",
          },
          {
            uniqueName: "setup_changeover",
            formula: "(\"setup_changeover\")",
            caption: "Setup Time",
            format: "decimal2",
          },
          // {
          //   uniqueName: "minor_fault_time",
          //   formula: "((\"minor_fault_time\"))",
          //   caption: "Minor Fault",
          //   format: "decimal2",
          // },
          // {
          //   uniqueName: "major_fault_time",
          //   formula: "((\"major_fault_time\"))",
          //   caption: "Major Fault",
          //   format: "decimal2",
          // },
          {
            uniqueName: "total_fault_time",
            formula: "((\"total_fault_time\"))",
            caption: "Breakdowns",
            format: "decimal2",
          },

          // {
          //   uniqueName: "minor_fault_time",
          //   formula: "((\"minor_fault_time\"))",
          //   caption: "Minor Fault Duration",
          //   format: "decimal2",
          // },
          {
            uniqueName: "blocked_time",
            formula: "((\"blocked_time\"))",
            caption: "Downstream",
            format: "decimal2",
          },

          // {
          //   uniqueName: "major_manual_stop_time",
          //   formula: "((\"major_manual_stop_time\"))",
          //   //formula: "(sum(\"major_manual_stop_time\"/60))",
          //   caption: "Major Manual stop Duration",
          //   format: "decimal2",
          // },
          // {
          //   uniqueName: "minor_manual_stop_time",
          //   formula: "((\"minor_manual_stop_time\"))",
          //   caption: "Minor Manual stop Duration",
          //   format: "decimal2",
          // },
          // {
          //   uniqueName: "waiting_time",
          //   formula: "((\"waiting_time\"))",
          //   caption: "Waiting Time",
          //   format: "decimal2",
          // },
          // {
          //   uniqueName: "idle_time",
          //   formula: "((\"idle_time\"))",
          //   caption: "Noraml Idle Time",
          //   format: "decimal2",
          // },

          {
            uniqueName: "total_manual_stop_time",
            formula: "((\"total_manual_stop_time\"))",
            caption: "Idle time",
            format: "decimal2",
          },

          {
            uniqueName: "roll_changeover",
            formula: "((\"roll_changeover\"))",
            caption: "Roll Change @4min",
            format: "decimal2",
          },
          {
            uniqueName: "speed_loss",
            formula: "((\"speed_loss\"))",
            //formula: "(((100-\"Performance\")*(\"Gross_Operating_Time\"/100)) - ((\"Waiting_Time\" + \"Blocked_Time\" + \"Major_Manual_Stop_Time\" + \"Minor_Fault_Time\" + \"Idle_Time\")))",
            caption: "Speed Loss Time",
            format: "decimal2",
          },
          {
            uniqueName: "reject_time",
            formula: "((\"reject_time\"))",
            caption: "Process Reject",
            format: "decimal2",
          },
          {
            uniqueName: "productive_time",
            formula: "((\"productive_time\"))",
            //formula: "((\"Net_Operating_Time\") - (\"In_Process_Reject_Time\"))",
            caption: "Productive Time",
            format: "decimal2",
          },
          {
            uniqueName: "executing",
            formula: "((\"executing\"))",
            caption: "Running Time",
            format: "decimal2",
          },

          {
            uniqueName: "changeover_wastage_time",
            formula: "((\"changeover_wastage_time\"))",
            caption: "CO Wastage",
            format: "decimal2",
          },

          {
            uniqueName: "rated_speed",
            formula: "average(\"rated_speed\")*60",//"(\"rated_speed\"*60)",
            caption: "Rated Speed",
            format: "decimal2",
          },
          {
            uniqueName: "avg_Speed",
            formula: "(\"goodCount\" + \"reject_count\")/((\"gross_operating_time\"-(\"idle_time\" + \"blocked_time\" + \"waiting_time\" + \"minor_fault_time\"))/60)",
            caption: "Average Speed",
            format: "44mvcoma1",
          },
          {
            uniqueName: "gross_operating_time",
            formula: "((\"gross_operating_time\"))",
            //formula: "((\"Planned_Production_Time\") - (\"Changeover_Time\" -\"Major_Fault_Time\"))",
            //aggregation:"sum",
            caption: "Gross Operating Time",
            format: "decimal2",
          },
          {
            uniqueName: "planed_production_time",
            formula: "(\"planed_production_time\")",
            //formula: "(sum(\"Theoritical Production Time-PDT-UPDT\"))",
            caption: "Planned Production Time",
            format: "decimal2",
          },
          {
            uniqueName: "net_operating_time",
            formula: "(\"net_operating_time\")",
            //formula: "(sum(\"Theoritical Production Time-PDT-UPDT\"))",
            caption: "Net Operating Time",
            format: "decimal2",
          },
        ]
      },

      formats: [
        {
          name: "decimal2",
          decimalPlaces: 2,
          textAlign: "center"
        },
        {
          name: "decimal0",
          decimalPlaces: 1,
          textAlign: "center"
        },
        {
          name: "44mvcoma",
          decimalPlaces: 0,
          currencySymbol: "%",
          currencySymbolAlign: "right",
          nullValue: "0",
          textAlign: "center",
          infinityValue: "0",
          divideByZeroValue: "0"
        },
        {
          name: "44mvcoma1",
          thousandsSeparator: " ",
          decimalSeparator: ".",
          decimalPlaces: 2,
          // currencySymbol: "%",
          currencySymbolAlign: "right",
          nullValue: "",
          textAlign: "center",
          infinityValue: "0",
          divideByZeroValue: "0"
        }
      ],
      conditions: [
        {
          formula: "#value < 60",
          measure: "OEE",
          format: {
            backgroundColor: "#ffb5ab",
            color: "#000000",
            fontFamily: "Arial",
            fontSize: "12px",

          }
        },
        {
          formula: "#value > 75",
          measure: "OEE",
          format: {
            backgroundColor: "#c1df9f",
            color: "#000000",
            fontFamily: "Arial",
            fontSize: "12px",

          }
        },
        {
          formula: "AND(#value >= 60, #value <= 75)",
          measure: "OEE",
          format: {
            backgroundColor: "#fff280",
            color: "#000000",
            fontFamily: "Arial",
            fontSize: "12px",

          }
        },
        {
          formula: "#value < 95",
          measure: "Quality",
          format: {
            backgroundColor: "#ffb5ab",
            color: "#000000",
            fontFamily: "Arial",
            fontSize: "12px"
          }
        },
        {
          formula: "#value > 98",
          measure: "Quality",
          format: {
            backgroundColor: "#c1df9f",
            color: "#000000",
            fontFamily: "Arial",
            fontSize: "12px",

          }
        },
        {
          formula: "AND(#value >= 95, #value <= 98)",
          measure: "Quality",
          format: {
            backgroundColor: "#fff280",
            color: "#000000",
            fontFamily: "Arial",
            fontSize: "12px",

          }
        },
        {
          formula: "#value < 80",
          measure: "Availability",
          format: {
            backgroundColor: "#ffb5ab",
            color: "#000000",
            fontFamily: "Arial",
            fontSize: "12px",

          }
        },
        {
          formula: "#value > 90",
          measure: "Availability",
          format: {
            backgroundColor: "#c1df9f",
            color: "#000000",
            fontFamily: "Arial",
            fontSize: "12px",

          }
        },
        {
          formula: "AND(#value >= 80, #value <= 90)",
          measure: "Availability",
          format: {
            backgroundColor: "#fff280",
            color: "#000000",
            fontFamily: "Arial",
            fontSize: "12px",

          }
        },
        {
          formula: "#value < 70",
          measure: "Performance",
          format: {
            backgroundColor: "#ffb5ab",
            color: "#000000",
            fontFamily: "Arial",
            fontSize: "12px",

          }
        },
        {
          formula: "#value > 80",
          measure: "Performance",
          format: {
            backgroundColor: "#c1df9f",
            color: "#000000",
            fontFamily: "Arial",
            fontSize: "12px",

          }
        },
        {
          formula: "AND(#value >= 70, #value <= 80)",
          measure: "Performance",
          format: {
            backgroundColor: "#fff280",
            color: "#000000",
            fontFamily: "Arial",
            fontSize: "12px",
          }
        },
        // {
        //   formula: "#value >=0",
        //   measure: "total_fault_time",
        //   format: {
        //     backgroundColor: "#33cccc",
        //     color: "#000000",
        //     fontFamily: "Arial",
        //     fontSize: "12px",
        //   }
        // },
        // {
        //   formula: "#value >=0",
        //   measure: "blocked_time",
        //   format: {
        //     backgroundColor: "#33cccc",
        //     color: "#000000",
        //     fontFamily: "Arial",
        //     fontSize: "12px",
        //   }
        // },
        // {
        //   formula: "#value >=0",
        //   measure: "major_manual_stop_time",
        //   format: {
        //     backgroundColor: "#c2f0f0",
        //     color: "#000000",
        //     fontFamily: "Arial",
        //     fontSize: "11px",
        //   }
        // },
        // {
        //   formula: "#value >=0",
        //   measure: "minor_manual_stop_time",
        //   format: {
        //     backgroundColor: "#c2f0f0",
        //     color: "#000000",
        //     fontFamily: "Arial",
        //     fontSize: "11px",
        //   }
        // },

        // {
        //   formula: "#value >=0",
        //   measure: "waiting_time",
        //   format: {
        //     backgroundColor: "#c2f0f0",
        //     color: "#000000",
        //     fontFamily: "Arial",
        //     fontSize: "11px",
        //   }
        // },
        // {
        //   formula: "#value >=0",
        //   measure: "idle_time",
        //   format: {
        //     backgroundColor: "#c2f0f0",
        //     color: "#000000",
        //     fontFamily: "Arial",
        //     fontSize: "11px",
        //   }
        // },
        // {
        //   formula: "#value >=0",
        //   measure: "total_manual_stop_time",
        //   format: {
        //     backgroundColor: "#33cccc",
        //     color: "#000000",
        //     fontFamily: "Arial",
        //     fontSize: "12px",
        //   }
        // },
        // {
        //   formula: "#value >=0",
        //   measure: "major_fault_time",
        //   format: {
        //     backgroundColor: "#c2f0f0",
        //     color: "#000000",
        //     fontFamily: "Arial",
        //     fontSize: "11px",
        //   }
        // },
        // {
        //   formula: "#value >=0",
        //   measure: "minor_fault_time",
        //   format: {
        //     backgroundColor: "#c2f0f0",
        //     color: "#000000",
        //     fontFamily: "Arial",
        //     fontSize: "11px",
        //   }
        // },
        // {
        //   formula: "#value >=0",
        //   measure: "total_fault_time",
        //   format: {
        //     backgroundColor: "#33cccc",
        //     color: "#000000",
        //     fontFamily: "Arial",
        //     fontSize: "12px",
        //   }
        // },
      ],

      // tableSizes: {
      //   columns: [
      //     {
      //       tuple: [],
      //       measure: "Theoritical Production Time",
      //       width: 80
      //     }
      //   ]
      // }
    }
    this.child.webDataRocks.setReport(setReportType);

    this.child2.webDataRocks.off("reportcomplete");
    this.child2.webDataRocks.setReport(setReportType);
    this.createAndUpdateChart_waterfall_linewise('all', 'higchartcontainer-waterfall-linewise-combined');
    console.log('*************************1528*******************');
  }

  getSearchData() {

    //this.lines = [];
    this.FetchDataFromApi();
  }

  ngOnInit() {
    this.createFormFilters();
    this.createFiltersForm();
    this.BindDefaultDates();
    this.FetchDataFromApi();
  }

  FetchDataFromApi() {
    this.gotData = false;
    this.DataWithStructure = [];
    this.OutputData = [];
    // this.dataSourceService.GetServerAPIPath().subscribe((apipath: any) => {
    console.log('http://3.7.253.233:4000/api/report/chart?startDate=' + moment(this.date.value).format("yyyy-MM-DD") + '&endDate=' + moment(this.date.value).format("yyyy-MM-DD"));
    this.httpClient.get('/api/report/chart?startDate=' + moment(this.date.value).format("yyyy-MM-DD") + '&endDate=' + moment(this.date.value).format("yyyy-MM-DD")).subscribe((data: any) => {

      // this.multiLineData = data;
      // console.log(this.multiLineData);
      // console.log(data);
      this.lines = [];
      this.lines.length = 0;
      this.lines = [...new Set(data.map(item => item.line_id))]

      // let line_name = data.map(a => a.line_id);
      // this.lines = this.removeDuplicates(line_name);
      // console.log(this.lines);

      this.DataWithStructure = [];
      this.OutputData = [];
      var d = data;
      for (let i = 0; i < d.length; i++) {
        const a = d[i];
        const output_data = {
          _id: a._id,
          line_id: a.line_id,
          plant_id: a.plant_id,
          shift: a.shift,
          machine_name: a.machine_name,
          case_count: a.case_count,
          roll_changeover: a.roll_changeover,
          operator_name: a.operator_name,
          peak_speed: a.peak_speed,
          layout: a.layout,
          product: a.product,
          batch_name: a.batch_name,
          batch_size: a.batch_size,
          t200Use: a.t200Use,
          changeover_type: a.changeover_type,
          cause: a.cause,
          remark: a.remark,
          mechanical_changeover: a.mechanical_changeover,
          setup_changeover: a.setup_changeover,
          batch_end_type: a.batch_end_type,
          rated_speed: a.rated_speed,
          month: a.month,
          blocked_count: a.blocked_count,
          waiting_count: a.waiting_count,
          break_pdt: a.break_pdt,
          co_pdt: a.co_pdt,
          updt_count: a.updt_count,
          changeover_count: a.changeover_count,
          major_fault_count: a.major_fault_count,
          minor_fault_count: a.minor_fault_count,
          major_manual_stop_count: a.major_manual_stop_count,
          minor_manual_stop_count: a.minor_manual_stop_count,
          co_pdt_count: a.co_pdt_count,
          break_pdt_count: a.break_pdt_count,
          reject_count: a.reject_count,
          pdt_count: a.pdt_count,
          avg_speed: a.avg_speed,
          performance_time: a.performance_time,
          reject_time: a.reject_time,
          changeover_wastage_time: a.changeover_wastage_time,
          speed_loss: a.speed_loss,
          net_operating_time: a.net_operating_time,
          fgex: a.fgex,
          total_idle_time: a.total_idle_time,
          total_idle_count: a.total_idle_count,
          idle_time: a.idle_time,
          idle_count: a.idle_count,
          date: this.datePipe.transform(a.date, 'yyyy-MM-dd').toString(),
          batch_start: a.batch_start,
          batch_end: a.batch_end,
          changeover_wastage: a.changeover_wastage,
          planed_production_time: a.planed_production_time,
          goodCount: a.goodCount,
          nmx_count: a.nmx_count,
          blocked_time: a.blocked_time,
          waiting_time: a.waiting_time,
          major_manual_stop_time: a.major_manual_stop_time,
          minor_manual_stop_time: a.minor_manual_stop_time,
          pdt_time: a.pdt_time,
          updt_time: a.updt_time,
          changeover_time: a.changeover_time + a.co_pdt,//Total changeover time
          excess_changeover_time: a.changeover_time,//backend is giving excess changeover time in changeover time
          gross_operating_time: a.gross_operating_time,
          theoretical_time: a.theoretical_time,
          major_fault_time: a.major_fault_time,
          minor_fault_time: a.minor_fault_time,
          good_count_machine: a.good_count_machine,
          executing: a.executing,
          productive_time: a.productive_time,
          total_manual_stop_time: a.waiting_time + a.idle_time + a.major_manual_stop_time + a.minor_manual_stop_time,
          total_manual_stop_time1: (a.waiting_time + a.idle_time + a.major_manual_stop_time + a.minor_manual_stop_time) / 3600,
          total_fault_time: a.minor_fault_time + a.major_fault_time,
          total_sum_idle_time: a.waiting_time + a.idle_time + a.major_manual_stop_time + a.minor_manual_stop_time + a.blocked_time + a.major_fault_time + a.minor_fault_time,
          cleaning_part_fixing: a.co_pdt + a.changeover_time - a.setup_changeover,
          no_production_planned: a.updt_time + a.break_pdt
        }
        this.OutputData.push(output_data);


      }
      console.log(this.OutputData);
      this.gotData = true;
      // this.licenseKey = apipath['pivot_license_key'];

    },
      error => {
        console.log('oops', error.error);
        this.errormsg = error.error.error;
      });
    // });
  }

  BindDefaultDates() {
    var date = new Date();

    this.date.setValue(this.datePipe.transform(this.addDays(new Date(), -1), 'yyyy-MM-dd'));

    //this.start_date.setValue(this.datePipe.transform(new Date(date.getFullYear(), date.getMonth(), 1), 'yyyy-MM-dd'));
  }
  addDays(date: Date, days: number): Date {
    date.setDate(date.getDate() + days);
    return date;
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

  onReportComplete(): void {
    console.log("*****************************onReportComplete****************************");
    this.SearchStateData(this.OutputData);
    this.child.webDataRocks.off("reportcomplete");
    this.pivotTableReportComplete = true;
  }

  onReportComplete_2(): void {

    console.log("*****************************onReportComplete_2****************************");
    this.child2.webDataRocks.off("reportcomplete");



    console.log("**************************2105***************")
    //oee_linecombined
    this.createGoogleBarChart(HighCharts_ColorsType1, "line_id", "Line Name", "line_id",
      [{ uniqueName: "OEE", formula: "((\"productive_time\")/(\"planed_production_time\"))*100", caption: "OEE (%)", format: "44mvcoma", },], "column", false,
      true, HighCharts_xAxisOptions2, HighCharts_yAxisOptions1, HighCharts_PlotOptions1, "higchartcontainer-oee-linecombined", false, false, true, "OEE LineCombined");
    console.log("**************************2110***************")

    //LineCombined_eventHistory
    this.createGoogleBarChart(HighCharts_ColorsType2, "date", "Date", "",
      [{ uniqueName: "executing", formula: "((\"executing\"))", caption: "Running Time", format: "decimal2", },
      { uniqueName: "total_sum_idle_time", formula: "((\"total_sum_idle_time\"))", caption: "Idle time", format: "decimal2", },
      { uniqueName: "changeover_time", formula: "((\"changeover_time\"))", caption: "Changeover", format: "decimal2", },
      { uniqueName: "no_production_planned", formula: "(\"no_production_planned\")", caption: "No Production Planned", format: "decimal2", },],
      "column", false, true, HighCharts_xAxisOptions1, HighCharts_yAxisOptions2, HighCharts_PlotOptions4, "higchartcontainer-lines-combined-eventhistory", true, true, true, "Event History (in Hours)");


    console.log("**************************2123***************")
    this.createGoogleBarChart_Combined_eventHistory_Pie();

  }

  createAndUpdateChart_eventHistory_linewise(line, controlname) {
    console.log(controlname);
    console.log(this.OutputData);

    var eventHistoryLineData = this.OutputData.filter(function (value) {
      return value.line_id === line
    })
    console.log(eventHistoryLineData);

    let line_running_time = this.GroupByAndSumHour(eventHistoryLineData);
    let line_idle_time = this.GroupByAndSumIdelTime(eventHistoryLineData);
    let line_changerover_time = this.GroupByAndSumChangeoverTime(eventHistoryLineData);
    let line_no_prod_planned_time = this.GroupByAndSumNoProductionPlan(eventHistoryLineData);

    console.log(line_running_time);
    console.log(line_idle_time);
    console.log(line_changerover_time);
    console.log(line_no_prod_planned_time);


    let xAxisData = line_running_time.map(a => a.date);
    let running_time_data = line_running_time.map(a => a.executing);
    let idle_time_data = line_idle_time.map(a => a.total_sum_idle_time);
    let changerover_data = line_changerover_time.map(a => a.changeover_time);
    let no_prod_planned_data = line_no_prod_planned_time.map(a => a.no_production_planned);



    console.log(xAxisData)
    console.log(running_time_data);
    console.log(idle_time_data);
    console.log(changerover_data);
    console.log(no_prod_planned_data);

    var data2: any;
    data2 = {
      colors: ["#32cd32", "rgb(254,1,1)", "rgb(163, 163, 117)", "rgb(255, 51, 204)",],
      chart: {
        type: 'column'
      },
      title: {
        text: 'Event History'
      },
      xAxis: {
        categories: xAxisData
      },
      yAxis: {
        //min: 0,
        plotLines: [{}],
        labels: {

          formatter: function () {
            let value = (this.value);
            return value.toFixed(0);
          },

        },

      },

      tooltip: {
        // headerFormat: '<b>{point.x}</b><br/>',
        // pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}',
        formatter: function () {
          let value = (this.y);
          return this.key + '<br>' + '' + value.toFixed(1);
        }
      },
      plotOptions: {

        column: {
          stacking: 'normal',
          dataSorting: {
            enabled: false
          },
          dataLabels: {
            enabled: true,
            formatter: function () {
              let value = (this.y);
              return '' + value.toFixed(1);
            }
          }
        }
      },
      series: [{
        name: 'Running Time',
        data: running_time_data
      }, {
        name: 'Idle Time',
        data: idle_time_data
      }, {
        name: 'Changeover Time',
        data: changerover_data
      }, {
        name: 'Np Production Planned',
        data: no_prod_planned_data
      }],
      credits: {
        enabled: false
      },
    }
    Highcharts.chart(controlname, data2);
  }


  createAndUpdateChart_waterfall_linewise(line, controlname) {
    console.log(controlname);
    console.log(this.OutputData);
    var WaterFallData = this.OutputData.filter(function (value) {
      return line == 'all' ? value : value.line_id === line
    })
    console.log(WaterFallData);
    let w_total_time = this.SumOfArrayByProperty(WaterFallData, 'theoretical_time') / 3600;
    let w_no_prod_planned = this.SumOfArrayByProperty(WaterFallData, 'no_production_planned') / 3600;
    let w_idle_time = this.SumOfArrayByProperty(WaterFallData, 'total_sum_idle_time') / 3600;
    let w_changeover_time = this.SumOfArrayByProperty(WaterFallData, 'changeover_time') / 3600;
    let w_in_process_reject_time = this.SumOfArrayByProperty(WaterFallData, 'reject_time') / 3600;
    let w_speedLosstime = this.SumOfArrayByProperty(WaterFallData, 'speed_loss') / 3600;

    var data1: any
    data1 = {
      colors: ['rgba(124, 181, 236, 0.3)', 'rgba(144, 237, 125, 0.3)'],
      chart: {
        type: 'waterfall',
        inverted: true,
        // events: {
        //   load: function () {
        //     document.getElementById(controlname).style.background = 'none';
        //   }
        // }
      },
      title: {
        text: 'Daywise Timeline in Hours'
      },
      tooltip: {
        shared: true
      },
      xAxis: {
        categories: ['Total Time ', 'No Production Planned', 'Changeover', 'Idle Time', 'Running Time', 'Speed Loss Time',
          'Reject Time', 'Productive Time']
      },
      yAxis: {
        plotLines: [{

        }],
        labels: {
          formatter: undefined,
          align: 'left',
        },
        title: {
          text: ''
        }
      },

      plotOptions: {
        series: {
          //stacking: 'overlap',
          lineWidth: 1,
          dataLabels: {
            enabled: true,
            formatter: function () {
              return Highcharts.numberFormat(this.y, 0, ',');
            },
          },

          dataSorting: {
            enabled: false,
          },
        }
      },
      series: [
        {
          //zIndex: 0,
          dataLabels: {
            enabled: true,
            formatter: function () {
              return Highcharts.numberFormat(this.y, 0, ',');
            }
          },
          //upColor: '#FFE66D',

          //color: 'rgba(0, 136, 255, 0.3)',
          data: [{ name: 'Total Time', y: w_total_time, color: 'rgb(255, 205, 60)' },
          { name: 'No production Planned', y: -1 * w_no_prod_planned, color: 'rgb(255, 51, 204)' },
          { name: 'Changeover Time', y: -1 * w_changeover_time, color: 'rgb(163, 163, 117)' },
          { name: 'Idle Time', y: -1 * w_idle_time, color: 'rgb(254, 1, 1)' },
          { isIntermediateSum: true, color: 'rgb(24, 176, 176)' },
          { name: 'Speed Loss Time', y: -1 * w_speedLosstime, color: 'rgb(255, 150, 85)' },
          { name: 'Reject Time', y: -1 * w_in_process_reject_time, color: 'rgb(78, 205, 196)' },
          { isSum: true, color: 'rgb(173, 255, 47)' }]
        }]
    }

    //console.log(data);
    console.log(data1); console.log(controlname);

    // data.chart = data1.chart;
    // data.series = data1.series;
    // data.xAxis = data1.xAxis;
    // data.title = { text: "Month Timeline in Hours" };
    // data.plotOptions = data1.plotOptions;
    // delete data.yAxis;
    Highcharts.setOptions({
      tooltip: {
        enabled: true,
        valueDecimals: 2,
        formatter: function () {
          return this.x + '<br>' + this.y.toFixed(2);
        }
      },
      credits: {
        enabled: false
      },
    });
    Highcharts.chart(controlname, data1);
  }

  createGoogleBarChart_Combined_eventHistory_Pie() {
    try {
      this.child2.webDataRocks.highcharts.getData(
        {
          slice: {
            rows: [
              {
                uniqueName: "date",
                caption: "Date"
              },
            ],

            measures: [
              {
                uniqueName: "executing",
                formula: "((\"executing\"))",
                caption: "Running Time",
                format: "decimal2",
              },
              {
                uniqueName: "total_sum_idle_time",
                formula: "((\"total_sum_idle_time\"))",
                caption: "Idle time",
                format: "decimal2",
              },
              {
                uniqueName: "changeover_time",
                formula: "((\"changeover_time\"))",
                caption: "Changeover",
                format: "decimal2",
              },
              {
                uniqueName: "no_production_planned",
                formula: "(\"no_production_planned\")",
                caption: "No Production Planned",
                format: "decimal2",
              }
            ]
          },

        },
        data => {
          this.Highcharts.setOptions({

          });
          createAndUpdateChartCombined_EventHistoryPie(data);
        },
        data => {
          this.Highcharts.setOptions({


          });

          createAndUpdateChartCombined_EventHistoryPie(data);
        }
      );

    } catch (error) {

    }


    function createAndUpdateChartCombined_EventHistoryPie(data) {
      console.log("pie..." + JSON.stringify(data));

      let running_time_data = data.series[0].data[0];
      let idle_time_data = data.series[1].data[0];
      let changeover_time_data = data.series[2].data[0];
      let no_production_time_data = data.series[3].data[0];
      let all_sum = running_time_data + idle_time_data + changeover_time_data + no_production_time_data

      console.log("running_time_data" + running_time_data);
      console.log(all_sum);

      var perc_running: number
      var perc_idle: number
      var perc_changeover: number
      var perc_noproduction: number

      perc_running = (running_time_data / all_sum) * 100;
      perc_idle = (idle_time_data / all_sum) * 100;
      perc_changeover = (changeover_time_data / all_sum) * 100;
      perc_noproduction = (no_production_time_data / all_sum) * 100;

      var data2: any
      data2 = {
        chart: {
          type: 'pie',
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          events: {
            load: function () {
              document.getElementById('highChartContainer-Combined-EventHistory-Pie').style.background = 'none';
            }
          }
        },
        title: {
          text: 'Event History'
        },
        tooltip: {

          formatter: function () {
            let value = this.y;
            return this.key + '<br>' + '' + value.toFixed(2) + '%';
          }
        },
        accessibility: {
          point: {
            valueSuffix: '%'
          }
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              distance: -30,
              color: 'white',
              format: '{point.percentage:.1f} %'
            },
            // dataLabels: {
            //   enabled: false,
            //   format: '<b>{point.name}</b>: {point.percentage:.1f} %'
            // },
            showInLegend: true
          }
        },
        series: [
          {
            name: 'Brands',
            colorByPoint: true,

            data: [
              { name: 'Running Time', y: perc_running },
              { name: 'Idle Time', y: perc_idle },
              { name: 'Changeover Time', y: perc_changeover },
              { name: 'No Production Planned', y: perc_noproduction }]
          }],
      }


      console.log(data2);


      Highcharts.setOptions({

        credits: {
          enabled: false
        },
        colors: ["#32cd32", "rgb(254,1,1)", "rgb(163, 163, 117)", "rgb(255, 51, 204)"]

      });
      Highcharts.chart('highChartContainer-Combined-EventHistory-Pie', data2);
    }
  }

  waterfallMonthTimelineTabClick(tabName) {
    console.log(tabName, "TAB NAME - waterfallMonthTimelineTabClick");
    if (tabName === 'Combined') {
      this.createAndUpdateChart_waterfall_linewise('all', 'higchartcontainer-waterfall-linewise-combined');
    } else {
      this.createAndUpdateChart_waterfall_linewise(tabName, 'higchartcontainer-waterfall-' + tabName);
    }
  }


  lineWiseKpiTabClick(tabName, parentTabName) {

    this.selected2 = this.filters[0].value;
    console.log(tabName, parentTabName, "TAB NAME - lineWiseKpiTabClick");
    if (tabName === 'Lines-combined' && parentTabName === 'OEE') {


      //oee_linecombined
      this.createGoogleBarChart(HighCharts_ColorsType1, "line_id", "Line Name", "line_id",
        [{ uniqueName: "OEE", formula: "((\"productive_time\")/(\"planed_production_time\"))*100", caption: "OEE (%)", format: "44mvcoma", },], "column", false,
        true, HighCharts_xAxisOptions2, HighCharts_yAxisOptions1, HighCharts_PlotOptions1, "higchartcontainer-oee-linecombined", false, false, false, "");

    } if (tabName === 'Lines-combined' && parentTabName === 'Performance') {
      //performance-linecombined
      this.createGoogleBarChart(HighCharts_ColorsType1, "line_id", "Line Name", "line_id",
        [{ uniqueName: "Performance", formula: "((\"net_operating_time\") / (\"gross_operating_time\"))*100", caption: "Performance (%)", format: "decimal2", },],
        "column", false, true, HighCharts_xAxisOptions2, HighCharts_yAxisOptions1, HighCharts_PlotOptions1, "higchartcontainer-performance-linecombined", false, false, false, "");

    } if (tabName === 'Lines-combined' && parentTabName === 'Availability') {
      //availability-linecombined
      this.createGoogleBarChart(HighCharts_ColorsType1, "line_id", "Line Name", "line_id",
        [{ uniqueName: "Availability", formula: "(\"gross_operating_time\") / (\"planed_production_time\"))*100", caption: "Availability (%)", format: "decimal2", },],
        "column", false, true, HighCharts_xAxisOptions2, HighCharts_yAxisOptions1, HighCharts_PlotOptions1, "higchartcontainer-availability-linecombined", false, false, false, "");

    } if (tabName === 'Lines-combined' && parentTabName === 'Speed Loss') {
      //speedloss_linecombined
      this.createGoogleBarChart(HighCharts_ColorsType1, "line_id", "Line Name", "line_id",
        [{ uniqueName: "speed_loss", formula: "((\"speed_loss\"))", caption: "Speed Loss (Hrs)", format: "decimal2", },], "column", false,
        true, HighCharts_xAxisOptions2, HighCharts_yAxisOptions5, HighCharts_PlotOptions2, "higchartcontainer-speedloss-linecombined", false, false, false, "");

    } if (tabName === 'Lines-combined' && parentTabName === 'Idle Time') {
      //idletime_linecombined
      this.createGoogleBarChart(HighCharts_ColorsType1, "line_id", "Line Name", "line_id",
        [{ uniqueName: "idle_time", formula: "((\"idle_time\"))", caption: "Idle Time", format: "decimal2", },], "column", false,
        true, HighCharts_xAxisOptions2, HighCharts_yAxisOptions5, HighCharts_PlotOptions2, "higchartcontainer-idletime-linecombined", false, false, false, "");

    } if (tabName === 'Lines-combined' && parentTabName === 'Quality') {
      //quality-linecombined
      this.createGoogleBarChart(HighCharts_ColorsType1, "line_id", "Line Name", "line_id",
        [{
          uniqueName: "Quality", formula: "((\"productive_time\"/60) / (\"net_operating_time\"/60))*100", caption: "Quality (%)",
          format: "44mvcoma",
        }], "column", false, true, HighCharts_xAxisOptions2, HighCharts_yAxisOptions3, HighCharts_PlotOptions3, 'higchartcontainer-quality-linecombined', false, false, true, "Performance comparison");

    } if (parentTabName === 'OEE') {
      //oee_operatorwise

      this.createGoogleBarChart2(HighCharts_ColorsType1, "line_id", "Line Name", "operator_name", ["line_id." + tabName], false, [], false,
        [{ uniqueName: "OEE", formula: "((\"productive_time\")/(\"planed_production_time\"))*100", caption: "OEE (%)", format: "44mvcoma", },], "column", false,
        true, HighCharts_yAxisOptions1, HighCharts_PlotOptions1, "higchartcontainer-control-oee-" + tabName, false, false, false, "");

    }
    if (parentTabName === 'Performance') {
      //performance_operatorwise

      this.createGoogleBarChart2(HighCharts_ColorsType1, "line_id", "Line Name", "operator_name", ["line_id." + tabName], false, [], false,
        [{ uniqueName: "Performance", formula: "((\"net_operating_time\") / (\"gross_operating_time\"))*100", caption: "Performance (%)", format: "44mvcoma", },], "column", false,
        true, HighCharts_yAxisOptions1, HighCharts_PlotOptions1, "higchartcontainer-control-performance-" + tabName, false, false, false, "");


    }
    if (parentTabName === 'Quality') {
      //quality_operatorwise
      this.createGoogleBarChart2(HighCharts_ColorsType1, "line_id", "Line Name", "operator_name", ["line_id." + tabName], false, [], false,
        [{
          uniqueName: "Quality", formula: "((\"productive_time\"/60) / (\"net_operating_time\"/60))*100", caption: "Quality (%)",
          format: "44mvcoma",
        }], "column", false, true, HighCharts_yAxisOptions1, HighCharts_PlotOptions1, "higchartcontainer-control-quality-" + tabName, false, false, false, "");


    }
    if (parentTabName === 'Availability') {
      //availability_operatorwise
      this.createGoogleBarChart2(HighCharts_ColorsType1, "line_id", "Line Name", "operator_name", ["line_id." + tabName], false, [], false,
        [{ uniqueName: "Availability", formula: "(\"gross_operating_time\") / (\"planed_production_time\"))*100", caption: "Availability (%)", format: "44mvcoma", },],
        "column", false, true, HighCharts_yAxisOptions1, HighCharts_PlotOptions1, "higchartcontainer-control-availability-" + tabName, false, false, false, "");
    }
    if (parentTabName === 'Speed Loss') {
      //speedloss_operatorwise

      this.createGoogleBarChart2(HighCharts_ColorsType1, "line_id", "Line Name", "operator_name", ["line_id." + tabName], false, [], false,
        [{ uniqueName: "speed_loss", formula: "((\"speed_loss\"))", caption: "Speed Loss (Hrs)", format: "decimal2", },], "column", false,
        true, HighCharts_yAxisOptions5, HighCharts_PlotOptions2, "higchartcontainer-control-speedloss-" + tabName, false, false, false, "");


    } if (parentTabName === 'Idle Time') {
      //idletime_operatorwise
      this.createGoogleBarChart2(HighCharts_ColorsType1, "line_id", "Line Name", "operator_name", ["line_id." + tabName], false, [], false,
        [{ uniqueName: "idle_time", formula: "((\"idle_time\"))", caption: "Idle Time(Hrs)", format: "decimal2", },], "column", false,
        true, HighCharts_yAxisOptions5, HighCharts_PlotOptions2, "higchartcontainer-control-idletime-" + tabName, false, false, false, "");


    }
  }




  eventHistoryTabClick(tabName) {
    console.log(tabName, "TAB NAME -eventHistoryTabClick");

    if (tabName === 'Lines-combined') {
      //LineCombined_eventHistory
      this.createGoogleBarChart(HighCharts_ColorsType2, "date", "Date", "",
        [{ uniqueName: "executing", formula: "((\"executing\"))", caption: "Running Time", format: "decimal2", },
        { uniqueName: "total_sum_idle_time", formula: "((\"total_sum_idle_time\"))", caption: "Idle time", format: "decimal2", },
        { uniqueName: "changeover_time", formula: "((\"changeover_time\"))", caption: "Changeover Time", format: "decimal2", },
        { uniqueName: "no_production_planned", formula: "(\"no_production_planned\")", caption: "No Production Planned", format: "decimal2", },],
        "column", false, true, HighCharts_xAxisOptions1, HighCharts_yAxisOptions2, HighCharts_PlotOptions4, "higchartcontainer-lines-combined-eventhistory", true, true, true, "Event History (in Hours)");

    }
    else {
      this.createAndUpdateChart_eventHistory_linewise(tabName, 'higchartcontainer-eventhistory-' + tabName);
    }
  }


  ConvertArrayDataToHour(data) {
    try {
      data.forEach(function (sa, index) {
        data[index] = sa.map(function (each_element) {
          if (typeof each_element === "number") { return Number((each_element / 3600).toFixed(1)); } else { return each_element }
        });
      });
      return data;
    } catch (error) {
      return data;
    }
  }
  Export_Excel() {
    var D = this.getMonthDateRange(moment(this.date.value).format("YYYY"), moment(this.date.value).format("MM"));

    this.child.webDataRocks.exportTo(
      "Excel", {
      filename: "Output" + moment(D.start).format("yyyy-MM"),
      excelSheetName: "Output Report",
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

    this.child.webDataRocks.exportTo(
      "pdf", {
      filename: "Fault" + moment(D.start).format("yyyy-MM"),
      header: "Fault Report",
      destinationType: "file",
      url: "URL to server script saving the file"

    },
      function () {
        //console.log("Export process is finished");
      }
    );
  }

  GroupByAndSumHour(data) {
    var result = [];

    data.reduce(function (res, value) {
      if (!res[value.date]) {
        res[value.date] = { date: value.date, executing: 0 };
        result.push(res[value.date])
      }
      res[value.date].executing += (value.executing / 3600);
      return res;
    }, {});

    console.log(result)
    return result;
  }

  GroupByAndSumIdelTime(data) {
    var result = [];

    data.reduce(function (res, value) {
      if (!res[value.date]) {
        res[value.date] = { date: value.date, total_sum_idle_time: 0 };
        result.push(res[value.date])
      }
      res[value.date].total_sum_idle_time += (value.total_sum_idle_time / 3600);
      return res;
    }, {});

    console.log(result)
    return result;
  }

  GroupByAndSumChangeoverTime(data) {
    var result = [];

    data.reduce(function (res, value) {
      if (!res[value.date]) {
        res[value.date] = { date: value.date, changeover_time: 0 };
        result.push(res[value.date])
      }
      res[value.date].changeover_time += (value.changeover_time / 3600);
      return res;
    }, {});

    console.log(result)
    return result;
  }

  GroupByAndSumNoProductionPlan(data) {
    var result = [];

    data.reduce(function (res, value) {
      if (!res[value.date]) {
        res[value.date] = { date: value.date, no_production_planned: 0 };
        result.push(res[value.date])
      }
      res[value.date].no_production_planned += (value.no_production_planned / 3600);
      return res;
    }, {});

    console.log(result)
    return result;
  }




  //<---------------------- paramerters required for below function -------------->

  //  rowsUniqueName : uniqueName of rows
  //  rowscaption : caption for the rows
  //  columnsUniqueName : uniqueName of columns
  //  measures_array : Array of measures
  //  chartType : Type of chart
  //  withDrilldown_bit : Value of withDrilldown_bit may be true or false
  //  exporting_obj : Export object for charts to export
  //  yAxis_obj : Y Axis Object
  //  plotOptions_obj : plot options object
  // colors_array : Required colors in the chart
  //  control_name : Highchart ID which described at HTML Page
  //  secToHrBit   : convert seconds into hours bit (it's value may be true or false)
  //  yAxisBit     : convert multiple Y axis into one or common axis bit (it's value may be true or false)
  //  titleTextBit : Highchart title text bit (it's value may be true or false)
  //  titleText    : Highchart title text


  createGoogleBarChart(colors_array: string[], rowsUniqueName: string, rowsCaption: string, columnsUniqueName: string, measures_array: Measure[], chartType: string, withDrilldown_bit: boolean, exporting_bit: boolean,
    xAxis_obj: object, yAxis_obj: object, plotOptions_obj: object, control_name: string, secToHrBit: boolean, yAxisBit: boolean, titleTextBit: boolean, titleText: string) {
    try {
      // console.log(colors_array),
      //   console.log(rowsUniqueName),
      //   console.log(rowsCaption),
      //   console.log(columnsUniqueName),
      //   console.log(measures_array),
      //   console.log(chartType),
      //   console.log("withDrilldown_bit:"+withDrilldown_bit),
      //   console.log(exporting_bit),
      //   console.log(yAxis_obj),
      //   console.log(plotOptions_obj),
      //   console.log(control_name),
      //   console.log(secToHrBit),
      //   console.log(yAxisBit),
      //   console.log(titleTextBit),
      //   console.log(titleText),


      this.child.webDataRocks.highcharts.getData(

        {
          slice: {
            rows: [
              {
                uniqueName: rowsUniqueName,
                caption: rowsCaption,
              },
            ],
            columns: [
              {
                uniqueName: columnsUniqueName,
              }
            ],
            measures: measures_array
          },
          type: chartType,
          withDrilldown: withDrilldown_bit,
        },
        data => {
          this.Highcharts.setOptions({
            exporting: {
              enabled: exporting_bit,
            },
            xAxis: xAxis_obj,
            yAxis: yAxis_obj,
            plotOptions: plotOptions_obj
          });
          this.createAndUpdateChart(data, colors_array, control_name, secToHrBit, yAxisBit, titleTextBit, titleText, withDrilldown_bit);

        },
        data => {
          this.Highcharts.setOptions({
            exporting: {
              enabled: exporting_bit,
            },
            xAxis: xAxis_obj,
            yAxis: yAxis_obj,
            plotOptions: plotOptions_obj
          });
          this.createAndUpdateChart(data, colors_array, control_name, secToHrBit, yAxisBit, titleTextBit, titleText, withDrilldown_bit);
        },
      );
    } catch (error) {

    }

  }

  createGoogleBarChart2(colors_array: string[], rowsUniqueName: string, rowsCaption: string, columnsUniqueName: string, filterMembersArray: string[], filterNegationBit: boolean, filterMembersColArray: string[], filterNegationColBit: boolean, measures_array: Measure[], chartType: string, withDrilldown_bit: boolean, exporting_bit: boolean,
    yAxis_obj: object, plotOptions_obj: object, control_name: string, secToHrBit: boolean, yAxisBit: boolean, titleTextBit: boolean, titleText: string) {
    try {
      // console.log(colors_array),
      //   console.log(rowsUniqueName),
      //   console.log(rowsCaption),
      //   console.log(columnsUniqueName),
      //   console.log(measures_array),
      //   console.log(chartType),
      //   console.log("withDrilldown_bit:"+withDrilldown_bit),
      //   console.log(exporting_bit),
      //   console.log(yAxis_obj),
      //   console.log(plotOptions_obj),
      //   console.log(control_name),
      //   console.log(secToHrBit),
      //   console.log(yAxisBit),
      //   console.log(titleTextBit),
      //   console.log(titleText),

      this.child2.webDataRocks.highcharts.getData(
        {
          slice: {
            rows: [
              {
                uniqueName: rowsUniqueName,
                caption: rowsCaption,
                filter: {
                  members: filterMembersArray,
                  //negation: filterNegationBit,
                }
              },
            ],
            columns: [
              {
                uniqueName: columnsUniqueName,
                filter: {
                  members: filterMembersColArray,
                  //negation: filterNegationColBit,
                }
              }
            ],
            measures: measures_array,
          },
          type: chartType,
          withDrilldown: withDrilldown_bit,
        },
        data => {
          this.Highcharts.setOptions({
            exporting: {
              enabled: exporting_bit,
            },
            yAxis: yAxis_obj,

            plotOptions: plotOptions_obj
          });
          this.createAndUpdateChart(data, colors_array, control_name, secToHrBit, yAxisBit, titleTextBit, titleText, withDrilldown_bit);

        },
        data => {
          this.Highcharts.setOptions({
            exporting: {
              enabled: exporting_bit,
            },
            yAxis: yAxis_obj,
            plotOptions: plotOptions_obj
          });
          this.createAndUpdateChart(data, colors_array, control_name, secToHrBit, yAxisBit, titleTextBit, titleText, withDrilldown_bit);
        },
      );
    } catch (error) {

    }

  }


  GenerateRunningTotals(data) {
    let temp = 0;
    let final = data.map(v => ({
      executing: temp += v.executing,
      date: v.date
    }));
    console.log(final)
    return final;
  }
  SumOfArrayByProperty(data, prop) {
    return data.reduce(function (a, b) {
      return a + b[prop];
    }, 0);
  }

  setTime(data) {
    data = data / 3600;
    return data;
  }


  //<------------------- paramerters required for below function ---------------------->
  //data : data of the Highcharts
  //colors_array : Required colors in the chart
  //control_name : Highchart ID which described at HTML Page
  //secToHrBit   : convert seconds into hours bit (it's value may be true or false)
  //yAxisBit     : convert multiple Y axis into one or common axis bit (it's value may be true or false)
  //titleTextBit : Highchart title text bit (it's value may be true or false)
  //titleText    : Highchart title text

  createAndUpdateChart(data: any, colors_array: string[], control_name: string, secToHrBit: boolean, yAxisBit: boolean, titleTextBit: boolean, titleText: string, withDrilldown_bit: boolean) {
    console.log(data);

    // console.log(withDrilldown_bit);
    console.log(control_name);
    for (let i = 0; i <= this.lines.length; i++) {
      if (control_name === "higchartcontainer-control-oee-" + this.lines[i] || control_name === "higchartcontainer-control-performance-" + this.lines[i] || control_name === "higchartcontainer-control-quality-" + this.lines[i] || control_name === "higchartcontainer-control-availability-" + this.lines[i] || control_name === "higchartcontainer-control-speedloss-" + this.lines[i] || control_name === "higchartcontainer-control-quality-" + this.lines[i] || control_name === "higchartcontainer-control-availability-" + this.lines[i] || control_name === "higchartcontainer-control-idletime-" + this.lines[i]) {
        console.log(data.series);
        var sortedArray = data.series.sort(function (a, b) { return b.data - a.data });

        console.log(sortedArray);
        data.series = sortedArray;

      }
    }

    if (control_name === "higchartcontainer-oee-linecombined" || control_name === "higchartcontainer-performance-linecombined" || control_name === "higchartcontainer-quality-linecombined" || control_name === "higchartcontainer-availability-linecombined" || control_name === "higchartcontainer-speedloss-linecombined" || control_name === "higchartcontainer-idletime-linecombined") {

      for (let i = 0; i < data.series.length; i++) {
        //console.log(data.series[i].data);

        var filtered = data.series[i].data.filter(function (el) {
          return el != null;
        });

        data.series[i].data = filtered;

      }

      var sortedArray = data.series.sort(function (a, b) { return b.data - a.data });

      console.log(sortedArray);
      data.series = sortedArray;
      console.log(data.series);

    }
    if (withDrilldown_bit == true) {
      let drilDownData: string[];
      for (let i = 0; i < data.drilldown.series.length; i++) {
        drilDownData = data.drilldown.series[i].data
        //filter the null array
        const filter = null;
        const filteredResult = drilDownData.filter((item) => {
          return (item.indexOf(filter) >= 0);
        });
        // console.log(filteredResult);

        //remove the common data between two arrays
        drilDownData = drilDownData.filter(val => !filteredResult.includes(val));
        //console.log(drilDownData);
        data.drilldown.series[i].data = drilDownData;


        if (control_name === "higchartcontainer-oee-datewise" || control_name === "higchartcontainer-performance-datewise" || control_name === "higchartcontainer-availability-datewise" || control_name === "higchartcontainer-speedloss-datewise" || control_name === "higchartcontainer-idletime-datewise") {
          // console.log(drilDownData[0])
          for (let i = 0; i < data.drilldown.series.length; i++) {
            data.drilldown.series[i].type = "line"

          }
          drilDownData.sort(function (a, b) {
            var keyA = new Date(a),
              keyB = new Date(b);
            // Compare the 2 dates
            if (keyA < keyB) return 1;
            if (keyA > keyB) return -1;
            return 0;
          });

          console.log(drilDownData);
          data.drilldown.series[i].data = drilDownData;
        }
      }
    }

    if (yAxisBit == true) {
      for (let d of data.series) {
        d.yAxis = 1;
      }
    }
    if (titleTextBit == true) {
      data.title.text = titleText;
    }



    Highcharts.setOptions({
      tooltip: {
        enabled: true,
        formatter: function () {
          let value
          if (secToHrBit == true) {

            value = (this.y) / 3600;
          } else {

            value = (this.y);
          }
          return this.key + '<br>' + '' + value.toFixed(1);
        }
      },
      title: {
        align: 'left',
        style: {
          fontWeight: 'bold'
        }
      },
      credits: {
        enabled: false
      },
      colors: colors_array
    });

    Highcharts.chart(control_name, data);

  }
  removeDuplicates(data) {
    return [...new Set(data)]

  }


}

