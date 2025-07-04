import { TestBed } from '@angular/core/testing';
import {
  HttpClient,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';

import { authInterceptor } from './auth.interceptor';
import { TokenService } from '../services/token/token.service';

describe('authInterceptor (function)', () => {
  let http: HttpClient;
  let httpMock: HttpTestingController;
  let tokenSpy: jasmine.SpyObj<TokenService>;

  beforeEach(() => {
    tokenSpy = jasmine.createSpyObj('TokenService', ['getToken']);
    tokenSpy.getToken.and.returnValue('test-token');

    TestBed.configureTestingModule({
      providers: [
        { provide: TokenService, useValue: tokenSpy },
        provideHttpClient(withInterceptors([authInterceptor])),
        provideHttpClientTesting(),
      ],
      imports: [HttpClientTestingModule],
    });

    http = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('adds Authorization header with token', () => {
    http.get('/test').subscribe();
    const req = httpMock.expectOne((r) => r.url.endsWith('/test'));
    httpMock.match((req) => {
      console.log('Intercepted:', req.url);
      return false; // don’t match anything
    });
    expect(req.request.headers.get('Authorization')).toBe('Bearer test-token');
    req.flush({});
  });
});
