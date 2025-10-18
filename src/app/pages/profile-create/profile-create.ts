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

@Component({
  selector: 'app-profile-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CustomSelectComponent],
  templateUrl: './profile-create.html',
  styleUrls: ['./profile-create.css'],
})
export class ProfileCreate implements OnInit {
  profileForm!: FormGroup;
  registrationToken: string | null = null;
  user: User | null = null;
  errorMessage: string | null = null;
  isLoading = true;

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
    this.profileForm = this.fb.group({
      firstName: [this.user?.firstName || '', Validators.required],
      lastName: [this.user?.lastName || '', Validators.required],
      gender: [''],
      race: [''],
      disability: [''],
      companyName: [''],
      industry: [''],
    });

    if (this.userRole === 'HIRING_MANAGER') {
      this.profileForm.get('companyName')?.setValidators([Validators.required]);
      this.profileForm.get('industry')?.setValidators([Validators.required]);
      this.profileForm.updateValueAndValidity();
    }
  }

  onSubmit(): void {
    if (this.profileForm.invalid) {
      this.errorMessage = 'Please fill in all required fields.';
      return;
    }

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