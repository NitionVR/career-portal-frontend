import { Routes } from '@angular/router';
import { LoginPage } from './pages/login/login';
import { RegisterPage } from './pages/register/register';
import { MagicLinkPage } from './pages/magic-link/magic-link';
import { ProfileCreate } from './pages/profile-create/profile-create';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginPage },
  { path: 'register', component: RegisterPage },
  { path: 'auth/magic-link', component: MagicLinkPage },
  { path: 'profile/create', component: ProfileCreate },
];
