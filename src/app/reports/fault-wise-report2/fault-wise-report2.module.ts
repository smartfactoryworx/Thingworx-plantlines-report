import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaultWiseReport2Component } from './fault-wise-report2.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [FaultWiseReport2Component],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class FaultWiseReport2Module { }
