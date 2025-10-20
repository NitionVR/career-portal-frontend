import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { JobApplicationControllerService } from '../../../api/services';
import { ApplicationDetailsDto } from '../../../api/models';

@Component({
  selector: 'app-employer-application-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employer-application-details.component.html',
  styleUrls: ['./employer-application-details.component.css']
})
export class EmployerApplicationDetailsComponent implements OnInit {
  application: ApplicationDetailsDto | null = null;
  isLoading = true;

  private route = inject(ActivatedRoute);
  private applicationService = inject(JobApplicationControllerService);

  constructor() { }

  ngOnInit(): void {
    const applicationId = this.route.snapshot.paramMap.get('id');
    if (applicationId) {
      this.loadApplicationDetails(applicationId);
    }
  }

  loadApplicationDetails(id: string): void {
    this.isLoading = true;
    this.applicationService.getApplicationDetails({ id }).subscribe({
      next: (data) => {
        this.application = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load application details', err);
        this.isLoading = false;
      }
    });
  }
}
