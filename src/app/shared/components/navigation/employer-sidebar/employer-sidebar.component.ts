import { Component, EventEmitter, Input, Output, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../../core/services/auth';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NotificationControllerService } from '../../../../api/services/notification-controller.service';

@Component({
  selector: 'app-employer-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, MatTooltipModule],
  templateUrl: './employer-sidebar.component.html',
  styleUrls: ['./employer-sidebar.component.css']
})
export class EmployerSidebarComponent implements OnInit, OnDestroy {
  @Input() isMinimized: boolean = false;
  @Input() isMobile: boolean = false; // New input for mobile state
  @Input() context: 'talent-dashboard' | 'talent-profile' = 'talent-dashboard'; // New input for sidebar context
  @Output() minimizedStateChange = new EventEmitter<boolean>();
  @Output() closeMobileSidebar = new EventEmitter<void>();

  private authService = inject(AuthService);
  private notificationsService = inject(NotificationControllerService);
  private router = inject(Router);

  private routerSubscription?: any;
  private refreshIntervalId?: any;

  unreadCount = 0;

  constructor() { }

  ngOnInit(): void {
    this.refreshUnreadCount();
    this.routerSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.refreshUnreadCount();
      }
    });
    this.refreshIntervalId = setInterval(() => this.refreshUnreadCount(), 60000);
  }

  refreshUnreadCount(): void {
    const user = this.authService.getCurrentUser();
    if (!user?.id) return;
    this.notificationsService.getUnreadCount({ userId: user.id }).subscribe({
      next: (count) => this.unreadCount = count || 0,
      error: () => this.unreadCount = 0
    });
  }

  toggleMinimize(): void {
    this.isMinimized = !this.isMinimized;
    this.minimizedStateChange.emit(this.isMinimized);
  }

  onNavLinkClick(): void {
    if (this.isMobile) { // Assuming isMobile is available or passed as input
      this.closeMobileSidebar.emit();
    }
  }

  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
    if (this.refreshIntervalId) {
      clearInterval(this.refreshIntervalId);
    }
  }
}