import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MastersRoutingModule } from './masters-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MastersComponent } from './masters.component';
import { FaultMasterModule } from './fault-master/fault-master.module';
import { SkuMasterModule } from './sku-master/sku-master.module';


@NgModule({
  declarations: [MastersComponent],
  imports: [
    CommonModule,
    SharedModule,
    MastersRoutingModule,
    FaultMasterModule,
    SkuMasterModule
  ],
  providers:[
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
  ]
})
export class MastersModule { }
