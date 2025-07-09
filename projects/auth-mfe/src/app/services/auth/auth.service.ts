// auth.service.ts
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { environment } from '../../../../../../environments/environment';
export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
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
  private baseUrl = environment.apiBase;
  private http: HttpClient = inject(HttpClient);
  private readonly tokenKey = 'auth_token';
  private readonly userIdKey = 'auth_user_id';

  private readonly tokenSubject = new BehaviorSubject<string | null>(
    localStorage.getItem(this.tokenKey)
  );

  public readonly isAuthenticated$ = this.tokenSubject.pipe(
    map((token) => !!token)
  );

  /** register AND auto‐login by storing token & user ID */
  public register(
    payload: RegisterPayload
  ): Observable<{ id: number; token: string }> {
    return this.http
      .post<{ id: number; token: string }>(`${this.baseUrl}/register`, payload)
      .pipe(tap((resp) => this.setToken({ id: resp.id, token: resp.token })));
  }

  public login(
    payload: LoginPayload
  ): Observable<{ id: number; token: string }> {
    return this.http
      .post<{ id: number; token: string }>(`${this.baseUrl}/login`, payload)
      .pipe(
        tap((response) =>
          this.setToken({ id: response.id, token: response.token })
        )
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
    this.clearToken();
  }

  public setToken({ id, token }: { id: number; token: string }): void {
    localStorage.setItem(this.tokenKey, token);
    localStorage.setItem(this.userIdKey, String(id));
    this.tokenSubject.next(token);
  }

  public clearToken(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userIdKey);
    this.tokenSubject.next(null);
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
