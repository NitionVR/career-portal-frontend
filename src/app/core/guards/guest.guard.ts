import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth';
import { User } from '../services/auth'; // Assuming User interface is exported from auth.service

/**
 * Prevents authenticated users from accessing guest-only pages like login and register.
 */
export const guestGuard: CanActivateFn = (): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {

  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    // User is already logged in, redirect them away from the guest page.
    const user = authService.getCurrentUser();
    console.log('GuestGuard: User is already authenticated. Redirecting...');

    if (user?.isNewUser) {
      return router.createUrlTree(['/profile/create']); // Or a dedicated '/onboarding' page
    }

    // Redirect to the appropriate dashboard based on role
    return router.createUrlTree([getDashboardUrl(user?.role)]);
  }

  // User is not authenticated, allow access to the guest page.
  return true;
};

function getDashboardUrl(role?: string): string {
  switch (role) {
    case 'CANDIDATE':
      return '/talent/dashboard';
    case 'HIRING_MANAGER':
      return '/employer/dashboard';
    // Add other roles as needed
    // case 'RECRUITER':
    //   return '/recruiter/dashboard';
    default:
      return '/'; // Fallback to a generic authenticated homepage or dashboard
  }
}
