import { Provider } from '@angular/core';
import { of } from 'rxjs';
import { AuthService } from '../app/services/auth/auth.service';
import { Router } from '@angular/router';

export const createRouterSpy = () =>
  jasmine.createSpyObj('Router', ['createUrlTree']);

export const provideMockAuthService = (isAuth: boolean): Provider => ({
  provide: AuthService,
  useValue: { isAuthenticated$: of(isAuth) },
});

export const provideMockRouter = (
  routerSpy: jasmine.SpyObj<Router>
): Provider => ({
  provide: Router,
  useValue: routerSpy,
});
