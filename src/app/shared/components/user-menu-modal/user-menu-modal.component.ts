import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth';

@Component({
  selector: 'app-user-menu-modal',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './user-menu-modal.component.html',
  styleUrls: ['./user-menu-modal.component.css']
})
export class UserMenuModalComponent {
  @Input() user: any;
  @Output() closeModal = new EventEmitter<void>();

  constructor(private authService: AuthService) { }

  onLogout(): void {
    this.authService.logout();
    this.closeModal.emit();
  }

  onClose(): void {
    this.closeModal.emit();
  }
}
