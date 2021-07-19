import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkuFaultMasterComponent } from './sku-fault-master.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SkuComponent } from './sku/sku.component';
import { FaultComponent } from './fault/fault.component';
import { SkuDialogComponent } from './sku/sku-dialog/sku-dialog.component';
import { FaultDialogComponent } from './fault/fault-dialog/fault-dialog.component';

@NgModule({
  declarations: [SkuFaultMasterComponent,SkuComponent,SkuDialogComponent,FaultComponent,FaultDialogComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class SkuFaultMasterModule { }
