import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SignInComponent } from '../../shared/components/sign-in/sign-in.component';
import { HeaderComponent } from '../../shared/components/navigation/header/header';
import { JobPostsListComponent } from '../../shared/components/jobs/job-posts-list/job-posts-list';
import { JobSearchComponent } from '../../shared/components/job-search/job-search.component';
import { JobFilterComponent } from '../../shared/components/job-filter/job-filter.component';
import { JobPostResponse } from '../../api/models/job-post-response';
import { JobPostControllerService } from '../../api/services/job-post-controller.service';
import { PageJobPostResponse } from '../../api/models/page-job-post-response';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule, FormsModule, SignInComponent, HeaderComponent, JobPostsListComponent, JobSearchComponent, JobFilterComponent],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  showSignInModal = false;
  searchQuery: string = '';
  
  paginatedJobs: JobPostResponse[] = [];

  currentFilters: any = {};
  currentPage: number = 0;
  pageSize: number = 10;
  totalPages: number = 1;

  constructor(private jobPostService: JobPostControllerService) { }

  ngOnInit(): void {
    this.fetchJobs();
  }

  fetchJobs(): void {
    const experienceLevels = Object.keys(this.currentFilters).filter(k => this.currentFilters[k] && ['entry', 'mid', 'senior'].includes(k));
    const jobTypes = Object.keys(this.currentFilters).filter(k => this.currentFilters[k] && ['fullTime', 'partTime', 'contract'].includes(k));
    const workTypes = Object.keys(this.currentFilters).filter(k => this.currentFilters[k] && ['remote', 'hybrid', 'onsite'].includes(k));

    this.jobPostService.listJobPosts({
      pageable: { page: this.currentPage, size: this.pageSize },
      search: this.searchQuery,
      skillSearch: this.currentFilters.skillSearch,
      experienceLevels: experienceLevels.join(','),
      jobTypes: jobTypes.join(','),
      workTypes: workTypes.join(',')
    } as any).subscribe({
      next: (page: PageJobPostResponse) => {
        this.paginatedJobs = page.content || [];
        this.totalPages = page.totalPages || 1;
        this.currentPage = page.number || 0;
      },
      error: (err) => {
        console.error('Error fetching jobs', err);
      }
    });
  }

  onSearch(query: string): void {
    this.searchQuery = query;
    this.currentPage = 0; // Reset to first page
    this.fetchJobs();
  }

  onFiltersChanged(filters: any): void {
    this.currentFilters = filters;
    this.currentPage = 0; // Reset to first page
    this.fetchJobs();
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.fetchJobs();
  }

  openSignInModal(event: Event): void {
    event.preventDefault();
    this.showSignInModal = true;
  }

  closeSignInModal(): void {
    this.showSignInModal = false;
  }
}
