import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MachineComponent } from './machine/machine.component';
import { MastersComponent } from './masters.component';
import { SkuFaultMasterComponent } from './sku-fault-master/sku-fault-master.component';


const routes: Routes = [
  {
    path: '',
    component: MastersComponent,
    children: [
      {
        path: '',
        redirectTo: 'sku-fault',
        pathMatch: 'full'
      },
      {
        path: 'sku-fault',
        component: SkuFaultMasterComponent ,
        pathMatch: 'full'
      },
      {
        path: 'machine',
        component: MachineComponent ,
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
