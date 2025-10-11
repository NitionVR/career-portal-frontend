import { Component, EventEmitter, Input, Output, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/auth';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class HeaderComponent implements OnInit {
  @Input() isLoggedIn: boolean = false;
  @Input() user: any = null; // Replace 'any' with a proper user interface
  @Output() openSignInModal = new EventEmitter<Event>();

  private authService = inject(AuthService);

  ngOnInit(): void {
    // For debugging purposes, log the input value
    console.log('HeaderComponent isLoggedIn (from input):', this.isLoggedIn);

    // This logic should eventually come from AuthService
    // this.isLoggedIn = this.authService.isLoggedIn();
    // Fetch user data if logged in
    // this.user = this.authService.getCurrentUser(); // Assuming such a method exists
  }

  onOpenSignInModal(event: Event): void {
    this.openSignInModal.emit(event);
  }
}