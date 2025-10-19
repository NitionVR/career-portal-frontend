import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { JobPostControllerService } from '../../../api/services';
import { JobPostRequest } from '../../../api/models';
import { SnackbarService } from '../../../shared/components/snackbar/snackbar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-job-post-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './job-post-form.component.html',
  styleUrls: ['./job-post-form.component.css']
})
export class JobPostFormComponent implements OnInit {
  jobPostForm!: FormGroup;

  private fb = inject(FormBuilder);
  private jobPostService = inject(JobPostControllerService);
  private snackbarService = inject(SnackbarService);
  private router = inject(Router);

  constructor() { }

  ngOnInit(): void {
    this.jobPostForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', [Validators.required, Validators.minLength(50)]],
      // More fields will be added here incrementally
    });
  }

  onSubmit(status: 'DRAFT' | 'PUBLISHED'): void {
    if (this.jobPostForm.invalid && status === 'PUBLISHED') {
      this.snackbarService.error('Please fill in all required fields to publish.');
      this.jobPostForm.markAllAsTouched();
      return;
    }

    const jobPostRequest: JobPostRequest = {
      ...this.jobPostForm.value,
      status: status
    };

    this.jobPostService.createJobPost({ body: jobPostRequest }).subscribe({
      next: (newJob) => {
        this.snackbarService.success(`Job post successfully ${status === 'DRAFT' ? 'saved as draft' : 'published'}!`);
        this.router.navigate(['/employer/dashboard']);
      },
      error: (err) => {
        this.snackbarService.error(err.error?.message || 'Failed to create job post.');
      }
    });
  }

}