// auth.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { map } from 'rxjs/operators';
import {
  AUTH_MFE_SERVICE,
  IAuthService,
} from '../../../../_host-app/src/app/tokens/auth.token';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AUTH_MFE_SERVICE) as IAuthService;
  const router = inject(Router);

  return auth.isAuthenticated$.pipe(
    map((isAuth) =>
      isAuth ? true : (router.createUrlTree(['/login']) as UrlTree)
    )
  );
};
