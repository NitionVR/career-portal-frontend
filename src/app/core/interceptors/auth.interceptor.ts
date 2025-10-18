import { inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandlerFn,
  HttpEvent,
  HttpInterceptorFn,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth';
import { Router } from '@angular/router';

export const AuthInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const token = authService.getToken();

  // Clone the request and add the authorization header if the token exists.
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  // Pass the cloned request to the next handler.
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        // If a 401 Unauthorized error is received, the token is likely
        // expired or invalid. Log the user out.
        console.warn(
          'Unauthorized request (401). Token may be invalid or expired. Logging out.'
        );
        authService.logout();
      } else if (error.status === 403) {
        // If a 403 Forbidden error is received, the user does not have
        // permission to access the resource.
        console.warn(
          'Forbidden request (403). User has insufficient permissions.'
        );
        // Optionally, redirect to an 'unauthorized' page
        // router.navigate(['/unauthorized']);
      }

      return throwError(() => error);
    })
  );
};