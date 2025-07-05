import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AuthService } from './auth.service';

describe('AuthService (TDD)', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    localStorage.clear(); // ensure clean state
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should post to /api/register and return the response', () => {
    const payload = { email: 'a@b.com', password: '123456' };
    const mockResp = { success: true, userId: 42 };

    let actual: any;
    service.register(payload).subscribe((res) => (actual = res));

    const req = httpMock.expectOne('/api/register');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(payload);

    req.flush(mockResp);

    expect(actual).toEqual(mockResp);
  });

  it('should post to /api/login and return the token response', () => {
    const payload = { email: 'test@example.com', password: 'secret' };
    const mockResp = { token: 'abc.def.ghi' };
    let actual: any;

    service.login(payload).subscribe((r) => (actual = r));

    const req = httpMock.expectOne('/api/login');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(payload);

    req.flush(mockResp);
    expect(actual).toEqual(mockResp);
  });

  it('sends forgot password request with email', () => {
    const email = 'user@example.com';

    service.forgotPassword(email).subscribe();

    const req = httpMock.expectOne('/api/auth/forgot-password');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ email });

    req.flush({});
  });

  it('sends reset password request with token and new password', () => {
    const token = 'abc123';
    const newPassword = 'newPass!';

    service.resetPassword(token, newPassword).subscribe();

    const req = httpMock.expectOne('/api/auth/reset-password');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ token, password: newPassword });

    req.flush({});
  });

  it('emits false from isAuthenticated$ by default (no token)', (done) => {
    localStorage.removeItem('auth_token'); // ensure it's not set

    // 🔄 Recreate AuthService AFTER changing localStorage
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });

    const service = TestBed.inject(AuthService);

    service.isAuthenticated$.subscribe((value) => {
      expect(value).toBeFalse();
      done();
    });
  });

  it('emits true from isAuthenticated$ when token is set', (done) => {
    localStorage.setItem('auth_token', 'abc123'); // set BEFORE injecting service

    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });

    const service = TestBed.inject(AuthService);

    service.isAuthenticated$.subscribe((value) => {
      expect(value).toBeTrue();
      done();
    });
  });

  it('removes token from localStorage when logout() is called', () => {
    localStorage.setItem('auth_token', 'existing-token');

    service = TestBed.inject(AuthService);
    service.logout();

    expect(localStorage.getItem('auth_token')).toBeNull();
  });

  it('calls setToken() with the token after successful login', (done) => {
    const payload = { email: 'me@a.com', password: 'abc' };
    const mockToken = { token: 'jwt.abc.123' };

    spyOn(service, 'setToken');

    service.login(payload).subscribe(() => {
      expect(service.setToken).toHaveBeenCalledWith(mockToken.token);
      done();
    });

    const req = httpMock.expectOne('/api/login');
    req.flush(mockToken);
  });
});
