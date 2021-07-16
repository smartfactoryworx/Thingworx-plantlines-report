import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo:'masters',
    pathMatch: 'full'
  },
  {
    path: 'reports',
    loadChildren: () =>
      import('./reports/reports.module').then((m) => m.ReportsModule),
    data: { breadcrumb: 'Reports' },
  },
  {
    path: 'masters',
    loadChildren: () =>
      import('./masters/masters.module').then((m) => m.MastersModule),
    data: { breadcrumb: 'Masters' },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
