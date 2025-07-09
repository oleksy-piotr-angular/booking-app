// auth.token.ts
import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

export interface IAuthService {
  isAuthenticated$: Observable<boolean>;
  logout(): void;
}

export const AUTH_MFE_SERVICE = new InjectionToken<IAuthService>(
  'AUTH_MFE_SERVICE'
);
