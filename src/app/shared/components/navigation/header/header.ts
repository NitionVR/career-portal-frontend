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
  }
  