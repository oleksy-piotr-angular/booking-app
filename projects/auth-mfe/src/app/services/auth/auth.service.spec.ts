// auth.service.spec.ts
import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { AuthService } from './auth.service';
import {
  ITokenService,
  LoginPayload,
  LoginResponseDto,
  RegisterPayload,
  RegisterResponseDto,
  TOKEN_MFE_SERVICE,
  UserProfile,
} from '@booking-app/auth-token';
import { TOKEN_KEY, USER_ID_KEY } from '../token/token.service';
import { environment } from '../../../../../../environments/environment';

describe('AuthService (standalone)', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  // Stub that writes/reads real localStorage for TOKEN_KEY
  const tokenStub: ITokenService = {
    getToken: () => localStorage.getItem(TOKEN_KEY),
    setToken: (token: string) => localStorage.setItem(TOKEN_KEY, token),
    clearToken: () => localStorage.removeItem(TOKEN_KEY),
  };

  beforeEach(() => {
    localStorage.clear();

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        { provide: TOKEN_MFE_SERVICE, useValue: tokenStub },
      ],
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('register(): should POST /register, return mapped data, and save token+userID', (done) => {
    const payload: RegisterPayload = {
      name: 'Alice',
      email: 'alice@x.com',
      password: 'pw123',
    };

    const mockResp: RegisterResponseDto = {
      accessToken: 'jwt.abc.123',
      user: { id: 7, email: 'alice@x.com' },
    };

    service.register(payload).subscribe((result) => {
      // 1) Response shape
      expect(result).toEqual({ id: 7, token: 'jwt.abc.123' });

      // 2) Persistence
      expect(localStorage.getItem(TOKEN_KEY)).toBe('jwt.abc.123');
      expect(localStorage.getItem(USER_ID_KEY)).toBe('7');
      done();
    });

    const req = httpMock.expectOne(`${environment.apiBase}/register`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(payload);
    req.flush(mockResp);
  });

  it('login(): should POST /login, save token+userID', (done) => {
    const payload: LoginPayload = {
      email: 'bob@y.com',
      password: 'pw!',
    };

    const mockResp: LoginResponseDto = {
      accessToken: 'jwt.xyz.789',
      user: { id: 42, email: 'bob@y.com' },
    };

    service.login(payload).subscribe((result) => {
      // only persistence is checked here
      expect(localStorage.getItem(TOKEN_KEY)).toBe('jwt.xyz.789');
      expect(localStorage.getItem(USER_ID_KEY)).toBe('42');
      done();
    });

    const req = httpMock.expectOne(`${environment.apiBase}/login`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(payload);
    req.flush(mockResp);
  });

  it('forgotPassword(): should POST /auth/forgot-password with email', () => {
    const email = 'x@x.com';
    service.forgotPassword(email).subscribe();

    const req = httpMock.expectOne(
      `${environment.apiBase}/auth/forgot-password`
    );
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ email });
    req.flush({});
  });

  it('resetPassword(): should POST /auth/reset-password with token+password', () => {
    const token = 'abc123';
    const newPass = 'newPW';
    service.resetPassword(token, newPass).subscribe();

    const req = httpMock.expectOne(
      `${environment.apiBase}/auth/reset-password`
    );
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ token, password: newPass });
    req.flush({});
  });

  it('getUserId(): should parse stored user ID', () => {
    localStorage.setItem(USER_ID_KEY, '55');
    expect(service.getUserId()).toBe(55);
  });

  it('isAuthenticated$: defaults to false when no token', (done) => {
    // initial BehaviorSubject seeded from localStorage
    service.isAuthenticated$.subscribe((val) => {
      expect(val).toBeFalse();
      done();
    });
  });

  it('isAuthenticated$: true when token present at startup', (done) => {
    localStorage.setItem(TOKEN_KEY, 'non-null');
    // recreate service so constructor picks up new localStorage
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        { provide: TOKEN_MFE_SERVICE, useValue: tokenStub },
      ],
    });
    service = TestBed.inject(AuthService);

    service.isAuthenticated$.subscribe((val) => {
      expect(val).toBeTrue();
      done();
    });
  });

  it('logout(): should clear token via stub and remove userID', () => {
    // seed both
    localStorage.setItem(TOKEN_KEY, 't');
    localStorage.setItem(USER_ID_KEY, '3');

    service.logout();

    // TokenService.clearToken stub removed TOKEN_KEY
    expect(localStorage.getItem(TOKEN_KEY)).toBeNull();
    expect(localStorage.getItem(USER_ID_KEY)).toBeNull();
  });

  it('getProfile(): should GET /users/:id when userID present', () => {
    localStorage.setItem(USER_ID_KEY, '100');
    const mockProfile: UserProfile = {
      id: 100,
      name: 'Cleo',
      email: 'cleo@z.com',
    };
    let actual: UserProfile | undefined;

    service.getProfile().subscribe((p) => (actual = p));

    const req = httpMock.expectOne(`${environment.apiBase}/users/100`);
    expect(req.request.method).toBe('GET');
    req.flush(mockProfile);

    expect(actual!).toEqual(mockProfile);
  });

  it('getProfile(): should throw Error when no userID', () => {
    localStorage.removeItem(USER_ID_KEY);
    expect(() => service.getProfile()).toThrowError('User ID not available');
  });
});
