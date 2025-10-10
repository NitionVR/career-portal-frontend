import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth';
import { jwtDecode } from 'jwt-decode';
import { CandidateRegistrationDto } from '../../api/models/candidate-registration-dto';
import { HiringManagerRegistrationDto } from '../../api/models/hiring-manager-registration-dto';
import { CustomSelectComponent, SelectOption } from '../../shared/components/custom-select/custom-select.component';
import { GENDER_OPTIONS, RACE_OPTIONS, DISABILITY_OPTIONS, INDUSTRY_OPTIONS } from '../../shared/data/form-options';

interface JwtPayload {
  role: 'CANDIDATE' | 'HIRING_MANAGER';
}

@Component({
  selector: 'app-profile-create',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CustomSelectComponent,
  ],
  templateUrl: './profile-create.html',
  styleUrl: './profile-create.css'
})
export class ProfileCreate implements OnInit {
  registrationToken: string | null = null;
  profileForm!: FormGroup;
  userRole: 'CANDIDATE' | 'HIRING_MANAGER' | null = null;
  errorMessage: string | null = null;

  // Use imported options
  genderOptions: SelectOption[] = GENDER_OPTIONS;
  raceOptions: SelectOption[] = RACE_OPTIONS;
  disabilityOptions: SelectOption[] = DISABILITY_OPTIONS;
  industryOptions: SelectOption[] = INDUSTRY_OPTIONS;

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);

  ngOnInit(): void {
    this.registrationToken = this.route.snapshot.queryParamMap.get('token');

    if (!this.registrationToken) {
      this.errorMessage = 'Registration token missing.';
      return;
    }

    try {
      const decodedToken: JwtPayload = jwtDecode(this.registrationToken);
      this.userRole = decodedToken.role;
    } catch (e) {
      console.error('Error decoding JWT', e);
      this.errorMessage = 'Invalid registration token.';
      return;
    }

    // Clean the URL after extracting the token
    this.router.navigate([], { relativeTo: this.route, replaceUrl: true, queryParams: {} });

    this.initForm();
  }

  private initForm(): void {
    if (this.userRole === 'CANDIDATE') {
      this.profileForm = this.fb.group({
        username: ['', Validators.required],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        gender: ['', Validators.required],
        race: ['', Validators.required],
        disability: ['', Validators.required],
        contactNumber: ['', Validators.required],
        alternateContactNumber: [''],
      });
    } else if (this.userRole === 'HIRING_MANAGER') {
      this.profileForm = this.fb.group({
        username: ['', Validators.required],
        companyName: ['', Validators.required],
        industry: ['', Validators.required],
        contactPerson: ['', Validators.required],
        contactNumber: ['', Validators.required],
      });
    } else {
      this.errorMessage = 'Unknown user role.';
      this.profileForm = this.fb.group({}); // Initialize empty form to prevent errors
    }
  }

  onSubmit(): void {
    if (this.profileForm.invalid) {
      this.errorMessage = 'Please fill in all required fields.';
      return;
    }

    if (!this.registrationToken) {
      this.errorMessage = 'Registration token missing.';
      return;
    }

    if (this.userRole === 'CANDIDATE') {
      const body: CandidateRegistrationDto = this.profileForm.value;
      this.authService.completeCandidateRegistration(this.registrationToken, body).subscribe({
        next: () => {
          this.router.navigate(['/']); // Redirect to homepage after successful registration
        },
        error: (err) => {
          console.error('Candidate registration failed:', err);
          this.errorMessage = 'Candidate registration failed: ' + (err.error?.message || err.message);
        }
      });
    } else if (this.userRole === 'HIRING_MANAGER') {
      const body: HiringManagerRegistrationDto = this.profileForm.value;
      this.authService.completeHiringManagerRegistration(this.registrationToken, body).subscribe({
        next: () => {
          this.router.navigate(['/']); // Redirect to homepage after successful registration
        },
        error: (err) => {
          console.error('Hiring Manager registration failed:', err);
          this.errorMessage = 'Hiring Manager registration failed: ' + (err.error?.message || err.message);
        }
      });
    }
  }
}