import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CurrentTempReportComponent } from './current-temp-report/current-temp-report.component';
import { ReportsComponent } from './reports.component';
import { SummaryReportComponent } from './summary-report/summary-report.component';

const routes: Routes = [
  {
    path: '',
    component: ReportsComponent,
    children: [
      {
        path: '',
        redirectTo: 'summary-report',
        pathMatch: 'full'
      },
      {
        path: 'temp-report',
        component: CurrentTempReportComponent ,
        pathMatch: 'full'
      },
      {
        path: 'summary-report',
        component: SummaryReportComponent ,
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
