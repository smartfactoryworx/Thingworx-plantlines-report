
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportsComponent } from './reports.component';
import { OutputReportComponent } from './output-report/output-report.component';
import { DaywiseReportComponent } from './daywise-report/daywise-report.component';
import { ManagementReportComponent } from './management-report/management-report.component';
import { OutputReport1Component } from './output-report1/output-report1.component';
import { ManagementReport2Component } from './management-report2/management-report2.component';
import { EventChartHistory2Component } from './event-chart-history2/event-chart-history2.component';
import { FaultWiseReport2Component } from './fault-wise-report2/fault-wise-report2.component';
import { ChangeoverReport2Component } from './changeover-report2/changeover-report2.component';

const routes: Routes = [
 
  {
    path: '',
    component: ReportsComponent,
    children: [
      {
        path: '',
        redirectTo: 'output-v2',
        pathMatch: 'full'
      },
      {
        path: 'output-v2',
        component: OutputReportComponent ,
        pathMatch: 'full'
      },
      {
        path: 'multiline-output',
        component: DaywiseReportComponent ,
        pathMatch: 'full'
      },
      {
        path: 'management',
        component: ManagementReportComponent ,
        pathMatch: 'full'
      },
      {
        path: 'output-v1',
        component: OutputReport1Component ,
        pathMatch: 'full'
      },
      {
        path: 'management-v2',
        component: ManagementReport2Component ,
        pathMatch: 'full'
      },
      {
        path: 'eventchart-v2',
        component: EventChartHistory2Component ,
        pathMatch: 'full'
      },
      {
        path: 'fault-v2',
        component: FaultWiseReport2Component ,
        pathMatch: 'full'
      },
      {
        path: 'changeover-v2',
        component: ChangeoverReport2Component ,
        pathMatch: 'full'
      },
      
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
