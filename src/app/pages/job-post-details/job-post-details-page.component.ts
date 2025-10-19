import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { JobPostResponse } from '../../api/models/job-post-response';
import { HeaderComponent } from '../../shared/components/navigation/header/header';
import { SignInComponent } from '../../shared/components/sign-in/sign-in.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth';
import { JobPostControllerService } from '../../api/services/job-post-controller.service';
import { JobApplicationControllerService } from '../../api/services/job-application-controller.service';
import { SnackbarService } from '../../shared/components/snackbar/snackbar.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-job-post-details-page',
  standalone: true,
  imports: [CommonModule, HeaderComponent, SignInComponent, FormsModule, RouterLink],
  templateUrl: './job-post-details-page.component.html',
  styleUrls: ['./job-post-details-page.component.css']
})
export class JobPostDetailsPageComponent implements OnInit {
  isLoggedIn$: Observable<boolean>;
  user$: Observable<any | null>;
  jobPost: JobPostResponse | null = null;
  isLoading = true;
  error: string | null = null;
  showSignInModal = false;
  showAllSkills = false;
  initialSkillsToShow = 10;
  isEmployerPreview = false;

  private route = inject(ActivatedRoute);
  private jobPostService = inject(JobPostControllerService);
  private jobApplicationService = inject(JobApplicationControllerService);
  private authService = inject(AuthService);
  private snackbarService = inject(SnackbarService);

  constructor() {
    this.isLoggedIn$ = this.authService.isAuthenticated$;
    this.user$ = this.authService.currentUser$;
  }

  ngOnInit(): void {
    this.isEmployerPreview = this.route.snapshot.queryParamMap.get('preview') === 'true';
    const jobId = this.route.snapshot.paramMap.get('id');
    if (jobId) {
      this.fetchJobPost(jobId);
    } else {
      this.error = 'No job ID provided.';
      this.isLoading = false;
    }
  }

  fetchJobPost(id: string): void {
    this.isLoading = true;
    this.jobPostService.getJobPost({ id }).subscribe({
      next: (job) => {
        this.jobPost = job;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to load job post.';
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  openSignInModal(event: Event): void {
    event.preventDefault();
    this.showSignInModal = true;
  }

  closeSignInModal(): void {
    this.showSignInModal = false;
  }

  toggleShowAllSkills(): void {
    this.showAllSkills = !this.showAllSkills;
  }

  applyToJob(): void {
    if (!this.jobPost?.id) {
      this.snackbarService.error('Cannot apply: Job ID is missing.');
      return;
    }
    this.jobApplicationService.applyForJob({ id: this.jobPost.id }).subscribe({
      next: () => {
        this.snackbarService.success('Application submitted successfully!');
        // Optionally, you could change the button state to "Applied"
      },
      error: (err) => {
        this.snackbarService.error(err.error?.message || 'Failed to submit application.');
      }
    });
  }
}
