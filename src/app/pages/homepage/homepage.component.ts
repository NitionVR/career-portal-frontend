import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SignInComponent } from '../../shared/components/sign-in/sign-in.component';
import { HeaderComponent } from '../../shared/components/navigation/header/header';
import { JobPostsListComponent } from '../../shared/components/jobs/job-posts-list/job-posts-list';
import { FilterComponent } from '../../shared/components/filters/filter.component';
import { MOCK_JOBS } from '../../shared/data/mock-jobs';
import { JobPostResponse } from '../../api/models/job-post-response';
import { SkillDto } from '../../api/models/skill-dto';
import { FilterService } from '../../core/services/filter.service';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule, FormsModule, SignInComponent, HeaderComponent, JobPostsListComponent, FilterComponent],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  showSignInModal = false;
  searchQuery: string = '';
  jobs: JobPostResponse[] = MOCK_JOBS;
  filteredJobs: JobPostResponse[] = [];
  currentFilters: any = {};

  constructor(private filterService: FilterService) { }

  ngOnInit(): void {
    this.filterService.filters$.subscribe(filters => {
      this.currentFilters = filters;
      this.filterJobs();
    });
    this.filterJobs();
  }

  onSearchChange(event: any): void {
    this.filterJobs();
  }

  findJobs(): void {
    this.filterJobs();
  }

  onFiltersApplied(filters: any): void {
    this.currentFilters = filters;
    this.filterJobs();
  }

  filterJobs(): void {
    this.filteredJobs = this.jobs.filter(job => {
      const matchesSearch = !this.searchQuery || (job.title && job.title.toLowerCase().includes(this.searchQuery.toLowerCase()));
      const matchesSkills = !(this.currentFilters.react || this.currentFilters.nodejs || this.currentFilters.typescript) ||
        (this.currentFilters.react && job.skills?.some((s: SkillDto) => s.name?.toLowerCase() === 'react')) ||
        (this.currentFilters.nodejs && job.skills?.some((s: SkillDto) => s.name?.toLowerCase() === 'node.js')) ||
        (this.currentFilters.typescript && job.skills?.some((s: SkillDto) => s.name?.toLowerCase() === 'typescript'));
      const matchesExperience = !(this.currentFilters.entry || this.currentFilters.mid || this.currentFilters.senior) ||
        (this.currentFilters.entry && job.experienceLevel?.toLowerCase().includes('entry')) ||
        (this.currentFilters.mid && job.experienceLevel?.toLowerCase().includes('mid')) ||
        (this.currentFilters.senior && job.experienceLevel?.toLowerCase().includes('senior'));
      return matchesSearch && matchesSkills && matchesExperience;
    });
  }

  openSignInModal(event: Event): void {
    event.preventDefault();
    this.showSignInModal = true;
  }

  closeSignInModal(): void {
    this.showSignInModal = false;
  }
}