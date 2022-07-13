import { HourlyReportComponent } from './hourly-report/hourly-report.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CycleReportComponent } from './cycle-report/cycle-report.component';
import { DailyCycleEntryComponent } from './daily-cycle-entry/daily-cycle-entry.component';
import { ReportsComponent } from './reports.component';
import { DailySummaryReportComponent } from './daily-summary-report/daily-summary-report.component';
import { CycleReportOldComponent } from './cycle-report-old/cycle-report-old.component';

const routes: Routes = [
  {
    path: '',
    component: ReportsComponent,
    children: [
      {
        path: '',
        redirectTo: 'cycle-report',
        pathMatch: 'full'
      },
      {
        path: 'cycle-report',
        component: CycleReportComponent ,
        pathMatch: 'full'
      },
       {
        path: 'daily-cycle',
        component: DailyCycleEntryComponent ,
        pathMatch: 'full'
      },
      {
        path: 'hourly',
        component: HourlyReportComponent,
        pathMatch: 'full'
      },
      {
        path: 'daily-summary',
        component: DailySummaryReportComponent,
        pathMatch: 'full'
      },
      {
        path: 'cycle-old-report',
        component: CycleReportOldComponent,
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
