import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { CommonModule } from '@angular/common';

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

  async register() {
    if (this.registerForm.invalid) {
      return;
    }

    this.isSubmitting = true;
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Registering user:', this.registerForm.value);
    this.isSubmitting = false;
    // Redirect to a success page or login page
  }
}