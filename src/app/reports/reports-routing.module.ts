import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CurrentTempReportComponent } from './current-temp-report/current-temp-report.component';
import { ReportsComponent } from './reports.component';

const routes: Routes = [
  {
    path: '',
    component: ReportsComponent,
    children: [
      {
        path: '',
        redirectTo: 'temp-report',
        pathMatch: 'full'
      },
      {
        path: 'temp-report',
        component: CurrentTempReportComponent ,
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
