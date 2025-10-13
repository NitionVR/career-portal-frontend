import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { JobPostResponse } from '../../../../api/models/job-post-response';

@Component({
  selector: 'app-job-posts-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './job-posts-list.html',
  styleUrls: ['./job-posts-list.css']
})
export class JobPostsListComponent {
  @Input() jobs: JobPostResponse[] = [];
  @Input() currentPage: number = 0;
  @Input() totalPages: number = 1;
  @Output() pageChange = new EventEmitter<number>();

  constructor() { }

  getPages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i);
  }

  goToPage(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.pageChange.emit(page);
    }
  }

  previousPage(): void {
    this.goToPage(this.currentPage - 1);
  }

  nextPage(): void {
    this.goToPage(this.currentPage + 1);
  }
}
