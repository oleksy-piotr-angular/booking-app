import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
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
});
