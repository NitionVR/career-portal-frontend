import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { JobPostResponse } from '../../api/models/job-post-response';
import { HeaderComponent } from '../../shared/components/navigation/header/header';
import { SignInComponent } from '../../shared/components/sign-in/sign-in.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth';
import { JobPostControllerService } from '../../api/services/job-post-controller.service';
import { Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-job-post-details-page',
  standalone: true,
  imports: [CommonModule, HeaderComponent, SignInComponent, FormsModule],
  templateUrl: './job-post-details-page.component.html',
  styleUrls: ['./job-post-details-page.component.css']
})
export class JobPostDetailsPageComponent implements OnInit {
  job: JobPostResponse | undefined;
  showSignInModal = false;
  isLoggedIn: boolean = false;
  user: any | null = null;
  showAllSkills = false;
  readonly initialSkillsToShow = 6;

  constructor(
    private route: ActivatedRoute, 
    private authService: AuthService,
    private jobPostService: JobPostControllerService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        const jobId = params.get('id');
        if (jobId) {
          return this.jobPostService.getJobPost({ id: jobId });
        } else {
          return new Observable<JobPostResponse | undefined>(observer => observer.next(undefined));
        }
      })
    ).subscribe({
      next: (job) => {
        if (job) {
          this.job = job;
        }
      },
      error: (err) => {
        console.error('Error fetching job details', err);
      }
    });

    this.isLoggedIn = this.authService.isLoggedIn();
    this.user = this.authService.getUser();
    if (!this.user) {
        // Mock user data for development
        this.isLoggedIn = true;
        this.user = {
          name: 'Nition',
          role: 'Software Engineer',
          profileImageUrl: 'https://avatars.githubusercontent.com/u/12968861?v=4'
        };
      }
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
}
