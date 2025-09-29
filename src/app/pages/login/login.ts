import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    MatButtonModule,
    LucideAngularModule,
  ],
  templateUrl: './login.html',
})
export class LoginPage {
  isSubmitted = false;
  isSubmitting = false;
  authService = inject(AuthService);

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  get email() {
    return this.loginForm.get('email');
  }

  sendMagicLink() {
    if (this.loginForm.invalid) {
      return;
    }

    this.isSubmitting = true;
    this.authService.login(this.email?.value ?? '').subscribe({
      next: () => {
        this.isSubmitting = false;
        this.isSubmitted = true;
      },
      error: (err) => {
        console.error(err);
        this.isSubmitting = false;
      },
    });
  }

  tryAgain() {
    this.isSubmitted = false;
    this.email?.reset();
  }
}