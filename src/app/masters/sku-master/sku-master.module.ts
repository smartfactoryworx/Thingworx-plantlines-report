import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { SkuMasterComponent } from './sku-master.component';
import { SkuDailogComponent } from './sku-dailog/sku-dailog.component';



@NgModule({
  declarations: [ SkuDailogComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class SkuMasterModule { }
