import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-analytics-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTabsModule,
    MatIconModule
  ],
  templateUrl: './analytics-dashboard.component.html'
})
export class AnalyticsDashboardComponent implements OnInit {
  // Mock data for the dashboard
  applicationStats = {
    total: 1248,
    new: 342,
    reviewing: 156,
    interview: 89,
    offer: 24,
    hired: 18,
    rejected: 619
  };

  // Demographics data (mock)
  genderDistribution = {
    male: 58,
    female: 37,
    nonBinary: 3,
    undisclosed: 2
  };

  // Source data (mock)
  sourcesData = {
    linkedin: 42,
    indeed: 28,
    companyWebsite: 15,
    referral: 10,
    other: 5
  };

  // Time to fill data (mock)
  timeToFillData = {
    average: 18, // days
    fastest: 7,
    slowest: 45
  };

  constructor() { }

  ngOnInit(): void {
  }
}