// app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { AUTH_MFE_PROVIDERS } from '@booking-app/auth-mfe-providers';
import { TOKEN_MFE_SERVICE } from '@booking-app/auth-token';

import { AUTH_ROUTES } from './auth.routes';
import { authInterceptor } from './interceptors/auth.interceptor';

import { TokenService } from './services/token/token.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideRouter(AUTH_ROUTES),

    // 1) re-export AuthService under the shared token
    ...AUTH_MFE_PROVIDERS,

    // 2) re-export TokenService under the shared token
    { provide: TOKEN_MFE_SERVICE, useExisting: TokenService },
  ],
};
