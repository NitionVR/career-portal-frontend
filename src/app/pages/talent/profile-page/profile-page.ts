import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpBackend } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { WorkExperienceComponent } from './work-experience/work-experience';
import { VolunteerExperienceComponent } from './volunteer-experience/volunteer-experience';
import { EducationComponent } from './education/education';
import { AwardComponent } from './award/award';
import { CertificateComponent } from './certificate/certificate';
import { PublicationComponent } from './publication/publication';
import { SkillComponent } from './skill/skill';
import { LanguageComponent } from './language/language';
import { InterestComponent } from './interest/interest';
import { ReferenceComponent } from './reference/reference';
import { ProjectComponent } from './project/project';
import { AuthService, User } from '../../../core/services/auth';
import { ProfileControllerService } from '../../../api/services';
import { ResumeDto } from '../../../api/models';
import { Subscription } from 'rxjs';
import { SnackbarService } from '../../../shared/components/snackbar/snackbar.service';
import { FileDropDirective } from '../../../shared/directives/file-drop.directive';
import { FileDropOverlayComponent } from '../../../shared/components/file-drop-overlay/file-drop-overlay.component';
import { ChooseCvModalComponent } from './choose-cv-modal/choose-cv-modal.component';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    ReactiveFormsModule, 
    WorkExperienceComponent, 
    VolunteerExperienceComponent, 
    EducationComponent, 
    AwardComponent, 
    CertificateComponent, 
    PublicationComponent, 
    SkillComponent, 
    LanguageComponent, 
    InterestComponent, 
    ReferenceComponent, 
    ProjectComponent, 
    FileDropDirective, 
    FileDropOverlayComponent,
    MatDialogModule
  ],
  templateUrl: './profile-page.html',
  styleUrls: ['./profile-page.css']
})
export class ProfilePageComponent implements OnInit {
  uploading: boolean = false;
  progress: number = 0;
  profileForm!: FormGroup;
  user: User | null = null;
  userSubscription: Subscription | undefined;
  isDragging = false;

  private authService = inject(AuthService);
  private profileService = inject(ProfileControllerService);
  private fb = inject(FormBuilder);
  private dialog = inject(MatDialog);
  private snackbarService = inject(SnackbarService);

  get userInitials(): string {
    if (!this.user) return '?';
    const firstNameInitial = this.user.firstName ? this.user.firstName[0] : '';
    const lastNameInitial = this.user.lastName ? this.user.lastName[0] : '';
    return `${firstNameInitial}${lastNameInitial}`.toUpperCase();
  }

  constructor() { }

  ngOnInit(): void {
    this.userSubscription = this.authService.currentUser$.subscribe(user => {
      this.user = user;
      this.initForm();
      this.loadProfileData();
    });
  }

  loadProfileData(): void {
    this.profileService.getCurrentUserProfile().subscribe({
      next: (profileData) => {
        if (profileData) {
          this.profileForm.patchValue(profileData);
        }
      },
      error: (err) => console.error('Failed to load profile data', err)
    });
  }

  initForm(): void {
    this.profileForm = this.fb.group({
      basics: this.fb.group({
        name: [this.user ? `${this.user.firstName} ${this.user.lastName}` : '', Validators.required],
        label: [''],
        email: [this.user?.email || '', [Validators.required, Validators.email]],
        phone: [''],
        url: [''],
        summary: [''],
        location: this.fb.group({ address: [''], postalCode: [''], city: [''], countryCode: [''], region: [''] }),
        profiles: this.fb.array([])
      }),
      work: this.fb.array([]),
      volunteer: this.fb.array([]),
      education: this.fb.array([]),
      awards: this.fb.array([]),
      certificates: this.fb.array([]),
      publications: this.fb.array([]),
      skills: this.fb.array([]),
      languages: this.fb.array([]),
      interests: this.fb.array([]),
      references: this.fb.array([]),
      projects: this.fb.array([])
    });
  }

  // Correctly typed getters for FormArray controls
  get workExperiences() { return (this.profileForm.get('work') as FormArray).controls as FormGroup[]; }
  get volunteerExperiences() { return (this.profileForm.get('volunteer') as FormArray).controls as FormGroup[]; }
  get educations() { return (this.profileForm.get('education') as FormArray).controls as FormGroup[]; }
  get awards() { return (this.profileForm.get('awards') as FormArray).controls as FormGroup[]; }
  get certificates() { return (this.profileForm.get('certificates') as FormArray).controls as FormGroup[]; }
  get publications() { return (this.profileForm.get('publications') as FormArray).controls as FormGroup[]; }
  get skills() { return (this.profileForm.get('skills') as FormArray).controls as FormGroup[]; }
  get languages() { return (this.profileForm.get('languages') as FormArray).controls as FormGroup[]; }
  get interests() { return (this.profileForm.get('interests') as FormArray).controls as FormGroup[]; }
  get references() { return (this.profileForm.get('references') as FormArray).controls as FormGroup[]; }
  get projects() { return (this.profileForm.get('projects') as FormArray).controls as FormGroup[]; }

