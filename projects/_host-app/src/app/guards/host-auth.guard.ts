// host-auth.guard.ts
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
import { AUTH_SERVICE, IAuthService } from '../tokens/auth.token';

// TYPE‐ONLY import of AuthServices interface
import type { AuthService } from 'auth-mfe';

// Assign created token keyed to that interface
export const AUTH_MFE_SERVICE = AUTH_SERVICE as InjectionToken<IAuthService>;

const LOGIN_PATH = ['/auth', 'login'];

export const hostAuthGuard: CanMatchFn = (
  _route: Route,
  _segments: UrlSegment[]
): Observable<boolean | UrlTree> => {
  // inject the token — at runtime you will bind it to the real class,
  // in tests we will bind it to a stub
  const auth = inject(AUTH_MFE_SERVICE);
  const router = inject(Router);

  return auth.isAuthenticated$.pipe(
    map((isAuth) => (isAuth ? true : router.createUrlTree(LOGIN_PATH)))
  );
};
