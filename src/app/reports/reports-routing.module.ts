import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CycleReportComponent } from './cycle-report/cycle-report.component';
import { ReportsComponent } from './reports.component';

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
      
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
