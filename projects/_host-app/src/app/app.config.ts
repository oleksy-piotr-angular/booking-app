// app.config.ts
import { ApplicationConfig } from '@angular/core';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

import { HOST_ROUTES } from './host.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideRouter(HOST_ROUTES, withEnabledBlockingInitialNavigation()),
    // No HTTP client or auth services here — those come from the remotes
  ],
};
