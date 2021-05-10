import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { ManagementReportComponent } from './management-report.component';

@NgModule({
  declarations: [ManagementReportComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class ManagementReportModule { }
