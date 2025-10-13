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
  private _user: any = null;

  @Input()
  set user(value: any) {
    this._user = value;
    console.log('HeaderComponent user (setter):', this._user);
  }
  get user(): any {
    return this._user;
  }
  @Output() openSignInModal = new EventEmitter<Event>();
  @Output() toggleMobileSidebar = new EventEmitter<void>();  
  showUserMenu: boolean = false; // New property to control user menu visibility

  private authService = inject(AuthService);
  
  ngOnInit(): void {
    console.log('HeaderComponent ngOnInit user:', this.user);
  }

  onOpenSignInModal(event: Event): void {
    this.openSignInModal.emit(event);
  }

  onToggleMobileSidebar(): void {
    this.toggleMobileSidebar.emit();
  }

  onOpenUserMenu(): void {
    console.log('onOpenUserMenu before:', this.showUserMenu);
    this.showUserMenu = !this.showUserMenu; // Toggle user menu visibility
    console.log('onOpenUserMenu after:', this.showUserMenu);
  }

  onCloseUserMenu(): void {
    console.log('onCloseUserMenu before:', this.showUserMenu);
    this.showUserMenu = false; // Close user menu
    console.log('onCloseUserMenu after:', this.showUserMenu);
  }
}
  