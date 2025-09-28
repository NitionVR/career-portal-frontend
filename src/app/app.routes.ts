import { Routes } from '@angular/router';
import { LoginPage } from './pages/login/login';
// import { RegisterPage } from './pages/register/register';
// import { MagicLinkPage } from './pages/magic-link/magic-link';

export const routes: Routes = [
  { path: 'login', component: LoginPage },
  // { path: 'register', component: RegisterPage },
  // { path: 'auth/magic-link', component: MagicLinkPage },
];
