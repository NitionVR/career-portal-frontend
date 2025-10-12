import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { JobPostResponse } from '../../api/models/job-post-response';
import { MOCK_JOBS } from '../../shared/data/mock-jobs';
import { HeaderComponent } from '../../shared/components/navigation/header/header';
import { SignInComponent } from '../../shared/components/sign-in/sign-in.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth';

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

  constructor(private route: ActivatedRoute, private authService: AuthService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const jobId = params.get('id');
      if (jobId) {
        this.job = MOCK_JOBS.find(job => job.id === jobId);
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
}
