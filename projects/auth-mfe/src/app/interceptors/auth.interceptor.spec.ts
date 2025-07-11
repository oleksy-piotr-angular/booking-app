// auth.interceptor.spec.ts
import { TestBed } from '@angular/core/testing';
import {
  HttpClient,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TOKEN_MFE_SERVICE } from '@booking-app/auth-token';
import { authInterceptor } from './auth.interceptor';

describe('authInterceptor (function)[TDD]', () => {
  let http: HttpClient;
  let httpMock: HttpTestingController;
  const fakeToken = 'F00';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: TOKEN_MFE_SERVICE, useValue: { getToken: () => fakeToken } },
      ],
      imports: [HttpClientTestingModule],
    });

    http = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('adds Authorization header with token', () => {
    http.get('/test').subscribe();
    const req = httpMock.expectOne((r) => r.url.endsWith('/test'));

    expect(req.request.headers.get('Authorization')).toBe('Bearer test-token');
    req.flush({});
  });
});
