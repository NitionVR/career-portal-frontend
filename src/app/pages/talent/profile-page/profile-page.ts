import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpBackend, HttpEventType } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
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
import { ProjectComponent } from './project/project'; // Import ProjectComponent
import { AuthService, User } from '../../../core/services/auth';
import { ProfileControllerService } from '../../../api/services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, WorkExperienceComponent, VolunteerExperienceComponent, EducationComponent, AwardComponent, CertificateComponent, PublicationComponent, SkillComponent, LanguageComponent, InterestComponent, ReferenceComponent, ProjectComponent],
  templateUrl: './profile-page.html',
  styleUrls: ['./profile-page.css']
})
export class ProfilePageComponent implements OnInit {
  uploading: boolean = false;
  progress: number = 0;
  profileForm!: FormGroup;
  user: User | null = null;
  userSubscription: Subscription | undefined;

  private authService = inject(AuthService);
  private profileService = inject(ProfileControllerService);
  private fb = inject(FormBuilder);
  private httpBackend = inject(HttpBackend);

  get userInitials(): string {
    if (!this.user) {
      return '?';
    }
    const firstNameInitial = this.user.firstName ? this.user.firstName[0] : '';
    const lastNameInitial = this.user.lastName ? this.user.lastName[0] : '';
    return `${firstNameInitial}${lastNameInitial}`.toUpperCase();
  }

  constructor() { }

  ngOnInit(): void {
    this.userSubscription = this.authService.currentUser$.subscribe(user => {
      this.user = user;
      this.initForm();
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
        location: this.fb.group({
          address: [''],
          postalCode: [''],
          city: [''],
          countryCode: [''],
          region: ['']
        }),
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
      projects: this.fb.array([]) // FormArray for projects
    });
  }

  get workExperiences(): FormArray<FormGroup> {
    return this.profileForm.get('work') as FormArray<FormGroup>;
  }

