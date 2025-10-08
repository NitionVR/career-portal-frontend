import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';

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

  onSubmit(form: any): void {
    if (form.valid) {
      console.log('Magic link sent to:', this.email, 'Remember Me:', this.rememberMe);
      // Add API call to send magic link here
      this.closeModal.emit();
    }
  }
}
