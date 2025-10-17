import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { environment } from '../environments/environment';

import { LucideAngularModule, Mail, ArrowRight, CheckCircle, User } from 'lucide-angular';
import { blobToJsonInterceptor } from './core/interceptors/blob-to-json.interceptor';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { authInitializerProvider } from './core/initializers/auth.initializer';

export const appConfig: ApplicationConfig = {
  providers: [
    // Core providers
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(withInterceptors([
      blobToJsonInterceptor,
      AuthInterceptor // Add the new auth interceptor here
    ])),

    // App Initializer to check session on startup
    authInitializerProvider,

    // Environment provider (if needed elsewhere)
    { provide: 'environment', useValue: environment },

    // Icon imports
    importProvidersFrom(LucideAngularModule.pick({ Mail, ArrowRight, CheckCircle, User })),
  ],
};
