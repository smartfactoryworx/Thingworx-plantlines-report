import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SummaryReportComponent } from './summary-report.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [SummaryReportComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class SummaryReportModule { }
