import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from '../services/token/token.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};
