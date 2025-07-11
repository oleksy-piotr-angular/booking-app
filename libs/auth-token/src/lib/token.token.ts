//token.token.ts
import { InjectionToken } from '@angular/core';

export interface ITokenService {
  getToken(): string | null;
  setToken(token: string): void;
  clearToken(): void;
}

export const TOKEN_MFE_SERVICE = new InjectionToken<ITokenService>(
  'TOKEN_MFE_SERVICE'
);
