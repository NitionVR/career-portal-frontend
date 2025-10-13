import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { JobApplicationControllerService } from '../../../api/services/job-application-controller.service';
import { ApplicationSummaryDto } from '../../../api/models/application-summary-dto';
import { PageApplicationSummaryDto } from '../../../api/models/page-application-summary-dto';

@Component({
  selector: 'app-my-applications-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './my-applications-page.component.html',
  styleUrls: ['./my-applications-page.component.css']
})
export class MyApplicationsPageComponent implements OnInit {

  paginatedApplications: ApplicationSummaryDto[] = [];

  searchQuery: string = '';
  currentSort: string = 'date';

  currentPage: number = 0;
  pageSize: number = 5;
  totalPages: number = 1;
  isLoading: boolean = false;

  constructor(private jobApplicationService: JobApplicationControllerService) { }

  ngOnInit(): void {
    this.fetchApplications();
  }

  fetchApplications(): void {
    this.isLoading = true;
    let sortParam: string[] = [];
    if (this.currentSort === 'date') {
      sortParam = ['applicationDate,desc'];
    } else if (this.currentSort === 'company') {
      sortParam = ['job.company,asc'];
    } else if (this.currentSort === 'status') {
      sortParam = ['status,asc'];
    }

    this.jobApplicationService.getMyApplications({
      pageable: { page: this.currentPage, size: this.pageSize, sort: sortParam },
      search: this.searchQuery
    }).subscribe({
      next: (page: PageApplicationSummaryDto) => {
        this.paginatedApplications = page.content || [];
        this.totalPages = page.totalPages || 1;
        this.currentPage = page.number || 0;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching applications', err);
        this.isLoading = false;
      }
    });
  }

  onSearch(event: Event): void {
    const query = (event.target as HTMLInputElement).value;
    this.searchQuery = query;
    this.currentPage = 0;
    this.fetchApplications();
  }

  onSortChange(event: Event): void {
    const sortValue = (event.target as HTMLSelectElement).value;
    this.currentSort = sortValue;
    this.currentPage = 0;
    this.fetchApplications();
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.fetchApplications();
  }

  // Helper methods for pagination UI
  getPages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i);
  }

  goToPage(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.onPageChange(page);
    }
  }

  previousPage(): void {
    this.goToPage(this.currentPage - 1);
  }
  
  nextPage(): void {
    this.goToPage(this.currentPage + 1);
  }


}
