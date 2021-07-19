import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { MachineComponent } from './machine.component';



@NgModule({
  declarations: [MachineComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class MachineModule { }
