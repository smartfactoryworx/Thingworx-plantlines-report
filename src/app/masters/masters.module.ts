import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MastersRoutingModule } from './masters-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MastersComponent } from './masters.component';
import { MachineModule } from './machine/machine.module';
import { FaultModule } from './fault/fault.module';
import { SkuModule } from './sku/sku.module';
import { FaultCauseModule } from './fault-cause/fault-cause.module';

@NgModule({
  declarations: [MastersComponent],
  imports: [
    CommonModule,
    SharedModule,
    MastersRoutingModule,
    MachineModule,
    FaultModule,
    SkuModule,
    FaultCauseModule
  ],
  providers:[
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
  ]
})
export class MastersModule { }
