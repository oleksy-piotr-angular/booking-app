//token.token.ts
import { InjectionToken } from '@angular/core';
import { ITokenService } from './token.interface';

export const TOKEN_MFE_SERVICE = new InjectionToken<ITokenService>(
  'TOKEN_MFE_SERVICE'
);
