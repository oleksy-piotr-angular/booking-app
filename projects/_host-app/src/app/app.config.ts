// app.config.ts
import { ApplicationConfig } from '@angular/core';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { HOST_ROUTES } from './host.routes';

// shared‐token injection tokens:
import { AUTH_MFE_SERVICE, TOKEN_MFE_SERVICE } from '@booking-app/auth-token';

// import the remotes classes via Module Federation path:
import { AuthService } from 'auth-mfe/AuthService';
import { TokenService } from 'auth-mfe/TokenService';
import { authInterceptor } from 'auth-mfe/AuthInterceptor';

// import the remotes classes via Module Federation path:

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideRouter(HOST_ROUTES, withEnabledBlockingInitialNavigation()),

    // 1) bind the shared token to the remote AuthService
    { provide: AUTH_MFE_SERVICE, useExisting: AuthService },

    // 2) bind the shared token to the remote TokenService
    { provide: TOKEN_MFE_SERVICE, useExisting: TokenService },
  ],
};
