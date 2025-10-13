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

export const routes: Routes = [
  { path: '', redirectTo: '/homepage', pathMatch: 'full' },
  { path: 'homepage', component: HomepageComponent },
  { path: 'sign-up', component: RegisterPage },
  { path: 'auth/callback', component: MagicLinkPage },
  { path: 'profile/create', component: ProfileCreate },
  { path: 'job-posts/:id', component: JobPostDetailsPageComponent }, // New route for job post details
  {
    path: 'talent',
    component: AuthenticatedLayoutComponent,
    children: [
      { path: 'dashboard', component: CandidateDashboardComponent },
      { path: 'job-list', component: TalentJobListPageComponent },
      { path: 'applications', component: MyApplicationsPageComponent, pathMatch: 'full' },
      { path: 'applications/:id', component: ApplicationDetailsPageComponent },
      // Add other authenticated routes here
      // { path: 'applications', component: MyApplicationsComponent },
      // { path: 'offers', component: JobOffersComponent },
      // { path: 'notifications', component: NotificationsComponent },
    ]
  },
];