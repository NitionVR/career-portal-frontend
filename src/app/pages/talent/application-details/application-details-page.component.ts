import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { JobApplicationControllerService } from '../../../api/services/job-application-controller.service';
import { ApplicationDetailsDto } from '../../../api/models/application-details-dto';
import { SnackbarService } from '../../../shared/components/snackbar/snackbar.service';
import { ConfirmationDialogComponent } from '../../../shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-application-details-page',
  standalone: true,
  imports: [CommonModule, RouterLink, ConfirmationDialogComponent],
  templateUrl: './application-details-page.component.html',
  styleUrls: ['./application-details-page.component.css']
})
export class ApplicationDetailsPageComponent implements OnInit {

  application: ApplicationDetailsDto | undefined;
  isLoading: boolean = false;
  isWithdrawing = false;
  showWithdrawDialog = false;

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private jobApplicationService = inject(JobApplicationControllerService);
  private snackbarService = inject(SnackbarService);

  constructor() { }

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

  withdrawApplication(): void {
    this.showWithdrawDialog = true;
  }

  onWithdrawConfirm(feedback: any): void {
    this.showWithdrawDialog = false;
    if (feedback) {
      console.log('Withdrawal feedback received:', feedback); // For demo purposes
      this.isWithdrawing = true;
      // When backend is ready, the feedback object will be passed to the service.
      this.jobApplicationService.withdrawApplication({ id: this.application!.id! }).subscribe({
        next: () => {
          this.snackbarService.success('Application withdrawn successfully.');
          this.router.navigate(['/talent/applications']);
        },
        error: (err) => {
          this.snackbarService.error('Failed to withdraw application.');
          this.isWithdrawing = false;
        },
        complete: () => {
          this.isWithdrawing = false;
        }
      });
    }
  }
}
