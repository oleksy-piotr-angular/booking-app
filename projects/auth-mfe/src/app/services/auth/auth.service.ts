import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable } from 'rxjs';

export interface RegisterPayload {
  email: string;
  password: string;
}
export interface LoginPayload {
  email: string;
  password: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = '/api';
  private http: HttpClient = inject(HttpClient);
  private readonly tokenSubject = new BehaviorSubject<string | null>(
    localStorage.getItem('auth_token')
  );

  public readonly isAuthenticated$ = this.tokenSubject.pipe(
    map((token) => !!token)
  );

  public register(payload: RegisterPayload): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/register`, payload);
  }

  public login(payload: LoginPayload): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.baseUrl}/login`, payload);
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

  // Add a method to mutate the token
  public setToken(token: string | null): void {
    if (token) {
      localStorage.setItem('auth_token', token);
    } else {
      localStorage.removeItem('auth_token');
    }
    this.tokenSubject.next(token);
  }
}
