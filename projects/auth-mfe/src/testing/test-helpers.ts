// test-helpers.ts
import { Provider } from '@angular/core';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import {
  AUTH_MFE_SERVICE,
  IAuthService,
} from '../../../_host-app/src/app/tokens/auth.token';

export const createRouterSpy = () =>
  jasmine.createSpyObj('Router', ['createUrlTree']);

/**
 * Returns a provider that
 *  • binds the AUTH_MFE_SERVICE token to a spy impl of IAuthService
 *  • sets isAuthenticated$ to the given boolean
 */
export function provideMockAuthService(isAuth: boolean): Provider {
  const spy = jasmine.createSpyObj<IAuthService>('IAuthService', ['logout'], {
    isAuthenticated$: of(isAuth),
  });

  return {
    provide: AUTH_MFE_SERVICE,
    useValue: spy,
  };
}

export const provideMockRouter = (
  routerSpy: jasmine.SpyObj<Router>
): Provider => ({
  provide: Router,
  useValue: routerSpy,
});
