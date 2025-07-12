import { InjectionToken } from '@angular/core';
import { IAuthService } from './auth.interface';

export const AUTH_MFE_SERVICE = new InjectionToken<IAuthService>(
  'AUTH_MFE_SERVICE'
);
