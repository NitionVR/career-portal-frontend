import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { JobApplicationControllerService } from '../../../api/services';
import { EmployerApplicationSummaryDto, PageEmployerApplicationSummaryDto } from '../../../api/models';

@Component({
  selector: 'app-view-applicants',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './view-applicants.component.html',
  styleUrls: ['./view-applicants.component.css']
})
export class ViewApplicantsComponent implements OnInit {
  applicants: EmployerApplicationSummaryDto[] = [];
  isLoading = true;
  jobId: string | null = null;
  currentPage = 0;
  pageSize = 10;

  private route = inject(ActivatedRoute);
  private applicationService = inject(JobApplicationControllerService);

  constructor() { }

  ngOnInit(): void {
    this.jobId = this.route.snapshot.paramMap.get('id');
    if (this.jobId) {
      this.loadApplicants();
    }
  }

  loadApplicants(): void {
    this.isLoading = true;
    this.applicationService.getApplicationsForJob({
      jobId: this.jobId!,
      pageable: { page: this.currentPage, size: this.pageSize }
    }).subscribe({
      next: (page: PageEmployerApplicationSummaryDto) => {
        this.applicants = page.content || [];
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load applicants', err);
        this.isLoading = false;
      }
    });
  }
}
