import { Injectable } from '@angular/core';

/**
 * Global configuration
 */
@Injectable({
  providedIn: 'root',
})
export class ApiConfiguration {
  /**
   * The root URL for API requests.
   * Uses a getter to dynamically retrieve the value from the global config
   * loaded at runtime by the APP_INITIALIZER.
   * Falls back to localhost for development if the config is not found.
   */
  get rootUrl(): string {
    // The config is loaded into the window object by the APP_INITIALIZER in app.config.ts
    const runtimeConfig = (window as any).config;
    return runtimeConfig?.apiUrl || 'http://localhost:8080';
  }
}

/**
 * Parameters for `ApiModule.forRoot()`
 */
export interface ApiConfigurationParams {
  rootUrl?: string;
}