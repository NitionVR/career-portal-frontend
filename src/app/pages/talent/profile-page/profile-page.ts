import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
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

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatExpansionModule, WorkExperienceComponent, VolunteerExperienceComponent, EducationComponent, AwardComponent, CertificateComponent, PublicationComponent, SkillComponent, LanguageComponent, InterestComponent, ReferenceComponent, ProjectComponent],
  templateUrl: './profile-page.html',
  styleUrls: ['./profile-page.css']
})
export class ProfilePageComponent implements OnInit {
  uploading: boolean = false;
  progress: number = 0;
  profileForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      basics: this.fb.group({
        name: ['', Validators.required],
        label: [''],
        email: ['', [Validators.required, Validators.email]],
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
    this.uploading = true;
    this.progress = 0;
    // Simulate upload progress
    let interval = setInterval(() => {
      this.progress += 10;
      if (this.progress >= 100) {
        clearInterval(interval);
        this.uploading = false;
        this.progress = 0; // Reset progress after completion
      }
    }, 200);
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
