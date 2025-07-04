import { Injectable } from '@angular/core';
import { isTokenExpired } from '../../shared/utils/jwt.util';

const TOKEN_KEY = 'auth.token';

@Injectable({ providedIn: 'root' })
export class TokenService {
  public constructor() {}

  public getToken(): string | null {
    const token = localStorage.getItem(TOKEN_KEY);
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
    localStorage.setItem(TOKEN_KEY, token);
  }

  public clearToken(): void {
    localStorage.removeItem(TOKEN_KEY);
  }
}
