import { Component, EventEmitter, Input, Output, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/auth';
import { UserMenuModalComponent } from '../../user-menu-modal/user-menu-modal.component'; // Import the modal component

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, UserMenuModalComponent], // Add modal to imports
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class HeaderComponent implements OnInit {
  @Input() isLoggedIn: boolean = false;
  @Input() user: any | null = null;

  @Output() openSignInModal = new EventEmitter<Event>();
  @Output() toggleMobileSidebar = new EventEmitter<void>();
  showUserMenu: boolean = false;

  private authService = inject(AuthService);

  get fullName(): string {
    if (!this.user) {
      return 'User';
    }
    return `${this.user.firstName || ''} ${this.user.lastName || ''}`.trim();
  }

  get userInitials(): string {
    if (!this.user) {
      return '?';
    }
    const firstNameInitial = this.user.firstName ? this.user.firstName[0] : '';
    const lastNameInitial = this.user.lastName ? this.user.lastName[0] : '';
    return `${firstNameInitial}${lastNameInitial}`.toUpperCase();
  }

  ngOnInit(): void {
  }

  onOpenSignInModal(event: Event): void {
    this.openSignInModal.emit(event);
  }

  onToggleMobileSidebar(): void {
    this.toggleMobileSidebar.emit();
  }

  onOpenUserMenu(): void {
    this.showUserMenu = !this.showUserMenu; // Toggle user menu visibility
  }

  onCloseUserMenu(): void {
    this.showUserMenu = false; // Close user menu
  }
}
  