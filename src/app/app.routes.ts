import { Routes } from '@angular/router';
import { RegisterPage } from './pages/register/register';
import { MagicLinkPage } from './pages/magic-link/magic-link';
import { ProfileCreate } from './pages/profile-create/profile-create';
import { HomepageComponent } from './pages/homepage/homepage.component';

export const routes: Routes = [
  { path: '', redirectTo: '/homepage', pathMatch: 'full' },
  { path: 'homepage', component: HomepageComponent },
  { path: 'sign-up', component: RegisterPage },
  { path: 'auth/callback', component: MagicLinkPage },
  { path: 'profile/create', component: ProfileCreate },
];
