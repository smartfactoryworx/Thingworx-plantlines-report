import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FaultCauseComponent } from './fault-cause/fault-cause.component';
import { FaultComponent } from './fault/fault.component';
import { MachineComponent } from './machine/machine.component';
import { MastersComponent } from './masters.component';
import { SkuComponent } from './sku/sku.component';


const routes: Routes = [
  {
    path: '',
    component: MastersComponent,
    children: [
      {
        path: '',
        redirectTo: 'sku',
        pathMatch: 'full'
      },
      {
        path: 'sku',
        component: SkuComponent ,
        pathMatch: 'full'
      },
      {
        path: 'fault',
        component: FaultComponent ,
        pathMatch: 'full'
      },
      {
        path: 'machine',
        component: MachineComponent ,
        pathMatch: 'full'
      },
      {
        path: 'faultcause',
        component: FaultCauseComponent ,
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
