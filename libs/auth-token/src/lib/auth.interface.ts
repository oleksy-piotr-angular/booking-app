import { Observable } from 'rxjs';

export interface IAuthService {
  isAuthenticated$: Observable<boolean>;
  // Add other methods as needed:
  login(email: string, password: string): void;
  logout(): void;
}
