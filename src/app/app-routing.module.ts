import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    redirectTo: '/auth/home',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
    data: { breadcrumb: 'Auth' },
  },
  {
    path: 'reports',
    loadChildren: () =>
      import('./reports/reports.module').then((m) => m.ReportsModule),
    data: { breadcrumb: 'Reports' },
    canActivate: [AuthGuard]

  },
  {
    path: 'masters',
    loadChildren: () =>
      import('./masters/masters.module').then((m) => m.MastersModule),
    data: { breadcrumb: 'Masters' },
    canActivate: [AuthGuard]

  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
