import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

export interface IAuthService {
  isAuthenticated$: Observable<boolean>;
  login(...args: any[]): void;
  logout(...args: any[]): void;
}

export const AUTH_SERVICE = new InjectionToken<IAuthService>('AUTH_SERVICE');
