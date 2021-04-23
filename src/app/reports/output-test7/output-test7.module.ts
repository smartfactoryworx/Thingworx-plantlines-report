import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { OutputTest7Component } from './output-test7.component';



@NgModule({
  declarations: [OutputTest7Component],
  imports: [
    CommonModule, SharedModule,
  ]
})
export class OutputTest7Module { }
