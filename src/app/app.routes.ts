import { Routes } from '@angular/router';
import { RegisterPage } from './pages/register/register';
import { MagicLinkPage } from './pages/magic-link/magic-link';
import { ProfileCreate } from './pages/profile-create/profile-create';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { AuthenticatedLayoutComponent } from './shared/components/layouts/authenticated-layout/authenticated-layout';
import { JobPostsListComponent } from './shared/components/jobs/job-posts-list/job-posts-list';

export const routes: Routes = [
  { path: '', redirectTo: '/homepage', pathMatch: 'full' },
  { path: 'homepage', component: HomepageComponent },
  { path: 'sign-up', component: RegisterPage },
  { path: 'auth/callback', component: MagicLinkPage },
  { path: 'profile/create', component: ProfileCreate },
  {
    path: '',
    component: AuthenticatedLayoutComponent,
    children: [
      { path: 'dashboard', component: JobPostsListComponent }, // Or a dedicated dashboard component
      { path: 'job-posts', component: JobPostsListComponent },
      // Add other authenticated routes here
      // { path: 'applications', component: MyApplicationsComponent },
      // { path: 'offers', component: JobOffersComponent },
      // { path: 'notifications', component: NotificationsComponent },
    ]
  },
];
