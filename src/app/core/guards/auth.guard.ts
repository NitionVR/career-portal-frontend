import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {

  const authService = inject(AuthService);
  const router = inject(Router);

  // Check if the user is authenticated
  if (authService.isAuthenticated()) {
    const requiredRole = route.data['role'] as string;

    // If the route requires a specific role
    if (requiredRole) {
      const userRole = authService.getUserRole();
      if (userRole === requiredRole) {
        return true; // User has the required role
      } else {
        // Role mismatch, redirect to an unauthorized page or dashboard
        console.warn(`Access denied. Required role: ${requiredRole}, User role: ${userRole}`);
        return router.createUrlTree(['/']); // Or a dedicated '/unauthorized' page
      }
    }
    return true; // Authenticated and no specific role required
  }

  // Not authenticated, redirect to the login page with the return URL
  console.log('User not authenticated, redirecting to login.');
  return router.createUrlTree(['/sign-up'], {
    queryParams: { returnUrl: state.url }
  });
};
