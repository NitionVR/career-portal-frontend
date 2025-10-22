import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { OrganizationControllerService } from '../../../api/services';
import { SnackbarService } from '../../../shared/components/snackbar/snackbar.service';
import { HttpClient, HttpBackend, HttpEventType } from '@angular/common/http';
import { OrganizationDto } from '../../../api/models';
import { MatTabsModule } from '@angular/material/tabs';
import { OrganizationMembersComponent } from './organization-members/organization-members.component';

@Component({
  selector: 'app-company-profile',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    MatTabsModule,
    OrganizationMembersComponent
  ],
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.css']
})
export class CompanyProfileComponent implements OnInit {
  profileForm!: FormGroup;
  isLoading = true;
  isUploading = false;

  private fb = inject(FormBuilder);
  private orgService = inject(OrganizationControllerService);
  private snackbarService = inject(SnackbarService);
  private http = inject(HttpClient);
  private httpBackend = inject(HttpBackend);

  constructor() { }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      description: ['', Validators.required],
      website: [''],
      logoUrl: ['']
    });

    this.loadOrganizationData();
  }

  loadOrganizationData(): void {
    this.isLoading = true;
    this.orgService.getCurrentOrganization().subscribe({
      next: (org) => {
        if (org) {
          this.profileForm.patchValue(org);
        }
        this.isLoading = false;
      },
      error: (err) => {
        this.snackbarService.error('Could not load company profile.');
        this.isLoading = false;
      }
    });
  }

  onSave(): void {
    if (this.profileForm.invalid) {
      this.snackbarService.error('Please fill in all required fields.');
      return;
    }

    // The generated client doesn't have a simple update, so we use HttpClient directly.
    this.http.put('/api/organization/me', this.profileForm.value).subscribe({
      next: (updatedOrg: any) => {
        this.profileForm.patchValue(updatedOrg);
        this.snackbarService.success('Company profile saved successfully!');
      },
      error: (err) => {
        this.snackbarService.error(err.error?.message || 'Failed to save company profile.');
      }
    });
  }

  removeLogo(): void {
    this.orgService.deleteLogo().subscribe({
      next: () => {
        this.profileForm.get('logoUrl')?.patchValue(null);
        this.snackbarService.success('Logo removed successfully.');
      },
      error: (err) => {
        this.snackbarService.error('Failed to remove logo.');
      }
    });
  }

  onLogoUpload(event: any): void {
    const file = event.target.files[0];
    if (!file) return;

    this.isUploading = true;

    this.orgService.getLogoUploadUrl({ body: { contentType: file.type, contentLength: file.size } }).subscribe({
      next: (res) => {
        const httpClient = new HttpClient(this.httpBackend);
        httpClient.put(res.uploadUrl!, file, { observe: 'response' }).subscribe(uploadRes => {
          if (uploadRes.ok) {
            this.orgService.updateLogo({ body: { companyLogoUrl: res.fileUrl! } }).subscribe(org => {
              this.profileForm.patchValue(org);
              this.snackbarService.success('Logo uploaded successfully!');
              this.isUploading = false;
            });
          }
        });
      },
      error: (err) => {
        this.snackbarService.error('Could not get upload URL.');
        this.isUploading = false;
      }
    });
  }

}
