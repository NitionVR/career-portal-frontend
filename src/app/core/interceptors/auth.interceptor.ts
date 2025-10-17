import { Injectable, inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private authService = inject(AuthService);
  private router = inject(Router);

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();

    // Clone the request and add the authorization header if the token exists.
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    // Pass the cloned request to the next handler.
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // If a 401 Unauthorized error is received, the token is likely
          // expired or invalid. Log the user out.
          console.warn('Unauthorized request (401). Token may be invalid or expired. Logging out.');
          this.authService.logout();
        } else if (error.status === 403) {
          // If a 403 Forbidden error is received, the user does not have
          // permission to access the resource.
          console.warn('Forbidden request (403). User has insufficient permissions.');
          // Optionally, redirect to an 'unauthorized' page
          // this.router.navigate(['/unauthorized']);
        }

        return throwError(() => error);
      })
    );
  }
}
