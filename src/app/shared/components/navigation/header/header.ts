import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
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
export class HeaderComponent {
  @Input() isLoggedIn: boolean = false;
  @Input() user: any = null; // Replace 'any' with a proper user interface
  @Output() openSignInModal = new EventEmitter<Event>();

  private authService = inject(AuthService);

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    // Fetch user data if logged in
    // this.user = this.authService.getCurrentUser(); // Assuming such a method exists
  }
}
