import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SignInComponent } from '../../shared/components/sign-in/sign-in.component';
import { HeaderComponent } from '../../shared/components/navigation/header/header';
import { JobPostsListComponent } from '../../shared/components/jobs/job-posts-list/job-posts-list';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule, FormsModule, SignInComponent, HeaderComponent, JobPostsListComponent],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  showSignInModal = false;
  searchQuery: string = '';
  filters: any = {
    react: false,
    nodejs: false,
    typescript: false,
    entry: false,
    mid: false,
    senior: false
  };
  jobs = [
    { title: 'Senior Frontend Developer', ref: '84321', location: 'San Francisco, CA (Remote)', experience: '5+ Years', salary: '$120,000 - $150,000', posted: '2 days ago', expires: 28, companyLogo: 'https://via.placeholder.com/150/FF0000/FFFFFF?text=CompanyA' },
    { title: 'Product Designer', ref: '84322', location: 'New York, NY', experience: '3-5 Years', salary: '$90,000 - $110,000', posted: '5 days ago', expires: 25, companyLogo: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=CompanyB' },
    { title: 'DevOps Engineer', ref: '84323', location: 'Austin, TX (Hybrid)', experience: '4+ Years', salary: '$115,000 - $140,000', posted: '1 week ago', expires: 21, companyLogo: 'https://via.placeholder.com/150/00FF00/FFFFFF?text=CompanyC' }
  ];
  filteredJobs = [...this.jobs];

  ngOnInit(): void {
    this.filterJobs();
  }

  onSearchChange(event: any): void {
    this.filterJobs();
  }

  findJobs(): void {
    this.filterJobs();
  }

  clearFilters(): void {
    Object.keys(this.filters).forEach(key => this.filters[key] = false);
    this.filterJobs();
  }

  applyFilters(): void {
    this.filterJobs();
  }

  filterJobs(): void {
    this.filteredJobs = this.jobs.filter(job => {
      const matchesSearch = !this.searchQuery || job.title.toLowerCase().includes(this.searchQuery.toLowerCase());
      const matchesSkills = !Object.values(this.filters).some(f => f) ||
        (this.filters.react || this.filters.nodejs || this.filters.typescript);
      const matchesExperience = !Object.values(this.filters).some(f => f) ||
        (this.filters.entry || this.filters.mid || this.filters.senior);
      return matchesSearch && matchesSkills && matchesExperience;
    });
  }

  openSignInModal(): void {
    this.showSignInModal = true;
  }

  closeSignInModal(): void {
    this.showSignInModal = false;
  }
}