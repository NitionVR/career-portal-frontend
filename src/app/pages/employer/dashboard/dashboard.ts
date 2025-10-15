import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobPostsListComponent } from '../../../shared/components/jobs/job-posts-list/job-posts-list';
import { JobPostResponse } from '../../../api/models/job-post-response';
import { JobPostControllerService } from '../../../api/services/job-post-controller.service';
import { PageJobPostResponse } from '../../../api/models/page-job-post-response';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, JobPostsListComponent, RouterLink],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class EmployerDashboardComponent implements OnInit {
  paginatedJobs: JobPostResponse[] = [];
  isLoading: boolean = false;
  currentPage: number = 0;
  pageSize: number = 10;
  totalPages: number = 1;

  constructor(private jobPostService: JobPostControllerService) { }

  ngOnInit(): void {
    this.fetchJobs();
  }

  fetchJobs(): void {
    this.isLoading = true;
    // NOTE: Using listMyJobPosts() for employer-specific jobs
    this.jobPostService.listMyJobPosts({ 
      pageable: { page: this.currentPage, size: this.pageSize, sort: ['datePosted,desc'] }
    }).subscribe({
      next: (page: PageJobPostResponse) => {
        this.paginatedJobs = page.content || [];
        this.totalPages = page.totalPages || 1;
        this.currentPage = page.number || 0;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching employer jobs', err);
        this.isLoading = false;
      }
    });
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.fetchJobs();
  }
}
