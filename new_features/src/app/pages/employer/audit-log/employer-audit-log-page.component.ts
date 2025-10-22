import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JobPostControllerService } from '../../../api/services/job-post-controller.service';
import { PageJobPostResponse } from '../../../api/models/page-job-post-response';
import { StateAuditResponse } from '../../../api/models/state-audit-response';

@Component({
  selector: 'app-employer-audit-log-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employer-audit-log-page.component.html'
})
export class EmployerAuditLogPageComponent implements OnInit {
  private jobPostService = inject(JobPostControllerService);

  jobPosts: PageJobPostResponse | null = null;
  selectedJobPostId: string | null = null;
  isLoadingPosts = false;
  isLoadingAudit = false;
  postsError: string | null = null;
  auditError: string | null = null;
  audits: StateAuditResponse[] = [];

  page = 0;
  size = 10;

  ngOnInit(): void {
    this.loadJobPosts();
  }

  loadJobPosts(): void {
    this.isLoadingPosts = true;
    this.postsError = null;
    this.jobPostService.listMyJobPosts({ pageable: { page: this.page, size: this.size } })
      .subscribe({
        next: (resp) => {
          this.jobPosts = resp;
          this.isLoadingPosts = false;
        },
        error: (err) => {
          console.error('Failed to load job posts', err);
          this.postsError = 'Failed to load job posts.';
          this.isLoadingPosts = false;
        }
      });
  }

  selectPost(id: string): void {
    this.selectedJobPostId = id;
    this.loadAudit();
  }

  loadAudit(): void {
    if (!this.selectedJobPostId) return;
    this.isLoadingAudit = true;
    this.auditError = null;
    this.jobPostService.getStateHistory({ id: this.selectedJobPostId })
      .subscribe({
        next: (audits) => {
          this.audits = audits || [];
          this.isLoadingAudit = false;
        },
        error: (err) => {
          console.error('Failed to load audit history', err);
          this.auditError = 'Failed to load audit history.';
          this.isLoadingAudit = false;
        }
      });
  }

  nextPostsPage(): void {
    if (this.jobPosts?.last) return;
    this.page++;
    this.loadJobPosts();
  }

  prevPostsPage(): void {
    if (this.page === 0) return;
    this.page--;
    this.loadJobPosts();
  }
}