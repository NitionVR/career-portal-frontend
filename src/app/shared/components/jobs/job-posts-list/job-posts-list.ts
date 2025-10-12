import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { JobPostResponse } from '../../../../api/models/job-post-response';
import { MOCK_JOBS } from '../../../../shared/data/mock-jobs';

@Component({
  selector: 'app-job-posts-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './job-posts-list.html',
  styleUrls: ['./job-posts-list.css']
})
export class JobPostsListComponent implements OnInit {
  @Input() jobs: JobPostResponse[] = [];

  constructor() { }

  ngOnInit(): void {
    if (!this.jobs || this.jobs.length === 0) {
      this.jobs = MOCK_JOBS;
    }
  }
}
