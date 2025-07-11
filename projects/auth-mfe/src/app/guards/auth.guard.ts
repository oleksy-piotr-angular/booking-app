// auth.guard.ts
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { inject } from '@angular/core';
import { IAuthService, AUTH_MFE_SERVICE } from '@booking-app/auth-token';
import { map } from 'rxjs/operators';

export const authGuard: CanActivateFn = () => {
  const auth = inject(AUTH_MFE_SERVICE) as IAuthService;
  const router = inject(Router);

  return auth.isAuthenticated$.pipe(
    map((isAuth) =>
      isAuth ? true : (router.createUrlTree(['/auth', 'login']) as UrlTree)
    )
  );
};
