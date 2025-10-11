import { Component, EventEmitter, Input, Output, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../../core/services/auth';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, MatTooltipModule],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css']
})
export class SidebarComponent implements OnInit {
  @Input() isMinimized: boolean = false;
  @Output() minimizedStateChange = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
    // Initial setup if needed
  }

  toggleMinimize(): void {
    this.isMinimized = !this.isMinimized;
    this.minimizedStateChange.emit(this.isMinimized);
  }
}