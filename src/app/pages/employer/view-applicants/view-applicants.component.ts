import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { JobApplicationControllerService } from '../../../api/services';
import { ApplicationSummaryDto } from '../../../api/models';
import { PageApplicationSummaryDto } from '../../../api/models';

@Component({
  selector: 'app-view-applicants',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './view-applicants.component.html',
  styleUrls: ['./view-applicants.component.css']
})
export class ViewApplicantsComponent implements OnInit {
  applicants: ApplicationSummaryDto[] = [];
  isLoading = true;
  jobId: string | null = null;

  private route = inject(ActivatedRoute);
  private applicationService = inject(JobApplicationControllerService);

  constructor() { }

  ngOnInit(): void {
    this.jobId = this.route.snapshot.paramMap.get('id');
    // if (this.jobId) {
    //   this.loadApplicants();
    // }
  }

  /*
  loadApplicants(): void {
    this.isLoading = true;
    // Assuming a method like 'getApplicationsForJob' exists.
    // We will need to verify the exact method name from the generated client.
    this.applicationService.getApplicationsForJob({ jobId: this.jobId! }).subscribe({
      next: (page: PageApplicationSummaryDto) => {
        this.applicants = page.content || [];
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load applicants', err);
        this.isLoading = false;
      }
    });
  }
  */
}
