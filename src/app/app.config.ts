import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { LucideAngularModule, Mail, ArrowRight, CheckCircle, User } from 'lucide-angular';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    importProvidersFrom(LucideAngularModule.pick({ Mail, ArrowRight, CheckCircle, User })),
    provideHttpClient(),
  ],
};
