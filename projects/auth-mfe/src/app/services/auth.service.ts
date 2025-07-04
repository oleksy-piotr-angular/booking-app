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

  register(payload: RegisterPayload): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/register`, payload);
  }

  login(payload: LoginPayload): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.baseUrl}/login`, payload);
  }
}
