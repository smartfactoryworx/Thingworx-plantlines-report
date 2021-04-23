
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportsComponent } from './reports.component';
import { OutputReportComponent } from './output-report/output-report.component';
import { OutputTest7Component } from './output-test7/output-test7.component';
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
        component: OutputTest7Component ,
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
