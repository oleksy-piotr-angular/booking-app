// auth.service.ts
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { environment } from '../../../../../../environments/environment';
import {
  mapLoginDtoToAuthToken,
  mapRegisterDtoToAuthToken,
} from '../../mappers/auth.mapper';
import { LoginResponseDto } from '../../dtos/auth.dto';
import { LoginData, RegisterData } from '../../models/auth.model';
import { ITokenService, TOKEN_MFE_SERVICE } from '@booking-app/auth-token';
import { TOKEN_KEY, USER_ID_KEY } from '../token/token.service';

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
}
export interface LoginPayload {
  email: string;
  password: string;
}

export interface UserProfile {
  id: number;
  name: string;
  email: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenService = inject(TOKEN_MFE_SERVICE) as ITokenService;

  private baseUrl = environment.apiBase;
  private http: HttpClient = inject(HttpClient);
  private readonly tokenKey = TOKEN_KEY;
  private readonly userIdKey = USER_ID_KEY;

  private readonly tokenSubject = new BehaviorSubject<string | null>(
    localStorage.getItem(this.tokenKey)
  );

  public readonly isAuthenticated$ = this.tokenSubject.pipe(
    map((token) => {
      if (!token) {
        return false;
      } else if (token === 'null' || token === 'undefined') {
        return false;
      }
      return true;
    })
  );

  /** register AND auto‐login by storing token & user ID */
  public register(payload: RegisterPayload): Observable<RegisterData> {
    return this.http
      .post<LoginResponseDto>(`${this.baseUrl}/register`, payload)
      .pipe(
        // 1) map the server response to our internal shape
        map(mapRegisterDtoToAuthToken),
        // 2) auto-save that token & id
        tap((registerData) => {
          console.log('AuthService register', registerData);
          // 1) persist JWT
          this.tokenService.setToken(registerData.token);
          // 2) persist user-ID
          localStorage.setItem(this.userIdKey, String(registerData.id));
          // 3) notify isAuthenticated$
          this.tokenSubject.next(registerData.token);
        })
      );
  }

  public login(payload: LoginPayload): Observable<LoginData> {
    return this.http
      .post<LoginResponseDto>(`${this.baseUrl}/login`, payload)
      .pipe(
        // 1) map the server response to our internal shape
        map(mapLoginDtoToAuthToken),
        tap((loginData) => {
          console.log('AuthService loginData.token', loginData.token);
          // 1) persist JWT
          this.tokenService.setToken(loginData.token);
          // 2) persist user-ID
          localStorage.setItem(this.userIdKey, String(loginData.id));
          // 3) notify isAuthenticated$
          this.tokenSubject.next(loginData.token);
        })
      );
  }

  public forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/forgot-password`, { email });
  }

  public resetPassword(token: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/auth/reset-password`, {
      token,
      password,
    });
  }

  public logout(): void {
    this.tokenService.clearToken();
    localStorage.removeItem(this.userIdKey);
  }

  public getUserId(): number | null {
    const raw = localStorage.getItem(this.userIdKey);
    return raw ? Number(raw) : null;
  }

  public getProfile(): Observable<UserProfile> {
    const id = this.getUserId();
    if (!id) throw new Error('User ID not available');
    return this.http.get<UserProfile>(`${this.baseUrl}/users/${id}`);
  }
}
