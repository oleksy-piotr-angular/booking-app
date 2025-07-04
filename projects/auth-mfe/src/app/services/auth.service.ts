import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface RegisterPayload {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  register(payload: RegisterPayload): Observable<any> {
    return new Observable((observer) => {});
  }
}
