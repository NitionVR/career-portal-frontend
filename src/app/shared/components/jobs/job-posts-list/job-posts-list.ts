import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-job-posts-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './job-posts-list.html',
  styleUrls: ['./job-posts-list.css']
})
export class JobPostsListComponent {
  @Input() jobs: any[] = []; // Replace 'any' with a proper job interface
}