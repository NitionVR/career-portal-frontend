import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { JobApplicationControllerService } from '../../../api/services/job-application-controller.service';
import { ApplicationDetailsDto } from '../../../api/models/application-details-dto';

@Component({
  selector: 'app-application-details-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './application-details-page.component.html',
  styleUrls: ['./application-details-page.component.css']
})
export class ApplicationDetailsPageComponent implements OnInit {

  application: ApplicationDetailsDto | undefined;
  isLoading: boolean = false;

  constructor(private route: ActivatedRoute, private jobApplicationService: JobApplicationControllerService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.route.paramMap.subscribe({
      next: params => {
        const appId = params.get('id');
        if (appId) {
          this.jobApplicationService.getApplicationDetails({ id: appId }).subscribe({
            next: app => {
              this.application = app;
              this.isLoading = false;
            },
            error: err => {
              console.error('Error fetching application details', err);
              this.isLoading = false;
            }
          });
        } else {
          this.isLoading = false;
        }
      },
      error: err => {
        console.error('Error getting route params', err);
        this.isLoading = false;
      }
    });
  }
}
