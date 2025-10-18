import { Component, EventEmitter, Input, Output, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../../core/services/auth';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-employer-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, MatTooltipModule],
  templateUrl: './employer-sidebar.component.html',
  styleUrls: ['./employer-sidebar.component.css']
})
export class EmployerSidebarComponent implements OnInit {
  @Input() isMinimized: boolean = false;
  @Input() isMobile: boolean = false; // New input for mobile state
  @Input() context: 'talent-dashboard' | 'talent-profile' = 'talent-dashboard'; // New input for sidebar context
  @Output() minimizedStateChange = new EventEmitter<boolean>();
  @Output() closeMobileSidebar = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
    // Initial setup if needed
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
}