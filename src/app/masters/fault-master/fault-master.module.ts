import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { FaultDailogComponent } from './fault-dailog/fault-dailog.component';



@NgModule({
  declarations: [FaultDailogComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class FaultMasterModule { }
