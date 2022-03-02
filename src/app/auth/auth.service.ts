// import { ConnectionService } from './../connection.service';
import * as socketIO from 'socket.io-client';
import {
  NgxNotificationDirection,
  NgxNotificationMsgService,
  NgxNotificationStatusMsg,
} from 'ngx-notification-msg';

import { Injectable, NgModule, OnInit } from '@angular/core';
import { Observable, Observer, BehaviorSubject, Subscription, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router, ActivatedRoute, Event, NavigationEnd } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NGXLogger } from 'ngx-logger';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authEmail: string;
  authToken: string;
  logoutTimer;
  logoutAfterMinutes = 10;
  private dCurrentUser;



  public currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  public otpResponse;
  public componentHideSubject  = false;
  public componentHide: Subject<any> = new Subject<false>();
  componentHideObserver: Observer<any> = new BehaviorSubject(false);
  logoutHideObserver: Observer<any> = new BehaviorSubject(false);



  // public socket = socketIO('abc.smartfactoryworx.tech/socket/auth', {
  //   query: this.currentUserValue,
  // });


  // //intas on premise testing server socket

  // public socket = socketIO('smarttest.intaspharma.com:8090/socket/auth', {
  //   query: this.currentUserValue,
  // });

  // intas on premise productiom server socket

  // public socket = socketIO('smart.intaspharma.com:8080/socket/auth', {
  //   query: this.currentUserValue,
  // });

  accessRoutes = [
    '/pda/india/noida/osd1/hall1/line1/live-view/tabular-view',
    '/pda/india/noida/osd1/hall1/line1/live-view/charts-view'
  ];

  constructor(
    public httpClient: HttpClient,
    public router: Router,
    public route: ActivatedRoute,
    private readonly ngxNotificationMsgService: NgxNotificationMsgService,
    private readonly logger: NGXLogger,
    // private firebaseAuth: AngularFireAuth,
    private toastr: ToastrService,

    // private connectionService :ConnectionService,
  ) {

    // this.logoutTimer = setTimeout(() => {
    //   this.logout();
    // }, this.logoutAfterMinutes * 600000);

    // this.router.events.subscribe((event: Event) => {
    //   clearTimeout(this.logoutTimer);
    //   this.logoutTimer = setTimeout(() => {
    //     this.logout();
    //   }, this.logoutAfterMinutes * 600000);
    //   if (event instanceof NavigationEnd) {
    //     // if(router.url.split('/')[1] === 'pda' && !this.accessRoutes.includes(router.url)) {
    //     //   this.router.navigate(['/auth/un-authorized'], );
    //     // } else {
    //     // }
    //     this.logger.info(event);
    //   }
    // });

    this.currentUserSubject = new BehaviorSubject<any>(
      JSON.parse(sessionStorage.getItem('dCurrentUser') || 'null')
    );
    this.currentUser = this.currentUserSubject.asObservable();



    // this.socket.on('route', (routeConfig: any) => {
    //   this.logger.info(routeConfig);
    //   if (this.authEmail === routeConfig.email) {
    //     this.router.navigate([routeConfig.route]);
    //   } else if (!routeConfig.email) {
    //     this.router.navigate([routeConfig.route]);
    //   }
    // });

    // this.connectionService.socket.on('logout', (logoutConfig) => {
    //   console.log(logoutConfig, 'Auth Socket1');
    //   // if (logoutConfig && logoutConfig.settings) {
    //   //   if (logoutConfig.settings.logoutAfterMinutes) {
    //   //     this.logoutAfterMinutes = logoutConfig.settings.logoutAfterMinutes;
    //   //     console.log('logout setting set done');
    //   //     clearTimeout(this.logoutTimer);
    //   //     this.logoutTimer = setTimeout(() => {
    //   //       this.logout();
    //   //     }, this.logoutAfterMinutes * 60000);
    //   //   }
    //   // }

    //   if(!this.currentUserValue) this.logout();
    //   console.log(this.currentUserValue, logoutConfig, logoutConfig.query, 'Auth Socket2')
    //   if (this.currentUserValue && logoutConfig && logoutConfig.query) {
    //     if (
    //       this.currentUserValue.jwtToken === logoutConfig.query.jwtToken ||
    //       this.currentUserValue.email === logoutConfig.query.email ||
    //       this.currentUserValue.empCode === logoutConfig.query.empCode
    //     ) {
    //       this.logout();
    //     }
    //   }
    //   // if (!logoutConfig || (logoutConfig && !logoutConfig.query)) {
    //   //   this.logout();
    //   // }
    //   // this.logger.info();
    // });

    // this.connectionService.socket.on('login', (logoutConfig) => {
    //   if (this.currentUserValue && logoutConfig && logoutConfig.query) {
    //     if (
    //       this.currentUserValue.jwtToken !== logoutConfig.query.jwtToken &&
    //       this.currentUserValue.email === logoutConfig.query.email
    //     ) {
    //       this.logout();
    //     }
    //   }
    // });

    // this.socket.on('logout', (logoutConfig) => {
      // if (logoutConfig && logoutConfig.settings) {
      //   if (logoutConfig.settings.logoutAfterMinutes) {
      //     this.logoutAfterMinutes = logoutConfig.settings.logoutAfterMinutes;
      //     console.log('logout setting set done');
      //     clearTimeout(this.logoutTimer);
      //     this.logoutTimer = setTimeout(() => {
      //       this.logout();
      //     }, this.logoutAfterMinutes * 60000);
      //   }
      // }

      // if (this.currentUserValue && logoutConfig && logoutConfig.query) {
      //   if (
      //     this.currentUserValue.jwtToken === logoutConfig.query.jwtToken ||
      //     this.currentUserValue.email === logoutConfig.query.email ||
      //     this.currentUserValue.empCode === logoutConfig.query.empCode
      //   ) {
      //     this.logout();
      //   }
      // }
      // if (!logoutConfig || (logoutConfig && !logoutConfig.query)) {
      //   this.logout();
      // }
      // this.logger.info();
    // });

    // this.connectionService.socket.on('login', (logoutConfig) => {
    //   if (this.currentUserValue && logoutConfig && logoutConfig.query) {
    //     if (
    //       this.currentUserValue.jwtToken !== logoutConfig.query.jwtToken &&
    //       this.currentUserValue.email === logoutConfig.query.email
    //     ) {
    //       this.logout();
    //     }
    //   }
    // });

    // this.socket.on('logout', (logoutConfig) => {
    //   if (logoutConfig && logoutConfig.settings) {
    //     if (logoutConfig.settings.logoutAfterMinutes) {
    //       this.logoutAfterMinutes = logoutConfig.settings.logoutAfterMinutes;
    //       console.log('logout setting set done');
    //       clearTimeout(this.logoutTimer);
    //       this.logoutTimer = setTimeout(() => {
    //         this.logout();
    //       }, this.logoutAfterMinutes * 60000);
    //     }
    //   }

    //   if (this.currentUserValue && logoutConfig && logoutConfig.query) {
    //     if (
    //       this.currentUserValue.jwtToken === logoutConfig.query.jwtToken ||
    //       this.currentUserValue.email === logoutConfig.query.email ||
    //       this.currentUserValue.empCode === logoutConfig.query.empCode
    //     ) {
    //       this.logout();
    //     }
    //   }


    //   // if (!logoutConfig || (logoutConfig && !logoutConfig.query)) {
    //   //   this.logout();
    //   // }
    //   // this.logger.info();
    // });
  }

  public get currentUserValue(): any {

    this.currentUserSubject = new BehaviorSubject<any>(
      JSON.parse(sessionStorage.getItem('dCurrentUser'))
    );
    if(this.currentUserSubject){
      this.componentHideSubject = true;
    this.componentHide.next(false);

    }
    return this.currentUserSubject.value;
  }

  login(loginDto: any): Observable<any> {
    return this.httpClient
      .post<any>('https://abc.smartfactoryworx.tech/v1/auth/login', loginDto)
      .pipe(
        map((response) => {
          const currentUser = response.user;
          currentUser.jwtToken = response.jwtToken;
          this.currentUserSubject.next(currentUser);
          console.log(currentUser);
          localStorage.setItem('currentUser', JSON.stringify(currentUser));
          // this.connectionService.socket.emit('login', {
          //   email: response.user.email,
          //   jwtToken: response.jwtToken,
          // });
          this.router.navigate(['/auth/home']);
          return response;
        })
      );
  }

  getOtp(email: any): Observable<any> {
    return this.httpClient
      .get<any>('https://plantline.smartfactoryworx.tech:3000/api/v1/auth/otp-generate/' + email)
      .pipe(
        map((response: any) => {
          // console.warn(response);
          const currentUser = response;
          this.dCurrentUser = currentUser;
          // currentUser.jwtToken = response.jwtToken;
          // this.currentUserSubject.next(currentUser);
          // console.log(currentUser);
          sessionStorage.setItem('currentOtp', JSON.stringify(currentUser.otp));
          // this.connectionService.socket.emit('login', {
          //   email: response.user.email,
          //   jwtToken: response.jwtToken,
          // });
          // this.router.navigate(['/auth/home']);
          return response;
        })
      );
  }

   verifyLoginOtp(email, otp){

    const dCurrentUserOtp = JSON.parse(sessionStorage.getItem('currentOtp') || 'null');
    // console.log(dCurrentUser, otp);
        if(otp == dCurrentUserOtp){
          console.log(this.dCurrentUser);
          sessionStorage.setItem('dCurrentUser', JSON.stringify(this.dCurrentUser));
          this.currentUserSubject.next(this.dCurrentUser);
         this.httpClient
          .post<any>('https://plantline.smartfactoryworx.tech:3000/api/v1/auth/otp-generate/', {email: email, otp: otp})
          .pipe(
            map((response: any) => {

            })
          );
          // this.componentHide = false;
          // this.componentHideSubject = new BehaviorSubject<any>(
          //   false
          // );
          // this.componentHide = this.componentHideSubject.asObservable();
          this.componentHideSubject = true;
          this.componentHide.next(true);
          this.componentHideObserver.next( true);
          this.logoutHideObserver.next(true);
          this.router.navigate(['/auth/home']);
          this.otpResponse = this.dCurrentUser.name;
          sessionStorage.removeItem('currentOtp');

        }else{
          const errMsg= 'Entered OTP is wrong, try again! ';
          this.otpResponse = errMsg;
        }

  }

  register(registrationForm: object): Observable<any> {
    return this.httpClient
      .post<any>('https://abc.smartfactoryworx.tech/v1/auth/register', registrationForm)
      .pipe(
        map((user) => {
          return user;
        })
      );
  }

  getComponentHide(): Observable<any> {
    return new Observable((observer) => {
      this.componentHideObserver = observer;
    });
  }

  getLogOutHide(): Observable<any> {
    return new Observable((observer) => {
      this.logoutHideObserver = observer;
    });
  }

  verifyToken(email, token: string): Observable<any> {
    console.log(
      'https://abc.smartfactoryworx.tech/v1/auth/verify-email-token/' + email + '/' + token,
      JSON.stringify(token),
      'RyukverifyToken'
    );
    return this.httpClient.post(
      'https://abc.smartfactoryworx.tech/v1/auth/verify-email-token/' + email + '/' + token,
      {}
    );
  }

  resetRequest(email: string): Observable<any> {
    console.log(
      'https://abc.smartfactoryworx.tech/v1/auth/reset-request/' + email,
      JSON.stringify(email),
      'RyukresetRequest'
    );
    return this.httpClient.post(
      'https://abc.smartfactoryworx.tech/v1/auth/reset-request/' + email,
      {}
    );
  }

  resetpassword(
    email: string,
    token: string,
    newPassword: string
  ): Observable<any> {
    console.log(
      'https://abc.smartfactoryworx.tech/v1/auth/reset-password/' + token,
      JSON.stringify(token),
      'Ryukresetpassword'
    );
    return this.httpClient.post(
      'https://abc.smartfactoryworx.tech/v1/auth/reset-password/' + token,
      {
        email,
        newPassword,
      }
    );
  }

  logout(): void {
    this.componentHide.next(false);
    this.componentHideSubject = false;
    if (this.currentUserValue) {
      // this.connectionService.socket.emit('logout', {
      //   email: this.currentUserValue.email,
      //   jwtToken: null,
      // })
      // this.socket.emit('logout', {
      //   email: this.currentUserValue.email,
      //   jwtToken: null,
      // });
      // this.appService.socket.emit('auth', null);
    }
    // localStorage.removeItem('currentUser');
    sessionStorage.removeItem('dCurrentUser');
    this.currentUserSubject.next(null);
    const url: any = this.router.url;
    // this.router.navigate(['/auth/login']);
    const returnUrl = url.includes('?')
      ? url.includes('?')[0]
      : this.router.url;
    if (returnUrl) {
      this.router.navigate(['/auth/login'], { queryParams: { returnUrl } });
    }
    location.reload();
  }

  resetPasswordVerifyToken(email: string, token: string) {
    return this.httpClient.post(
      'https://abc.smartfactoryworx.tech/v1/auth/reset-password-verify-token/' + email + '/' +
      token,
      {}
    );
  }

  unauthorizedAccess(msg: any, unAuthUrl: string): void {
    // this.snackBar.open(messege, 'un-authorized access', { duration: 3000 });
    this.router.navigate(['/auth/un-authorized'], { queryParams: { returnUrl: unAuthUrl } });
  }
}
