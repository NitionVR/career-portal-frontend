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
          alert(response['message'] || 'Registration link sent successfully. Please check your email.');
          this.router.navigate(['/']); // Redirect to homepage
        },
        error: (err) => {
          alert('Registration initiation failed: ' + (err.error?.message || err.message));
          console.error('Registration initiation error', err);
        }
      });
    } else {
      alert('Please fill in all required fields.');
    }
  }
}