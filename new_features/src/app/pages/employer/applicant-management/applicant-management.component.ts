import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatBadgeModule } from '@angular/material/badge';

import { JobApplicationControllerService, WorkflowControllerService } from '../../../api/services';
import { ApplicationDetailsDto } from '../../../api/models';
import { SnackbarService } from '../../../shared/components/snackbar/snackbar.service';
import { StateTransitionModalComponent } from '../../../shared/components/state-transition-modal/state-transition-modal.component';
import { ApplicantManagementService } from './applicant-management.service';
import { BulkActionDialogComponent } from './dialogs/bulk-action-dialog.component';
import { FilterDialogComponent } from './dialogs/filter-dialog.component';
import { CollaborationDialogComponent } from './dialogs/collaboration-dialog.component';
import { AnalyticsDashboardComponent } from './analytics-dashboard/analytics-dashboard.component';

@Component({
  selector: 'app-applicant-management',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatChipsModule,
    MatMenuModule,
    MatDialogModule,
    MatSelectModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatTooltipModule,
    MatTabsModule,
    MatProgressBarModule,
    MatExpansionModule,
    MatBadgeModule,
    AnalyticsDashboardComponent
  ],
  templateUrl: './applicant-management.component.html',
  styleUrls: ['./applicant-management.component.css']
})
export class ApplicantManagementComponent implements OnInit {
  applications: any[] = [];
  filteredApplications: any[] = [];
  selectedApplications: Set<string> = new Set();
  isLoading = true;
  totalApplications = 0;
  pageSize = 10;
  pageIndex = 0;
  sortField = 'applicationDate';
  sortDirection = 'desc';
  searchTerm = '';
  filterForm: FormGroup;
  statusOptions = ['NEW', 'REVIEWING', 'INTERVIEW', 'OFFER', 'REJECTED', 'HIRED'];
  customStatuses: string[] = [];
  selectedJobId: string | null = null;
  showAnalytics = false;
  
  displayedColumns: string[] = [
    'select', 
    'candidateName', 
    'matchScore', 
    'skills', 
    'experience', 
    'location', 
    'applicationDate', 
    'status', 
    'actions'
  ];

  private applicationService = inject(JobApplicationControllerService);
  private workflowController = inject(WorkflowControllerService);
  private snackbarService = inject(SnackbarService);
  private dialog = inject(MatDialog);
  private fb = inject(FormBuilder);
  private applicantService = inject(ApplicantManagementService);

  constructor() {
    this.filterForm = this.fb.group({
      status: [''],
      skills: [''],
      experience: [''],
      education: [''],
      location: ['']
    });
  }

  ngOnInit(): void {
    this.loadApplications();
    this.loadCustomStatuses();
  }

  loadApplications(): void {
    this.isLoading = true;
    
    // In a real implementation, these parameters would be passed to the backend
    const params = {
      jobId: this.selectedJobId,
      page: this.pageIndex,
      size: this.pageSize,
      sort: `${this.sortField},${this.sortDirection}`,
      search: this.searchTerm,
      // Add filter parameters
      status: this.filterForm.get('status')?.value,
      skills: this.filterForm.get('skills')?.value,
      experience: this.filterForm.get('experience')?.value,
      education: this.filterForm.get('education')?.value,
      location: this.filterForm.get('location')?.value
    };
    
    // Use the applicant management service instead of direct API calls
    this.applicantService.getApplicants().subscribe({
      next: (data: any) => {
        // In a real implementation, pagination would be handled by the backend
        this.applications = data;
        this.applyFilters();
        this.isLoading = false;
      },
      error: (err: any) => {
        console.error('Failed to load applications', err);
        this.snackbarService.error('Failed to load applications');
        this.isLoading = false;
      }
    });
  }

  loadCustomStatuses(): void {
    // In a real implementation, this would fetch custom statuses from the backend
    this.customStatuses = ['TECHNICAL_INTERVIEW', 'REFERENCE_CHECK', 'BACKGROUND_CHECK'];
  }

  applyFilters(): void {
    this.filteredApplications = this.applications.filter(app => {
      // Apply search term
      if (this.searchTerm && !this.matchesSearchTerm(app, this.searchTerm)) {
        return false;
      }
      
      // Apply form filters (simplified for demo)
      const status = this.filterForm.get('status')?.value;
      if (status && app.status !== status) {
        return false;
      }
      
      return true;
    });
    
    this.totalApplications = this.filteredApplications.length;
  }

