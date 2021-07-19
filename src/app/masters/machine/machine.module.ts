import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { MachineComponent } from './machine.component';
import { MachineDialogComponent } from './machine-dialog/machine-dialog.component';



@NgModule({
  declarations: [MachineComponent, MachineDialogComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class MachineModule { }
