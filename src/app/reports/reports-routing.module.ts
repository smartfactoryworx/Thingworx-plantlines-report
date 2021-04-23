
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportsComponent } from './reports.component';
import { OutputReportComponent } from './output-report/output-report.component';
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
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
