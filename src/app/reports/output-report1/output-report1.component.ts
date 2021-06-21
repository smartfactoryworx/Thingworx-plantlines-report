
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
import * as html2pdf from 'html2pdf.js';
import { Measure } from 'webdatarocks';
import { WebDataRocksPivot } from "../@webdatarocks/webdatarocks.angular4";
import { UtilService } from "src/app/util.service";
exporting(Highcharts)


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
  tablet: number;
}
interface Filter {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-output-report1',
  templateUrl: './output-report1.component.html',
  styleUrls: ['./output-report1.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ]
})
export class OutputReport1Component implements OnInit {
  //@ViewChild("pivot1") child: FlexmonsterPivot;
  @ViewChild("pivot1") child: WebDataRocksPivot;

  public OutputData: output[] = [];
  errormsg;
  lineId;
  LinesData;
  licenseKey;
  gotData: boolean = false;
  gotLines: boolean = false;
  filters: Filter[] = [
    { value: 'operator_name', viewValue: 'Operator wise' },
    // { value: 'datewise', viewValue: 'Date wise' },
    { value: 'batch_name', viewValue: 'Batch wise' },
    { value: 'shift', viewValue: 'Shift wise' },
    { value: 'product', viewValue: 'Product wise' }
  ];
  public selected2 = this.filters[0].value;
  public selected = this.filters[0].value;
  outputReport: FormGroup;
  line_id: FormControl;
  date = new FormControl(moment());

  pivotTableReportComplete: boolean = false;
  Highcharts: typeof Highcharts = Highcharts;
  public DataWithStructure = [];
  constructor(private httpClient: HttpClient, protected datePipe: DatePipe,
    protected dataSourceService: ManualEntryService, private utils: UtilService) { }




