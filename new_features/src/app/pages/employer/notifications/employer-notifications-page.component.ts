import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationControllerService } from '../../../api/services/notification-controller.service';
import { PageNotificationResponse } from '../../../api/models/page-notification-response';
import { AuthService, User } from '../../../core/services/auth';

@Component({
  selector: 'app-employer-notifications-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employer-notifications-page.component.html'
})
export class EmployerNotificationsPageComponent implements OnInit {
  private notificationsService = inject(NotificationControllerService);
  private authService = inject(AuthService);

  user: User | null = null;
  isLoading = false;
  errorMessage: string | null = null;

  notifications: PageNotificationResponse | null = null;
  page = 0;
  size = 10;
  unreadCount = 0;

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
    if (!this.user?.id) {
      this.errorMessage = 'No authenticated user.';
      return;
    }
    this.loadNotifications();
    this.refreshUnreadCount();
  }

  loadNotifications(): void {
    if (!this.user?.id) return;
    this.isLoading = true;
    this.errorMessage = null;
    this.notificationsService.getUserNotifications({ userId: this.user.id, pageable: { page: this.page, size: this.size } })
      .subscribe({
        next: (resp) => {
          this.notifications = resp;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Failed to fetch notifications', err);
          this.errorMessage = 'Failed to fetch notifications.';
          this.isLoading = false;
        }
      });
  }

  refreshUnreadCount(): void {
    if (!this.user?.id) return;
    this.notificationsService.getUnreadCount({ userId: this.user.id })
      .subscribe({
        next: (count) => this.unreadCount = count || 0,
        error: (err) => {
          console.warn('Failed to fetch unread count', err);
          this.unreadCount = 0;
        }
      });
  }

  markAllAsRead(): void {
    if (!this.user?.id) return;
    this.notificationsService.markAllAsRead({ userId: this.user.id }).subscribe({
      next: () => {
        this.refreshUnreadCount();
        this.loadNotifications();
      },
      error: (err) => console.error('Failed to mark all as read', err)
    });
  }

  markAsRead(notificationId?: number): void {
    if (!notificationId) return;
    this.notificationsService.markAsRead({ notificationId }).subscribe({
      next: () => {
        this.refreshUnreadCount();
        this.loadNotifications();
      },
      error: (err) => console.error('Failed to mark as read', err)
    });
  }

  nextPage(): void {
    if (this.notifications?.last) return;
    this.page++;
    this.loadNotifications();
  }

  prevPage(): void {
    if (this.page === 0) return;
    this.page--;
    this.loadNotifications();
  }
}