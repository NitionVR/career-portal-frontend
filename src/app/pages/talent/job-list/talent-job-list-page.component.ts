import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JobPostsListComponent } from '../../../shared/components/jobs/job-posts-list/job-posts-list';
import { JobSearchComponent } from '../../../shared/components/job-search/job-search.component';
import { JobFilterComponent } from '../../../shared/components/job-filter/job-filter.component';
import { JobPostResponse } from '../../../api/models/job-post-response';
import { JobPostControllerService } from '../../../api/services/job-post-controller.service';
import { PageJobPostResponse } from '../../../api/models/page-job-post-response';

@Component({
  selector: 'app-talent-job-list-page',
  standalone: true,
  imports: [CommonModule, FormsModule, JobPostsListComponent, JobSearchComponent, JobFilterComponent],
  templateUrl: './talent-job-list-page.component.html',
  styleUrls: ['./talent-job-list-page.component.css']
})
export class TalentJobListPageComponent implements OnInit {
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
      experienceLevels: experienceLevels,
      jobTypes: jobTypes,
      workTypes: workTypes
    }).subscribe((page: PageJobPostResponse) => {
      this.paginatedJobs = page.content || [];
      this.totalPages = page.totalPages || 1;
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
}
