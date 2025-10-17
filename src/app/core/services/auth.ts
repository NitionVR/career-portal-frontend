import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError, of } from 'rxjs';
import { tap, catchError, finalize } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';

import { AuthenticationControllerService } from '../../api/services/authentication-controller.service';
import { UserDto } from '../../api/models/user-dto';
import { LoginRequest } from '../../api/models/login-request';
import { VerifyTokenResponse } from '../../api/models/verify-token-response';
import { SessionResponse } from '../../api/models/session-response';
import { RefreshTokenResponse } from '../../api/models';

// Re-defining User interface locally for convenience, mapping from UserDto
export interface User extends UserDto {}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'user_data';

  // Injected services
  private http = inject(HttpClient);
  private router = inject(Router);
  private authController = inject(AuthenticationControllerService);

  // Observable streams for reactive state management
  private currentUserSubject = new BehaviorSubject<User | null>(this.getUserFromStorage());
  public currentUser$ = this.currentUserSubject.asObservable();

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasValidToken());
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  // Token refresh timer
  private refreshTokenTimer?: any;

  constructor() {
    // Automatically start token refresh mechanism if a valid token exists on load.
    if (this.hasValidToken()) {
      this.scheduleTokenRefresh();
    }
  }

  /**
   * Initiates the login process by requesting a magic link.
   * POST /api/auth/login
   */
  requestMagicLink(email: string): Observable<any> {
    const loginRequest: LoginRequest = { email };
    return this.authController.login({ body: loginRequest }).pipe(
      tap(response => {
        console.log('Magic link requested for:', email, response);
      }),
      catchError(this.handleError)
    );
  }

  /**
   * Verifies the One-Time Token (OTT) from a magic link.
   * GET /api/auth/verify
   */
  verifyMagicLink(token: string): Observable<VerifyTokenResponse> {
    return this.authController.verifyToken({ token }).pipe(
      tap(response => {
        this.handleSuccessfulAuth(response);
      }),
      catchError(this.handleError)
    );
  }

  /**
   * Checks the validity of the current session with the backend.
   * GET /api/auth/session
   */
  checkSession(): Observable<SessionResponse> {
    return this.authController.checkSession().pipe(
      tap(response => {
        if (response.authenticated && response.userId) {
          const user: User = {
            id: response.userId,
            email: response.email!,
            role: response.role as any,
            isNewUser: response.isNewUser || false,
            // Note: firstName and lastName are not in SessionResponse, get them from storage
            firstName: this.getCurrentUser()?.firstName,
            lastName: this.getCurrentUser()?.lastName,
          };
          this.currentUserSubject.next(user);
          this.isAuthenticatedSubject.next(true);
          this.scheduleTokenRefresh();
        } else {
          this.clearAuthData();
        }
      }),
      catchError(error => {
        this.clearAuthData();
        return throwError(() => error);
      })
    );
  }

  /**
   * Refreshes the current JWT to extend the session.
   * POST /api/auth/refresh
   */
  refreshToken(): Observable<RefreshTokenResponse> {
    return this.authController.refreshToken().pipe(
      tap(response => {
        if (response.token) {
          this.storeToken(response.token);
          this.scheduleTokenRefresh();
          console.log('Token refreshed successfully');
        }
      }),
      catchError(error => {
        console.error('Token refresh failed, logging out.', error);
        this.logout();
        return throwError(() => error);
      })
    );
  }

  /**
   * Logs the user out.
   * POST /api/auth/logout
   */
  logout(): void {
    this.authController.logout().pipe(
      // Ensure client-side cleanup happens regardless of backend call success
      finalize(() => {
        this.clearAuthData();
        if (this.refreshTokenTimer) {
          clearTimeout(this.refreshTokenTimer);
        }
        this.router.navigate(['/homepage']);
      })
    ).subscribe({
      next: () => console.log('Server logout successful'),
      error: (err) => console.error('Server logout failed:', err)
    });
  }

  // ============= UTILITY METHODS =============

  public getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  public getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  public isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  public getUserRole(): string | null {
    return this.getCurrentUser()?.role ?? null;
  }

  public hasRole(role: string): boolean {
    return this.getUserRole() === role;
  }

  // ============= PRIVATE HELPERS =============

  private handleSuccessfulAuth(response: VerifyTokenResponse): void {
    if (!response.token || !response.user) {
      console.error('Authentication response is missing token or user data.');
      return;
    }
    this.storeToken(response.token);
    this.storeUser(response.user as User);
    this.currentUserSubject.next(response.user as User);
    this.isAuthenticatedSubject.next(true);
    this.scheduleTokenRefresh();
    console.log('Authentication successful for:', response.user.email);
  }

  private storeToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  private storeUser(user: User): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  private getUserFromStorage(): User | null {
    const userData = localStorage.getItem(this.USER_KEY);
    if (!userData) return null;
    try {
      return JSON.parse(userData);
    } catch (e) {
      console.error('Failed to parse user data from storage:', e);
      return null;
    }
  }

  private hasValidToken(): boolean {
    const token = this.getToken();
    if (!token) return false;
    try {
      const payload = jwtDecode(token);
      const expirationDate = new Date((payload.exp ?? 0) * 1000);
      return expirationDate > new Date();
    } catch (e) {
      return false;
    }
  }

  private decodeToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch (e) {
      console.error('Failed to decode token:', e);
      throw e;
    }
  }

  private scheduleTokenRefresh(): void {
    if (this.refreshTokenTimer) {
      clearTimeout(this.refreshTokenTimer);
    }
    const token = this.getToken();
    if (!token) return;

    try {
      const payload = this.decodeToken(token);
      const expiresIn = (payload.exp * 1000) - Date.now();
      // Refresh 5 minutes before expiration, or halfway through if it's shorter than 10 mins
      const fiveMinutes = 5 * 60 * 1000;
      const refreshBuffer = expiresIn > (fiveMinutes * 2) ? fiveMinutes : expiresIn / 2;
      const refreshIn = expiresIn - refreshBuffer;

      if (refreshIn > 0) {
        this.refreshTokenTimer = setTimeout(() => {
          this.refreshToken().subscribe();
        }, refreshIn);
      } else {
        // Token is already close to expiring, refresh now
        this.refreshToken().subscribe();
      }
    } catch (e) {
      console.error('Failed to schedule token refresh:', e);
    }
  }

  private clearAuthData(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      errorMessage = error.error?.message || `Server error: ${error.status}`;
    }
    console.error('AuthService error:', errorMessage, error);
    return throwError(() => new Error(errorMessage));
  }
}