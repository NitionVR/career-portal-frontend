import { Component, OnInit, HostListener, inject, OnDestroy } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { HeaderComponent } from '../../navigation/header/header';
import { SidebarComponent } from '../../navigation/sidebar/sidebar';
import { EmployerSidebarComponent } from '../../navigation/employer-sidebar/employer-sidebar.component';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../core/services/auth';
import { filter, Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-authenticated-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, SidebarComponent, EmployerSidebarComponent],
  templateUrl: './authenticated-layout.html',
  styleUrls: ['./authenticated-layout.css']
})
export class AuthenticatedLayoutComponent implements OnInit, OnDestroy {
  isSidebarMinimized: boolean = false;
  isMobileSidebarOpen: boolean = false;
  isMobile: boolean = false;
  isLoggedIn$: Observable<boolean>;
  user$: Observable<any | null>;

  get userRole(): string | null {
    // This is a synchronous way to get the role for the template's *ngIf
    return this.authService.getCurrentUser()?.role ?? null;
  }

  private authService = inject(AuthService);
  private router = inject(Router);
  private routerSubscription: Subscription | undefined;

  constructor() {
    this.isLoggedIn$ = this.authService.isAuthenticated$;
    this.user$ = this.authService.currentUser$;
  }

  ngOnInit(): void {
    this.checkIsMobile();
  }

  ngOnDestroy(): void {
    this.routerSubscription?.unsubscribe();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.checkIsMobile();
  }

  private checkIsMobile(): void {
    this.isMobile = window.innerWidth < 768; // Tailwind's 'md' breakpoint is 768px
    if (this.isMobile) {
      this.isMobileSidebarOpen = false; // Ensure sidebar is closed on mobile by default
    } else {
      this.isMobileSidebarOpen = false; // Close sidebar if resizing to desktop
    }
  }

  onMinimizedStateChange(isMinimized: boolean): void {
    this.isSidebarMinimized = isMinimized;
  }

  onToggleMobileSidebar(): void {
    this.isMobileSidebarOpen = !this.isMobileSidebarOpen;
  }

  onCloseMobileSidebar(): void {
    this.isMobileSidebarOpen = false;
  }
}
