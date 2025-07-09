import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

export interface IAuthService {
  isAuthenticated$: Observable<boolean>;
  logout(): void;
}

export const AUTH_SERVICE = new InjectionToken<IAuthService>('AUTH_SERVICE');
