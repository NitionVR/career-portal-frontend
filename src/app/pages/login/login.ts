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

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginPage {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  sendMagicLink() {
    if (this.loginForm.valid) {
      // Logic to send magic link will be implemented in a future step
      console.log('Sending magic link to:', this.loginForm.value.email);
    }
  }
}
