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
    const requiredRoleOrRoles = route.data['role'] as string | string[];

    // If the route requires a specific role or roles
    if (requiredRoleOrRoles) {
      const userRole = authService.getUserRole();

      // Check if the user has one of the required roles
      const hasRequiredRole = Array.isArray(requiredRoleOrRoles)
        ? requiredRoleOrRoles.includes(userRole!)
        : userRole === requiredRoleOrRoles;

      if (hasRequiredRole) {
        return true; // User has a required role
      } else {
        // Role mismatch, redirect to an unauthorized page or dashboard
        console.warn(`Access denied. Required role(s): ${requiredRoleOrRoles}, User role: ${userRole}`);
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
