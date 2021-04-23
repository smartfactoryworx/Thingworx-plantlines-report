import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OutputReportComponent } from './output-report.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [OutputReportComponent],
  imports: [
    CommonModule,
    SharedModule,
  ]
})
export class OutputReportModule { }
