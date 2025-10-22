import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-filter-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule
  ],
  template: `
    <div class="p-6">
      <h2 class="text-xl font-bold mb-6">Advanced Filters</h2>
      
      <form [formGroup]="filterForm" class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <mat-form-field appearance="outline" class="w-full">
            <mat-label>Status</mat-label>
            <mat-select formControlName="status">
              <mat-option value="">All Statuses</mat-option>
              <mat-option *ngFor="let status of statusOptions" [value]="status">
                {{ status }}
              </mat-option>
            </mat-select>
          </mat-form-field>
          
          <mat-form-field appearance="outline" class="w-full">
            <mat-label>Skills</mat-label>
            <input matInput formControlName="skills" placeholder="e.g. JavaScript, React">
          </mat-form-field>
          
          <mat-form-field appearance="outline" class="w-full">
            <mat-label>Experience</mat-label>
            <mat-select formControlName="experience">
              <mat-option value="">Any Experience</mat-option>
              <mat-option value="0-1">0-1 years</mat-option>
              <mat-option value="1-3">1-3 years</mat-option>
              <mat-option value="3-5">3-5 years</mat-option>
              <mat-option value="5-10">5-10 years</mat-option>
              <mat-option value="10+">10+ years</mat-option>
            </mat-select>
          </mat-form-field>
          
          <mat-form-field appearance="outline" class="w-full">
            <mat-label>Education</mat-label>
            <mat-select formControlName="education">
              <mat-option value="">Any Education</mat-option>
              <mat-option value="high_school">High School</mat-option>
              <mat-option value="associate">Associate Degree</mat-option>
              <mat-option value="bachelor">Bachelor's Degree</mat-option>
              <mat-option value="master">Master's Degree</mat-option>
              <mat-option value="phd">PhD</mat-option>
            </mat-select>
          </mat-form-field>
          
          <mat-form-field appearance="outline" class="w-full">
            <mat-label>Location</mat-label>
            <input matInput formControlName="location" placeholder="e.g. New York, Remote">
          </mat-form-field>
          
          <mat-form-field appearance="outline" class="w-full">
            <mat-label>AI Match Score</mat-label>
            <mat-select formControlName="matchScore">
              <mat-option value="">Any Score</mat-option>
              <mat-option value="90+">90% and above</mat-option>
              <mat-option value="80+">80% and above</mat-option>
              <mat-option value="70+">70% and above</mat-option>
            </mat-select>
          </mat-form-field>
        </div>
      </form>
      
      <div class="flex justify-end gap-3 mt-8">
        <button mat-button (click)="onCancel()">Cancel</button>
        <button mat-button (click)="onClear()">Clear All</button>
        <button mat-raised-button color="primary" (click)="onApply()">Apply Filters</button>
      </div>
    </div>
  `
})
export class FilterDialogComponent {
  filterForm: FormGroup;
  statusOptions = ['NEW', 'REVIEWING', 'INTERVIEW', 'OFFER', 'REJECTED', 'HIRED', 'TECHNICAL_INTERVIEW', 'REFERENCE_CHECK', 'BACKGROUND_CHECK'];
  
  constructor(
    private dialogRef: MatDialogRef<FilterDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.filterForm = this.fb.group({
      status: [data.filterForm.status || ''],
      skills: [data.filterForm.skills || ''],
      experience: [data.filterForm.experience || ''],
      education: [data.filterForm.education || ''],
      location: [data.filterForm.location || ''],
      matchScore: [data.filterForm.matchScore || '']
    });
  }
  
  onCancel(): void {
    this.dialogRef.close();
  }
  
  onClear(): void {
    this.filterForm.reset();
  }
  
  onApply(): void {
    this.dialogRef.close(this.filterForm.value);
  }
}