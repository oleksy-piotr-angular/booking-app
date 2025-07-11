import { RegisterComponent } from './pages/register/register.component';
// app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

import { AUTH_ROUTES } from './auth.routes';
import { AUTH_MFE_SERVICE, TOKEN_MFE_SERVICE } from '@booking-app/auth-token';
import { AuthService } from './services/auth/auth.service';
import { authInterceptor } from './interceptors/auth.interceptor';
import { TokenService } from './services/token/token.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideHttpClient(
      // HTTP so AuthService can work
      withInterceptors([authInterceptor])
    ),
    provideRouter(AUTH_ROUTES),
    { provide: AUTH_MFE_SERVICE, useExisting: AuthService }, //1. Bind the token to the real remote class
    { provide: TOKEN_MFE_SERVICE, useExisting: TokenService }, //2. Bind the token to the real remote class
  ],
};
