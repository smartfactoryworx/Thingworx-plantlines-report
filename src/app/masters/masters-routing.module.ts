import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FaultMasterComponent } from './fault-master/fault-master.component';
import { MastersComponent } from './masters.component';
import { SkuMasterComponent } from './sku-master/sku-master.component';

const routes: Routes = [
  {
    path: '',
    component: MastersComponent,
    children: [
      {
        path: '',
        redirectTo: 'sku-master',
        pathMatch: 'full'
      },
      {
        path: 'sku-master',
        component: SkuMasterComponent ,
        pathMatch: 'full'
      },
      {
        path: 'fault-master',
        component: FaultMasterComponent ,
        pathMatch: 'full'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MastersRoutingModule { }
