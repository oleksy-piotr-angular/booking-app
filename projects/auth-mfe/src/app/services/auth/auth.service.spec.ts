// auth.service.spec.ts
import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AuthService, UserProfile } from './auth.service';
import { environment } from '../../../../../../environments/environment';
import { LoginResponseDto, RegisterResponseDto } from '../../dtos/auth.dto';

describe('AuthService (TDD)', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  const TOKEN_KEY = 'auth_token';
  const USER_ID_KEY = 'auth_user_id';

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should POST to /api/register, store token & user ID, and return the response', (done) => {
    const payload = { name: 'Test User', email: 'a@b.com', password: '123456' };
    const mockResp: RegisterResponseDto = {
      accessToken: 'jwt.abc.123',
      user: { id: 7, email: 'me@a.com' },
    };

    service.register(payload).subscribe((res) => {
      // 1) method returns the AuthToken shape
      expect(res).toEqual({
        id: mockResp.user.id,
        token: mockResp.accessToken,
      });

      // 2) token and user ID were saved
      expect(localStorage.getItem(TOKEN_KEY)).toBe(mockResp.accessToken);
      expect(localStorage.getItem(USER_ID_KEY)).toBe(String(mockResp.user.id));
      done();
    });

    const req = httpMock.expectOne(`${environment.apiBase}/register`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(payload);
    req.flush(mockResp);
  });

  it('should POST to /api/login, store token and user ID', (done) => {
    const payload = { name: 'Test User', email: 'me@a.com', password: 'abc' };
    const mockResp: LoginResponseDto = {
      accessToken: 'jwt.abc.123',
      user: { id: 7, email: 'me@a.com' },
    };

    service.login(payload).subscribe(() => {
      expect(localStorage.getItem(TOKEN_KEY)).toEqual(mockResp.accessToken);
      expect(localStorage.getItem(USER_ID_KEY)).toBe(String(mockResp.user.id));
      done();
    });

    const req = httpMock.expectOne(`${environment.apiBase}/login`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(payload);

    req.flush(mockResp);
  });

  it('should send forgot password request with email', () => {
    const email = 'user@example.com';
    service.forgotPassword(email).subscribe();

    const req = httpMock.expectOne(
      `${environment.apiBase}/auth/forgot-password`
    );
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ email });

    req.flush({});
  });

  it('should send reset password request with token and new password', () => {
    const token = 'abc123';
    const newPassword = 'newPass!';
    service.resetPassword(token, newPassword).subscribe();

    const req = httpMock.expectOne(
      `${environment.apiBase}/auth/reset-password`
    );
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ token, password: newPassword });

    req.flush({});
  });

  it('should return user ID via getUserId()', () => {
    localStorage.setItem(USER_ID_KEY, '55');
    expect(service.getUserId()).toBe(55);
  });

  it('should emit false from isAuthenticated$ by default', (done) => {
    service.isAuthenticated$.subscribe((value) => {
      expect(value).toBeFalse();
      done();
    });
  });

  it('should emit true from isAuthenticated$ when token is present', (done) => {
    localStorage.setItem(TOKEN_KEY, 'exists');
    // Re-inject service so constructor picks up stored token
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });
    service = TestBed.inject(AuthService);

    service.isAuthenticated$.subscribe((value) => {
      expect(value).toBeTrue();
      done();
    });
  });

  it('should clear both token and user ID on logout()', () => {
    localStorage.setItem(TOKEN_KEY, 't');
    localStorage.setItem(USER_ID_KEY, '3');

    service.logout();

    expect(localStorage.getItem(TOKEN_KEY)).toBeNull();
    expect(localStorage.getItem(USER_ID_KEY)).toBeNull();
  });

  it('should fetch profile from /api/users/:id using stored user ID', () => {
    localStorage.setItem(USER_ID_KEY, '1');
    const mockProfile: UserProfile = {
      id: 1,
      name: 'Piotr',
      email: 'piotr@example.com',
    };
    let actualProfile: UserProfile | undefined;

    service.getProfile().subscribe((p) => (actualProfile = p));

    const req = httpMock.expectOne(`${environment.apiBase}/users/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockProfile);

    expect(actualProfile).toEqual(mockProfile);
  });

  it('should throw if getProfile() called when no user ID', () => {
    localStorage.removeItem(USER_ID_KEY);
    expect(() => service.getProfile()).toThrowError('User ID not available');
  });
});
