// auth.guard.ts
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { inject } from '@angular/core';
import { IAuthService, AUTH_MFE_SERVICE } from '@booking-app/auth-token';
import { map } from 'rxjs/operators';

export const authGuard: CanActivateFn = () => {
  const auth = inject<IAuthService>(AUTH_MFE_SERVICE);
  const router = inject(Router);

  return auth.isAuthenticated$.pipe(
    map((isAuth) => {
      // Detect "auth-mfe" or "_host-app"
      const isMfe = window.location.port === '4201';
      console.log('isAuthMfe:', isMfe);
      const redirectRoute = isMfe ? ['/login'] : ['/auth', 'login'];

      return isAuth ? true : (router.createUrlTree(redirectRoute) as UrlTree);
    })
  );
};
