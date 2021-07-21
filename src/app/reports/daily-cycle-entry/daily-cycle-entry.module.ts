import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DailyCycleEntryComponent } from './daily-cycle-entry.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [DailyCycleEntryComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class DailyCycleEntryModule { }
