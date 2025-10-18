import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth';
import { User } from '../../core/services/auth';
import { RegistrationControllerService } from '../../api/services/registration-controller.service';

@Component({
  selector: 'app-magic-link',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex justify-center items-center h-screen">
      <div class="text-center p-8">
        <p *ngIf="!error" class="text-lg">Verifying your magic link...</p>
        <div *ngIf="error">
          <p class="text-lg text-destructive">Authentication Failed</p>
          <p class="text-muted-foreground mt-2">{{ error }}</p>
          <button (click)="navigateToRegister()" class="mt-6 bg-primary text-primary-foreground py-2 px-4 rounded-md">
            Back to Sign Up
          </button>
        </div>
      </div>
    </div>
  `,
})
export class MagicLinkPage implements OnInit {
  error: string | null = null;

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private authService = inject(AuthService);
  private registrationService = inject(RegistrationControllerService);

  ngOnInit(): void {
    const token = this.route.snapshot.queryParamMap.get('token');
    const action = this.route.snapshot.queryParamMap.get('action');

    if (!token) {
      this.error = 'No authentication token was provided. Please try again.';
      return;
    }

    if (action === 'register') {
      this.handleRegistrationLink(token);
    } else {
      this.handleLoginLink(token);
    }
  }

  private handleRegistrationLink(token: string): void {
    this.registrationService.validateRegistrationToken({ token }).subscribe({
      next: (response: { [key: string]: any }) => {
        if (response['valid']) {
          this.router.navigate(['/profile/create'], { queryParams: { token } });
        } else {
          this.error = 'This registration link is invalid or has expired.';
        }
      },
      error: (err) => {
        this.error = 'Failed to validate registration link. It may have expired.';
        console.error('Registration link validation error:', err);
      },
    });
  }

  private handleLoginLink(token: string): void {
    this.authService.verifyMagicLink(token).subscribe({
      next: (response) => {
        console.log('User object from backend:', response.user); // --- DEBUGGING LINE ---
        this.redirectUser(response.user as User);
      },
      error: (err) => {
        this.error = err.message || 'Failed to verify magic link. It may be invalid or expired.';
        console.error('Magic link login error:', err);
      },
    });
  }

  private redirectUser(user: User): void {
    const dashboardUrl = user.isNewUser
      ? '/profile/create'
      : this.getDashboardUrl(user.role);
    this.router.navigate([dashboardUrl]);
  }

  private getDashboardUrl(role?: string): string {
    switch (role) {
      case 'CANDIDATE':
        return '/talent/dashboard';
      case 'HIRING_MANAGER':
        return '/employer/dashboard';
      default:
        return '/';
    }
  }

  navigateToRegister(): void {
    this.router.navigate(['/sign-up']);
  }
}
