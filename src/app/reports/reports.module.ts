import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './reports.component';
import { SharedModule } from '../shared/shared.module';
import { CurrentTempReportModule } from './current-temp-report/current-temp-report.module';


@NgModule({
  declarations: [ReportsComponent],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    SharedModule,
    CurrentTempReportModule
  ]
})
export class ReportsModule { }
