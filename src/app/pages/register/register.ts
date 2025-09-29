import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    LucideAngularModule,
  ],
  templateUrl: './register.html',
})
export class RegisterPage {
  isSubmitting = false;
  isSubmitted = false;
  authService = inject(AuthService);

  registerForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  get firstName() {
    return this.registerForm.get('firstName');
  }

  get lastName() {
    return this.registerForm.get('lastName');
  }

  get email() {
    return this.registerForm.get('email');
  }

  register() {
    if (this.registerForm.invalid) {
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
}