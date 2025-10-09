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

    if (token) {
      try {
        const decodedToken: JwtPayload = jwtDecode(token);

        if (decodedToken.is_new_user) {
          // This is a registration magic link
          this.authService.validateRegistrationToken(token).subscribe({
            next: (response) => {
              if (response['valid']) {
                this.message = 'Registration token valid. Redirecting to profile creation...';
                this.router.navigate(['/profile/create'], { queryParams: { token } });
              } else {
                this.error = 'Invalid or expired registration token.';
              }
            },
            error: (err) => {
              console.error(err);
              this.error = 'Error validating registration token. Please try again.';
            },
          });
        } else {
          // This is a login magic link
          this.authService.verify(token).subscribe({
            next: (response) => {
              if (response['token']) {
                this.authService.setToken(response['token']);
                this.message = 'Successfully logged in! Redirecting...';
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
      } catch (e) {
        console.error('Error decoding JWT', e);
        this.error = 'Invalid magic link format. Please try again.';
      }
    } else {
      this.error = 'No token provided. Please try again.';
    }
  }
}
