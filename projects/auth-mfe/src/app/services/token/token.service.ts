// token.service.ts
import { Injectable } from '@angular/core';
import { isTokenExpired } from '../../shared/utils/jwt.util';

export const TOKEN_KEY = 'auth_token';
export const USER_ID_KEY = 'auth_user_id';

@Injectable({ providedIn: 'root' })
export class TokenService {
  public constructor() {}

  public getToken(): string | null {
    const token = localStorage.getItem(TOKEN_KEY);
    console.log('TokenService getToken', token);
    if (!token) {
      return null;
    }

    const parts = token.split('.');
    if (parts.length === 3 && isTokenExpired(token)) {
      this.clearToken();
      return null;
    }

    return token;
  }

  public setToken(token: string): void {
    console.log('TokenService setToken', token);
    localStorage.setItem(TOKEN_KEY, token);
  }

  public clearToken(): void {
    localStorage.removeItem(TOKEN_KEY);
  }
}