  createWorkExperienceFormGroup(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      position: ['', Validators.required],
      url: [''],
      startDate: ['', Validators.required],
      endDate: [''],
      summary: [''],
      highlights: this.fb.array([])
    });
  }

  addWorkExperience(): void {
    this.workExperiences.push(this.createWorkExperienceFormGroup());
  }

  removeWorkExperience(index: number): void {
    this.workExperiences.removeAt(index);
  }

  get volunteerExperiences(): FormArray<FormGroup> {
    return this.profileForm.get('volunteer') as FormArray<FormGroup>;
  }

  createVolunteerExperienceFormGroup(): FormGroup {
    return this.fb.group({
      organization: ['', Validators.required],
      position: ['', Validators.required],
      url: [''],
      startDate: ['', Validators.required],
      endDate: [''],
      summary: [''],
      highlights: this.fb.array([])
    });
  }

  addVolunteerExperience(): void {
    this.volunteerExperiences.push(this.createVolunteerExperienceFormGroup());
  }

  removeVolunteerExperience(index: number): void {
    this.volunteerExperiences.removeAt(index);
  }

  get educations(): FormArray<FormGroup> {
    return this.profileForm.get('education') as FormArray<FormGroup>;
  }

  createEducationFormGroup(): FormGroup {
    return this.fb.group({
      institution: ['', Validators.required],
      url: [''],
      area: ['', Validators.required],
      studyType: [''],
      startDate: ['', Validators.required],
      endDate: [''],
      score: [''],
      courses: [''] // For now, a single string input
    });
  }

  addEducation(): void {
    this.educations.push(this.createEducationFormGroup());
  }

  removeEducation(index: number): void {
    this.educations.removeAt(index);
  }

  get awards(): FormArray<FormGroup> {
    return this.profileForm.get('awards') as FormArray<FormGroup>;
  }

  createAwardFormGroup(): FormGroup {
    return this.fb.group({
      title: ['', Validators.required],
      date: ['', Validators.required],
      awarder: ['', Validators.required],
      summary: ['']
    });
  }

  addAward(): void {
    this.awards.push(this.createAwardFormGroup());
  }

  removeAward(index: number): void {
    this.awards.removeAt(index);
  }

  get certificates(): FormArray<FormGroup> {
    return this.profileForm.get('certificates') as FormArray<FormGroup>;
  }

  createCertificateFormGroup(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      date: ['', Validators.required],
      issuer: ['', Validators.required],
      url: ['']
    });
  }

  addCertificate(): void {
    this.certificates.push(this.createCertificateFormGroup());
  }

  removeCertificate(index: number): void {
    this.certificates.removeAt(index);
  }

  get publications(): FormArray<FormGroup> {
    return this.profileForm.get('publications') as FormArray<FormGroup>;
  }

  createPublicationFormGroup(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      publisher: ['', Validators.required],
      releaseDate: ['', Validators.required],
      url: [''],
      summary: ['']
    });
  }

  addPublication(): void {
    this.publications.push(this.createPublicationFormGroup());
  }

  removePublication(index: number): void {
    this.publications.removeAt(index);
  }

  get skills(): FormArray<FormGroup> {
    return this.profileForm.get('skills') as FormArray<FormGroup>;
  }

  createSkillFormGroup(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      level: ['', Validators.required],
      keywords: [''] // For now, a single string input
    });
  }

  addSkill(): void {
    this.skills.push(this.createSkillFormGroup());
  }

  removeSkill(index: number): void {
    this.skills.removeAt(index);
  }

  get languages(): FormArray<FormGroup> {
    return this.profileForm.get('languages') as FormArray<FormGroup>;
  }

  createLanguageFormGroup(): FormGroup {
    return this.fb.group({
      language: ['', Validators.required],
      fluency: ['', Validators.required]
    });
  }

  addLanguage(): void {
    this.languages.push(this.createLanguageFormGroup());
  }

  removeLanguage(index: number): void {
    this.languages.removeAt(index);
  }

  get interests(): FormArray<FormGroup> {
    return this.profileForm.get('interests') as FormArray<FormGroup>;
  }

  createInterestFormGroup(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      keywords: [''] // For now, a single string input
    });
  }

  addInterest(): void {
    this.interests.push(this.createInterestFormGroup());
  }

  removeInterest(index: number): void {
    this.interests.removeAt(index);
  }

  get references(): FormArray<FormGroup> {
    return this.profileForm.get('references') as FormArray<FormGroup>;
  }

  createReferenceFormGroup(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      reference: ['', Validators.required]
    });
  }

  addReference(): void {
    this.references.push(this.createReferenceFormGroup());
  }

  removeReference(index: number): void {
    this.references.removeAt(index);
  }

  get projects(): FormArray<FormGroup> {
    return this.profileForm.get('projects') as FormArray<FormGroup>;
  }

  createProjectFormGroup(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: [''],
      description: ['', Validators.required],
      highlights: [''],
      url: ['']
    });
  }

  addProject(): void {
    this.projects.push(this.createProjectFormGroup());
  }

  removeProject(index: number): void {
    this.projects.removeAt(index);
  }

  onFileUpload(event: any): void {
    const file = event.target.files[0];
    if (!file) {
      return;
    }

    this.uploading = true;
    this.progress = 0; // Reset progress

    // Step 1: Get the pre-signed upload URL from our backend
    this.profileService.getAvatarUploadUrl({
      body: {
        contentType: file.type,
        contentLength: file.size
      }
    }).subscribe({
      next: (response) => {
        if (response.uploadUrl && response.fileUrl) {
          // Step 2: Upload the file directly to the cloud storage URL
          this.uploadFileToCloud(file, response.uploadUrl, response.fileUrl);
        } else {
          console.error('Backend did not return a valid upload URL.');
          this.uploading = false;
        }
      },
      error: (err) => {
        console.error('Failed to get upload URL', err);
        this.uploading = false;
      }
    });
  }

  private uploadFileToCloud(file: File, uploadUrl: string, fileUrl: string): void {
    // We need to use HttpClient directly for this part to upload the binary file
    const httpClient = new HttpClient(this.httpBackend); // Create a new instance to bypass interceptors if needed

    httpClient.put(uploadUrl, file, {
      reportProgress: true,
      observe: 'events'
    }).subscribe({
      next: (event: any) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
        } else if (event.type === HttpEventType.Response) {
          // Step 3: Update the user's profile in our backend with the final URL
          this.updateProfileAvatar(fileUrl);
        }
      },
      error: (err) => {
        console.error('Failed to upload file to cloud storage', err);
        this.uploading = false;
      }
    });
  }

  private updateProfileAvatar(fileUrl: string): void {
    this.profileService.updateAvatar({
      body: { profileImageUrl: fileUrl }
    }).subscribe({
      next: (updatedUser) => {
        // Manually update the user in AuthService to reflect the change immediately
        this.authService['storeUser'](updatedUser as User);
        this.authService['currentUserSubject'].next(updatedUser as User);
        this.uploading = false;
      },
      error: (err) => {
        console.error('Failed to update profile with new avatar URL', err);
        this.uploading = false;
      }
    });
  }

  removePicture(): void {
    this.profileService.deleteAvatar().subscribe({
      next: () => {
        // Manually update the user object on the frontend after successful deletion
        if (this.user) {
          this.user.profileImageUrl = undefined; // or null
          this.authService['storeUser'](this.user);
          this.authService['currentUserSubject'].next(this.user);
        }
      },
      error: (err) => {
        console.error('Failed to remove profile picture', err);
        // You might want to show an error message to the user here
      }
    });
  }

  onSaveProfile(): void {
    if (this.profileForm.valid) {
      console.log('Profile saved:', this.profileForm.value);
      // Here you would typically send the data to a backend service
    } else {
      console.log('Form is invalid');
      // Optionally, mark all fields as touched to display validation errors
      this.profileForm.markAllAsTouched();
    }
  }
}
