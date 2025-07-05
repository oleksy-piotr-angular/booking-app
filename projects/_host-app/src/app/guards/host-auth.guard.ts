import { inject, InjectionToken } from '@angular/core';
import {
  CanMatchFn,
  Route,
  UrlSegment,
  UrlTree,
  Router,
} from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

// TYPE‐ONLY import of AuthService’s interface
import type { AuthService } from 'auth-mfe';

// create a token keyed to that interface
export const AUTH_MFE_SERVICE = new InjectionToken<AuthService>('AuthService');

const LOGIN_PATH = ['/auth', 'login'];

export const hostAuthGuard: CanMatchFn = (
  _route: Route,
  _segments: UrlSegment[]
): Observable<boolean | UrlTree> => {
  // inject the token — at runtime you’ll bind it to the real class,
  // in tests we’ll bind it to a stub
  const auth = inject(AUTH_MFE_SERVICE);
  const router = inject(Router);

  return auth.isAuthenticated$.pipe(
    map((isAuth) => (isAuth ? true : router.createUrlTree(LOGIN_PATH)))
  );
};
