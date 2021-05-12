
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportsComponent } from './reports.component';
import { OutputReportComponent } from './output-report/output-report.component';
import { DaywiseReportComponent } from './daywise-report/daywise-report.component';
import { ManagementReportComponent } from './management-report/management-report.component';
import { OutputReport1Component } from './output-report1/output-report1.component';

const routes: Routes = [
 
  {
    path: '',
    component: ReportsComponent,
    children: [
      {
        path: '',
        redirectTo: 'output-report',
        pathMatch: 'full'
      },
      {
        path: 'output-report',
        component: OutputReportComponent ,
        pathMatch: 'full'
      },
      {
        path: 'multiline-output-report',
        component: DaywiseReportComponent ,
        pathMatch: 'full'
      },
      {
        path: 'management-report',
        component: ManagementReportComponent ,
        pathMatch: 'full'
      },
      {
        path: 'output-report1',
        component: OutputReport1Component ,
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
