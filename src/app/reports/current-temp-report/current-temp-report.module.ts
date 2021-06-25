import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { CurrentTempReportComponent } from './current-temp-report.component';



@NgModule({
  declarations: [CurrentTempReportComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class CurrentTempReportModule { }
