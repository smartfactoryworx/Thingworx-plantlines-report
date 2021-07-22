import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaultComponent } from './fault.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [FaultComponent],
  imports: [
    CommonModule,
    SharedModule
  ],

})
export class FaultModule { }
