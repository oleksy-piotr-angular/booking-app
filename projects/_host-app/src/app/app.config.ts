// app.config.ts
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

import { HOST_ROUTES } from './host.routes';
import { HttpClientModule } from '@angular/common/http';
import { AUTH_MFE_SERVICE } from './tokens/auth.token';
import { AuthService } from '../../../auth-mfe/src/app/services/auth/auth.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    importProvidersFrom(HttpClientModule), // HTTP so AuthService can work
    provideRouter(HOST_ROUTES, withEnabledBlockingInitialNavigation()),
    { provide: AUTH_MFE_SERVICE, useExisting: AuthService }, // Bind the token to the real remote class
  ],
};
