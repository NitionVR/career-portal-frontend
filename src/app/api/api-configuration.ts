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
   * Falls back to same-origin to avoid localhost misrouting in production.
   */
  get rootUrl(): string {
    // The config is loaded into the window object by the APP_INITIALIZER in app.config.ts
    const runtimeConfig = (window as any).config;
    return runtimeConfig?.apiUrl || window.location.origin;
  }
}

/**
 * Parameters for `ApiModule.forRoot()`
 */
export interface ApiConfigurationParams {
  rootUrl?: string;
}