import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-job-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './job-filter.component.html',
  styleUrls: ['./job-filter.component.css']
})
export class JobFilterComponent implements OnInit {
  @Output() filtersChanged = new EventEmitter<any>();

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
    this.applyFilters(); // Apply initial filters
  }

  clearFilters(): void {
    Object.keys(this.filters).forEach(key => this.filters[key] = false);
    this.applyFilters();
  }

  applyFilters(): void {
    this.filtersChanged.emit(this.filters);
  }
}
