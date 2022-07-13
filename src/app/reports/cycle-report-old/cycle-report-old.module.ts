import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { CycleReportOldComponent } from './cycle-report-old.component';


@NgModule({
  declarations: [CycleReportOldComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class CycleReportNewModule { }
