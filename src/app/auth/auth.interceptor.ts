import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  currentUser: any;
  authJWTToken: any;

  constructor(private authService: AuthService, public router: Router, private snackBar: MatSnackBar) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.currentUser && this.authJWTToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.authJWTToken}`,
          User: this.currentUser.email,
        }
      });
    }
    return next.handle(request).pipe(catchError(err => {
      this.authService.logout();
      const error = err.error.message || err.statusText;
      this.snackBar.open(error, err.error, { duration: 10000 });
      this.router.navigateByUrl('/auth/login');
      return throwError(err);
    }));
  }
}
