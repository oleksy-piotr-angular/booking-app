// host-auth.guard.ts
import { CanMatchFn, Router, UrlTree } from '@angular/router';
import { inject } from '@angular/core';
import { IAuthService, AUTH_MFE_SERVICE } from '@booking-app/auth-token';
import { map } from 'rxjs/operators';

export const hostAuthGuard: CanMatchFn = () => {
  const auth = inject(AUTH_MFE_SERVICE) as IAuthService;
  const router = inject(Router);

  return auth.isAuthenticated$.pipe(
    map((isAuth) =>
      isAuth ? true : (router.createUrlTree(['/auth', 'login']) as UrlTree)
    )
  );
};
