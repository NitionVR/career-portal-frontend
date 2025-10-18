import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { RegistrationControllerService } from '../../api/services/registration-controller.service';
import { ProfileControllerService } from '../../api/services/profile-controller.service';
import { CandidateRegistrationDto } from '../../api/models/candidate-registration-dto';
import { HiringManagerRegistrationDto } from '../../api/models/hiring-manager-registration-dto';
import { AuthService, User } from '../../core/services/auth';
import { CustomSelectComponent } from '../../shared/components/custom-select/custom-select.component';
import { GENDER_OPTIONS, RACE_OPTIONS, DISABILITY_OPTIONS, INDUSTRY_OPTIONS } from '../../shared/data/form-options';
import { VerifyTokenResponse } from '../../api/models';
import { CompleteProfileRequest } from '../../api/models/complete-profile-request';
import {
  NgxIntlTelInputModule,
  SearchCountryField,
  CountryISO,
  PhoneNumberFormat
} from 'ngx-intl-tel-input';

@Component({
  selector: 'app-profile-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CustomSelectComponent, NgxIntlTelInputModule],
  templateUrl: './profile-create.html',
})
export class ProfileCreate implements OnInit {
  // Add these public properties for the template
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;

  profileForm!: FormGroup;
  registrationToken: string | null = null;
  user: User | null = null;
  errorMessage: string | null = null;
  isLoading = true;
  isSubmitting = false;

  genderOptions = GENDER_OPTIONS;
  raceOptions = RACE_OPTIONS;
  disabilityOptions = DISABILITY_OPTIONS;
  industryOptions = INDUSTRY_OPTIONS;

  get userRole(): string | null {
    return this.user?.role ?? null;
  }

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private registrationService = inject(RegistrationControllerService);
  private profileService = inject(ProfileControllerService);
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);

  ngOnInit(): void {
    this.registrationToken = this.route.snapshot.queryParamMap.get('token');
    const authenticatedUser = this.authService.getCurrentUser();

    if (this.registrationToken) {
      this.handleTokenFlow(this.registrationToken);
    } else if (authenticatedUser && authenticatedUser.isNewUser) {
      this.handleSessionFlow(authenticatedUser);
    } else {
      this.errorMessage = "Invalid access. No registration token found and you don't appear to be a new user.";
      this.isLoading = false;
    }
  }

  private handleTokenFlow(token: string): void {
    this.registrationService.validateRegistrationToken({ token }).subscribe({
      next: (response: { [key: string]: any }) => {
        if (!response['valid']) {
          this.errorMessage = 'This registration link is invalid or has expired.';
          this.isLoading = false;
          return;
        }
        this.user = response as User; // Assuming the response contains user role
        this.initForm();
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Invalid or expired registration token.';
        this.isLoading = false;
      },
    });
  }

  private handleSessionFlow(authenticatedUser: User): void {
    this.user = authenticatedUser;
    this.initForm();
    this.isLoading = false;
  }

  private initForm(): void {
    // Common fields for both roles
    const commonControls = {
      username: ['', [Validators.required, Validators.minLength(3)]],
      firstName: [this.user?.firstName || '', Validators.required],
      lastName: [this.user?.lastName || '', Validators.required],
    };

    // Role-specific fields
    if (this.userRole === 'CANDIDATE') {
      this.profileForm = this.fb.group({
        ...commonControls,
        gender: [''],
        race: [''],
        disability: [''],
        contactNumber: [undefined, [Validators.required]],
        alternateContactNumber: ['', Validators.pattern(/^\+?[1-9]\d{1,14}$/)],
      });
    } else if (this.userRole === 'HIRING_MANAGER') {
      this.profileForm = this.fb.group({
        ...commonControls,
        companyName: ['', Validators.required],
        industry: ['', Validators.required],
        contactPerson: ['', Validators.required],
        contactNumber: [undefined, [Validators.required]],
      });
    } else {
      // Fallback for unknown role
      this.profileForm = this.fb.group(commonControls);
    }
  }

  // Helper to check if a field has errors
  hasError(fieldName: string): boolean {
    const field = this.profileForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  // Helper to get error message for a field
  getErrorMessage(fieldName: string): string {
    const field = this.profileForm.get(fieldName);
    if (!field || !field.errors) return '';

    if (field.hasError('required')) {
      return 'This field is required';
    }
    if (field.hasError('minlength')) {
      return `Minimum ${field.errors['minlength'].requiredLength} characters required`;
    }
    if (field.hasError('pattern')) {
      return 'Please enter a valid phone number (e.g., +1234567890)';
    }
    return 'Invalid input';
  }

  onSubmit(): void {
    if (this.profileForm.invalid) {
      // Mark all fields as touched to show validation errors
      Object.keys(this.profileForm.controls).forEach(key => {
        this.profileForm.get(key)?.markAsTouched();
      });
      this.errorMessage = 'Please fix the errors in the form before submitting.';
      return;
    }

    if (this.isSubmitting) {
      return; // Prevent double submission
    }

    this.isSubmitting = true;
    this.errorMessage = null;

    if (this.registrationToken) {
      this.completeWithToken();
    } else {
      this.completeWithSession();
    }
  }

  private completeWithToken(): void {
    if (this.userRole === 'CANDIDATE') {
      const body: CandidateRegistrationDto = this.profileForm.value;
      this.registrationService.completeCandidateRegistration({ token: this.registrationToken!, body })
        .subscribe({
          next: (res) => this.handleSuccess(res),
          error: (err) => this.handleError(err)
        });
    } else if (this.userRole === 'HIRING_MANAGER') {
      const body: HiringManagerRegistrationDto = this.profileForm.value;
      this.registrationService.completeHiringManagerRegistration({ token: this.registrationToken!, body })
        .subscribe({
          next: (res) => this.handleSuccess(res),
          error: (err) => this.handleError(err)
        });
    }
  }

  private completeWithSession(): void {
    const body: CompleteProfileRequest = this.profileForm.value;
    this.profileService.completeProfile({ body })
      .subscribe({
        next: (res) => this.handleSuccess(res),
        error: (err) => this.handleError(err)
      });
  }

  private handleSuccess(response: VerifyTokenResponse): void {
    this.authService['handleSuccessfulAuth'](response);
    const dashboardUrl = this.getDashboardUrl(response.user?.role);
    this.router.navigate([dashboardUrl]);
  }

  private handleError(err: any): void {
    this.isSubmitting = false;
    this.errorMessage = err.error?.message || 'An error occurred.';
  }

  private getDashboardUrl(role?: string): string {
    switch (role) {
      case 'CANDIDATE': return '/talent/dashboard';
      case 'HIRING_MANAGER': return '/employer/dashboard';
      default: return '/';
    }
  }
}
