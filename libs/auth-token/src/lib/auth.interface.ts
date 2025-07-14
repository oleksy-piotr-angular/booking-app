import { LoginPayload } from './dtos/auth.dto';
import { LoginData, RegisterData } from './models/auth.model';
import { Observable } from 'rxjs';

export interface IAuthService {
  isAuthenticated$: Observable<boolean>;
  login(payload: LoginPayload): Observable<LoginData>;
  register(data: RegisterData): Observable<RegisterData>; // if you have it
  logout(): void; // or Observable<void>
}
