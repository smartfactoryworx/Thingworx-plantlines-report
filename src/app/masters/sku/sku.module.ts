import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { SkuComponent } from './sku.component';
import { SkuDialogComponent } from './sku-dialog/sku-dialog.component';


@NgModule({
  declarations: [SkuComponent,SkuDialogComponent],
  imports: [
    CommonModule,
    SharedModule,
  ],
  
 
})
export class SkuModule { }