  matchesSearchTerm(app: any, term: string): boolean {
    const searchLower = term.toLowerCase();
    return (
      app.candidateProfile?.firstName?.toLowerCase().includes(searchLower) ||
      app.candidateProfile?.lastName?.toLowerCase().includes(searchLower) ||
      app.job?.title?.toLowerCase().includes(searchLower) ||
      false
    );
  }

  onSearch(event: Event): void {
    this.searchTerm = (event.target as HTMLInputElement).value;
    this.pageIndex = 0;
    this.applyFilters();
  }

  onSort(sort: Sort): void {
    this.sortField = sort.active;
    this.sortDirection = sort.direction;
    this.loadApplications();
  }

  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.loadApplications();
  }

  openFilterDialog(): void {
    const dialogRef = this.dialog.open(FilterDialogComponent, {
      width: '600px',
      data: {
        filterForm: this.filterForm.value
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.filterForm.patchValue(result);
        this.pageIndex = 0;
        this.loadApplications();
      }
    });
  }

  openBulkActionDialog(): void {
    if (this.selectedApplications.size === 0) {
      this.snackbarService.info('Please select at least one application');
      return;
    }

    const dialogRef = this.dialog.open(BulkActionDialogComponent, {
      width: '500px',
      data: {
        count: this.selectedApplications.size,
        statusOptions: [...this.statusOptions, ...this.customStatuses]
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.performBulkAction(result.action, result.value);
      }
    });
  }

  performBulkAction(action: string, value: any): void {
    const applicationIds = Array.from(this.selectedApplications);
    
    switch (action) {
      case 'status':
        this.updateBulkStatus(applicationIds, value);
        break;
      case 'tag':
        this.addBulkTags(applicationIds, value);
        break;
      case 'export':
        this.exportApplications(applicationIds);
        break;
      default:
        this.snackbarService.error('Unknown action');
    }
  }

  updateBulkStatus(applicationIds: string[], status: string): void {
    // In a real implementation, this would be a single API call
    this.isLoading = true;
    
    // Simulate API call
    setTimeout(() => {
      this.snackbarService.success(`Updated ${applicationIds.length} applications to ${status}`);
      this.selectedApplications.clear();
      this.loadApplications();
    }, 1000);
  }

  addBulkTags(applicationIds: string[], tags: string[]): void {
    // Simulate API call
    this.isLoading = true;
    
    setTimeout(() => {
      this.snackbarService.success(`Added tags to ${applicationIds.length} applications`);
      this.selectedApplications.clear();
      this.loadApplications();
    }, 1000);
  }

  exportApplications(applicationIds: string[]): void {
    // Simulate export
    this.snackbarService.info(`Exporting ${applicationIds.length} applications...`);
    
    setTimeout(() => {
      this.snackbarService.success('Export complete');
    }, 1500);
  }

  toggleSelectAll(checked: boolean): void {
    if (checked) {
      this.filteredApplications.forEach(app => {
        if (app.id) this.selectedApplications.add(app.id);
      });
    } else {
      this.selectedApplications.clear();
    }
  }

  toggleSelect(id: string): void {
    if (this.selectedApplications.has(id)) {
      this.selectedApplications.delete(id);
    } else {
      this.selectedApplications.add(id);
    }
  }

  isSelected(id: string): boolean {
    return this.selectedApplications.has(id);
  }

  openCollaborationDialog(application: any): void {
    this.dialog.open(CollaborationDialogComponent, {
      width: '600px',
      data: { application }
    });
  }

  toggleAnalytics(): void {
    this.showAnalytics = !this.showAnalytics;
  }

  getAIScore(application: any): number {
    // In a real implementation, this would come from the backend
    // For demo purposes, generate a random score between 60-100
    return Math.floor(Math.random() * 41) + 60;
  }

  getScoreColor(score: number): string {
    if (score >= 85) return 'text-green-600';
    if (score >= 70) return 'text-amber-600';
    return 'text-red-600';
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'NEW': return 'bg-blue-100 text-blue-800';
      case 'REVIEWING': return 'bg-purple-100 text-purple-800';
      case 'INTERVIEW': return 'bg-amber-100 text-amber-800';
      case 'OFFER': return 'bg-green-100 text-green-800';
      case 'REJECTED': return 'bg-red-100 text-red-800';
      case 'HIRED': return 'bg-emerald-100 text-emerald-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }
}