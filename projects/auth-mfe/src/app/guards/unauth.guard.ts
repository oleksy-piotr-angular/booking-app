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
import { AUTH_MFE_SERVICE, IAuthService } from '@booking-app/auth-token';

export const unauthGuard: CanActivateFn = (
  _route: ActivatedRouteSnapshot,
  _state: RouterStateSnapshot
): Observable<boolean | UrlTree> => {
  const auth = inject<IAuthService>(AUTH_MFE_SERVICE);
  const router = inject(Router);

  return auth.isAuthenticated$.pipe(
    map((isAuth) => (isAuth ? router.createUrlTree(['/']) : true))
  );
};
