import { InjectionToken } from '@angular/core';
import { CanMatchFn } from '@angular/router';
import { Observable, of } from 'rxjs';

import type { AuthService } from 'auth-mfe';

export const AUTH_MFE_SERVICE = new InjectionToken<AuthService>('AuthService');

export const hostAuthGuard: CanMatchFn = (): Observable<boolean> => {
  return of(true);
};
