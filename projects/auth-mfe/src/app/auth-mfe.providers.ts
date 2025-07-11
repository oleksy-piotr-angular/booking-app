//auth-mfe.providers.ts
import { AUTH_MFE_SERVICE } from '@booking-app/auth-token';
import { AuthService } from './services/auth/auth.service';
import type { Provider } from '@angular/core';

export const AUTH_MFE_PROVIDERS: Provider[] = [
  // when DI sees AUTH_MFE_SERVICE, give the same AuthService instance
  { provide: AUTH_MFE_SERVICE, useExisting: AuthService },
];
