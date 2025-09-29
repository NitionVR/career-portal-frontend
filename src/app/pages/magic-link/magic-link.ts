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
      this.authService.verify(token).subscribe({
        next: (jwt) => {
          localStorage.setItem('jwt', jwt);
          this.message = 'Successfully verified! Redirecting...';

          try {
            const decodedToken: JwtPayload = jwtDecode(jwt);
            if (decodedToken.is_new_user) {
              this.router.navigate(['/profile/create']);
            } else {
              this.router.navigate(['/']); // Redirect to dashboard or home
            }
          } catch (e) {
            console.error('Error decoding JWT', e);
            this.error = 'An error occurred. Please try again.';
          }
        },
        error: (err) => {
          console.error(err);
          this.error = 'Invalid or expired magic link. Please try again.';
        },
      });
    } else {
      this.error = 'No token provided. Please try again.';
    }
  }
}