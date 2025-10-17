import { APP_INITIALIZER, Provider } from '@angular/core';
import { AuthService } from '../services/auth';
import { of } from 'rxjs';
import { catchError, take } from 'rxjs/operators';

/**
 * Factory function for the APP_INITIALIZER.
 * It checks for an existing session before the application bootstraps.
 */
export function initializeAuth(authService: AuthService): () => Promise<void> {
  return () =>
    new Promise((resolve) => {
      // If no token exists, there's no session to check. Resolve immediately.
      if (!authService.getToken()) {
        resolve();
        return;
      }

      // A token exists. Verify its validity with the backend.
      authService.checkSession().pipe(
        take(1), // Ensure the stream completes after one emission.
        catchError((error) => {
          // If session check fails (e.g., 401 error), the token is invalid.
          // The `checkSession` method already handles clearing the token.
          console.warn('Session validation failed on app startup:', error);
          // Return an empty observable to complete the stream.
          return of(null);
        })
      ).subscribe({
        complete: () => resolve(),
      });
    });
}

/**
 * Provider to be included in the main application configuration.
 * This hooks the `initializeAuth` function into Angular's startup process.
 */
export const authInitializerProvider: Provider = {
  provide: APP_INITIALIZER,
  useFactory: initializeAuth,
  deps: [AuthService],
  multi: true,
};
