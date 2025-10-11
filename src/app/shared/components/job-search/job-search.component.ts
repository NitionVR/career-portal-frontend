import { Component, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-job-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './job-search.component.html',
  styleUrls: ['./job-search.component.css']
})
export class JobSearchComponent {
  @Input() initialSearchQuery: string = '';
  @Output() search = new EventEmitter<string>();

  searchQuery: string = '';

  ngOnInit(): void {
    this.searchQuery = this.initialSearchQuery;
  }

  onSearch(): void {
    this.search.emit(this.searchQuery);
  }
}
