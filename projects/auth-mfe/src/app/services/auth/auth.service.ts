import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';

export interface RegisterPayload {
  email: string;
  password: string;
}
export interface LoginPayload {
  email: string;
  password: string;
}

export interface UserProfile {
  name: string;
  email: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = '/api';
  private http: HttpClient = inject(HttpClient);
  private readonly tokenKey = 'auth_token';

  private readonly tokenSubject = new BehaviorSubject<string | null>(
    localStorage.getItem(this.tokenKey)
  );

  public readonly isAuthenticated$ = this.tokenSubject.pipe(
    map((token) => !!token)
  );

  public register(payload: RegisterPayload): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/register`, payload);
  }

  public login(payload: LoginPayload): Observable<{ token: string }> {
    return this.http
      .post<{ token: string }>(`${this.baseUrl}/login`, payload)
      .pipe(tap((response) => this.setToken(response.token)));
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
    this.clearToken();
  }

  public setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
    this.tokenSubject.next(token);
  }

  public clearToken(): void {
    localStorage.removeItem(this.tokenKey);
    this.tokenSubject.next(null);
  }

  public getProfile(): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${this.baseUrl}/profile`);
  }
}
