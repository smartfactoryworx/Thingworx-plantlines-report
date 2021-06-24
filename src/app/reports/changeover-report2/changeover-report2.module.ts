import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { ChangeoverReport2Component } from './changeover-report2.component';



@NgModule({
  declarations: [ChangeoverReport2Component],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class ChangeoverReport2Module { }
