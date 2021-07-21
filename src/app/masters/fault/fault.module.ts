import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaultComponent } from './fault.component';
import { FaultDialogComponent } from './fault-dialog/fault-dialog.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ParentMasterComponent } from '../parent-master/parent-master.component';



@NgModule({
  declarations: [FaultComponent,FaultDialogComponent],
  imports: [
    CommonModule,
    SharedModule
  ],

})
export class FaultModule { }
