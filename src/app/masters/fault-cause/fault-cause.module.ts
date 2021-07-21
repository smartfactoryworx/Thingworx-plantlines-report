import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaultCauseDialogComponent } from './fault-cause-dialog/fault-cause-dialog.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FaultCauseComponent } from './fault-cause.component';



@NgModule({
  declarations: [
    FaultCauseComponent,FaultCauseDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class FaultCauseModule { }
