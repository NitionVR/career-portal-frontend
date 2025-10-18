import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { RegistrationControllerService } from '../../api/services/registration-controller.service';
import { RegistrationRequest } from '../../api/models/registration-request';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
})
export class RegisterPage {
  signupForm: FormGroup;
  role: 'CANDIDATE' | 'HIRING_MANAGER' = 'CANDIDATE';
  registrationState: 'input' | 'sent' | 'error' = 'input';
  errorMessage: string | null = null;

  private fb = inject(FormBuilder);
  private registrationService = inject(RegistrationControllerService);

  constructor() {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  setRole(role: 'CANDIDATE' | 'HIRING_MANAGER'): void {
    this.role = role;
  }

  onSubmit(): void {
    if (this.signupForm.invalid) {
      this.errorMessage = 'Please enter a valid email address.';
      this.registrationState = 'error';
      return;
    }

    const { email } = this.signupForm.value;
    const registrationRequest: RegistrationRequest = { email, role: this.role };

    this.registrationService.initiateRegistration({ body: registrationRequest }).subscribe({
      next: () => {
        this.registrationState = 'sent';
      },
      error: (err) => {
        console.error('Registration initiation error', err);
        this.errorMessage = err.message || 'An unexpected error occurred.';
        this.registrationState = 'error';
      },
    });
  }

  resetState(): void {
    this.registrationState = 'input';
    this.errorMessage = null;
    this.signupForm.reset();
    this.role = 'CANDIDATE';
  }
}