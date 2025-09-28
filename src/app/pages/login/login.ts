import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, Mail, ArrowRight, CheckCircle } from 'lucide-angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    LucideAngularModule,
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginPage {
  isSubmitted = false;
  isSubmitting = false;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  get email() {
    return this.loginForm.get('email');
  }

  async sendMagicLink() {
    if (this.loginForm.invalid) {
      return;
    }

    this.isSubmitting = true;
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Sending magic link to:', this.loginForm.value.email);
    this.isSubmitting = false;
    this.isSubmitted = true;
  }

  tryAgain() {
    this.isSubmitted = false;
    this.email?.reset();
  }
}