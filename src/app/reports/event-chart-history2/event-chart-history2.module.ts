import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventChartHistory2Component } from './event-chart-history2.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [EventChartHistory2Component],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class EventChartHistory2Module { }
