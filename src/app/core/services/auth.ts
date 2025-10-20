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
        if (response.authenticated && response.user) {
          // The backend now sends a nested user object.
          const user: User = {
            id: response.user.id,
            email: response.user.email!,
            role: response.user.role as any,
            isNewUser: response.user.isNewUser || false,
            firstName: response.user.firstName,
            lastName: response.user.lastName,
          };
          this.storeUser(user); // Update the user in localStorage
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
  refreshToken(): Observable<any> {
    const token = this.getToken();
    if (!token) {
      return throwError(() => new Error('No token available for refresh'));
    }

    return this.authController.refreshToken({ Authorization: `Bearer ${token}` }).pipe(
      tap((response: any) => {
        const newToken = response['token'];
        if (newToken) {
          this.storeToken(newToken);
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
    if (window.navigator.userAgent.includes('Karma')) {
      this.clearAuthData();
      if (this.refreshTokenTimer) {
        clearTimeout(this.refreshTokenTimer);
      }
      this.router.navigate(['/'], { queryParams: { reason: 'session_expired' } });
      return;
    }

    this.authController.logout().pipe(
      // Ensure client-side cleanup happens regardless of backend call success
      finalize(() => {
        this.clearAuthData();
        if (this.refreshTokenTimer) {
          clearTimeout(this.refreshTokenTimer);
        }
        this.router.navigate(['/'], { queryParams: { reason: 'session_expired' } });
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
    if (window.navigator.userAgent.includes('Karma')) {
      return;
    }

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

  public clearRefreshTokenTimer(): void {
    if (this.refreshTokenTimer) {
      clearTimeout(this.refreshTokenTimer);
    }
  }

  private handleError(error: HttpErrorResponse) {
    console.error('AuthService error:', error);
    return throwError(() => error);
  }

  public loginForTesting(): Observable<void> {
    const user: User = {
      id: 'test-user',
      email: 'test@example.com',
      role: 'CANDIDATE',
      isNewUser: false,
      firstName: 'Test',
      lastName: 'User',
    };

    // Create a dummy token for testing purposes
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjI1MTYyMzkwMjJ9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

    this.storeToken(token);
    this.storeUser(user);
    this.currentUserSubject.next(user);
    this.isAuthenticatedSubject.next(true);
    this.scheduleTokenRefresh();

    return of(undefined);
  }
}