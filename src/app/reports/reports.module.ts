
import { OutputReportModule } from '../reports/output-report/output-report.module';
// import { WebDataRocksPivot } from './@webdatarocks/webdatarocks.angular4';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleChartsModule } from 'angular-google-charts';
import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './reports.component';
import { SharedModule } from '../shared/shared.module';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { ManagementReportModule } from './management-report/management-report.module';
import { DaywiseReportModule } from './daywise-report/daywise-report.module';
import { OutputReport1Module } from './output-report1/output-report1.module';
import { ManagementReport2Module } from './management-report2/management-report2.module';
import { EventChartHistory2Module } from './event-chart-history2/event-chart-history2.module';
import { FaultWiseReport2Module } from './fault-wise-report2/fault-wise-report2.module';
import { ChangeoverReport2Module } from './changeover-report2/changeover-report2.module';



@NgModule({
  declarations: [ReportsComponent],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    SharedModule,
    GoogleChartsModule.forRoot(),
    OutputReportModule,
    ManagementReportModule,
    DaywiseReportModule,
    OutputReport1Module,
    ManagementReport2Module,
    EventChartHistory2Module,
    FaultWiseReport2Module,
    ChangeoverReport2Module
  ],
  providers:[
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
  ]
})
export class ReportsModule { }
