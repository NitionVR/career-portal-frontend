import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-job-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './job-filter.component.html',
  styleUrls: ['./job-filter.component.css']
})
export class JobFilterComponent implements OnInit, OnDestroy {
  @Output() filtersChanged = new EventEmitter<any>();

  filters: any = {
    skillSearch: '',
    entry: false,
    mid: false,
    senior: false,
    fullTime: false,
    partTime: false,
    contract: false,
    hybrid: false,
    remote: false,
    onsite: false
  };

  private skillSearch$ = new Subject<string>();

  constructor() { }

  ngOnInit(): void {
    this.applyFilters(); // Apply initial filters

    this.skillSearch$.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(() => {
      this.applyFilters();
    });
  }

  ngOnDestroy(): void {
    this.skillSearch$.unsubscribe();
  }

  onFilterChange(): void {
    this.applyFilters();
  }

  onSkillSearchChange(value: string): void {
    this.filters.skillSearch = value;
    this.skillSearch$.next(value);
  }

  clearFilters(): void {
    Object.keys(this.filters).forEach(key => {
      this.filters[key] = typeof this.filters[key] === 'boolean' ? false : '';
    });
    this.applyFilters();
  }

  applyFilters(): void {
    this.filtersChanged.emit(this.filters);
  }
}
