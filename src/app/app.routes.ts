import { Routes } from '@angular/router';
import { RegisterPage } from './pages/register/register';
import { MagicLinkPage } from './pages/magic-link/magic-link';
import { ProfileCreate } from './pages/profile-create/profile-create';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { AuthenticatedLayoutComponent } from './shared/components/layouts/authenticated-layout/authenticated-layout';
import { CandidateDashboardComponent } from './pages/candidate/dashboard/dashboard.component';
import { TalentJobListPageComponent } from './pages/talent/job-list/talent-job-list-page.component';
import { MyApplicationsPageComponent } from './pages/talent/my-applications/my-applications-page.component';
import { ApplicationDetailsPageComponent } from './pages/talent/application-details/application-details-page.component';
import { JobPostDetailsPageComponent } from './pages/job-post-details/job-post-details-page.component';
import { ProfilePageComponent } from './pages/talent/profile-page/profile-page';
import { EmployerDashboardComponent } from './pages/employer/dashboard/dashboard';
import { JobPostFormComponent } from './pages/employer/job-post-form/job-post-form.component';
import { CompanyProfileComponent } from './pages/employer/company-profile/company-profile.component';
import { EmployerApplicationDetailsComponent } from './pages/employer/employer-application-details/employer-application-details.component';
import { ViewApplicantsComponent } from './pages/employer/view-applicants/view-applicants.component';

// Import the new guards
import { authGuard } from './core/guards/auth.guard';
import { guestGuard } from './core/guards/guest.guard';

export const routes: Routes = [
  // The homepage will handle its own redirection logic if the user is authenticated.
  { path: '', component: HomepageComponent },
  { path: 'homepage', redirectTo: '', pathMatch: 'full' }, // Redirect legacy homepage path

  // Guest-only routes
  { path: 'sign-up', component: RegisterPage, canActivate: [guestGuard] },
  { path: 'auth/callback', component: MagicLinkPage }, // This will be replaced by the new callback component logic

  // This route is now public, but the component itself validates the token.
  {
    path: 'profile/create',
    component: ProfileCreate,
  },
  {
    path: 'job-posts/:id',
    component: JobPostDetailsPageComponent // Publicly viewable job details
  },
  {
    path: 'talent',
    component: AuthenticatedLayoutComponent,
    canActivate: [authGuard], // Protect the entire talent section
    data: { role: 'CANDIDATE' }, // Specify the required role for this section
    children: [
      { path: 'dashboard', component: CandidateDashboardComponent },
      { path: 'job-list', component: TalentJobListPageComponent },
      { path: 'applications', component: MyApplicationsPageComponent, pathMatch: 'full' },
      { path: 'applications/:id', component: ApplicationDetailsPageComponent },
      { path: 'profile', component: ProfilePageComponent },
    ]
  },
  {
    path: 'employer',
    component: AuthenticatedLayoutComponent,
    canActivate: [authGuard], // Protect the entire employer section
    data: { role: 'HIRING_MANAGER' }, // Specify the required role for this section
    children: [
      { path: 'dashboard', component: EmployerDashboardComponent },
      { path: 'jobs/create', component: JobPostFormComponent },
      { path: 'jobs/:id/edit', component: JobPostFormComponent },
      { path: 'jobs/:id/applicants', component: ViewApplicantsComponent },
      { path: 'applications/:id', component: EmployerApplicationDetailsComponent },
      { path: 'settings/company', component: CompanyProfileComponent },
      // Add other employer routes here
    ]
  },

  // Fallback route if no other route matches
  { path: '**', redirectTo: '' }
];
