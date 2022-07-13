import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './reports.component';
import { SharedModule } from '../shared/shared.module';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { CycleReportModule } from './cycle-report/cycle-report.module';
import { DailyCycleEntryModule } from './daily-cycle-entry/daily-cycle-entry.module';
import { HourlyReportComponent } from './hourly-report/hourly-report.component';
import { DailySummaryReportComponent } from './daily-summary-report/daily-summary-report.component';
import { CycleReportOldComponent } from './cycle-report-old/cycle-report-old.component';


@NgModule({
  declarations: [ReportsComponent, HourlyReportComponent, DailySummaryReportComponent, CycleReportOldComponent],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    SharedModule,
    CycleReportModule,
    DailyCycleEntryModule,

  ],
  providers:[
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
  ]
})
export class ReportsModule { }
