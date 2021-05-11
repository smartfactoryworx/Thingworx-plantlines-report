
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



@NgModule({
  declarations: [ReportsComponent],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    SharedModule,
    GoogleChartsModule.forRoot(),
    OutputReportModule,
    ManagementReportModule,
    DaywiseReportModule
  ],
  providers:[
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
  ]
})
export class ReportsModule { }
