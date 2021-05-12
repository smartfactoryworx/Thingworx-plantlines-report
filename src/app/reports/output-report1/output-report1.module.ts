import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OutputReport1Component } from './output-report1.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [OutputReport1Component],
  imports: [
    CommonModule,
    SharedModule,
  ]
})
export class OutputReport1Module { }
