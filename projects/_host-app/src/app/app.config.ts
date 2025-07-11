// app.config.ts
import { ApplicationConfig } from '@angular/core';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

import { HOST_ROUTES } from './host.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AUTH_MFE_SERVICE, TOKEN_MFE_SERVICE } from '@booking-app/auth-token';
import { AuthService } from '../../../auth-mfe/src/app/services/auth/auth.service';
import { authInterceptor } from 'projects/auth-mfe/src/app/interceptors/auth.interceptor';
import { TokenService } from 'projects/auth-mfe/src/app/services/token/token.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideHttpClient(
      //
      withInterceptors([authInterceptor])
    ), // HTTP so AuthService can work
    provideRouter(HOST_ROUTES, withEnabledBlockingInitialNavigation()),
    { provide: AUTH_MFE_SERVICE, useExisting: AuthService }, //1. Bind the token to the real remote class
    { provide: TOKEN_MFE_SERVICE, useExisting: TokenService }, //2. Bind the token to the real remote class
  ],
};
