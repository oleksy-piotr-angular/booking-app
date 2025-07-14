// projects/auth-mfe/src/app/remote-entry/auth-mfe.providers.ts
import { Provider } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { TokenService } from '../services/token/token.service';
import { AUTH_MFE_SERVICE } from '@booking-app/auth-token';
import { TOKEN_MFE_SERVICE } from '@booking-app/auth-token';

export const AUTH_MFE_PROVIDERS: Provider[] = [
  AuthService,
  { provide: AUTH_MFE_SERVICE, useExisting: AuthService },
  TokenService,
  { provide: TOKEN_MFE_SERVICE, useExisting: TokenService },
];
