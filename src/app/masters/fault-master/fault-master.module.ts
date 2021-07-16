import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaultMasterComponent } from './fault-master.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [FaultMasterComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class FaultMasterModule { }
