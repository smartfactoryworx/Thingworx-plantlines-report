import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagementReport2Component } from './management-report2.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [ManagementReport2Component],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class ManagementReport2Module { }
