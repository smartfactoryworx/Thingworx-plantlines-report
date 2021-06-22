import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventChartHistoryComponent } from './event-chart-history.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [EventChartHistoryComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class EventChartHistoryModule { }
