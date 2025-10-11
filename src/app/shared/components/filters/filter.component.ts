import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilterService } from '../../../core/services/filter.service';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  filters: any = {
    react: false,
    nodejs: false,
    typescript: false,
    entry: false,
    mid: false,
    senior: false
  };

  constructor(private filterService: FilterService) { }

  ngOnInit(): void {
    this.applyFilters(); // Apply initial filters
  }

  clearFilters(): void {
    Object.keys(this.filters).forEach(key => this.filters[key] = false);
    this.applyFilters();
  }

  applyFilters(): void {
    this.filterService.updateFilters(this.filters);
  }
}
