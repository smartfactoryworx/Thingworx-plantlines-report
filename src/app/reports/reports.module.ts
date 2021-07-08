import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './reports.component';
import { SharedModule } from '../shared/shared.module';
import { CurrentTempReportModule } from './current-temp-report/current-temp-report.module';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { SummaryReportModule } from './summary-report/summary-report.module';


@NgModule({
  declarations: [ReportsComponent],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    SharedModule,
    CurrentTempReportModule,
    SummaryReportModule
  ],
  providers:[
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
  ]
})
export class ReportsModule { }
