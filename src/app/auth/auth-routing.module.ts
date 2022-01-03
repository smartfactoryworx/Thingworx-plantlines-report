import { AuthComponent } from './auth.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent, LogoutComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ResetRequestComponent } from './reset-request/reset-request.component';
import { UnAuthorizedComponent } from './un-authorized/un-authorized.component';
import { VerifyTokenComponent } from './verify-token/verify-token.component';
import { HomeComponent } from './home/home.component';
import { LockScreenComponent } from './lock-screen/lock-screen.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '',
    component: AuthComponent,
    children:[
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        component: HomeComponent,
        pathMatch: 'full'
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
      {
        path: 'reset-request',
        component: ResetRequestComponent,
      },
      {
        path: 'reset-password/:email/:token',
        component: ResetPasswordComponent,
      },
      {
        path: 'un-authorized',
        component: UnAuthorizedComponent,
      },
      {
        path: 'verify/:email/:token',
        component: VerifyTokenComponent,
      },
      {
        path: 'lock',
        component: LockScreenComponent,
      },
      {
        path: 'logout',
        component: LogoutComponent,
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
