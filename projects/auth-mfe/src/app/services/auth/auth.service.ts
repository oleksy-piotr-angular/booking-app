import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
  public readonly isAuthenticated$ = new Observable<boolean>(
    (subscriber) => {}
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
}
