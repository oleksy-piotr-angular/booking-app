import { RegisterComponent } from './pages/register/register.component';
// app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

import { AUTH_ROUTES } from './auth.routes';
import { AUTH_MFE_SERVICE } from '@booking-app/auth-token';
import { AuthService } from './services/auth/auth.service';
import { authInterceptor } from './interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideHttpClient(
      //
      withInterceptors([authInterceptor])
    ), // HTTP so AuthService can work
    provideRouter(AUTH_ROUTES),
    { provide: AUTH_MFE_SERVICE, useExisting: AuthService },
  ],
};
