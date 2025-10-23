import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { InvitationControllerService } from '../../api/services/invitation-controller.service';
import { AuthService } from '../../core/services/auth';
import { AcceptInvitationRequest, VerifyTokenResponse } from '../../api/models';

interface InvitationDetails {
  valid: boolean;
  email: string;
  organization: string;
  invitedBy: string;
  status: string;
  expiresAt: string;
  error?: string;
}

@Component({
  selector: 'app-accept-invitation',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './accept-invitation.component.html',
  styleUrls: ['./accept-invitation.component.css']
})
export class AcceptInvitationComponent implements OnInit {
  acceptForm!: FormGroup;
  invitationToken: string | null = null;
  invitationDetails: InvitationDetails | null = null;
  errorMessage: string | null = null;
  isLoading = true;
  isSubmitting = false;
  isSubmitted = false;

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private invitationService = inject(InvitationControllerService);
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);

  ngOnInit(): void {
    this.invitationToken = this.route.snapshot.queryParamMap.get('token');
    if (!this.invitationToken) {
      this.errorMessage = 'Invalid invitation link. No token provided.';
      this.isLoading = false;
      return;
    }
    this.validateToken(this.invitationToken);
  }

  private validateToken(token: string): void {
    this.invitationService.validateInvitation({ token }).subscribe({
      next: (response: any) => {
        this.invitationDetails = response;
        if (!response.valid || response.status !== 'PENDING') {
          this.errorMessage = response.error || 'This invitation is no longer valid.';
          this.isLoading = false;
          return;
        }
        this.initForm();
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Invalid or expired invitation link.';
        this.isLoading = false;
      }
    });
  }

  private initForm(): void {
    this.acceptForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      contactNumber: [''],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  hasError(fieldName: string): boolean {
    const field = this.acceptForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || this.isSubmitted));
  }

  getErrorMessage(fieldName: string): string {
    const field = this.acceptForm.get(fieldName);
    if (!field || !field.errors) return '';

    if (field.hasError('required')) {
      return 'This field is required';
    }
    if (field.hasError('minlength')) {
      return `Minimum ${field.errors['minlength'].requiredLength} characters required`;
    }
    return 'Invalid input';
  }

  onSubmit(): void {
    this.isSubmitted = true;
    if (this.acceptForm.invalid) {
      this.errorMessage = 'Please fix the errors in the form before submitting.';
      return;
    }

    if (this.isSubmitting || !this.invitationToken) {
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = null;

    const body: AcceptInvitationRequest = this.acceptForm.value;

    this.invitationService.acceptInvitation({ token: this.invitationToken, body })
      .subscribe({
        next: (res: any) => {
          // The response from acceptInvitation is { token: string, message: string }
          // We need to adapt it to what handleSuccessfulAuth expects, which is VerifyTokenResponse
          const authResponse: VerifyTokenResponse = {
            token: res.token,
            // We don't get the full user object back, so we create a partial one
            user: {
              email: this.invitationDetails?.email,
              firstName: body.firstName,
              lastName: body.lastName,
              role: 'RECRUITER' // Role is known from context
            }
          };
          this.authService['handleSuccessfulAuth'](authResponse);
          this.router.navigate(['/employer/dashboard']);
        },
        error: (err) => {
          this.isSubmitting = false;
          this.errorMessage = err.error?.message || 'An error occurred while accepting the invitation.';
        }
      });
  }
}
