import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SignInComponent } from '../../shared/components/sign-in/sign-in.component';
import { HeaderComponent } from '../../shared/components/navigation/header/header';
import { JobPostsListComponent } from '../../shared/components/jobs/job-posts-list/job-posts-list';
import { JobSearchComponent } from '../../shared/components/job-search/job-search.component';
import { JobFilterComponent } from '../../shared/components/job-filter/job-filter.component';
import { JobPostResponse } from '../../api/models/job-post-response';
import { SkillDto } from '../../api/models/skill-dto';
import { JobPostControllerService } from '../../api/services/job-post-controller.service';
import { PageJobPostResponse } from '../../api/models/page-job-post-response';
import { Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule, FormsModule, SignInComponent, HeaderComponent, JobPostsListComponent, JobSearchComponent, JobFilterComponent],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  showSignInModal = false;
  searchQuery: string = '';
  jobs: JobPostResponse[] = [];
  filteredJobs: JobPostResponse[] = [];
  currentFilters: any = {};

  constructor(private jobPostService: JobPostControllerService) { }

  ngOnInit(): void {
    this.jobPostService.listJobPosts({ pageable: { page: 0, size: 20 } })
      .subscribe((page: PageJobPostResponse) => {
      console.log('API response:', page);
      const jobsWithParsedJson = (page.content || []).map(job => {
        try {
          return {
            ...job,
            skills: typeof job.skills === 'string' ? JSON.parse(job.skills) : job.skills,
            location: typeof job.location === 'string' ? JSON.parse(job.location) : job.location,
            qualifications: typeof job.qualifications === 'string' ? JSON.parse(job.qualifications) : job.qualifications,
            responsibilities: typeof job.responsibilities === 'string' ? JSON.parse(job.responsibilities) : job.responsibilities,
          };
        } catch (e) {
          console.error('Failed to parse nested job data', e, job);
          return job;
        }
      });
      this.jobs = jobsWithParsedJson;
      this.filterJobs();
    });
  }

  onSearch(query: string): void {
    this.searchQuery = query;
    this.filterJobs();
  }

  onFiltersChanged(filters: any): void {
    this.currentFilters = filters;
    this.filterJobs();
  }

  filterJobs(): void {
    console.log('Jobs before filtering:', this.jobs);
    this.filteredJobs = this.jobs.filter(job => {
      const matchesSearch = !this.searchQuery || (job.title && job.title.toLowerCase().includes(this.searchQuery.toLowerCase()));
      const matchesSkills = !(this.currentFilters.react || this.currentFilters.nodejs || this.currentFilters.typescript) ||
        (this.currentFilters.react && Array.isArray(job.skills) && job.skills.some((s: SkillDto) => s.name?.toLowerCase() === 'react')) ||
        (this.currentFilters.nodejs && Array.isArray(job.skills) && job.skills.some((s: SkillDto) => s.name?.toLowerCase() === 'node.js')) ||
        (this.currentFilters.typescript && Array.isArray(job.skills) && job.skills.some((s: SkillDto) => s.name?.toLowerCase() === 'typescript'));
      const matchesExperience = !(this.currentFilters.entry || this.currentFilters.mid || this.currentFilters.senior) ||
        (this.currentFilters.entry && job.experienceLevel?.toLowerCase().includes('entry')) ||
        (this.currentFilters.mid && job.experienceLevel?.toLowerCase().includes('mid')) ||
        (this.currentFilters.senior && job.experienceLevel?.toLowerCase().includes('senior'));
      return matchesSearch && matchesSkills && matchesExperience;
    });
    console.log('Filtered jobs:', this.filteredJobs);
  }

  openSignInModal(event: Event): void {
    event.preventDefault();
    this.showSignInModal = true;
  }

  closeSignInModal(): void {
    this.showSignInModal = false;
  }
}
