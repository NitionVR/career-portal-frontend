import { ApplicationConfig, importProvidersFrom, APP_INITIALIZER } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptors, HttpClient } from '@angular/common/http';

import { routes } from './app.routes';
import { environment } from '../environments/environment';

import { LucideAngularModule, Mail, ArrowRight, CheckCircle, User } from 'lucide-angular';
import { blobToJsonInterceptor } from './core/interceptors/blob-to-json.interceptor';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { authInitializerProvider } from './core/initializers/auth.initializer';
import { firstValueFrom } from 'rxjs';

export function loadConfig(http: HttpClient) {
  return () => firstValueFrom(http.get('/assets/config.json'))
    .then((config: any) => {
      (window as any).config = config;
    });
}

export const appConfig: ApplicationConfig = {
  providers: [
    // Runtime configuration loader (MUST RUN FIRST)
    {
      provide: APP_INITIALIZER,
      useFactory: loadConfig,
      deps: [HttpClient],
      multi: true
    },

    // Core providers
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(withInterceptors([
      blobToJsonInterceptor,
      AuthInterceptor // Add the new auth interceptor here
    ])),

    // App Initializer to check session on startup (runs after config is loaded)
    authInitializerProvider,

    // Environment provider (if needed elsewhere)
    { provide: 'environment', useValue: environment },

    // Icon imports
    importProvidersFrom(LucideAngularModule.pick({ Mail, ArrowRight, CheckCircle, User })),
  ],
};
