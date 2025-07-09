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
import { AUTH_MFE_SERVICE, IAuthService } from '../tokens/auth.token';

const LOGIN_PATH = ['/auth', 'login'];

export const hostAuthGuard: CanMatchFn = (
  _route: Route,
  _segments: UrlSegment[]
): Observable<boolean | UrlTree> => {
  // inject the token — at runtime you will bind it to the real class,
  // in tests we will bind it to a stub
  const auth: IAuthService = inject(AUTH_MFE_SERVICE);
  const router: Router = inject(Router);

  return auth.isAuthenticated$.pipe(
    map((isAuth) => (isAuth ? true : router.createUrlTree(LOGIN_PATH)))
  );
};
