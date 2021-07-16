import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { SkuMasterComponent } from './sku-master.component';



@NgModule({
  declarations: [SkuMasterComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class SkuMasterModule { }
