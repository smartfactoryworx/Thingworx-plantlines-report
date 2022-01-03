import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  dashboardAuthToken: string = '';
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.dashboardAuthToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkb21haW4iOiIzLjcuMjUzLjIzMyIsImlhdCI6MTYzNzY0NDE2OCwiZXhwIjozMDIwMDQ0MTY4fQ.5wIUI0T4AojFhxqmaz0Uh3EcV0D3H919nOF8x4Q5K4w';

    if (request.url.includes('auth')) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.dashboardAuthToken}`,
        },
      });
    }

    return next.handle(request).pipe(
      finalize(() => {}),
      catchError((err) => {
        const error = err.error.message || err.statusText;
        return throwError(err);
      })
    );
  }
}
