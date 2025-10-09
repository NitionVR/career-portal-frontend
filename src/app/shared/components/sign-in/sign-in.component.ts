import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth'; // Corrected path

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  @Output() closeModal = new EventEmitter<void>();
  email: string = '';
  rememberMe: boolean = false;
  modalState: 'input' | 'sent' | 'verifying' | 'error' = 'input';
  errorMessage: string | null = null;

  private authService = inject(AuthService);

  onSubmit(form: NgForm): void {
    if (form.valid) {
      this.authService.login(this.email).subscribe({
        next: (response: string) => {
          this.modalState = 'sent';
          // Optionally, display a message from the response
          console.log(response); // Response should be a string message
        },
        error: (err: any) => {
          console.error(err);
          this.errorMessage = 'Login failed: ' + (err.error?.message || err.message);
          this.modalState = 'error';
        },
      });
    }
  }

  resetState(): void {
    this.modalState = 'input';
    this.errorMessage = null;
    this.email = '';
    this.rememberMe = false;
  }
}
