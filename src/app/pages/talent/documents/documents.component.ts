import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ProfileControllerService } from '../../../api/services';
import { ResumeDto } from '../../../api/models';
import { SnackbarService } from '../../../shared/components/snackbar/snackbar.service';

@Component({
  selector: 'app-documents',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule
  ],
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {
  private profileService = inject(ProfileControllerService);
  private snackbarService = inject(SnackbarService);

  isLoading = true;
  dataSource: ResumeDto[] = [];

  ngOnInit(): void {
    this.loadResumes();
  }

  loadResumes(): void {
    this.isLoading = true;
    this.profileService.getResumes().subscribe({
      next: (resumes) => {
        this.dataSource = resumes;
        this.isLoading = false;
      },
      error: (err) => {
        this.snackbarService.error('Failed to load documents.');
        console.error(err);
        this.isLoading = false;
      }
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (!file) return;

    // Check if the user can upload more CVs
    if (this.dataSource.length >= 3) {
      this.snackbarService.error('You have reached the maximum limit of 3 CV uploads.');
      return;
    }

    this.uploadCV(file);
  }

  uploadCV(file: File): void {
    this.isLoading = true;
    this.profileService.getResumeUploadUrl({ body: { contentType: file.type, fileName: file.name, contentLength: file.size } })
      .subscribe({
        next: async (response) => {
          if (!response.uploadUrl || !response.fileUrl) {
            this.snackbarService.error('Could not get upload URL.');
            this.isLoading = false;
            return;
          }
          try {
            const uploadRequest = await fetch(response.uploadUrl, { method: 'PUT', body: file });
            if (!uploadRequest.ok) {
              this.snackbarService.error('Failed to upload CV.');
              this.isLoading = false;
              return;
            }
            // After uploading, add the resume to the profile to register it in the backend
            this.profileService.addResumeToProfile({ body: { url: response.fileUrl, filename: file.name } })
              .subscribe({
                next: () => {
                  this.snackbarService.success('CV uploaded successfully!');
                  this.loadResumes(); // Refresh the list
                },
                error: (err) => {
                  this.snackbarService.error('Failed to save uploaded CV.');
                  this.isLoading = false;
                }
              });
          } catch (err) {
            this.snackbarService.error('An error occurred during CV upload.');
            this.isLoading = false;
          }
        },
        error: (err) => {
          this.snackbarService.error('Failed to get CV upload URL.');
          this.isLoading = false;
        }
      });
  }

  deleteResume(resume: ResumeDto): void {
    if (!resume.id) return;
    const confirmed = confirm(`Are you sure you want to delete ${resume.filename}?`);
    if (confirmed) {
      this.isLoading = true;
      this.profileService.deleteResume({ resumeId: resume.id }).subscribe({
        next: () => {
          this.snackbarService.success('CV deleted successfully.');
          this.loadResumes(); // Refresh the list
        },
        error: (err) => {
          this.snackbarService.error('Failed to delete CV.');
          this.isLoading = false;
        }
      });
    }
  }
}