  // Add methods
  addWorkExperience(): void { (this.profileForm.get('work') as FormArray).push(this.createWorkExperienceFormGroup()); }
  addVolunteerExperience(): void { (this.profileForm.get('volunteer') as FormArray).push(this.createVolunteerExperienceFormGroup()); }
  addEducation(): void { (this.profileForm.get('education') as FormArray).push(this.createEducationFormGroup()); }
  addAward(): void { (this.profileForm.get('awards') as FormArray).push(this.createAwardFormGroup()); }
  addCertificate(): void { (this.profileForm.get('certificates') as FormArray).push(this.createCertificateFormGroup()); }
  addPublication(): void { (this.profileForm.get('publications') as FormArray).push(this.createPublicationFormGroup()); }
  addSkill(): void { (this.profileForm.get('skills') as FormArray).push(this.createSkillFormGroup()); }
  addLanguage(): void { (this.profileForm.get('languages') as FormArray).push(this.createLanguageFormGroup()); }
  addInterest(): void { (this.profileForm.get('interests') as FormArray).push(this.createInterestFormGroup()); }
  addReference(): void { (this.profileForm.get('references') as FormArray).push(this.createReferenceFormGroup()); }
  addProject(): void { (this.profileForm.get('projects') as FormArray).push(this.createProjectFormGroup()); }

  // Remove methods
  removeWorkExperience(index: number): void { (this.profileForm.get('work') as FormArray).removeAt(index); }
  removeVolunteerExperience(index: number): void { (this.profileForm.get('volunteer') as FormArray).removeAt(index); }
  removeEducation(index: number): void { (this.profileForm.get('education') as FormArray).removeAt(index); }
  removeAward(index: number): void { (this.profileForm.get('awards') as FormArray).removeAt(index); }
  removeCertificate(index: number): void { (this.profileForm.get('certificates') as FormArray).removeAt(index); }
  removePublication(index: number): void { (this.profileForm.get('publications') as FormArray).removeAt(index); }
  removeSkill(index: number): void { (this.profileForm.get('skills') as FormArray).removeAt(index); }
  removeLanguage(index: number): void { (this.profileForm.get('languages') as FormArray).removeAt(index); }
  removeInterest(index: number): void { (this.profileForm.get('interests') as FormArray).removeAt(index); }
  removeReference(index: number): void { (this.profileForm.get('references') as FormArray).removeAt(index); }
  removeProject(index: number): void { (this.profileForm.get('projects') as FormArray).removeAt(index); }

  // Factory methods for Form Groups
  createWorkExperienceFormGroup(): FormGroup { return this.fb.group({ name: ['', Validators.required], position: ['', Validators.required], url: [''], startDate: ['', Validators.required], endDate: [''], summary: [''], highlights: this.fb.array([]) }); }
  createVolunteerExperienceFormGroup(): FormGroup { return this.fb.group({ organization: ['', Validators.required], position: ['', Validators.required], url: [''], startDate: ['', Validators.required], endDate: [''], summary: [''], highlights: this.fb.array([]) }); }
  createEducationFormGroup(): FormGroup { return this.fb.group({ institution: ['', Validators.required], url: [''], area: ['', Validators.required], studyType: [''], startDate: ['', Validators.required], endDate: [''], score: [''], courses: [''] }); }
  createAwardFormGroup(): FormGroup { return this.fb.group({ title: ['', Validators.required], date: ['', Validators.required], awarder: ['', Validators.required], summary: [''] }); }
  createCertificateFormGroup(): FormGroup { return this.fb.group({ name: ['', Validators.required], date: ['', Validators.required], issuer: ['', Validators.required], url: [''] }); }
  createPublicationFormGroup(): FormGroup { return this.fb.group({ name: ['', Validators.required], publisher: ['', Validators.required], releaseDate: ['', Validators.required], url: [''], summary: [''] }); }
  createSkillFormGroup(): FormGroup { return this.fb.group({ name: ['', Validators.required], level: ['', Validators.required], keywords: [''] }); }
  createLanguageFormGroup(): FormGroup { return this.fb.group({ language: ['', Validators.required], fluency: ['', Validators.required] }); }
  createInterestFormGroup(): FormGroup { return this.fb.group({ name: ['', Validators.required], keywords: [''] }); }
  createReferenceFormGroup(): FormGroup { return this.fb.group({ name: ['', Validators.required], reference: ['', Validators.required] }); }
  createProjectFormGroup(): FormGroup { return this.fb.group({ name: ['', Validators.required], startDate: ['', Validators.required], endDate: [''], description: ['', Validators.required], highlights: [''], url: [''] }); }

  onCVFileSelected(event: any): void {
    const file = event.target?.files?.[0];
    if (file) this.onFileDropped(file);
  }

