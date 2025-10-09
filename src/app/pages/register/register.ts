import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class RegisterPage implements OnInit {
  signupForm: FormGroup;
  role: string = 'talent';
  registrationState: 'input' | 'sent' | 'error' = 'input';
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {}

  setRole(role: string): void {
    this.role = role;
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      const { email } = this.signupForm.value;
      const role = this.role === 'talent' ? 'CANDIDATE' : 'HIRING_MANAGER';

      this.authService.initiateRegistration(email, role).subscribe({
        next: (response) => {
          this.registrationState = 'sent';
          // Optionally, display a message from the response
          console.log(response['message']);
        },
        error: (err) => {
          console.error('Registration initiation error', err);
          this.errorMessage = 'Registration initiation failed: ' + (err.error?.message || err.message);
          this.registrationState = 'error';
        }
      });
    } else {
      this.errorMessage = 'Please fill in all required fields.';
      this.registrationState = 'error';
    }
  }

  resetState(): void {
    this.registrationState = 'input';
    this.errorMessage = null;
    this.signupForm.reset();
    this.role = 'talent'; // Reset role to default
  }
}
