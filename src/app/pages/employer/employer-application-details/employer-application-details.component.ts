import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { JobApplicationControllerService, WorkflowControllerService } from '../../../api/services';
import { ApplicationDetailsDto } from '../../../api/models';
import { SnackbarService } from '../../../shared/components/snackbar/snackbar.service';
import { StateTransitionModalComponent } from '../../../shared/components/state-transition-modal/state-transition-modal.component';

@Component({
  selector: 'app-employer-application-details',
  standalone: true,
  imports: [CommonModule, StateTransitionModalComponent],
  templateUrl: './employer-application-details.component.html',
  styleUrls: ['./employer-application-details.component.css']
})
export class EmployerApplicationDetailsComponent implements OnInit {
  application: ApplicationDetailsDto | null = null;
  isLoading = true;
  isAdvanceModalVisible = false;
  possibleNextStates: string[] = ['INTERVIEW', 'OFFER']; // Placeholder

  private route = inject(ActivatedRoute);
  private applicationService = inject(JobApplicationControllerService);
  private workflowController = inject(WorkflowControllerService);
  private snackbarService = inject(SnackbarService);

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
      error: (err: any) => {
        console.error('Failed to load application details', err);
        this.isLoading = false;
      }
    });
  }

  rejectApplication(): void {
    if (!this.application?.id) return;

    this.applicationService.transitionApplicationStatus({ applicationId: this.application.id, body: { targetStatus: 'REJECTED' } }).subscribe({
      next: () => {
        this.snackbarService.success('Application has been rejected.');
        this.loadApplicationDetails(this.application!.id!);      },
      error: (err: any) => {
        this.snackbarService.error(err.error?.message || 'Failed to reject application.');
      }
    });
  }

  openAdvanceModal(): void {
    // In a real app, you would fetch these from the backend
    // this.workflowController.getPossibleTransitions({ entityId: this.application.id }).subscribe(states => {
    //   this.possibleNextStates = states;
    //   this.isAdvanceModalVisible = true;
    // });
    this.isAdvanceModalVisible = true;
  }

  handleStateChange(newState: any): void {
    if (!this.application?.id) return;

    this.applicationService.transitionApplicationStatus({ applicationId: this.application.id, body: { targetStatus: newState } }).subscribe({
      next: () => {
        this.snackbarService.success(`Application advanced to ${newState}.`);
        this.loadApplicationDetails(this.application!.id!);
        this.isAdvanceModalVisible = false;
      },
      error: (err: any) => {
        this.snackbarService.error(err.error?.message || 'Failed to advance application.');
      }
    });
  }
}
