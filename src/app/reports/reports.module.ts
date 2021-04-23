import { ShiftendReportModule } from '../reports/shiftend-report/shiftend-report.module';
import { EventChartHistoryModule } from '../reports/event-chart-history/event-chart-history.module';
import { ChangeoverReportModule } from '../reports/changeover-report/changeover-report.module';
import { BatchwiseReportModule } from '../reports/batchwise-report/batchwise-report.module';
import { OutputReportModule } from '../reports/output-report/output-report.module';
// import { WebDataRocksPivot } from './@webdatarocks/webdatarocks.angular4';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleChartsModule } from 'angular-google-charts';
import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './reports.component';
import { FaultWiseReportComponent } from './fault-wise-report/fault-wise-report.component';
import { FaultWiseReportModule} from './fault-wise-report/fault-wise-report.module';
import { SharedModule } from '../shared/shared.module';
import { MAT_DATE_LOCALE } from '@angular/material/core';



@NgModule({
  declarations: [ReportsComponent],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    SharedModule,
    GoogleChartsModule.forRoot(),
    FaultWiseReportModule,
    OutputReportModule,
    BatchwiseReportModule,
    ChangeoverReportModule,
    EventChartHistoryModule,
    ShiftendReportModule
  ],
  providers:[
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
  ]
})
export class ReportsModule { }
