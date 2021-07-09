import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CycleReportComponent } from './cycle-report.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [CycleReportComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class CycleReportModule { }
