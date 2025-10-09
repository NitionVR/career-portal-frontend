import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth';
import { CommonModule } from '@angular/common';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  is_new_user?: boolean;
}

@Component({
  selector: 'app-magic-link',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex justify-center items-center h-screen">
      <div class="text-center">
        <p *ngIf="!error">{{ message }}</p>
        <p *ngIf="error" class="text-destructive">{{ error }}</p>
      </div>
    </div>
  `,
})
export class MagicLinkPage implements OnInit {
  message = 'Verifying your magic link...';
  error: string | null = null;

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private authService = inject(AuthService);

  ngOnInit(): void {
    const token = this.route.snapshot.queryParamMap.get('token');
    const action = this.route.snapshot.queryParamMap.get('action');

    if (token) {
      if (action === 'register') {
        // This is a registration magic link
        this.authService.validateRegistrationToken(token).subscribe({
          next: (response) => {
            if (response['valid']) {
              this.message = 'Registration token valid. Redirecting to profile creation...';
              // Clean the URL before navigating
              this.router.navigate([], { relativeTo: this.route, replaceUrl: true, queryParams: {} });
              this.router.navigate(['/profile/create'], { queryParams: { token } });
            } else {
              this.error = 'Invalid or expired registration token.';
            }
          },
          error: (err) => {
            console.error('Error from validateRegistrationToken:', err);
            this.error = 'Error validating registration token. Please try again.';
          },
        });
      } else {
        // This is a login/session verification magic link
        this.authService.verify(token).subscribe({
          next: (response) => {
            if (response['token']) {
              this.authService.setToken(response['token']);
              this.message = 'Successfully logged in! Redirecting...';
              // Clean the URL before navigating
              this.router.navigate([], { relativeTo: this.route, replaceUrl: true, queryParams: {} });
              this.router.navigate(['/']); // Redirect to dashboard or home
            } else {
              this.error = 'Login failed. No token received.';
            }
          },
          error: (err) => {
            console.error(err);
            this.error = 'Invalid or expired login link. Please try again.';
          },
        });
      }
    } else {
      this.error = 'No token provided. Please try again.';
    }
  }
}