  createFormFilters() {
    this.date = new FormControl('', Validators.required);
    this.line_id = new FormControl('');
  }
  createFiltersForm() {
    this.outputReport = new FormGroup({
      date: this.date,
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
  //--------------------------------------------------------------
  getMonthDateRange(year, month) {
    console.log(year, month)
    var startDate = moment([year, month - 1]);
    var endDate = moment(startDate).endOf('month');
    console.log(startDate, endDate)

    return { start: startDate, end: endDate };
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
  ngOnInit(): void {
    this.createFormFilters();
    this.createFiltersForm();
    this.BindDefaultDates();
    this.GetLinesList();
    this.getSearchData(this.line_id.value);
  }

  BindDefaultDates() {
    this.date.setValue(this.datePipe.transform(this.utils.addDays(new Date(), -5), 'yyyy-MM-dd'));
    this.line_id.setValue(this.dataSourceService.lineId);
  }

  FetchDataFromApi(line_Id) {
    this.gotData = false;

    this.DataWithStructure = [];
    this.OutputData = [];
    var D = this.getMonthDateRange(moment(this.date.value).format("YYYY"), moment(this.date.value).format("MM"));
    //this.dataSourceService.GetServerAPIPath().subscribe((apipath: any) => {
    // console.log('https://int91mat11.smartfactoryworx.tech' + '/api/report/chart?startDate=' + moment(D.start).format("yyyy-MM-DD") + '&endDate=' + moment(D.end).format("yyyy-MM-DD") + '&line_id=' + line_Id);
    console.log('/api/report/chart?startDate=' + moment(D.start).format("yyyy-MM-DD") + '&endDate=' + moment(D.end).format("yyyy-MM-DD"), "AMBER");
    this.dataSourceService.GetOutputData(moment(D.start).format("yyyy-MM-DD"), moment(D.end).format("yyyy-MM-DD"), line_Id).subscribe((data: any) => {

      console.log(data, "AMBER")

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
          no_production_planned: a.updt_time + a.break_pdt,
          tablet: a.pack * a.goodCount
        }
        this.OutputData.push(output_data);

        this.lineId = this.OutputData[0].line_id;
      }
      console.log(this.OutputData);
      this.gotData = true;
      //this.licenseKey = apipath['pivot_license_key'];
    },
      error => {
        console.log('oops', error.error);
        this.errormsg = error.error.error;
      });
    //});
  }

  onCustomizeCell(
    cell,
    data
  ): void {
    //console.log("[customizeCell] flexmonsterPivot");
    if (data.isClassicTotalRow) cell.addClass("fm-total-classic-r");
    if (data.isGrandTotalRow) cell.addClass("fm-grand-total-r");
    if (data.isGrandTotalColumn) cell.addClass("fm-grand-total-c");
  }


  onReportComplete(): void {
    console.log("*****************************onReportComplete****************************");
    this.SearchStateData(this.OutputData);
    this.child.webDataRocks.off("reportcomplete");
    this.pivotTableReportComplete = true;
    console.log(this.selected);
    this.createAndUpdateChart_waterfall_linewise('higchartcontainer-waterfall');
    this.createChart_kpi_linewise(this.lineId, 'highchartcontainer-control', this.selected, 'Availability,Performance, Quality,OEE', 'APQOEE');
    this.createChart_kpi_linewise(this.lineId, 'highchartcontainer-control-idle', this.selected2, 'Idle Time', 'idle');
    this.createAndUpdateChart_eventHistory_linewise('all', 'higchartcontainer-lines-combined-eventhistory', 'stack');
    this.createAndUpdateChart_eventHistory_linewise('all', 'highChartContainer-Combined-EventHistory-Pie', 'pie');

  }



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
        },
        tablet: {
          type: "number"
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
            formula: '(("productive_time")/("planed_production_time"))*100',
            caption: "OEE",
            format: "44mvcoma",
          },
          {
            uniqueName: "Availability",
            formula:
              '(("gross_operating_time") / ("planed_production_time"))*100',
            caption: "A",
            format: "44mvcoma",
          },
          {
            uniqueName: "Performance",
            formula: '(("net_operating_time") / ("gross_operating_time"))*100',
            caption: "P",
            format: "44mvcoma",
          },
          {
            uniqueName: "Quality",
            formula: '(("productive_time"/60) / ("net_operating_time"/60))*100',
            caption: "Q",
            format: "44mvcoma",
          },
          {
            uniqueName: "goodCount",
            formula: "((\"goodCount\"))",
            caption: "Good Blister"
          },
          {
            uniqueName: "Reject_Count",
            formula: "(sum(\"reject_count\"))",
            caption: "Reject Blister"
          },
          {
            uniqueName: "tablet",
            formula: "(sum(\"tablet\"))",
            caption: "Tablets"
          },
          {
            uniqueName: "theoretical_time",
            formula: '(("theoretical_time"))',
            caption: "Total",
            format: "decimal2",
          },

          {
            uniqueName: "break_pdt",
            formula: '(("break_pdt"))',
            caption: "Standard time",
            format: "decimal2",
          },
          {
            uniqueName: "updt_time",
            formula: '("updt_time")',
            caption: "Power Off",
            format: "decimal2",
          },
          {
            uniqueName: "co_pdt",
            formula: '(("co_pdt"))',
            caption: "PDT-Std CO",
            format: "decimal2",
          },

          {
            uniqueName: "changeover_time",
            formula: '("changeover_time")',
            caption: "Changeover",
            format: "decimal2",
          },
          {
            uniqueName: "cleaning_part_fixing",
            formula: '("cleaning_part_fixing")',
            caption: "Clean & part Fixing ",
            format: "decimal2",
          },
          {
            uniqueName: "setup_changeover",
            formula: '("setup_changeover")',
            caption: "Setup Time",
            format: "decimal2",
          },
          {
            uniqueName: "minor_fault_time",
            formula: '(("minor_fault_time"))',
            caption: "Minor Fault",
            format: "decimal2",
          },
          {
            uniqueName: "major_fault_time",
            formula: '(("major_fault_time"))',
            caption: "Major Fault",
            format: "decimal2",
          },
          {
            uniqueName: "total_fault_time",
            formula: '(("total_fault_time"))',
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
            formula: '(("blocked_time"))',
            caption: "Downstream",
            format: "decimal2",
          },

          {
            uniqueName: "major_manual_stop_time",
            formula: '(("major_manual_stop_time"))',
            //formula: "(sum(\"major_manual_stop_time\"/60))",
            caption: "Major Manual stop Duration",
            format: "decimal2",
          },
          {
            uniqueName: "minor_manual_stop_time",
            formula: '(("minor_manual_stop_time"))',
            caption: "Minor Manual stop Duration",
            format: "decimal2",
          },
          {
            uniqueName: "waiting_time",
            formula: '(("waiting_time"))',
            caption: "Waiting Time",
            format: "decimal2",
          },
          {
            uniqueName: "idle_time",
            formula: '(("idle_time"))',
            caption: "Noraml Idle Time",
            format: "decimal2",
          },

          {
            uniqueName: "total_manual_stop_time",
            formula: '(("total_manual_stop_time"))',
            caption: "Idle time",
            format: "decimal2",
          },

          {
            uniqueName: "roll_changeover",
            formula: '(("roll_changeover"))',
            caption: "Roll Change @4min",
            format: "decimal2",
          },
          {
            uniqueName: "speed_loss",
            formula: '(("speed_loss"))',
            //formula: "(((100-\"Performance\")*(\"Gross_Operating_Time\"/100)) - ((\"Waiting_Time\" + \"Blocked_Time\" + \"Major_Manual_Stop_Time\" + \"Minor_Fault_Time\" + \"Idle_Time\")))",
            caption: "Speed Loss Time",
            format: "decimal2",
          },
          {
            uniqueName: "reject_time",
            formula: '(("reject_time"))',
            caption: "Process Reject",
            format: "decimal2",
          },
          {
            uniqueName: "productive_time",
            formula: '(("productive_time"))',
            //formula: "((\"Net_Operating_Time\") - (\"In_Process_Reject_Time\"))",
            caption: "Productive Time",
            format: "decimal2",
          },
          {
            uniqueName: "executing",
            formula: '(("executing"))',
            caption: "Running Time",
            format: "decimal2",
          },

          {
            uniqueName: "changeover_wastage_time",
            formula: '(("changeover_wastage_time"))',
            caption: "CO Wastage",
            format: "decimal2",
          },

          {
            uniqueName: "rated_speed",
            formula: 'average("rated_speed")*60', //"(\"rated_speed\"*60)",
            caption: "Rated Speed",
            format: "decimal0",
          },
          {
            uniqueName: "avg_Speed",
            formula: "((\"goodCount\" + \"reject_count\")/(\"executing\"))*60",
            caption: "Average Speed",
            format: "44mvcoma1",
          },
          // {
          //   uniqueName: "avg_Speed",
          //   formula: "(\"goodCount\" + \"reject_count\")/((\"gross_operating_time\"-(\"idle_time\" + \"blocked_time\" + \"waiting_time\" + \"minor_fault_time\"+ \"minor_manual_stop_time\"))/60)",
          //   caption: "Average Speed",
          //   // formula:
          //   //   '("goodCount" + "reject_count")/(("gross_operating_time"-("idle_time" + "blocked_time" + "waiting_time" + "minor_fault_time"))/60)',
          //   // caption: "Average Speed",
          //   format: "44mvcoma1",
          // },
          {
            uniqueName: "gross_operating_time",
            formula: '(("gross_operating_time"))',
            //formula: "((\"Planned_Production_Time\") - (\"Changeover_Time\" -\"Major_Fault_Time\"))",
            //aggregation:"sum",
            caption: "Gross Operating Time",
            format: "decimal2",
          },
          {
            uniqueName: "planed_production_time",
            formula: '("planed_production_time")',
            //formula: "(sum(\"Theoritical Production Time-PDT-UPDT\"))",
            caption: "Planned Production Time",
            format: "decimal2",
          },
          {
            uniqueName: "net_operating_time",
            formula: '("net_operating_time")',
            //formula: "(sum(\"Theoritical Production Time-PDT-UPDT\"))",
            caption: "Net Operating Time",
            format: "decimal2",
          },
        ],
      },

      formats: [
        {
          name: "decimal2",
          decimalPlaces: 2,
          textAlign: "center",
        },
        {
          name: "decimal0",
          decimalPlaces: 0,
          textAlign: "center",
        },
        {
          name: "44mvcoma",
          decimalPlaces: 0,
          currencySymbol: "%",
          currencySymbolAlign: "right",
          nullValue: "0",
          textAlign: "center",
          infinityValue: "0",
          divideByZeroValue: "0",
        },
        {
          name: "44mvcoma1",
          thousandsSeparator: " ",
          decimalSeparator: ".",
          decimalPlaces: 0,
          // currencySymbol: "%",
          currencySymbolAlign: "right",
          nullValue: "",
          textAlign: "center",
          infinityValue: "0",
          divideByZeroValue: "0",
        },
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
          },
        },
        {
          formula: "#value > 75",
          measure: "OEE",
          format: {
            backgroundColor: "#c1df9f",
            color: "#000000",
            fontFamily: "Arial",
            fontSize: "12px",
          },
        },
        {
          formula: "AND(#value >= 60, #value <= 75)",
          measure: "OEE",
          format: {
            backgroundColor: "#fff280",
            color: "#000000",
            fontFamily: "Arial",
            fontSize: "12px",
          },
        },
        {
          formula: "#value < 95",
          measure: "Quality",
          format: {
            backgroundColor: "#ffb5ab",
            color: "#000000",
            fontFamily: "Arial",
            fontSize: "12px",
          },
        },
        {
          formula: "#value > 98",
          measure: "Quality",
          format: {
            backgroundColor: "#c1df9f",
            color: "#000000",
            fontFamily: "Arial",
            fontSize: "12px",
          },
        },
        {
          formula: "AND(#value >= 95, #value <= 98)",
          measure: "Quality",
          format: {
            backgroundColor: "#fff280",
            color: "#000000",
            fontFamily: "Arial",
            fontSize: "12px",
          },
        },
        {
          formula: "#value < 80",
          measure: "Availability",
          format: {
            backgroundColor: "#ffb5ab",
            color: "#000000",
            fontFamily: "Arial",
            fontSize: "12px",
          },
        },
        {
          formula: "#value > 90",
          measure: "Availability",
          format: {
            backgroundColor: "#c1df9f",
            color: "#000000",
            fontFamily: "Arial",
            fontSize: "12px",
          },
        },
        {
          formula: "AND(#value >= 80, #value <= 90)",
          measure: "Availability",
          format: {
            backgroundColor: "#fff280",
            color: "#000000",
            fontFamily: "Arial",
            fontSize: "12px",
          },
        },
        {
          formula: "#value < 70",
          measure: "Performance",
          format: {
            backgroundColor: "#ffb5ab",
            color: "#000000",
            fontFamily: "Arial",
            fontSize: "12px",
          },
        },
        {
          formula: "#value > 80",
          measure: "Performance",
          format: {
            backgroundColor: "#c1df9f",
            color: "#000000",
            fontFamily: "Arial",
            fontSize: "12px",
          },
        },
        {
          formula: "AND(#value >= 70, #value <= 80)",
          measure: "Performance",
          format: {
            backgroundColor: "#fff280",
            color: "#000000",
            fontFamily: "Arial",
            fontSize: "12px",
          },
        },

        {
          formula: "#value >=0",
          measure: "blocked_time",
          format: {
            backgroundColor: "#ffc95e",
            color: "#000000",
            fontFamily: "Arial",
            fontSize: "12px",
          },
        },
        {
          formula: "#value >=0",
          measure: "major_manual_stop_time",
          format: {
            backgroundColor: "#ffd1d1",
            color: "#000000",
            fontFamily: "Arial",
            fontSize: "11px",
          },
        },
        {
          formula: "#value >=0",
          measure: "minor_manual_stop_time",
          format: {
            backgroundColor: "#ffd1d1",
            color: "#000000",
            fontFamily: "Arial",
            fontSize: "11px",
          },
        },

        {
          formula: "#value >=0",
          measure: "waiting_time",
          format: {
            backgroundColor: "#ffd1d1",
            color: "#000000",
            fontFamily: "Arial",
            fontSize: "11px",
          },
        },
        {
          formula: "#value >=0",
          measure: "idle_time",
          format: {
            backgroundColor: "#ffd1d1",
            color: "#000000",
            fontFamily: "Arial",
            fontSize: "11px",
          },
        },
        {
          formula: "#value >=0",
          measure: "total_manual_stop_time",
          format: {
            backgroundColor: "#faacac",
            color: "#000000",
            fontFamily: "Arial",
            fontSize: "12px",
          },
        },
        {
          formula: "#value >=0",
          measure: "major_fault_time",
          format: {
            backgroundColor: "#c2f0f0",
            color: "#000000",
            fontFamily: "Arial",
            fontSize: "11px",
          },
        },
        {
          formula: "#value >=0",
          measure: "minor_fault_time",
          format: {
            backgroundColor: "#c2f0f0",
            color: "#000000",
            fontFamily: "Arial",
            fontSize: "11px",
          },
        },
        {
          formula: "#value >=0",
          measure: "total_fault_time",
          format: {
            backgroundColor: "#33cccc",
            color: "#000000",
            fontFamily: "Arial",
            fontSize: "12px",
          },
        },

        /// Changeover

        {
          formula: "#value >=-10000",
          measure: "cleaning_part_fixing",
          format: {
            backgroundColor: "#d6d6b6",
            color: "#000000",
            fontFamily: "Arial",
            fontSize: "11px",
          },
        },
        {
          formula: "#value >=-10000",
          measure: "setup_changeover",
          format: {
            backgroundColor: "#d6d6b6",
            color: "#000000",
            fontFamily: "Arial",
            fontSize: "11px",
          },
        },
        {
          formula: "#value >=0",
          measure: "changeover_time",
          format: {
            backgroundColor: "#c2c29b",
            color: "#000000",
            fontFamily: "Arial",
            fontSize: "12px",
          },
        },
        {
          formula: "#value >=0",
          measure: "updt_time",
          format: {
            backgroundColor: "#f5baef",
            color: "#000000",
            fontFamily: "Arial",
            fontSize: "12px",
          },
        },
        {
          formula: "#value >=0",
          measure: "executing",
          format: {
            backgroundColor: "#b9fa98",
            color: "#000000",
            fontFamily: "Arial",
            fontSize: "12px",
          },
        },
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
    this.createAndUpdateChart_waterfall_linewise('higchartcontainer-waterfall');

    console.log('*************************1528*******************');
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

  getFilterValue(value) {
    console.log(value);
    this.createChart_kpi_linewise(this.lineId, 'highchartcontainer-control', value, 'Availability,Performance, Quality,OEE', 'APQOEE');
  }
  getFilterIdleValue(value) {
    console.log(value);
    this.createChart_kpi_linewise(this.lineId, 'highchartcontainer-control-idle', value, 'Idle Time', 'idle');

  }
  eventHistoryTabClick(tabName) {
    console.log(tabName, "TAB NAME -eventHistoryTabClick");

    if (tabName === 'Combined') {
      this.createAndUpdateChart_eventHistory_linewise('all', 'higchartcontainer-lines-combined-eventhistory', 'stack');
      this.createAndUpdateChart_eventHistory_linewise('all', 'highChartContainer-Combined-EventHistory-Pie', 'pie');
    }
    else {
      this.createAndUpdateChart_eventHistory_linewise(this.lineId, 'higchartcontainer-eventhistory', 'stack');
    }
  }

  createAndUpdateChart_waterfall_linewise(controlname) {
    try {
      console.log(controlname);
      console.log(this.OutputData);

      let w_total_time = this.utils.SumOfArrayByProperty(this.OutputData, 'theoretical_time') / 3600;
      let w_no_prod_planned = this.utils.SumOfArrayByProperty(this.OutputData, 'no_production_planned') / 3600;
      let w_idle_time = this.utils.SumOfArrayByProperty(this.OutputData, 'total_sum_idle_time') / 3600;
      let w_changeover_time = this.utils.SumOfArrayByProperty(this.OutputData, 'changeover_time') / 3600;
      let w_in_process_reject_time = this.utils.SumOfArrayByProperty(this.OutputData, 'reject_time') / 3600;
      let w_speedLosstime = this.utils.SumOfArrayByProperty(this.OutputData, 'speed_loss') / 3600;

      var data1: any
      data1 = {
        colors: ['rgba(124, 181, 236, 0.3)', 'rgba(144, 237, 125, 0.3)'],
        chart: {
          type: 'waterfall',
          inverted: true,
          events: {
            load: function () {
              document.getElementById(controlname).style.background = 'none';
            }
          }
        },
        title: {
          text: 'Month Timeline in Hours'
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
            text: 'Month'
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
            { name: 'Changeover', y: -1 * w_changeover_time, color: 'rgb(163, 163, 117)' },
            { name: 'Idle Time', y: -1 * w_idle_time, color: 'rgb(254, 1, 1)' },
            { isIntermediateSum: true, color: 'rgb(24, 176, 176)' },
            { name: 'Speed Loss Time', y: -1 * w_speedLosstime, color: 'rgb(255, 150, 85)' },
            { name: 'Reject Time', y: -1 * w_in_process_reject_time, color: 'rgb(78, 205, 196)' },
            { isSum: true, color: 'rgb(173, 255, 47)' }]
          }]
      }

      //console.log(data);
      console.log(data1);
      console.log(controlname);

      // data.chart = data1.chart;
      // data.series = data1.series;
      // data.xAxis = data1.xAxis;
      // data.title = { text: "Month Timeline in Hours" };
      // data.plotOptions = data1.plotOptions;
      // delete data.yAxis;
      Highcharts.setOptions({
        exporting: {
          enabled: true
        },
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

    } catch (error) { }
  }
  createChart_kpi_linewise(line, controlname, category, chartTitle, chartType) {
    console.log(controlname, "controlname");
    console.log(line, "line Name");
    console.log(category, "category");

    var KPIData = this.OutputData.filter(function (value) {
      return value.line_id === line
    })
    console.log(KPIData);

    const GroupedData = this.utils.groupAndSum(KPIData, [category], ['planed_production_time', 'productive_time', 'net_operating_time', 'gross_operating_time', 'speed_loss', 'total_sum_idle_time']);

    console.log(GroupedData, "GroupedData");

    GroupedData.forEach((itm) => {
      itm["OEE"] = this.utils.roundOff((itm["productive_time"] / itm["planed_production_time"]) * 100)
      itm["Performance"] = this.utils.roundOff((itm["net_operating_time"] / itm["gross_operating_time"]) * 100)
      itm["Availability"] = this.utils.roundOff((itm["gross_operating_time"] / itm["planed_production_time"]) * 100)
      itm["Quality"] = this.utils.roundOff((itm["productive_time"] / itm["net_operating_time"]) * 100)
      itm["total_sum_idle_time"] = this.utils.GetDigitDecimalNum(this.utils.ConvertToHours(itm["total_sum_idle_time"]), '1e2')
      itm["speed_loss"] = this.utils.GetDigitDecimalNum(this.utils.ConvertToHours(itm["speed_loss"]), '1e2')
    });
    console.log(GroupedData, "GroupedData");
    let xAxisData;
    let measureDataOEE;
    let measureDataPerformace;
    let measureDataQuality;
    let measureDataAvailability;
    let measureDataSpeedLoss;
    let measureDataIdleTime;
    let chartTitleName;
    let toolTipEnd;
    let seriesData;


    if (chartType === 'APQOEE') {
      GroupedData.sort(this.utils.dynamicSort('OEE'))
      xAxisData = this.utils.filterMyArr(GroupedData, category);
      measureDataOEE = this.utils.filterMyArr(GroupedData, "OEE");
      measureDataPerformace = this.utils.filterMyArr(GroupedData, "Performance");
      measureDataQuality = this.utils.filterMyArr(GroupedData, "Quality");
      measureDataAvailability = this.utils.filterMyArr(GroupedData, "Availability");
      chartTitleName = chartTitle + '(%)'
      toolTipEnd = '%'
      seriesData = [
        {
          name: "A",
          data: measureDataAvailability,
          color: '#ffe66d'
        },
        {
          name: "P",
          data: measureDataPerformace,
          color: '#4ecdc4'
        },
        {
          name: "Q",
          data: measureDataQuality,
          color: '#1a535c'
        },
        {
          name: "OEE",
          data: measureDataOEE,
          color: '#ff6b6b'
        },

      ]
    } else if (chartType === 'idle') {
      GroupedData.sort(this.utils.dynamicSort('total_sum_idle_time'));
      xAxisData = this.utils.filterMyArr(GroupedData, category);
      measureDataSpeedLoss = this.utils.filterMyArr(GroupedData, "speed_loss");
      measureDataIdleTime = this.utils.filterMyArr(GroupedData, "total_sum_idle_time");
      chartTitleName = chartTitle + '(in Hours)'
      toolTipEnd = ''
      seriesData = [
        // {
        //   name: "Speed Loss",
        //   data: measureDataSpeedLoss,
        //   color: '#ffe66d'
        // },
        {
          name: "Idle Time",
          data: measureDataIdleTime,
          color: '#4ecdc4'
        },


      ]
    }
    var ChartData: any;
    ChartData = {

      chart: {
        type: 'column'
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
          text: category
        },
        categories: xAxisData
      },
      yAxis: [
        {
          title: {
            text: "Key Parameters"
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
          return this.key + '<br>' + '' + value + toolTipEnd;
        }
      },
      plotOptions: {
        column: {
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

      series: seriesData,
      credits: {
        enabled: false
      }
    }
    console.log(JSON.stringify(ChartData));
    Highcharts.chart(controlname, ChartData);
  }
  createAndUpdateChart_eventHistory_linewise(line, controlname, chartType) {
    console.log(controlname);
    console.log(this.OutputData);

    var eventHistoryLineData = this.OutputData.filter(function (value) {
      return line == 'all' ? value : value.line_id === line
    })
    console.log(eventHistoryLineData);
    var eventHistoryGroupedData;
    if (line === 'all') {
      eventHistoryGroupedData = this.utils.groupAndSum(eventHistoryLineData, ['line_id'], ['executing', 'total_sum_idle_time', 'changeover_time', 'no_production_planned']);
    } else {
      eventHistoryGroupedData = this.utils.groupAndSum(eventHistoryLineData, ['date'], ['executing', 'total_sum_idle_time', 'changeover_time', 'no_production_planned']);

    }
    console.log(eventHistoryGroupedData, "eventHistoryGroupedData");

    eventHistoryGroupedData.forEach((itm) => {
      itm["executing"] = this.utils.GetDigitDecimalNum(this.utils.ConvertToHours(itm["executing"]), '1e1')
      itm["total_sum_idle_time"] = this.utils.GetDigitDecimalNum(this.utils.ConvertToHours(itm["total_sum_idle_time"]), '1e1')
      itm["changeover_time"] = this.utils.GetDigitDecimalNum(this.utils.ConvertToHours(itm["changeover_time"]), '1e1')
      itm["no_production_planned"] = this.utils.GetDigitDecimalNum(this.utils.ConvertToHours(itm["no_production_planned"]), '1e1')
    });

    console.log(eventHistoryGroupedData, "eventHistoryGroupedData");

    let xAxisData;
    if (line === 'all') {
      xAxisData = this.utils.filterMyArr(eventHistoryGroupedData, 'line_id');
    } else {
      xAxisData = this.utils.filterMyArr(eventHistoryGroupedData, 'date');
    }

    let running_time_data = this.utils.filterMyArr(eventHistoryGroupedData, "executing");
    let idle_time_data = this.utils.filterMyArr(eventHistoryGroupedData, "total_sum_idle_time");
    let changerover_data = this.utils.filterMyArr(eventHistoryGroupedData, "changeover_time");
    let no_prod_planned_data = this.utils.filterMyArr(eventHistoryGroupedData, "no_production_planned");


    console.log(xAxisData);
    console.log(running_time_data);
    console.log(idle_time_data);
    console.log(changerover_data);
    console.log(no_prod_planned_data);

    if (chartType === 'pie') {

      let all_sum = running_time_data[0] + idle_time_data[0] + changerover_data[0] + no_prod_planned_data[0]


      console.log(all_sum);

      var perc_running: number
      var perc_idle: number
      var perc_changeover: number
      var perc_noproduction: number

      perc_running = (running_time_data[0] / all_sum) * 100;
      perc_idle = (idle_time_data[0] / all_sum) * 100;
      perc_changeover = (changerover_data[0] / all_sum) * 100;
      perc_noproduction = (no_prod_planned_data[0] / all_sum) * 100;

      var pieChartData: any
      pieChartData = {
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
          text: 'Event History(%)',
          align: 'left',
          style: {
            fontWeight: 'bold'
          }
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
        credits: {
          enabled: false
        },
        colors: ["#32cd32", "rgb(254,1,1)", "rgb(163, 163, 117)", "rgb(255, 51, 204)"]

      }

      Highcharts.chart(controlname, pieChartData);
    }
    else {
      var stackChartData: any;
      stackChartData = {
        colors: ["#32cd32", "rgb(254,1,1)", "rgb(163, 163, 117)", "rgb(255, 51, 204)",],
        chart: {
          type: 'column'
        },
        title: {
          text: 'Event History(in Hours)',
          align: 'left',
          style: {
            fontWeight: 'bold'
          }
        },
        xAxis: {
          categories: xAxisData
        },
        yAxis: {
          //min: 0,

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
          name: 'No Production Planned',
          data: no_prod_planned_data
        }],
        credits: {
          enabled: false
        },
      }
      Highcharts.chart(controlname, stackChartData);
    }

  }


  Export_Excel() {
    var D = this.getMonthDateRange(moment(this.date.value).format("YYYY"), moment(this.date.value).format("MM"));
    var lineName = this.dataSourceService.lineName.split("/");
    this.child.webDataRocks.exportTo(
      "Excel", {
      filename: "Output_" + moment(D.start).format("yyyy-MM") + "_" + this.dataSourceService.lineName,
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
      filename: "Output_" + moment(D.start).format("yyyy-MM") + "_" + lineName[0],
      header: "Output Report /" + moment(D.start).format("yyyy-MM") + " / " + this.dataSourceService.lineName,
      destinationType: "file",
      url: "URL to server script saving the file"

    },
      function () {
        //console.log("Export process is finished");
      }
    );
  }

  exportHTMLtoPDF() {
    console.log("exportHTMLtoPDF");
    const options = {
      filename: 'myfile.pdf',
      image: { type: 'jpeg' },
      html2canvas: {},
      jsPDF: { unit: 'in', format: 'legal', orientation: 'landscape' },

    }
    var element = document.getElementById('element-to-print');
    html2pdf().from(element).set(options).save();
  }
}
