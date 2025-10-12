import { Component, OnInit, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../navigation/header/header';
import { SidebarComponent } from '../../navigation/sidebar/sidebar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-authenticated-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, SidebarComponent],
  templateUrl: './authenticated-layout.html',
  styleUrls: ['./authenticated-layout.css']
})
export class AuthenticatedLayoutComponent implements OnInit {
  isSidebarMinimized: boolean = false;
  isMobileSidebarOpen: boolean = false;
  isMobile: boolean = false;

  ngOnInit(): void {
    this.checkIsMobile();
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
