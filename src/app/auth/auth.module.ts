import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginComponent, LogoutComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ResetRequestComponent } from './reset-request/reset-request.component';
import { UnAuthorizedComponent } from './un-authorized/un-authorized.component';
import { VerifyTokenComponent } from './verify-token/verify-token.component';
import { HomeComponent } from './home/home.component';
import { LockScreenComponent } from './lock-screen/lock-screen.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [AuthComponent, LoginComponent, LogoutComponent, RegisterComponent, ResetPasswordComponent, ResetRequestComponent, UnAuthorizedComponent, VerifyTokenComponent, LockScreenComponent,  HomeComponent],
  imports: [
  CommonModule,
    AuthRoutingModule,

    SharedModule,
  ],
  exports: [
    SharedModule,
  ],
  providers: [
    // { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ]
})
export class AuthModule { }
