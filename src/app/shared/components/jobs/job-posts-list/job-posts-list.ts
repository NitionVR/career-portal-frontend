import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JobPostResponse } from '../../../../api/models/job-post-response';
import { MOCK_JOBS } from '../../../../shared/data/mock-jobs';
import { SkillDto } from '../../../../api/models/skill-dto';

@Component({
  selector: 'app-job-posts-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './job-posts-list.html',
  styleUrls: ['./job-posts-list.css']
})
export class JobPostsListComponent implements OnInit {
  @Input() jobs: JobPostResponse[] = [];
  @Input() showSearchBar: boolean = false;
  @Input() showFilters: boolean = false;

  filteredJobs: JobPostResponse[] = [];
  searchQuery: string = '';
  filters: any = {
    react: false,
    nodejs: false,
    typescript: false,
    entry: false,
    mid: false,
    senior: false
  };

  constructor() { }

  ngOnInit(): void {
    if (!this.jobs || this.jobs.length === 0) {
      this.jobs = MOCK_JOBS;
    }
    this.filterJobs();
  }

  filterJobs(): void {
    this.filteredJobs = this.jobs.filter(job => {
      const matchesSearch = !this.searchQuery || (job.title && job.title.toLowerCase().includes(this.searchQuery.toLowerCase()));
      const matchesSkills = !(this.filters.react || this.filters.nodejs || this.filters.typescript) ||
        (this.filters.react && job.skills?.some((s: SkillDto) => s.name?.toLowerCase() === 'react')) ||
        (this.filters.nodejs && job.skills?.some((s: SkillDto) => s.name?.toLowerCase() === 'node.js')) ||
        (this.filters.typescript && job.skills?.some((s: SkillDto) => s.name?.toLowerCase() === 'typescript'));
      const matchesExperience = !(this.filters.entry || this.filters.mid || this.filters.senior) ||
        (this.filters.entry && job.experienceLevel?.toLowerCase().includes('entry')) ||
        (this.filters.mid && job.experienceLevel?.toLowerCase().includes('mid')) ||
        (this.filters.senior && job.experienceLevel?.toLowerCase().includes('senior'));
      return matchesSearch && matchesSkills && matchesExperience;
    });
  }

  clearFilters(): void {
    Object.keys(this.filters).forEach(key => this.filters[key] = false);
    this.filterJobs();
  }

  applyFilters(): void {
    this.filterJobs();
  }
}