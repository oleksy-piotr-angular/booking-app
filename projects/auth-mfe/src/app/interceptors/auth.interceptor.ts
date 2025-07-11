// auth.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ITokenService, TOKEN_MFE_SERVICE } from '@booking-app/auth-token';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TOKEN_MFE_SERVICE) as ITokenService;
  const token = tokenService.getToken();
  console.log('authInterceptor token', token);

  if (token) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next(cloned);
  }

  return next(req);
};
