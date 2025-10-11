import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JobPostsListComponent } from '../../../shared/components/jobs/job-posts-list/job-posts-list';
import { JobSearchComponent } from '../../../shared/components/job-search/job-search.component';
import { JobFilterComponent } from '../../../shared/components/job-filter/job-filter.component';
import { MOCK_JOBS } from '../../../shared/data/mock-jobs';
import { JobPostResponse } from '../../../api/models/job-post-response';
import { SkillDto } from '../../../api/models/skill-dto';

@Component({
  selector: 'app-talent-job-list-page',
  standalone: true,
  imports: [CommonModule, FormsModule, JobPostsListComponent, JobSearchComponent, JobFilterComponent],
  templateUrl: './talent-job-list-page.component.html',
  styleUrls: ['./talent-job-list-page.component.css']
})
export class TalentJobListPageComponent implements OnInit {
  searchQuery: string = '';
  jobs: JobPostResponse[] = MOCK_JOBS;
  filteredJobs: JobPostResponse[] = [];
  currentFilters: any = {};

  constructor() { }

  ngOnInit(): void {
    this.filterJobs();
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
}
