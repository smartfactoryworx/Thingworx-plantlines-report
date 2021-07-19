import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MastersRoutingModule } from './masters-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MastersComponent } from './masters.component';
import { SkuFaultMasterModule } from './sku-fault-master/sku-fault-master.module';
import { MachineModule } from './machine/machine.module';
import { FaultCauseComponent } from './fault-cause/fault-cause.component';

@NgModule({
  declarations: [MastersComponent, FaultCauseComponent],
  imports: [
    CommonModule,
    SharedModule,
    MastersRoutingModule,
    SkuFaultMasterModule,
    MachineModule
  ],
  providers:[
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
  ]
})
export class MastersModule { }
