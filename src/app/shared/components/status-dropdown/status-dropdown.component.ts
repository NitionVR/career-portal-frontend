import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobPostControllerService } from '../../../api/services';
import { SnackbarService } from '../snackbar/snackbar.service';

@Component({
  selector: 'app-status-dropdown',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './status-dropdown.component.html',
  styleUrls: ['./status-dropdown.component.css']
})
export class StatusDropdownComponent implements OnInit {
  @Input() job: any;
  availableTransitions: string[] = [];
  isOpen = false;

  private jobPostService = inject(JobPostControllerService);
  private snackbarService = inject(SnackbarService);

  ngOnInit(): void {
    this.loadTransitions();
  }

  loadTransitions(): void {
    this.jobPostService.getAvailableTransitions({ id: this.job.id }).subscribe({
      next: (transitions) => {
        this.availableTransitions = transitions;
      },
      error: (err) => {
        console.error('Failed to load transitions', err);
      }
    });
  }

  toggleDropdown(): void {
    if (this.availableTransitions.length > 0) {
      this.isOpen = !this.isOpen;
    }
  }

  changeState(newState: string): void {
    this.jobPostService.transitionState({ id: this.job.id, body: { targetStatus: newState as any } }).subscribe({
      next: (updatedJob) => {
        this.job.status = updatedJob.status; // Update the local job object
        this.snackbarService.success(`Job status updated to ${updatedJob.status}`);
        this.isOpen = false;
        this.loadTransitions(); // Refresh transitions after state change
      },
      error: (err) => {
        this.snackbarService.error('Failed to update job status.');
      }
    });
  }
}
