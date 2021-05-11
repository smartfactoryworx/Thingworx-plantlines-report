import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { DaywiseReportComponent } from './daywise-report.component';


@NgModule({
  declarations: [DaywiseReportComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class DaywiseReportModule { }