  onFileDropped(file: File): void {
    const isCV = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file.type);
    const isImage = ['image/jpeg', 'image/png', 'image/gif'].includes(file.type);
    if (isImage) this.handleAvatarUpload(file);
    else if (isCV) this.handleCVUpload(file);
    else this.snackbarService.error('Unsupported file type.');
  }

  openChooseCvModal(): void {
    this.profileService.getResumes().subscribe(resumes => {
      const dialogRef = this.dialog.open(ChooseCvModalComponent, { width: '500px', data: { resumes: resumes || [] } });
      dialogRef.afterClosed().subscribe(result => {
        if (!result) return;
        if (result instanceof File) this.handleCVUpload(result);
        else if (result.url) this.autofillFromExisting(result);
      });
    });
  }

  private autofillFromExisting(resume: ResumeDto): void {
    this.uploading = true;
    this.profileService.autofillProfileFromResume({ body: resume }).subscribe({
      next: (profileData) => {
        this.profileForm.patchValue(profileData);
        this.snackbarService.success('Profile has been autofilled from your selected CV!');
        this.uploading = false;
      },
      error: (err) => {
        console.error('Autofill from existing failed', err);
        this.snackbarService.error('Could not autofill profile from the selected CV.');
        this.uploading = false;
      }
    });
  }

  handleAvatarUpload(file: File): void {
    this.uploading = true;
    this.progress = 0;
    this.profileService.getAvatarUploadUrl({ body: { contentType: file.type, contentLength: file.size } }).subscribe({
      next: (response) => {
        if (response.uploadUrl && response.fileUrl) {
          this.uploadFileToCloud(file, response.uploadUrl, response.fileUrl, 'avatar');
        } else {
          this.uploading = false;
          this.snackbarService.error('Failed to get upload URL.');
        }
      },
      error: () => {
        this.uploading = false;
        this.snackbarService.error('Failed to get upload URL.');
      }
    });
  }

  private async uploadFileToCloud(file: File, uploadUrl: string, fileUrl: string, type: 'avatar' | 'cv'): Promise<void> {
    try {
      const response = await fetch(uploadUrl, { method: 'PUT', body: file });
      if (response.ok) {
        if (type === 'avatar') this.updateProfileAvatar(fileUrl);
      } else {
        this.uploading = false;
        this.snackbarService.error(`Failed to upload ${type}.`);
      }
    } catch {
      this.uploading = false;
      this.snackbarService.error(`Network error during ${type} upload.`);
    }
  }

  private updateProfileAvatar(fileUrl: string): void {
    this.profileService.updateAvatar({ body: { profileImageUrl: fileUrl } }).subscribe({
      next: (updatedUser) => {
        this.authService.setCurrentUser(updatedUser as User);
        this.uploading = false;
      },
      error: () => {
        this.uploading = false;
        this.snackbarService.error('Failed to update profile avatar.');
      }
    });
  }

  private handleCVUpload(file: File): void {
    this.uploading = true;
    this.progress = 0;
    this.profileService.getResumeUploadUrl({ body: { contentType: file.type, fileName: file.name, contentLength: file.size } }).subscribe({
      next: async (uploadResponse) => {
        if (!uploadResponse.uploadUrl || !uploadResponse.fileUrl) {
          this.snackbarService.error('Failed to get CV upload URL.');
          this.uploading = false;
          return;
        }
        try {
          const uploadRequest = await fetch(uploadResponse.uploadUrl, { method: 'PUT', body: file });
          if (!uploadRequest.ok) {
            this.snackbarService.error('Failed to upload CV.');
            this.uploading = false;
            return;
          }
          const resumeDto: ResumeDto = { url: uploadResponse.fileUrl, filename: file.name };
          this.profileService.autofillProfileFromResume({ body: resumeDto }).subscribe({
            next: (profileData) => {
              this.profileForm.patchValue(profileData);
              this.snackbarService.success('CV uploaded and profile autofilled!');
              this.uploading = false;
            },
            error: () => {
              this.snackbarService.error('Autofill failed. Resume saved, but profile not updated.');
              this.uploading = false;
            }
          });
        } catch {
          this.uploading = false;
          this.snackbarService.error('An error occurred during CV upload.');
        }
      },
      error: () => {
        this.snackbarService.error('Failed to get CV upload URL.');
        this.uploading = false;
      }
    });
  }

  removePicture(): void {
    this.profileService.deleteAvatar().subscribe({
      next: () => {
        if (this.user) {
          const updatedUser = { ...this.user, profileImageUrl: undefined };
          this.authService.setCurrentUser(updatedUser);
        }
      },
      error: () => this.snackbarService.error('Failed to remove profile picture.')
    });
  }

  onAvatarUpload(event: any): void {
    const file = event.target.files[0];
    if (file) this.onFileDropped(file);
  }

  onSaveProfile(): void {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      this.snackbarService.error('Please fix the errors in the form before submitting.');
      return;
    }
    this.profileService.updateFullProfile({ body: this.profileForm.value }).subscribe({
      next: () => this.snackbarService.success('Profile saved successfully!'),
      error: () => this.snackbarService.error('Failed to save profile.')
    });
  }
}
