// unauth.guard.ts
import { inject } from '@angular/core';
import {
  CanActivateFn,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree,
} from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AUTH_SERVICE, IAuthService } from '../services/auth.tokens';

export const unauthGuard: CanActivateFn = (
  _route: ActivatedRouteSnapshot,
  _state: RouterStateSnapshot
): Observable<boolean | UrlTree> => {
  const auth = inject<IAuthService>(AUTH_SERVICE);
  const router = inject(Router);

  return auth.isAuthenticated$.pipe(
    map((isAuth) => (isAuth ? router.createUrlTree(['/']) : true))
  );
};
