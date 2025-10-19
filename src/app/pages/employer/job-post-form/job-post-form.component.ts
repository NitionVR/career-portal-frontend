import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormArray } from '@angular/forms';
import { JobPostControllerService } from '../../../api/services';
import { JobPostRequest } from '../../../api/models';
import { SnackbarService } from '../../../shared/components/snackbar/snackbar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-job-post-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './job-post-form.component.html',
  styleUrls: ['./job-post-form.component.css']
})
export class JobPostFormComponent implements OnInit {
  jobPostForm!: FormGroup;

  private fb = inject(FormBuilder);
  private jobPostService = inject(JobPostControllerService);
  private snackbarService = inject(SnackbarService);
  private router = inject(Router);

  constructor() { }

  ngOnInit(): void {
    this.jobPostForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', [Validators.required, Validators.minLength(50)]],
      location: this.fb.group({
        city: ['', Validators.required],
        countryCode: ['', Validators.required]
      }),
      salary: ['', Validators.required],
      experienceLevel: ['', Validators.required],
      contractType: ['', Validators.required],
      workType: ['', Validators.required],
      skills: this.fb.array([], [Validators.required, Validators.minLength(1)]),
      responsibilities: this.fb.array([], [Validators.required, Validators.minLength(1)]),
      qualifications: this.fb.array([], [Validators.required, Validators.minLength(1)]),
    });
  }

  // Getters for FormArrays
  get skills() {
    return this.jobPostForm.get('skills') as FormArray;
  }

  get responsibilities() {
    return this.jobPostForm.get('responsibilities') as FormArray;
  }

  get qualifications() {
    return this.jobPostForm.get('qualifications') as FormArray;
  }

  // Methods to add/remove skills
  addSkill() {
    this.skills.push(this.fb.group({ name: ['', Validators.required] }));
  }

  removeSkill(index: number) {
    this.skills.removeAt(index);
  }

  // Methods to add/remove responsibilities
  addResponsibility() {
    this.responsibilities.push(this.fb.control('', Validators.required));
  }

  removeResponsibility(index: number) {
    this.responsibilities.removeAt(index);
  }

  // Methods to add/remove qualifications
  addQualification() {
    this.qualifications.push(this.fb.control('', Validators.required));
  }

  removeQualification(index: number) {
    this.qualifications.removeAt(index);
  }

  onSubmit(status: 'DRAFT' | 'PUBLISHED'): void {
    if (this.jobPostForm.invalid && status === 'PUBLISHED') {
      this.snackbarService.error('Please fill in all required fields to publish.');
      this.jobPostForm.markAllAsTouched();
      return;
    }

    const jobPostRequest: JobPostRequest = {
      ...this.jobPostForm.value,
      status: status
    };

    this.jobPostService.createJobPost({ body: jobPostRequest }).subscribe({
      next: (newJob) => {
        this.snackbarService.success(`Job post successfully ${status === 'DRAFT' ? 'saved as draft' : 'published'}!`);
        this.router.navigate(['/employer/dashboard']);
      },
      error: (err) => {
        this.snackbarService.error(err.error?.message || 'Failed to create job post.');
      }
    });
  }

}